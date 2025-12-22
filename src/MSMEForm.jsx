import React, { useState } from "react";

// Success Component
function SuccessPage({ onReset }) {
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-checkmark">
          <svg className="checkmark" viewBox="0 0 52 52">
            <circle
              className="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <h2 className="success-title">Registration Successful! 🎉</h2>
        <p className="success-message">
          Your MSME registration has been submitted successfully. We will
          process your application and get back to you soon.
        </p>
        <button onClick={onReset} className="success-btn">
          Submit Another Form
        </button>
      </div>
    </div>
  );
}

// Error Component
function ErrorPage({ message, onReset }) {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon">
          <svg viewBox="0 0 52 52" className="error-svg">
            <circle
              className="error-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="error-cross"
              fill="none"
              d="M16 16 36 36 M36 16 16 36"
            />
          </svg>
        </div>
        <h2 className="error-title">Submission Failed</h2>
        <p className="error-message">{message}</p>
        <button onClick={onReset} className="error-btn">
          Try Again
        </button>
      </div>
    </div>
  );
}

export default function MsmeForm() {
  const [form, setForm] = useState({
    full_name: "",
    mobile_number: "",
    email: "",
    aadhaar_number: "",
    applicant_type: "Proprietor",
    business_name: "",
    business_address: "",
    state: "",
    district: "",
    pincode: "",
    business_type: "Manufacturer",
    date_of_starting: "",
    pan_number: "",
    bank_account_number: "",
    ifsc_code: "",
    number_of_employees: "",
    investment_in_plant_machinery: "",
    annual_turnover: "",
    disclaimer_accepted: false,
  });

  const [files, setFiles] = useState({
    aadhaar_front: null,
    aadhaar_back: null,
    business_proof: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorPage, setErrorPage] = useState(null);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "mobile_number" && value.length > 10) return;
    if (name === "aadhaar_number" && value.length > 12) return;
    if (name === "pan_number" && value.length > 10) return;

    setForm((s) => ({
      ...s,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFile = (e) => {
    const { name, files: f } = e.target;
    setFiles((s) => ({ ...s, [name]: f[0] || null }));
  };

  const validate = () => {
    const err = {};
    if (!form.full_name.trim()) err.full_name = "Full name required";
    if (!/^[6-9]\d{9}$/.test(form.mobile_number))
      err.mobile_number = "Invalid mobile (10 digits)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Invalid email";
    if (!/^\d{12}$/.test(form.aadhaar_number))
      err.aadhaar_number = "Aadhaar must be 12 digits";
    if (!form.business_name.trim())
      err.business_name = "Business name required";
    if (!form.state) err.state = "State required";
    if (!form.district) err.district = "District required";
    if (!/^\d{6}$/.test(form.pincode)) err.pincode = "Pincode must be 6 digits";
    if (!form.date_of_starting) err.date_of_starting = "Date required";
    if (!/^\d{9,18}$/.test(form.bank_account_number))
      err.bank_account_number = "Invalid account number";
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc_code))
      err.ifsc_code = "Invalid IFSC format";
    if (form.pan_number && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan_number))
      err.pan_number = "Invalid PAN (10 characters)";
    if (!files.aadhaar_front) err.aadhaar_front = "Upload Aadhaar front";
    if (!files.aadhaar_back) err.aadhaar_back = "Upload Aadhaar back";
    if (!files.business_proof) err.business_proof = "Upload business proof";
    return err;
  };

  const handleSubmit = async () => {
    if (!form.disclaimer_accepted) {
      alert("Please accept the disclaimer to continue");
      return;
    }

    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    const fd = new FormData();
    for (const key in form) fd.append(key, form[key]);
    fd.append("aadhaar_front", files.aadhaar_front);
    fd.append("aadhaar_back", files.aadhaar_back);
    fd.append("business_proof", files.business_proof);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/msme-register/", {
        method: "POST",
        body: fd,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Server error");
      }

      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      setErrorPage(err.message || "Server error — please try again");
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrorPage(null);
    setForm({
      full_name: "",
      mobile_number: "",
      email: "",
      aadhaar_number: "",
      applicant_type: "Proprietor",
      business_name: "",
      business_address: "",
      state: "",
      district: "",
      pincode: "",
      business_type: "Manufacturer",
      date_of_starting: "",
      pan_number: "",
      bank_account_number: "",
      ifsc_code: "",
      number_of_employees: "",
      investment_in_plant_machinery: "",
      annual_turnover: "",
    });
    setFiles({ aadhaar_front: null, aadhaar_back: null, business_proof: null });
    setErrors({});
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 20px;
        }

        .form-container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: slideIn 0.6s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-title {
          text-align: center;
          color: #667eea;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 30px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .form-input, .form-select, .form-textarea {
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.3s ease;
          outline: none;
          font-family: inherit;
          color: #000;             
          background-color: #fff;  
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .error-text {
          color: #e74c3c;
          font-size: 12px;
          margin-top: 5px;
          animation: shake 0.3s;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 20px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loader {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 10px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Success Page Styles */
        .success-container, .error-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .success-card, .error-card {
          background: white;
          border-radius: 20px;
          padding: 60px 40px;
          text-align: center;
          max-width: 500px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .success-checkmark {
          margin: 0 auto 30px;
        }

        .checkmark {
          width: 100px;
          height: 100px;
          stroke-width: 3;
        }

        .checkmark-circle {
          stroke: #4caf50;
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .checkmark-check {
          stroke: #4caf50;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
        }

        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }

        .success-title {
          color: #333;
          font-size: 28px;
          margin-bottom: 15px;
        }

        .success-message {
          color: #666;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .success-btn, .error-btn {
          padding: 14px 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .success-btn:hover, .error-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        /* Error Page Styles */
        .error-icon {
          margin: 0 auto 30px;
        }

        .error-svg {
          width: 100px;
          height: 100px;
          stroke-width: 3;
        }

        .error-circle {
          stroke: #e74c3c;
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .error-cross {
          stroke: #e74c3c;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
        }

        .error-title {
          color: #333;
          font-size: 28px;
          margin-bottom: 15px;
        }

        .error-message {
          color: #666;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        @media (max-width: 768px) {
          .form-container {
            padding: 25px;
          }
          .form-title {
            font-size: 24px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {submitted && <SuccessPage onReset={resetForm} />}
      {errorPage && <ErrorPage message={errorPage} onReset={resetForm} />}

      {!submitted && !errorPage && (
        <div className="form-container">
          <h1 className="form-title">MSME Registration (Udyam)</h1>

          <div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                />
                {errors.full_name && (
                  <span className="error-text">{errors.full_name}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input
                  name="mobile_number"
                  value={form.mobile_number}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="10 digits"
                  maxLength={10}
                />
                {errors.mobile_number && (
                  <span className="error-text">{errors.mobile_number}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email ID *</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Aadhaar Number *</label>
                <input
                  name="aadhaar_number"
                  value={form.aadhaar_number}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="12 digits"
                  maxLength={12}
                />
                {errors.aadhaar_number && (
                  <span className="error-text">{errors.aadhaar_number}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Applicant Type *</label>
                <select
                  name="applicant_type"
                  value={form.applicant_type}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option>Proprietor</option>
                  <option>Partnership</option>
                  <option>Pvt Ltd</option>
                  <option>LLP</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Business Name *</label>
                <input
                  name="business_name"
                  value={form.business_name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your business name"
                />
                {errors.business_name && (
                  <span className="error-text">{errors.business_name}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Business Address *</label>
              <textarea
                name="business_address"
                value={form.business_address}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Complete business address"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">State *</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="State"
                />
                {errors.state && (
                  <span className="error-text">{errors.state}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">District *</label>
                <input
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="District"
                />
                {errors.district && (
                  <span className="error-text">{errors.district}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Pincode *</label>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="6 digits"
                  maxLength={6}
                />
                {errors.pincode && (
                  <span className="error-text">{errors.pincode}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Business Type *</label>
                <select
                  name="business_type"
                  value={form.business_type}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option>Manufacturer</option>
                  <option>Service</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Date of Starting Business *
                </label>
                <input
                  type="date"
                  name="date_of_starting"
                  value={form.date_of_starting}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.date_of_starting && (
                  <span className="error-text">{errors.date_of_starting}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">PAN Number (Optional)</label>
                <input
                  name="pan_number"
                  value={form.pan_number}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="10 characters"
                  maxLength={10}
                  style={{ textTransform: "uppercase" }}
                />
                {errors.pan_number && (
                  <span className="error-text">{errors.pan_number}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Bank Account Number *</label>
                <input
                  name="bank_account_number"
                  value={form.bank_account_number}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Bank account number"
                />
                {errors.bank_account_number && (
                  <span className="error-text">
                    {errors.bank_account_number}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">IFSC Code *</label>
                <input
                  name="ifsc_code"
                  value={form.ifsc_code}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="IFSC Code"
                  style={{ textTransform: "uppercase" }}
                />
                {errors.ifsc_code && (
                  <span className="error-text">{errors.ifsc_code}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Number of Employees</label>
                <input
                  name="number_of_employees"
                  value={form.number_of_employees}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Total employees"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  Investment in Plant & Machinery
                </label>
                <input
                  name="investment_in_plant_machinery"
                  value={form.investment_in_plant_machinery}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="In rupees"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Annual Turnover</label>
                <input
                  name="annual_turnover"
                  value={form.annual_turnover}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="In rupees"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Upload Aadhaar Front *</label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  name="aadhaar_front"
                  onChange={handleFile}
                  className="form-input"
                />
                {errors.aadhaar_front && (
                  <span className="error-text">{errors.aadhaar_front}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Upload Aadhaar Back *</label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  name="aadhaar_back"
                  onChange={handleFile}
                  className="form-input"
                />
                {errors.aadhaar_back && (
                  <span className="error-text">{errors.aadhaar_back}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Upload Business Proof *</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                name="business_proof"
                onChange={handleFile}
                className="form-input"
              />
              {errors.business_proof && (
                <span className="error-text">{errors.business_proof}</span>
              )}
            </div>
            <div
              className="
    flex items-start gap-4 p-5 rounded-xl mt-6
    bg-gray-50
    border border-gray-200
  "
            >
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="disclaimer_accepted"
                  checked={form.disclaimer_accepted}
                  onChange={handleChange}
                  className="sr-only peer"
                />

                <div
                  className="
        w-5 h-5 rounded-md
        border border-gray-400
        peer-checked:bg-indigo-600
        peer-checked:border-indigo-600
        flex items-center justify-center
        transition
      "
                >
                  <svg
                    className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
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

              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold">Disclaimer:</span> We act only
                as a service facilitator. MSME / Udyam registration is processed
                through government portals and professionals. We do not issue
                certificates directly.
              </p>
            </div>

            <div className="relative">
              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={loading || !form.disclaimer_accepted}
              >
                {loading && <span className="loader"></span>}
                {loading ? "Submitting..." : "Submit Application"}
              </button>

              {!form.disclaimer_accepted && (
                <span className="absolute -top-5 right-2 text-xs text-gray-500">
                  🔒 Accept disclaimer to continue
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
