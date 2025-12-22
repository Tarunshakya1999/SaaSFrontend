import { useState } from "react";
import { Building2, FileText, CheckCircle2, Sparkles, Upload, Mail, Phone } from "lucide-react";

const ROCComplianceAndFiling = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    cin_llpin: "",
    company_type: "",
    incorporation_date: "",
    financial_year: "",
    registered_address: "",
    email: "",
    mobile: "",

    annual_compliance: false,
    aoc_4: false,
    mgt_7: false,
    dir_3_kyc: false,
    llp_form_8: false,
    llp_form_11: false,
    event_based: false,

    incorporation_certificate: null,
    pan_company: null,
    balance_sheet: null,
    auditor_report: null,

    disclaimer_accepted: false,
  });

  const [fileNames, setFileNames] = useState({
    incorporation_certificate: "",
    pan_company: "",
    balance_sheet: "",
    auditor_report: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Mobile validation: only digits, max 10
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      setFileNames({
        ...fileNames,
        [name]: files[0].name,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.disclaimer_accepted) {
      alert("Please accept the disclaimer to proceed");
      return;
    }
    
    // Create FormData for file upload
    const submitData = new FormData();
    
    // Add text fields
    submitData.append('company_name', formData.company_name);
    submitData.append('cin_llpin', formData.cin_llpin);
    submitData.append('company_type', formData.company_type);
    submitData.append('incorporation_date', formData.incorporation_date);
    submitData.append('financial_year', formData.financial_year);
    submitData.append('registered_address', formData.registered_address);
    submitData.append('email', formData.email);
    submitData.append('mobile', formData.mobile);
    
    // Add checkboxes
    submitData.append('annual_compliance', formData.annual_compliance);
    submitData.append('aoc_4', formData.aoc_4);
    submitData.append('mgt_7', formData.mgt_7);
    submitData.append('dir_3_kyc', formData.dir_3_kyc);
    submitData.append('llp_form_8', formData.llp_form_8);
    submitData.append('llp_form_11', formData.llp_form_11);
    submitData.append('event_based', formData.event_based);
    
    // Add files
    if (formData.incorporation_certificate) {
      submitData.append('incorporation_certificate', formData.incorporation_certificate);
    }
    if (formData.pan_company) {
      submitData.append('pan_company', formData.pan_company);
    }
    if (formData.balance_sheet) {
      submitData.append('balance_sheet', formData.balance_sheet);
    }
    if (formData.auditor_report) {
      submitData.append('auditor_report', formData.auditor_report);
    }
    
    submitData.append('disclaimer_accepted', formData.disclaimer_accepted);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/roc-compliance/", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend Error:", errorData);
        alert("Form submission failed ❌");
        return;
      }

      alert("ROC Compliance Form Submitted Successfully ✅");
      
      // Reset form
      setFormData({
        company_name: "",
        cin_llpin: "",
        company_type: "",
        incorporation_date: "",
        financial_year: "",
        registered_address: "",
        email: "",
        mobile: "",
        annual_compliance: false,
        aoc_4: false,
        mgt_7: false,
        dir_3_kyc: false,
        llp_form_8: false,
        llp_form_11: false,
        event_based: false,
        incorporation_certificate: null,
        pan_company: null,
        balance_sheet: null,
        auditor_report: null,
        disclaimer_accepted: false,
      });
      
      setFileNames({
        incorporation_certificate: "",
        pan_company: "",
        balance_sheet: "",
        auditor_report: "",
      });
      
    } catch (error) {
      console.error("Server Error:", error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg animate-bounce-slow">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-dark">
              ROC Compliance & Filing
            </h1>
            <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
          </div>
          <p className="text-gray-600">Streamline your regulatory compliance with ease</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
          {/* ================= COMPANY DETAILS ================= */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Company Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white hover:border-indigo-300 text-gray-800"
                  placeholder="Enter company name"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CIN / LLPIN <span className="text-red-500">*</span>
                </label>
                <input
                  name="cin_llpin"
                  value={formData.cin_llpin}
                  onChange={handleChange}
                  maxLength={30}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white hover:border-indigo-300 text-gray-800"
                  placeholder="Enter CIN/LLPIN"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="company_type"
                  value={formData.company_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 hover:border-indigo-300 text-gray-800"
                >
                  <option value="">Select Company Type</option>
                  <option value="PVT">Private Limited</option>
                  <option value="LLP">LLP</option>
                  <option value="OPC">OPC</option>
                  <option value="SEC8">Section 8</option>
                </select>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incorporation Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="incorporation_date"
                  value={formData.incorporation_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white hover:border-indigo-300 text-gray-800"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Financial Year <span className="text-red-500">*</span>
                </label>
                <input
                  name="financial_year"
                  value={formData.financial_year}
                  placeholder="2024-25"
                  onChange={handleChange}
                  maxLength={20}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white hover:border-indigo-300 text-gray-800"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-600" />
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white hover:border-indigo-300 text-gray-800"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="group md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-600" />
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white hover:border-indigo-300 text-gray-800"
                />
              </div>
            </div>
          </div>

          {/* ================= ADDRESS ================= */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registered Office Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="registered_address"
              value={formData.registered_address}
              rows="3"
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white hover:border-indigo-300 resize-none text-gray-800"
              placeholder="Enter complete registered office address"
            />
          </div>

          {/* ================= COMPLIANCE OPTIONS ================= */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg text-dark mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
              Select Compliance Type
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                ["annual_compliance", "Annual Compliance", "from-blue-500 to-cyan-500"],
                ["aoc_4", "AOC-4", "from-purple-500 to-pink-500"],
                ["mgt_7", "MGT-7", "from-green-500 to-emerald-500"],
                ["dir_3_kyc", "DIR-3 KYC", "from-orange-500 to-red-500"],
                ["llp_form_8", "LLP Form 8", "from-indigo-500 to-purple-500"],
                ["llp_form_11", "LLP Form 11", "from-pink-500 to-rose-500"],
                ["event_based", "Event Based Compliance", "from-teal-500 to-cyan-500"],
              ].map(([name, label, gradient]) => (
                <label
                  key={name}
                  className={`relative flex items-center gap-3 border-2 px-5 py-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    formData[name]
                      ? `bg-gradient-to-r ${gradient} border-transparent text-white shadow-lg`
                      : "border-gray-200 bg-white hover:border-indigo-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    name={name}
                    checked={formData[name]}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      formData[name]
                        ? "bg-white border-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {formData[name] && (
                      <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${formData[name] ? "text-white" : "text-gray-700"}`}>
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ================= DOCUMENTS UPLOAD ================= */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg text-dark mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-indigo-600" />
              Documents Upload
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Incorporation Certificate */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incorporation Certificate <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="incorporation_certificate"
                    onChange={handleFileChange}
                    className="sr-only"
                    id="incorporation_certificate"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="incorporation_certificate"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300"
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {fileNames.incorporation_certificate || "Choose File"}
                    </span>
                  </label>
                </div>
              </div>

              {/* PAN Company */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company PAN <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="pan_company"
                    onChange={handleFileChange}
                    className="sr-only"
                    id="pan_company"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="pan_company"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300"
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {fileNames.pan_company || "Choose File"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Balance Sheet */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Balance Sheet <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="balance_sheet"
                    onChange={handleFileChange}
                    className="sr-only"
                    id="balance_sheet"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="balance_sheet"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300"
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {fileNames.balance_sheet || "Choose File"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Auditor Report */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auditor Report <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="auditor_report"
                    onChange={handleFileChange}
                    className="sr-only"
                    id="auditor_report"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="auditor_report"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300"
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {fileNames.auditor_report || "Choose File"}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Accepted formats: PDF, JPG, JPEG, PNG (Max size: 5MB)
            </p>
          </div>

          {/* ================= DISCLAIMER ================= */}
          <div className={`p-5 border-2 rounded-2xl transition-all duration-300 ${
            formData.disclaimer_accepted 
              ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300" 
              : "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300"
          }`}>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="disclaimer_accepted"
                checked={formData.disclaimer_accepted}
                onChange={handleChange}
                className="mt-1 w-5 h-5 accent-indigo-600 cursor-pointer"
              />
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Disclaimer:</strong> We act only as a service facilitator. ROC
                filings and compliances are handled by independent practicing
                professionals. By submitting this form, you authorize us to share your
                data with the assigned professional.
              </p>
            </label>
          </div>

          {/* ================= SUBMIT ================= */}
          <button
            onClick={handleSubmit}
            disabled={!formData.disclaimer_accepted}
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Submit ROC Compliance</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ROCComplianceAndFiling;