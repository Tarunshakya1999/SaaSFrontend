import React, { useState } from "react";

export default function ISORegistrationForm() {
  const [officeImages, setOfficeImages] = useState([]);
  const [mobile, setMobile] = useState("");
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  const handleOfficeImages = (e) => {
    const files = Array.from(e.target.files);
    if (officeImages.length + files.length > 5) {
      alert("Maximum 5 office images allowed");
      return;
    }
    setOfficeImages([...officeImages, ...files]);
  };

  const removeImage = (index) => {
    setOfficeImages(officeImages.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!disclaimerAccepted) {
      alert("Please accept disclaimer");
      return;
    }
  
    const formData = new FormData(e.target);
  
    // 🔥🔥🔥 IMPORTANT LINE
    formData.set("disclaimer_accepted", disclaimerAccepted ? "true" : "false");
  
    // office images
    officeImages.forEach((img) => {
      formData.append("office_images", img);
    });
  
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/iso-registration/",
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        const err = await response.json();
        console.error(err);
        alert("Form submit failed ❌");
        return;
      }
  
      alert("ISO Registration Submitted Successfully ✅");
      e.target.reset();
      setOfficeImages([]);
      setMobile("");
      setDisclaimerAccepted(false);
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950 flex justify-center items-center p-6 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="grid-bg"></div>
      </div>

      {/* Particles */}
      <div className="particles">
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
        <div className="particle p4"></div>
        <div className="particle p5"></div>
      </div>

      <div className="container-wrapper relative z-10">
        {/* Header Card */}
        <div className="header-card">
          <div className="icon-wrapper">
            <svg
              className="w-16 h-16 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="main-title">ISO Certification</h1>
          <p className="subtitle">Quality Management System Registration</p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          {/* Form Container */}
          <div className="form-container">
            {/* Business Information */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-number">01</div>
                <h3 className="section-title">Business Information</h3>
              </div>

              <div className="input-row">
                <div className="input-wrapper">
                  <label className="modern-label">Business Name</label>
                  <input
                    name="business_name"
                    required
                    placeholder="Enter business name"
                    className="modern-input"
                  />
                </div>

                <div className="input-wrapper">
                  <label className="modern-label">Owner Name</label>
                  <input
                    name="owner_name"
                    required
                    placeholder="Enter owner name"
                    className="modern-input"
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-wrapper">
                  <label className="modern-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="business@example.com"
                    className="modern-input"
                  />
                </div>

                <div className="input-wrapper">
                  <label className="modern-label">Mobile Number</label>
                  <input
                    type="number"
                    name="mobile"
                    required
                    value={mobile}
                    onChange={(e) =>
                      e.target.value.length <= 10 && setMobile(e.target.value)
                    }
                    placeholder="10 digit number"
                    className="modern-input"
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <label className="modern-label">Business Address</label>
                <textarea
                  name="business_address"
                  required
                  placeholder="Enter complete business address"
                  rows={3}
                  className="modern-input"
                />
              </div>
            </div>

            {/* Documents Section */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-number">02</div>
                <h3 className="section-title">Identity Documents</h3>
              </div>

              <div className="doc-grid">
                <div className="doc-card">
                  <div className="doc-icon">📄</div>
                  <label className="doc-label">PAN Card Front</label>
                  <input
                    type="file"
                    name="pan_front"
                    required
                    className="file-upload"
                  />
                </div>

                <div className="doc-card">
                  <div className="doc-icon">📄</div>
                  <label className="doc-label">PAN Card Back</label>
                  <input
                    type="file"
                    name="pan_back"
                    required
                    className="file-upload"
                  />
                </div>

                <div className="doc-card">
                  <div className="doc-icon">🆔</div>
                  <label className="doc-label">Aadhaar Front</label>
                  <input
                    type="file"
                    name="aadhaar_front"
                    required
                    className="file-upload"
                  />
                </div>

                <div className="doc-card">
                  <div className="doc-icon">🆔</div>
                  <label className="doc-label">Aadhaar Back</label>
                  <input
                    type="file"
                    name="aadhaar_back"
                    required
                    className="file-upload"
                  />
                </div>
              </div>
            </div>

            {/* Office Photos Section */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-number">03</div>
                <h3 className="section-title">Office Photographs</h3>
              </div>

              <div className="upload-zone">
                <input
                  type="file"
                  name="office_images_input"
                  id="office-upload"
                  multiple
                  accept="image/*"
                  onChange={handleOfficeImages}
                  className="hidden-input"
                />
                <label htmlFor="office-upload" className="upload-label">
                  <svg
                    className="w-12 h-12 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="upload-text">Click to upload office photos</p>
                  <p className="upload-subtext">
                    Maximum 5 images • PNG, JPG up to 10MB
                  </p>
                </label>
              </div>

              {/* Image Preview Grid */}
              {officeImages.length > 0 && (
                <div className="preview-grid">
                  {officeImages.map((img, i) => (
                    <div key={i} className="preview-card">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Office ${i + 1}`}
                        className="preview-image"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="remove-btn"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <div className="image-badge">Image {i + 1}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Disclaimer Checkbox */}
            <div
              className="
    flex items-start gap-4 p-6 mt-10
    rounded-2xl
    bg-white/10 backdrop-blur-xl
    border border-white/20
    shadow-lg
  "
            >
              {/* Custom Checkbox */}
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="disclaimer_accepted"
                  checked={disclaimerAccepted}
                  onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                  className="sr-only peer"
                />

                <div
                  className="
        w-5 h-5 rounded-md
        border-2 border-emerald-400
        peer-checked:bg-emerald-500
        peer-checked:border-emerald-500
        flex items-center justify-center
        transition
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

              {/* Text */}
              <p className="text-sm text-emerald-100 leading-relaxed">
                <span className="font-semibold text-white">Disclaimer:</span> We
                act only as a service facilitator. ISO Certification services
                are provided by independent authorized certification bodies. We
                are not responsible for approval or rejection decisions.
              </p>
            </div>

            <div className="relative mt-8">
              <button
                type="submit"
                disabled={!disclaimerAccepted}
                className={`submit-button ${
                  !disclaimerAccepted ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <span className="button-text">Submit ISO Registration</span>
                <svg
                  className="button-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>

              {!disclaimerAccepted && (
                <span className="absolute -top-6 right-3 text-xs text-white/70">
                  🔒 Accept disclaimer to continue
                </span>
              )}
            </div>
          </div>
        </form>
      </div>

      <style>{`
        /* Grid Background Animation */
        .grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        /* Particles */
        .particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(16, 185, 129, 0.6);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.8);
        }
        
        .p1 { top: 20%; left: 10%; animation: float1 15s infinite; }
        .p2 { top: 60%; left: 80%; animation: float2 18s infinite; }
        .p3 { top: 40%; right: 20%; animation: float1 20s infinite; }
        .p4 { bottom: 30%; left: 60%; animation: float2 16s infinite; }
        .p5 { top: 80%; right: 40%; animation: float1 22s infinite; }
        
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(100px, -100px) scale(1.5); opacity: 0.8; }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(-100px, 100px) scale(1.5); opacity: 0.8; }
        }

        /* Container */
        .container-wrapper {
          max-width: 1100px;
          width: 100%;
          animation: slideUp 0.8s ease-out;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Header Card */
        .header-card {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 78, 59, 0.15));
          backdrop-filter: blur(20px);
          border: 2px solid rgba(16, 185, 129, 0.3);
          border-radius: 24px;
          padding: 40px;
          text-align: center;
          margin-bottom: 30px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }
        
        .icon-wrapper {
          display: inline-block;
          padding: 20px;
          background: rgba(16, 185, 129, 0.2);
          border-radius: 20px;
          margin-bottom: 20px;
          animation: pulse 3s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          50% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
        }
        
        .main-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #10b981, #34d399, #6ee7b7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
          letter-spacing: -1px;
        }
        
        .subtitle {
          color: #a7f3d0;
          font-size: 1.1rem;
          font-weight: 500;
        }

        /* Form Container */
        .form-container {
          background: rgba(6, 78, 59, 0.3);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        /* Form Section */
        .form-section {
          margin-bottom: 40px;
          animation: fadeIn 0.6s ease-out;
          animation-fill-mode: both;
        }
        
        .form-section:nth-child(1) { animation-delay: 0.1s; }
        .form-section:nth-child(2) { animation-delay: 0.2s; }
        .form-section:nth-child(3) { animation-delay: 0.3s; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* Section Header */
        .section-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid rgba(16, 185, 129, 0.3);
        }
        
        .section-number {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
        }
        
        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #d1fae5;
        }

        /* Input Styles */
        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .input-wrapper {
          margin-bottom: 20px;
        }
        
        .modern-label {
          display: block;
          color: #a7f3d0;
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .modern-input {
          width: 100%;
          padding: 16px 20px;
          background: rgba(16, 185, 129, 0.1);
          border: 2px solid rgba(16, 185, 129, 0.3);
          border-radius: 14px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          outline: none;
        }
        
        .modern-input:focus {
          background: rgba(16, 185, 129, 0.15);
          border-color: #10b981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
          transform: translateY(-2px);
        }
        
        .modern-input::placeholder {
          color: rgba(167, 243, 208, 0.5);
        }

        /* Document Cards */
        .doc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .doc-card {
          background: rgba(16, 185, 129, 0.08);
          border: 2px dashed rgba(16, 185, 129, 0.4);
          border-radius: 16px;
          padding: 25px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .doc-card:hover {
          background: rgba(16, 185, 129, 0.15);
          border-color: #10b981;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        }
        
        .doc-icon {
          font-size: 3rem;
          margin-bottom: 15px;
          filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.5));
        }
        
        .doc-label {
          display: block;
          color: #d1fae5;
          font-weight: 600;
          margin-bottom: 12px;
          font-size: 1.05rem;
        }
        
        .file-upload {
          width: 100%;
          padding: 10px;
          color: #a7f3d0;
          font-size: 0.9rem;
        }

        /* Upload Zone */
        .upload-zone {
          margin-bottom: 30px;
        }
        
        .hidden-input {
          display: none;
        }
        
        .upload-label {
          display: block;
          background: rgba(16, 185, 129, 0.1);
          border: 3px dashed rgba(16, 185, 129, 0.4);
          border-radius: 20px;
          padding: 50px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .upload-label:hover {
          background: rgba(16, 185, 129, 0.15);
          border-color: #10b981;
          transform: scale(1.02);
        }
        
        .upload-label svg {
          color: #10b981;
          margin: 0 auto;
        }
        
        .upload-text {
          color: #d1fae5;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .upload-subtext {
          color: #a7f3d0;
          font-size: 0.95rem;
        }

        /* Preview Grid */
        .preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
          margin-top: 25px;
        }
        
        .preview-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          animation: scaleIn 0.4s ease-out;
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .preview-card:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 40px rgba(16, 185, 129, 0.4);
        }
        
        .preview-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }
        
        .remove-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px;
          height: 32px;
          background: rgba(239, 68, 68, 0.9);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
        }
        
        .remove-btn:hover {
          background: #dc2626;
          transform: scale(1.1);
        }
        
        .image-badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(16, 185, 129, 0.9);
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        /* Submit Button */
        .submit-button {
          width: 100%;
          padding: 20px;
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          border-radius: 16px;
          color: white;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          transition: all 0.4s ease;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
          position: relative;
          overflow: hidden;
        }
        
        .submit-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }
        
        .submit-button:hover::before {
          transform: translateX(100%);
        }
        
        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(16, 185, 129, 0.6);
          background: linear-gradient(135deg, #059669, #047857);
        }
        
        .button-text {
          position: relative;
          z-index: 1;
        }
        
        .button-icon {
          width: 24px;
          height: 24px;
          transition: transform 0.3s ease;
        }
        
        .submit-button:hover .button-icon {
          transform: translateX(5px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .main-title { font-size: 2rem; }
          .input-row { grid-template-columns: 1fr; }
          .doc-grid { grid-template-columns: 1fr; }
          .preview-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
