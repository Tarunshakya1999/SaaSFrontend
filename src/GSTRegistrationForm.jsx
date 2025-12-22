import React, { useState } from "react";

export default function GSTRegistrationForm() {
  const [businessType, setBusinessType] = useState("");
  const [form, setForm] = useState({
    applicant_name: "",
    email: "",
    mobile: "",
    disclaimer_accepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Mobile: only digits, max 10
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation for disclaimer
    if (!form.disclaimer_accepted) {
      alert("Please accept the disclaimer to continue");
      return;
    }

    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/gst-registration/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend Error:", errorData);
        alert("Form submit failed ❌");
        return;
      }

      alert("GST Registration Submitted Successfully ✅");

      // ✅ Proper reset
      e.target.reset();
      setBusinessType("");
      setForm({
        applicant_name: "",
        email: "",
        mobile: "",
        disclaimer_accepted: false, // ✅ RESET CHECKBOX
      });
    } catch (error) {
      console.error("Server Error:", error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center items-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>

      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-10 rounded-3xl w-full max-w-4xl shadow-2xl border border-white/20 animate-fadeIn relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl mb-4 animate-pulse-glow">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-2">
            GST Registration Form
          </h1>
          <p className="text-gray-300 text-sm">
            Complete the form below to register for GST
          </p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-icon">👤</span>
              Personal Information
            </h2>

            <div className="input-group">
              <label className="label">Applicant Name</label>
              <input
                type="text"
                name="applicant_name"
                required
                maxLength={100}
                value={form.applicant_name}
                onChange={handleChange}
                placeholder="Name as per PAN"
                className="input"
              />
            </div>

            <div className="input-group">
              <label className="label">Applicant Photo</label>
              <input
                type="file"
                name="applicant_photo"
                required
                className="file-input"
              />
            </div>
          </div>

          {/* Documents Section */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-icon">📄</span>
              Identity Documents
            </h2>

            <div className="input-group">
              <label className="label">PAN Card</label>
              <input
                type="file"
                name="pan_card"
                required
                className="file-input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="input-group">
                <label className="label">Aadhaar Front</label>
                <input
                  type="file"
                  name="aadhaar_front"
                  required
                  className="file-input"
                />
              </div>
              <div className="input-group">
                <label className="label">Aadhaar Back</label>
                <input
                  type="file"
                  name="aadhaar_back"
                  required
                  className="file-input"
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-icon">📞</span>
              Contact Details
            </h2>

            <div className="input-group">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="input"
              />
            </div>

            <div className="input-group">
              <label className="label">Mobile Number</label>
              <input
                type="text"
                name="mobile"
                required
                value={form.mobile}
                onChange={handleChange}
                placeholder="10 digit mobile number"
                className="input"
              />
            </div>
          </div>

          {/* Business Property Section */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="section-icon">🏢</span>
              Business Property Details
            </h2>

            <div className="input-group">
              <label className="label">Business Place Type</label>
              <select
                name="business_type"
                required
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="input"
              >
                <option value="">Select Property Type</option>
                <option value="own">🏠 Own Property</option>
                <option value="rent">🔑 Rented Property</option>
              </select>
            </div>

            {/* OWN Property */}
            {businessType === "own" && (
              <div className="animate-slide space-y-4 mt-4">
                <div className="property-card">
                  <div className="input-group">
                    <label className="label">Electricity Bill</label>
                    <input
                      type="file"
                      name="electricity_bill"
                      required
                      className="file-input"
                    />
                  </div>

                  <div className="input-group">
                    <label className="label-optional">
                      Owner NOC (If Bill Not in Your Name)
                    </label>
                    <input
                      type="file"
                      name="owner_noc"
                      className="file-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* RENT Property */}
            {businessType === "rent" && (
              <div className="animate-slide space-y-4 mt-4">
                <div className="property-card">
                  <div className="input-group">
                    <label className="label">Landlord NOC</label>
                    <input
                      type="file"
                      name="landlord_noc"
                      required
                      className="file-input"
                    />
                  </div>

                  <div className="input-group">
                    <label className="label">Landlord PAN</label>
                    <input
                      type="file"
                      name="landlord_pan"
                      required
                      className="file-input"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="input-group">
                      <label className="label">Landlord Aadhaar Front</label>
                      <input
                        type="file"
                        name="landlord_aadhaar_front"
                        required
                        className="file-input"
                      />
                    </div>
                    <div className="input-group">
                      <label className="label">Landlord Aadhaar Back</label>
                      <input
                        type="file"
                        name="landlord_aadhaar_back"
                        required
                        className="file-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="
  flex items-start gap-4 p-5 rounded-2xl
  bg-white/30 backdrop-blur-xl
  border border-white/40 shadow-lg
"
          >
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="disclaimer_accepted"
                checked={form.disclaimer_accepted}
                onChange={handleChange}
                required
                className="sr-only peer"
              />
              <div
                className="
      w-5 h-5 rounded-md bg-white/40 backdrop-blur-md
      border border-white/60
      peer-checked:bg-blue-600/80 peer-checked:border-blue-500
      flex items-center justify-center transition
    "
              >
                <svg
                  className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </label>

            <p className="text-sm text-light leading-relaxed">
              <span className="font-semibold">Disclaimer:</span> We act only as
              a service facilitator. GST Registration and filings and
              compliances are handled by independent practicing Chartered
              Accountants (CA).
            </p>
          </div>

          <div className="relative">
            <button
              type="submit"
              disabled={!form.disclaimer_accepted}
              className={`
      submit-btn group w-full
      transition-all duration-300 relative
      ${
        !form.disclaimer_accepted
          ? "opacity-50 cursor-not-allowed grayscale"
          : "hover:scale-[1.02]"
      }
    `}
            >
              <span className="flex items-center justify-center gap-2">
                Submit GST Form
                <svg
                  className={`
          w-5 h-5 transition-transform duration-300
          ${form.disclaimer_accepted ? "group-hover:translate-x-1" : ""}
        `}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>

            {/* 🔒 Lock Message */}
            {!form.disclaimer_accepted && (
              <span className="absolute -top-6 right-2 text-xs text-white/70 select-none">
                🔒 Accept disclaimer to continue
              </span>
            )}
          </div>
        </form>

        {/* CSS */}
        <style>{`
          /* Floating Background Orbs */
          .floating-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.3;
            animation: float 20s infinite ease-in-out;
          }
          .orb-1 {
            width: 400px;
            height: 400px;
            background: linear-gradient(45deg, #00ffff, #0080ff);
            top: -200px;
            left: -200px;
            animation-delay: 0s;
          }
          .orb-2 {
            width: 500px;
            height: 500px;
            background: linear-gradient(45deg, #ff00ff, #8000ff);
            bottom: -250px;
            right: -250px;
            animation-delay: 5s;
          }
          .orb-3 {
            width: 350px;
            height: 350px;
            background: linear-gradient(45deg, #00ff88, #0088ff);
            top: 50%;
            left: 50%;
            animation-delay: 10s;
          }
          
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(50px, -50px) scale(1.1); }
            50% { transform: translate(-30px, 30px) scale(0.9); }
            75% { transform: translate(30px, 50px) scale(1.05); }
          }

          /* Section Cards */
          .section-card {
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 20px;
            padding: 24px;
            margin-bottom: 24px;
            transition: all 0.3s ease;
          }
          .section-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.3);
            border-color: rgba(99, 179, 237, 0.4);
          }

          .section-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: white;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .section-icon {
            font-size: 1.8rem;
            filter: drop-shadow(0 0 8px rgba(99, 179, 237, 0.6));
          }

          /* Property Card */
          .property-card {
            background: rgba(99, 179, 237, 0.1);
            border: 1px solid rgba(99, 179, 237, 0.3);
            border-radius: 16px;
            padding: 20px;
          }

          /* Input Groups */
          .input-group {
            margin-bottom: 20px;
          }
          
          .label {
            color: #e0e7ff;
            font-weight: 600;
            font-size: 0.95rem;
            display: block;
            margin-bottom: 8px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          .label::after {
            content: " *";
            color: #ff6b9d;
            font-weight: bold;
          }
          .label-optional {
            color: #e0e7ff;
            font-weight: 600;
            font-size: 0.95rem;
            display: block;
            margin-bottom: 8px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          
          .input {
            width: 100%;
            padding: 14px 18px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            color: white;
            font-size: 1rem;
            transition: all 0.3s ease;
            outline: none;
          }
          .input:focus {
            background: rgba(255, 255, 255, 0.15);
            border-color: #63b3ed;
            box-shadow: 0 0 0 4px rgba(99, 179, 237, 0.2);
            transform: translateY(-2px);
          }
          .input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }

          .file-input {
            width: 100%;
            padding: 12px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.08);
            border: 2px dashed rgba(99, 179, 237, 0.4);
            color: white;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .file-input:hover {
            background: rgba(99, 179, 237, 0.15);
            border-color: #63b3ed;
            transform: translateY(-2px);
          }
          
          .submit-btn {
            width: 100%;
            margin-top: 32px;
            padding: 18px;
            border-radius: 16px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            color: white;
            font-weight: bold;
            font-size: 1.1rem;
            border: none;
            cursor: pointer;
            transition: all 0.4s ease;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            position: relative;
            overflow: hidden;
          }
          .submit-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
          }
          .submit-btn:hover::before {
            left: 100%;
          }
          .submit-btn:hover {
            transform: translateY(-4px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
            background: linear-gradient(135deg, #764ba2 0%, #667eea 50%, #f093fb 100%);
          }
          .submit-btn:active {
            transform: translateY(-2px);
          }
          
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(99, 179, 237, 0.5); }
            50% { box-shadow: 0 0 40px rgba(99, 179, 237, 0.8), 0 0 60px rgba(99, 179, 237, 0.4); }
          }
          .animate-pulse-glow {
            animation: pulse-glow 2s infinite;
          }
          
          .animate-fadeIn {
            animation: fadeIn 1s ease-in-out;
          }
          
          .animate-slide {
            animation: slideUp 0.5s ease-out;
          }
          
          @keyframes fadeIn {
            from { 
              opacity: 0; 
              transform: scale(0.95) translateY(20px);
            }
            to { 
              opacity: 1; 
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes slideUp {
            from { 
              opacity: 0; 
              transform: translateY(30px);
              max-height: 0;
            }
            to { 
              opacity: 1; 
              transform: translateY(0);
              max-height: 1000px;
            }
          }

          /* Responsive */
          @media (max-width: 768px) {
            .section-title {
              font-size: 1.25rem;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
