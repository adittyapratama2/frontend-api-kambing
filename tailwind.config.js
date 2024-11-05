/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#2A6A9E", // Main theme color
      secondary: "#DDEBF4", //Secondary
      background: "#F9FAFB", // Light background color
      textPrimary: "#111827", // Dark text color
      textSecondary: "#6B7280", // Light gray text color
      success: "#28A745", // Success message color
      warning: "#FBBF24", // Warning color
      error: "#EF4444", // Error color
      pink: "#FFC0CB",
      grey: "#F8F9FE",
      darkGrey: "#E8E9F1",
      white: "#FFFFFF",
      lightGreen: "#3AC0A0",
    },
    extend: {
      keyframes: {
        pulseBorder: {
          "0%, 100%": { borderColor: "#3b82f6" }, // Blue
          "50%": { borderColor: "#22c55e" }, // Green on success
        },
      },
      animation: {
        pulseBorder: "pulseBorder 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
