import React, { useState, useEffect } from "react";

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show splash screen for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return null; // Don't render the splash screen once loading is done
  }

  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <div className="text-center">
        <img
          src="/assets/mygoat-logo 1.png"
          alt="GoatTrack"
          className="mx-auto mb-4"
        />
        <h1 className="text-white text-3xl font-bold">
          Goat<span className="text-success">Track</span>
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
