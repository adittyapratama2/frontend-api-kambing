import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // Import Heroicons

const QRScanner = () => {
  const videoElementRef = useRef(null);
  const [scanned, setScannedText] = useState("");
  const [scannedSuccess, setScannedSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoElementRef.current;

    const qrScanner = new QrScanner(
      video,
      (result) => {
        console.log("decoded qr code:", result);
        setScannedText(result.data);
        setScannedSuccess(true);
        setLoading(true);

        let pathToNavigate;
        if (result.data.startsWith("http")) {
          pathToNavigate = result.data;
        } else {
          pathToNavigate = `/dashboard/kambing/input-data/${result.data}`;
        }

        console.log("Navigating to:", pathToNavigate);

        setTimeout(() => {
          if (pathToNavigate) {
            navigate(pathToNavigate);
          }
        }, 2000);

        setTimeout(() => {
          setScannedSuccess(false);
          setLoading(false);
        }, 2000);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    qrScanner.start().then(() => {
      console.log("QR Scanner started");
    });

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
      console.log("QR Scanner stopped and destroyed");
    };
  }, [navigate]);

  return (
    <div className="relative h-screen w-screen bg-textPrimary">
      <video
        ref={videoElementRef}
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
      />

      {/* Back to Dashboard Button with Heroicons */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 z-50 bg-transparent p-2 rounded-full text-white hover:bg-white hover:text-black transition"
      >
        <ArrowLeftIcon className="w-8 h-8" />
      </button>

      <div className="absolute inset-0 flex justify-center items-center z-40">
        <div className="relative w-full max-w-md">
          <div className="rounded-lg p-4 w-full h-80 mx-auto flex justify-center items-center">
            <div className="absolute top-0 left-0 right-0 bottom-0"></div>
            <div className="text-white text-center text-lg">
              {loading ? (
                <div className="text-2xl">Loading...</div>
              ) : (
                "Scan QR Kambing"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
