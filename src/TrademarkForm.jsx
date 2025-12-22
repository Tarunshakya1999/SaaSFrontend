import React, { useState } from "react";

export default function TrademarkForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    applicant_name: "",
    mobile: "",
    email: "",
    business_type: "",
    brand_name: "",
    classes: [],
    business_activity: "",
    address: "",
    state: "",
    pincode: "",
    brand_logo: null,
    aadhaar: null,
    pan: null,
    business_proof: null,
    disclaimer_accepted: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // ✅ Checkbox handling
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
      setErrors({ ...errors, [name]: "" });
      return;
    }

    let newValue = value;

    // ✅ Mobile number (digits only, max 10)
    if (name === "mobile") {
      newValue = value.replace(/\D/g, "");
      if (newValue.length > 10) return;
    }

    // ✅ Pincode (digits only, max 6)
    if (name === "pincode") {
      newValue = value.replace(/\D/g, "");
      if (newValue.length > 6) return;
    }

    setFormData({ ...formData, [name]: newValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFile = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleClassChange = (e) => {
    const value = e.target.value;
    const updated = formData.classes.includes(value)
      ? formData.classes.filter((v) => v !== value)
      : [...formData.classes, value];

    setFormData({ ...formData, classes: updated });
    setErrors({ ...errors, classes: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.disclaimer_accepted) {
      newErrors.disclaimer_accepted = "Please accept the disclaimer.";
    }

    if (!formData.applicant_name.trim())
      newErrors.applicant_name = "Applicant name is required.";

    if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter valid 10-digit mobile number.";

    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email address.";

    if (!formData.business_type)
      newErrors.business_type = "Select your business type.";

    if (!formData.brand_name.trim())
      newErrors.brand_name = "Brand name is required.";

    if (!formData.brand_logo) newErrors.brand_logo = "Brand logo is required.";

    if (formData.classes.length === 0)
      newErrors.classes = "Select at least 1 trademark class.";

    if (!formData.business_activity.trim())
      newErrors.business_activity = "Business activity is required.";

    if (!formData.address.trim()) newErrors.address = "Address is required.";

    if (!formData.state.trim()) newErrors.state = "State is required.";

    if (!/^[0-9]{6}$/.test(formData.pincode))
      newErrors.pincode = "Enter valid 6-digit pincode.";

    if (!formData.aadhaar) newErrors.aadhaar = "Aadhaar upload is required.";

    if (!formData.pan) newErrors.pan = "PAN upload is required.";

    if (!formData.business_proof)
      newErrors.business_proof = "Business proof is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    setError(null);

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "classes") {
        value.forEach((cls) => fd.append("classes", cls));
      } else {
        fd.append(key, value);
      }
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/trademark", {
        method: "POST",
        body: fd,
      });

      if (!response.ok) throw new Error("Failed");

      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      setError("Something went wrong!");
    }
  };

  if (submitted) {
    return (
      <div style={styles.container}>
        <style>{cssStyles}</style>
        <div style={styles.successCard} className="success-animation">
          <div className="checkmark-circle">
            <div className="checkmark">✓</div>
          </div>
          <h2 style={styles.successTitle}>Trademark Application Submitted!</h2>
          <p style={styles.successText}>Our team will contact you soon.</p>
          <a href="/" style={styles.homeButton} className="btn-hover">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <style>{cssStyles}</style>
        <div style={styles.errorCard} className="error-animation">
          <div className="error-icon">✕</div>
          <h2 style={styles.errorTitle}>Submission Failed</h2>
          <p style={styles.errorText}>{error}</p>
          <button
            style={styles.retryButton}
            className="btn-hover"
            onClick={() => setError(null)}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{cssStyles}</style>
      <div style={styles.formCard} className="card-animation">
        <div style={styles.header}>
          <h2 style={styles.title}>Trademark Registration</h2>
          <p style={styles.subtitle}>Fill in all the required details</p>
        </div>

        <div className="form-content">
          {/* ROW 1 */}
          <div style={styles.row}>
            <div style={styles.halfWidth}>
              <label style={styles.label}>
                Applicant Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="applicant_name"
                value={formData.applicant_name}
                style={{
                  ...styles.input,
                  ...(errors.applicant_name ? styles.inputError : {}),
                }}
                onChange={handleChange}
                className="input-focus"
              />
              {errors.applicant_name && (
                <div style={styles.errorMsg}>{errors.applicant_name}</div>
              )}
            </div>

            <div style={styles.halfWidth}>
              <label style={styles.label}>
                Mobile Number <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                maxLength="10"
                style={{
                  ...styles.input,
                  ...(errors.mobile ? styles.inputError : {}),
                }}
                onChange={handleChange}
                className="input-focus"
              />
              {errors.mobile && (
                <div style={styles.errorMsg}>{errors.mobile}</div>
              )}
            </div>
          </div>

          {/* ROW 2 */}
          <div style={styles.row}>
            <div style={styles.halfWidth}>
              <label style={styles.label}>
                Email ID <span style={styles.required}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                style={{
                  ...styles.input,
                  ...(errors.email ? styles.inputError : {}),
                }}
                onChange={handleChange}
                className="input-focus"
              />
              {errors.email && (
                <div style={styles.errorMsg}>{errors.email}</div>
              )}
            </div>

            <div style={styles.halfWidth}>
              <label style={styles.label}>
                Business Type <span style={styles.required}>*</span>
              </label>
              <select
                name="business_type"
                value={formData.business_type}
                style={{
                  ...styles.input,
                  ...(errors.business_type ? styles.inputError : {}),
                }}
                onChange={handleChange}
                className="input-focus"
              >
                <option value="">Select</option>
                <option>Owner</option>
                <option>Firm</option>
                <option>Pvt Ltd</option>
                <option>LLP</option>
              </select>
              {errors.business_type && (
                <div style={styles.errorMsg}>{errors.business_type}</div>
              )}
            </div>
          </div>

          {/* ROW 3 */}
          <div style={styles.row}>
            <div style={styles.halfWidth}>
              <label style={styles.label}>
                Brand / Trademark Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="brand_name"
                value={formData.brand_name}
                style={{
                  ...styles.input,
                  ...(errors.brand_name ? styles.inputError : {}),
                }}
                onChange={handleChange}
                className="input-focus"
              />
              {errors.brand_name && (
                <div style={styles.errorMsg}>{errors.brand_name}</div>
              )}
            </div>

            <div style={styles.halfWidth}>
              <label style={styles.label}>
                Brand Logo Upload <span style={styles.required}>*</span>
              </label>
              <input
                type="file"
                name="brand_logo"
                accept="image/*"
                style={{
                  ...styles.fileInput,
                  ...(errors.brand_logo ? styles.inputError : {}),
                }}
                onChange={handleFile}
                className="input-focus"
              />
              {errors.brand_logo && (
                <div style={styles.errorMsg}>{errors.brand_logo}</div>
              )}
            </div>
          </div>

          {/* TRADEMARK CLASSES */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Select Trademark Classes <span style={styles.required}>*</span>
            </label>
            <div style={styles.classesBox}>
              <div style={styles.classesGrid}>
                {[
                  "01",
                  "02",
                  "03",
                  "04",
                  "05",
                  "06",
                  "07",
                  "08",
                  "09",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20",
                  "21",
                  "22",
                  "23",
                  "24",
                  "25",
                  "26",
                  "27",
                  "28",
                  "29",
                  "30",
                  "31",
                  "32",
                  "33",
                  "34",
                  "35",
                  "36",
                  "37",
                  "38",
                  "39",
                  "40",
                  "41",
                  "42",
                  "43",
                  "44",
                  "45",
                ].map((cls) => (
                  <label
                    key={cls}
                    style={styles.checkboxLabel}
                    className="checkbox-hover"
                  >
                    <input
                      type="checkbox"
                      name="disclaimer_accepted"
                      value={cls}
                      checked={formData.classes.includes(cls)}
                      onChange={handleClassChange}
                      style={styles.checkbox}
                    />
                    <span style={styles.classNumber}>{cls}</span>
                  </label>
                ))}
              </div>
            </div>
            {errors.classes && (
              <div style={styles.errorMsg}>{errors.classes}</div>
            )}
          </div>

          {/* BUSINESS ACTIVITY */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Business Activity Description{" "}
              <span style={styles.required}>*</span>
            </label>
            <textarea
              name="business_activity"
              value={formData.business_activity}
              style={{
                ...styles.textarea,
                ...(errors.business_activity ? styles.inputError : {}),
              }}
              onChange={handleChange}
              rows="3"
              className="input-focus"
            ></textarea>
            {errors.business_activity && (
              <div style={styles.errorMsg}>{errors.business_activity}</div>
            )}
          </div>

          {/* ADDRESS */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Full Address <span style={styles.required}>*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              style={{
                ...styles.textarea,
                ...(errors.address ? styles.inputError : {}),
              }}
              onChange={handleChange}
              rows="3"
              className="input-focus"
            ></textarea>
            {errors.address && (
              <div style={styles.errorMsg}>{errors.address}</div>
            )}
          </div>

          {/* ROW 4 */}
          <div style={styles.row}>
            <div style={styles.halfWidth}>
              <label style={styles.label}>
                State <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                style={{
                  ...styles.input,
                  ...(errors.state ? styles.inputError : {}),
                }}
                onChange={handleChange}
                className="input-focus"
              />
              {errors.state && (
                <div style={styles.errorMsg}>{errors.state}</div>
              )}
            </div>

            <div style={styles.halfWidth}>
              <label style={styles.label}>
                Pincode <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                maxLength="6"
                style={{
                  ...styles.input,
                  ...(errors.pincode ? styles.inputError : {}),
                }}
                onChange={handleChange}
                className="input-focus"
              />
              {errors.pincode && (
                <div style={styles.errorMsg}>{errors.pincode}</div>
              )}
            </div>
          </div>

          {/* FILE UPLOADS */}
          <div style={styles.row}>
            <div style={styles.thirdWidth}>
              <label style={styles.label}>
                Aadhaar Front <span style={styles.required}>*</span>
              </label>
              <input
                type="file"
                name="aadhaar"
                style={{
                  ...styles.fileInput,
                  ...(errors.aadhaar ? styles.inputError : {}),
                }}
                onChange={handleFile}
                className="input-focus"
              />
              {errors.aadhaar && (
                <div style={styles.errorMsg}>{errors.aadhaar}</div>
              )}
            </div>
            <div style={styles.thirdWidth}>
              <label style={styles.label}>
                Aadhar back <span style={styles.required}>*</span>
              </label>
              <input
                type="file"
                name="business_proof"
                style={{
                  ...styles.fileInput,
                  ...(errors.business_proof ? styles.inputError : {}),
                }}
                onChange={handleFile}
                className="input-focus"
              />
              {errors.business_proof && (
                <div style={styles.errorMsg}>{errors.business_proof}</div>
              )}
            </div>

            <div style={styles.thirdWidth}>
              <label style={styles.label}>
                PAN Upload <span style={styles.required}>*</span>
              </label>
              <input
                type="file"
                name="pan"
                style={{
                  ...styles.fileInput,
                  ...(errors.pan ? styles.inputError : {}),
                }}
                onChange={handleFile}
                className="input-focus"
              />
              {errors.pan && <div style={styles.errorMsg}>{errors.pan}</div>}
            </div>
          </div>
          <div
            style={{
              marginTop: "30px",
              padding: "16px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex",
              gap: "14px",
              alignItems: "flex-start",
            }}
          >
            <label
              style={{
                display: "flex",
                gap: "14px",
                cursor: "pointer",
                alignItems: "flex-start",
              }}
            >
              <input
                type="checkbox"
                name="disclaimer_accepted" // ✅ REQUIRED
                checked={formData.disclaimer_accepted}
                onChange={handleChange} // ✅ SAME HANDLER
                style={{ display: "none" }}
              />

              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "6px",
                  border: "2px solid #667eea",
                  background: formData.disclaimer_accepted
                    ? "linear-gradient(135deg,#667eea,#764ba2)"
                    : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                {formData.disclaimer_accepted && "✓"}
              </div>

              <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.6" }}>
                <strong>Disclaimer:</strong> We act only as a service
                facilitator. Trademark filing and prosecution are handled by
                independent practicing Trademark Attorneys / Advocates.
              </p>
            </label>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              ...styles.submitButton,
              opacity: formData.disclaimer_accepted ? 1 : 0.6,
              cursor: formData.disclaimer_accepted ? "pointer" : "not-allowed",
            }}
            disabled={loading || !formData.disclaimer_accepted}
            className="btn-hover"
          >
            {!formData.disclaimer_accepted && "🔒 "}
            {loading ? "Submitting..." : "Submit Trademark Application"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  formCard: {
    background: "white",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "900px",
    width: "100%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#666",
    fontSize: "16px",
  },
  row: {
    display: "flex",
    gap: "20px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },
  halfWidth: {
    flex: "1",
    minWidth: "250px",
  },
  thirdWidth: {
    flex: "1",
    minWidth: "200px",
  },
  inputGroup: {
    marginBottom: "25px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#333",
    fontSize: "15px",
  },
  required: {
    color: "#e74c3c",
  },input: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    fontSize: "15px",
    color: "#333",          // 🔥 ADD THIS
    backgroundColor: "#fff", // 🔥 ADD THIS
    transition: "all 0.3s ease",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    fontSize: "15px",
    color: "#333",          // 🔥
    backgroundColor: "#fff", // 🔥
    transition: "all 0.3s ease",
    outline: "none",
    resize: "vertical",
  },
  
  fileInput: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    fontSize: "15px",
    color: "#333",          // 🔥
    backgroundColor: "#fff",
    transition: "all 0.3s ease",
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  errorMsg: {
    color: "#e74c3c",
    fontSize: "13px",
    marginTop: "5px",
  },
  classesBox: {
    background: "#f8f9fa",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "10px",
  },
  classesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
    gap: "12px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    background: "white",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "2px solid transparent",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
  },
  classNumber: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#333",
  },
  submitButton: {
    width: "100%",
    padding: "16px 30px",
    background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30px",
  },
  successCard: {
    background: "white",
    borderRadius: "20px",
    padding: "60px 40px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  successTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#27ae60",
    marginBottom: "15px",
  },
  successText: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "30px",
  },
  homeButton: {
    display: "inline-block",
    padding: "14px 40px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    textDecoration: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  errorCard: {
    background: "white",
    borderRadius: "20px",
    padding: "60px 40px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  errorTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#e74c3c",
    marginBottom: "15px",
  },
  errorText: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "30px",
  },
  retryButton: {
    display: "inline-block",
    padding: "14px 40px",
    background: "#f39c12",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

const cssStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes checkmark {
    0% {
      transform: scale(0) rotate(45deg);
    }
    50% {
      transform: scale(1.2) rotate(45deg);
    }
    100% {
      transform: scale(1) rotate(45deg);
    }
  }

  @keyframes circleGrow {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  .card-animation {
    animation: fadeInUp 0.6s ease-out;
  }

  .form-content {
    animation: fadeInUp 0.4s ease-out 0.2s both;
  }

  .input-focus:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
  }

  .btn-hover:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  .btn-hover:active:not(:disabled) {
    transform: translateY(0);
  }

  .btn-hover:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner-border {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255,255,255,0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
    animation: spin 0.8s linear infinite;
  }

  .success-animation {
    animation: fadeInUp 0.6s ease-out;
  }

  .checkmark-circle {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 30px;
    animation: circleGrow 0.5s ease-out;
  }

  .checkmark {
    color: white;
    font-size: 50px;
    font-weight: bold;
    animation: checkmark 0.6s ease-out 0.3s both;
  }

  .error-animation {
    animation: fadeInUp 0.6s ease-out;
  }

  .error-icon {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 30px;
    color: white;
    font-size: 60px;
    font-weight: bold;
    animation: circleGrow 0.5s ease-out;
  }

  .checkbox-hover:hover {
    background: #f0f0ff;
    border-color: #667eea;
    transform: scale(1.05);
  }

  select {
    cursor: pointer;
  }

  input[type="file"]::file-selector-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    
    font-weight: 600;
    margin-right: 10px;
    transition: all 0.3s ease;
  }

  input[type="file"]::file-selector-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;
