// import React, { useState } from "react";
// import { UserPlus, User, Mail, Phone, Shield, Lock, CheckCircle, XCircle, Sparkles, ArrowRight } from "lucide-react";

// export default function Signup() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     role: "",
//     password: "",
//   });

//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccessMsg("");
//     setErrorMsg("");
//     setIsLoading(true);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/signup/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         if (data.errors) {
//           let msg = "";
//           for (let key in data.errors) {
//             msg += `${key}: ${data.errors[key][0]} `;
//           }
//           throw new Error(msg);
//         }
//         throw new Error("Something went wrong");
//       }

//       setSuccessMsg(data.message || "Signup Successful! 🎉");

//       // Reset form
//       setFormData({
//         username: "",
//         email: "",
//         phone: "",
//         role: "",
//         password: "",
//       });

//       // Redirect after 2 seconds
//       setTimeout(() => {
//         window.location.href = "/";
//       }, 2000);
//     } catch (err) {
//       setErrorMsg(err.message || "Something went wrong ❌");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !isLoading) {
//       handleSubmit(e);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-600 flex items-center justify-center p-4">
//       <style>{`
//         @keyframes bounceIn {
//           0% {
//             opacity: 0;
//             transform: scale(0.3);
//           }
//           50% {
//             opacity: 1;
//             transform: scale(1.05);
//           }
//           70% {
//             transform: scale(0.9);
//           }
//           100% {
//             transform: scale(1);
//           }
//         }

//         @keyframes slideInFromLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes pulse-glow {
//           0%, 100% {
//             box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
//           }
//           50% {
//             box-shadow: 0 0 40px rgba(6, 182, 212, 0.8);
//           }
//         }

//         @keyframes rotate {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         @keyframes wiggle {
//           0%, 100% { transform: rotate(0deg); }
//           25% { transform: rotate(-5deg); }
//           75% { transform: rotate(5deg); }
//         }

//         .bounce-in {
//           animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
//         }

//         .slide-in-left {
//           animation: slideInFromLeft 0.5s ease-out;
//         }

//         .pulse-glow {
//           animation: pulse-glow 2s ease-in-out infinite;
//         }

//         .wiggle {
//           animation: wiggle 0.5s ease-in-out;
//         }

//         .frosted-glass {
//           background: rgba(255, 255, 255, 0.15);
//           backdrop-filter: blur(30px);
//           border: 2px solid rgba(255, 255, 255, 0.25);
//           box-shadow: 0 25px 70px rgba(0, 0, 0, 0.2);
//         }

//         .input-container {
//           transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
//         }

//         .input-container:focus-within {
//           transform: scale(1.02);
//         }

//         .input-field {
//           transition: all 0.3s ease;
//           border: 2px solid transparent;
//         }

//         .input-field:focus {
//           border-color: #06b6d4;
//           box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.1);
//           background: white;
//         }

//         .submit-btn {
//           transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
//           background: linear-gradient(135deg, #06b6d4, #14b8a6, #10b981);
//           background-size: 200% 200%;
//           animation: gradient-flow 4s ease infinite;
//         }

//         @keyframes gradient-flow {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         .submit-btn:hover {
//           transform: translateY(-5px) scale(1.02);
//           box-shadow: 0 20px 40px rgba(6, 182, 212, 0.4);
//         }

//         .submit-btn:active {
//           transform: translateY(-2px) scale(0.98);
//         }

//         .icon-spin {
//           animation: rotate 2s linear infinite;
//         }

//         .sparkle-icon {
//           animation: float 2s ease-in-out infinite, rotate 6s linear infinite;
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-15px) rotate(180deg); }
//         }

//         .success-alert {
//           animation: slideInFromLeft 0.5s ease-out;
//           background: linear-gradient(135deg, #10b981, #059669);
//         }

//         .error-alert {
//           animation: wiggle 0.5s ease-in-out;
//           background: linear-gradient(135deg, #ef4444, #dc2626);
//         }

//         .role-badge {
//           transition: all 0.3s ease;
//         }

//         .role-badge:hover {
//           transform: translateX(5px);
//         }
//       `}</style>

//       <div className="w-full max-w-lg bounce-in">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <div className="inline-block p-5 bg-white/20 rounded-full shadow-2xl pulse-glow mb-4">
//             <Sparkles className="text-white sparkle-icon" size={56} />
//           </div>
//           <h1 className="text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
//             Create Account
//           </h1>
//           <p className="text-cyan-50 text-lg">Join us today and start your journey!</p>
//         </div>

//         {/* Signup Card */}
//         <div className="frosted-glass rounded-3xl p-8 shadow-2xl">
//           {/* Success Message */}
//           {successMsg && (
//             <div className="success-alert text-white p-4 rounded-2xl mb-6 shadow-lg">
//               <div className="flex items-center gap-3">
//                 <CheckCircle size={28} />
//                 <p className="font-bold text-lg">{successMsg}</p>
//               </div>
//             </div>
//           )}

//           {/* Error Message */}
//           {errorMsg && (
//             <div className="error-alert text-white p-4 rounded-2xl mb-6 shadow-lg">
//               <div className="flex items-center gap-3">
//                 <XCircle size={28} />
//                 <p className="font-semibold">{errorMsg}</p>
//               </div>
//             </div>
//           )}

//           <div className="space-y-4">
//             {/* Username */}
//             <div className="input-container slide-in-left" style={{animationDelay: '0.1s'}}>
//               <label className="block text-white font-bold mb-2 text-sm drop-shadow">
//                 Username
//               </label>
//               <div className="relative">
//                 <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500" size={20} />
//                 <input
//                   name="username"
//                   value={formData.username}
//                   className="w-full pl-12 pr-4 py-3 bg-white/90 rounded-xl input-field focus:outline-none"
//                   placeholder="Choose a unique username"
//                   onChange={handleChange}
//                   onKeyPress={handleKeyPress}
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div className="input-container slide-in-left" style={{animationDelay: '0.2s'}}>
//               <label className="block text-white font-bold mb-2 text-sm drop-shadow">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500" size={20} />
//                 <input
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   className="w-full pl-12 pr-4 py-3 bg-white/90 rounded-xl input-field focus:outline-none"
//                   placeholder="your.email@example.com"
//                   onChange={handleChange}
//                   onKeyPress={handleKeyPress}
//                 />
//               </div>
//             </div>

//             {/* Phone */}
//             <div className="input-container slide-in-left" style={{animationDelay: '0.3s'}}>
//               <label className="block text-white font-bold mb-2 text-sm drop-shadow">
//                 Phone Number
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500" size={20} />
//                 <input
//                   name="phone"
//                   type="tel"
//                   value={formData.phone}
//                   className="w-full pl-12 pr-4 py-3 bg-white/90 rounded-xl input-field focus:outline-none"
//                   placeholder="+91 1234567890"
//                   onChange={handleChange}
//                   onKeyPress={handleKeyPress}
//                 />
//               </div>
//             </div>

//             {/* Role */}
//             <div className="input-container slide-in-left" style={{animationDelay: '0.4s'}}>
//               <label className="block text-white font-bold mb-2 text-sm drop-shadow">
//                 Select Your Role
//               </label>
//               <div className="relative">
//                 <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500 z-10" size={20} />
//                 <select
//                   name="role"
//                   value={formData.role}
//                   className="w-full pl-12 pr-4 py-3 bg-white/90 rounded-xl input-field focus:outline-none appearance-none"
//                   onChange={handleChange}
//                 >
//                   <option value="">Choose your role</option>
//                   <option value="super_admin">🔥 Super Admin</option>
//                   <option value="agency_admin">💼 Agency Admin</option>
//                   <option value="owner">👑 Owner</option>
//                   <option value="team">🤝 Team Member</option>
//                   <option value="client">💎 Client</option>
//                 </select>
//               </div>
//             </div>

//             {/* Password */}
//             <div className="input-container slide-in-left" style={{animationDelay: '0.5s'}}>
//               <label className="block text-white font-bold mb-2 text-sm drop-shadow">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500" size={20} />
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   className="w-full pl-12 pr-4 py-3 bg-white/90 rounded-xl input-field focus:outline-none"
//                   placeholder="Create a strong password"
//                   onChange={handleChange}
//                   onKeyPress={handleKeyPress}
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               onClick={handleSubmit}
//               disabled={isLoading || !formData.username || !formData.email || !formData.phone || !formData.role || !formData.password}
//               className="w-full submit-btn text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 mt-6 disabled:opacity-60 disabled:cursor-not-allowed shadow-2xl"
//             >
//               {isLoading ? (
//                 <>
//                   <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full icon-spin"></div>
//                   Creating Account...
//                 </>
//               ) : (
//                 <>
//                   <UserPlus size={24} />
//                   Sign Up Now
//                   <ArrowRight size={20} />
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Login Link */}
//           <div className="mt-6 text-center">
//             <p className="text-white font-medium">
//               Already have an account?{" "}
//               <a
//                 href="/"
//                 className="font-bold text-cyan-100 hover:text-white transition-all duration-300 underline decoration-2 underline-offset-4 role-badge inline-flex items-center gap-1"
//               >
//                 Login Here
//                 <ArrowRight size={16} />
//               </a>
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-6">
//           <p className="text-cyan-50 text-sm flex items-center justify-center gap-2">
//             <Lock size={16} />
//             Your data is secure and encrypted
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  UserPlus,
  User,
  Mail,
  Phone,
  Shield,
  Lock,
  CheckCircle,
  XCircle,
  Zap,
  ArrowRight,
  Star,
} from "lucide-react";

import logo90 from "./assets/logo90.jpeg";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          let msg = "";
          for (let key in data.errors) {
            msg += `${key}: ${data.errors[key][0]} `;
          }
          throw new Error(msg);
        }
        throw new Error("Something went wrong");
      }

      setSuccessMsg(data.message || "Account created successfully! 🎉");

      setFormData({
        username: "",
        email: "",
        phone: "",
        role: "",
        password: "",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong ❌");
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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @keyframes float-particles {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(147, 51, 234, 0.8), 0 0 60px rgba(59, 130, 246, 0.5);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #9333ea, #3b82f6);
          border-radius: 50%;
          animation: float-particles 6s ease-in-out infinite;
        }

        .card-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .slide-up {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .input-glow {
          transition: all 0.3s ease;
        }

        .input-glow:focus {
          box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.3);
          border-color: #9333ea;
        }

        .btn-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .btn-hover::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.5s, height 0.5s;
        }

        .btn-hover:hover::after {
          width: 400px;
          height: 400px;
        }

        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(147, 51, 234, 0.4);
        }

        .gradient-border {
          position: relative;
          background: linear-gradient(145deg, #1f2937, #111827);
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          padding: 2px;
          background: linear-gradient(145deg, #9333ea, #3b82f6, #06b6d4);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .star-icon {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>

      {/* Animated Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div
          className="text-center mb-8 slide-up"
          style={{ animationDelay: "0s" }}
        >
          <div className="flex justify-center mb-4">
            <img
              src={logo90}
              alt="logo"
              className="w-32 h-32 object-contain rounded-full shadow-[0_0_40px_rgba(139,92,246,0.6)]"
            />
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">Join Us Today</h1>
          <p className="text-gray-400">Create your account in seconds</p>
        </div>

        {/* Main Card */}
        <div
          className="gradient-border rounded-3xl p-8 slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Success Message */}
          {successMsg && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl mb-6 flex items-center gap-3 slide-up">
              <CheckCircle size={24} />
              <p className="font-semibold">{successMsg}</p>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-xl mb-6 flex items-center gap-3 slide-up">
              <XCircle size={24} />
              <p className="font-semibold">{errorMsg}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-gray-300 font-medium mb-2 text-sm">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500">
                  <User size={20} />
                </div>
                <input
                  name="username"
                  value={formData.username}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-xl border-2 border-gray-700 focus:outline-none input-glow"
                  placeholder="johndoe"
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 font-medium mb-2 text-sm">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500">
                  <Mail size={20} />
                </div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-xl border-2 border-gray-700 focus:outline-none input-glow"
                  placeholder="john@example.com"
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-300 font-medium mb-2 text-sm">
                Phone
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500">
                  <Phone size={20} />
                </div>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-xl border-2 border-gray-700 focus:outline-none input-glow"
                  placeholder="+91 1234567890"
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-300 font-medium mb-2 text-sm">
                Role
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 z-10">
                  <Shield size={20} />
                </div>
                <select
                  name="role"
                  value={formData.role}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-xl border-2 border-gray-700 focus:outline-none input-glow appearance-none"
                  onChange={handleChange}
                >
                  <option value="">Select your role</option>
                  <option value="super_admin">Super Admin</option>
                  <option value="agency_admin">Agency Admin</option>
                  <option value="owner">Owner</option>
                  <option value="team">Team Member</option>
                  <option value="client">Client</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 font-medium mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-xl border-2 border-gray-700 focus:outline-none input-glow"
                  placeholder="••••••••"
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={
                isLoading ||
                !formData.username ||
                !formData.email ||
                !formData.phone ||
                !formData.role ||
                !formData.password
              }
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 mt-6 btn-hover disabled:opacity-50 disabled:cursor-not-allowed relative"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Zap size={22} />
                  Create Account
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to ="/"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                Login here →
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Protected by industry-standard encryption
        </p>
      </div>
    </div>
  );
}
