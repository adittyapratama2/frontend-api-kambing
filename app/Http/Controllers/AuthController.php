<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
{
    $response = Http::post(env('API_URL') . '/auth/login', [
        'username' => $request->input('username'),
        'password' => $request->input('password'),
    ]);

    if ($response->successful()) {
        // Jika login sukses, ambil token dan simpan dalam session
        $token = $response->json('token');
        Session::put('api_token', $token);
        return redirect('goats');  // Redirect ke halaman "goats"
    } else {
        // Ambil pesan error dari API jika ada
        $errorMessage = $response->json('message') ?? 'Usermane dan Password Tidak Cocok';
        
        // Kirim pesan error ke view
        return back()->withErrors(['message' => $errorMessage]);
    }
}


    public function logout()
    {
        Session::forget('api_token');
        return redirect('login');
    }

    public function showRegistrationForm()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        // Validate the request
        $request->validate([
            'username' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|in:admin,user',
        ]);

        // Send a POST request to the API to register the user
        $response = Http::post(env('API_URL') . '/auth/register', [
            'username' => $request->input('username'),
            'password' => $request->input('password'),
            'role' => $request->input('role'),
        ]);

        if ($response->successful()) {
            // If registration is successful, redirect to the login page
            return redirect('login')->with('success', 'Account created successfully. Please login.');
        }

        // If the API response indicates an error, redirect back with an error message
        return back()->withErrors(['message' => 'Registration failed. Please try again.']);
    }

    public function getCurrentUser(Request $request)
    {
        // Ambil token dari header
        $token = $request->bearerToken();
        
        if (!$token) {
            return response()->json(['error' => 'No token provided'], 401);
        }

        // Buat permintaan ke API Node.js
        $response = Http::withToken($token)->get('http://localhost:3000/api/auth/me');
        
        if ($response->successful()) {
            return response()->json($response->json());
        } else {
            return response()->json(['error' => 'Unable to fetch user data'], $response->status());
        }
    }
}
