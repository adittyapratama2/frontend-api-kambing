import { QrCodeIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaCog, FaSignOutAlt, FaRegUser } from "react-icons/fa";
import { logout } from "../../state/authSlice";
import { useLogoutMutation } from "../../state/query/auth";
import { useDispatch } from "react-redux";

const FooterNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [performLogout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await performLogout().unwrap();
      dispatch(logout());
      console.log("Sukses Logout..");
      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary shadow-lg py-4 rounded-t-3xl">
      <div className="flex justify-between items-center px-8">
        <div className="flex items-center space-x-8">
          {/* Home Button */}
          <div className="flex flex-col items-center">
            <Link to="/dashboard">
              <FaHome className="h-6 w-6 text-primary" />
            </Link>
            <span className="text-xs text-textPrimary mt-1">Home</span>
          </div>

          {/* User Button */}
          <div className="flex flex-col items-center">
            <Link to="/dashboard/user">
              <FaRegUser className="h-6 w-6 text-primary" />
            </Link>
            <span className="text-xs text-textPrimary mt-1">User</span>
          </div>
        </div>

        {/* QRIS Button (center, pushed to the top) */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          style={{ top: "-30px" }}
        >
          <Link to="/scan-qr">
            <button className="bg-primary rounded-full h-16 w-16 flex justify-center items-center border-4 border-white shadow-xl transform hover:scale-110 hover:shadow-2xl transition-transform duration-300 ease-in-out">
              <QrCodeIcon className="h-8 w-8 text-white" />
            </button>
          </Link>
          <span className="text-xs text-textPrimary mt-2">QR Scan</span>
        </div>

        {/* Right Side (Settings and Logout Buttons) */}
        <div className="flex items-center space-x-8">
          {/* Settings Button */}
          <div className="flex flex-col items-center">
            <Link to="/settings">
              <FaCog className="h-6 w-6 text-primary" />
            </Link>
            <span className="text-xs text-textPrimary mt-1">Settings</span>
          </div>

          {/* Logout Button */}
          <div className="flex flex-col items-center">
            <button onClick={handleLogout}>
              <FaSignOutAlt className="h-6 w-6 text-primary" />
            </button>
            <span className="text-xs text-textPrimary mt-1">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterNavbar;
