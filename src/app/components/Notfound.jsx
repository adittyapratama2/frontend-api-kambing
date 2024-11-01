import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-6"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-7xl font-extrabold text-blue-600 mb-6"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl font-semibold text-gray-800 mb-4"
        >
          Oops! Halaman tidak ditemukan
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-gray-600 mb-8"
        >
          Kami tidak dapat menemukan halaman yang Anda cari. Mungkin URL yang
          Anda masukkan salah, atau halaman ini telah dipindahkan.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center text-lg font-medium text-white bg-primary hover:bg-blue-700 px-6 py-3 rounded-lg shadow-md transition-all duration-300"
          >
            <ArrowLeftCircleIcon className="w-5 h-5 mr-2" />
            Kembali ke Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;
