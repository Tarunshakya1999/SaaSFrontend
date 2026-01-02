import React, { useState } from "react";
import {
  LogIn,
  User,
  Lock,
  Shield,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import logo90 from "./assets/logo90.jpeg";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.errors?.non_field_errors?.[0] || "Invalid credentials"
        );
      }

      const { access, refresh, user } = data.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setErrorMsg(err.message || "Invalid credentials ❌");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-red-600 flex items-center justify-center p-4">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .slide-down {
          animation: slideDown 0.4s ease-out;
        }

        .shake {
          animation: shake 0.5s ease-in-out;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .gradient-bg {
          background: linear-gradient(135deg, #f97316, #ec4899, #ef4444);
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }

        .input-field {
          transition: all 0.3s ease;
        }

        .input-field:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(249, 115, 22, 0.2);
        }

        .submit-btn {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .submit-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(249, 115, 22, 0.4);
        }

        .submit-btn:active {
          transform: translateY(-1px);
        }

        .icon-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .link-hover {
          transition: all 0.3s ease;
        }

        .link-hover:hover {
          color: #f97316;
          transform: translateX(5px);
        }
      `}</style>

      <div className="w-full max-w-md fade-in">
        {/* Logo/Icon Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src={logo90}
              alt="logo"
              className="w-28 h-28 object-contain rounded-full shadow-lg"
            />
          </div>

          <h1 className="text-4xl font-bold text-white mt-4 mb-2">
            Welcome Back!
          </h1>
          <p className="text-orange-100">Sign in to continue your journey</p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl">
          {/* Error Message */}
          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg slide-down shake">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-red-500" size={24} />
                <p className="text-red-700 font-medium">{errorMsg}</p>
              </div>
            </div>
          )}

          <div className="space-y-5">
            {/* Username Field */}
            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500"
                  size={20}
                />
                <input
                  name="username"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 input-field"
                  placeholder="Enter your username"
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  value={formData.username}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500"
                  size={20}
                />
                <input
                  type="password"
                  name="password"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 input-field"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  value={formData.password}
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Role
              </label>
              <div className="relative">
                <Shield
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 z-10"
                  size={20}
                />
                <select
                  name="role"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 input-field appearance-none bg-white"
                  onChange={handleChange}
                  value={formData.role}
                >
                  <option value="">Select your role</option>
                  <option value="super_admin">Super Admin</option>
                  <option value="agency_admin">Agency Admin</option>
                  <option value="owner">Owner</option>
                  <option value="team">Team Member</option>
                  <option value="client">Client</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 mt-2 ml-1">
                * Select the same role you used during signup
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={
                isLoading ||
                !formData.username ||
                !formData.password ||
                !formData.role
              }
              className="w-full gradient-bg text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 submit-btn disabled:opacity-70 disabled:cursor-not-allowed relative"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-bold text-orange-500 link-hover inline-flex items-center gap-1"
              >
                Sign Up Now
                <ArrowRight size={16} />
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-orange-100 text-sm mt-6">
          Secure login with end-to-end encryption 🔒
        </p>
      </div>
    </div>
  );
}
