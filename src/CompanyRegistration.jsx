import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  BuildingOffice2Icon,
  DocumentTextIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  UserIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  XMarkIcon,
  PlusCircleIcon,
  TrashIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const CompanyRegistration = () => {
  // Company categories and their required documents as per MCA
  const COMPANY_CATEGORIES = {
    Proprietorship: [
      "Aadhar Card",
      "PAN Card",
      "Business Address Proof",
      "Bank Account Details",
      "GST Registration (if applicable)",
    ],
    LLP: [
      "Digital Signature Certificate (DSC) for all partners",
      "Director Identification Number (DIN) for all partners",
      "LLP Name Approval",
      "Registered Office Proof",
      "LLP Agreement",
      "PAN Card of Partners",
      "Address Proof of Partners",
      "Consent of Partners",
    ],
    LLC: [
      "Company Name Approval",
      "Digital Signature Certificate (DSC)",
      "Director Identification Number (DIN)",
      "Memorandum of Association (MOA)",
      "Articles of Association (AOA)",
      "Registered Office Proof",
      "Identity and Address Proof of Directors",
      "Consent of Directors",
    ],
    OPC: [
      "Digital Signature Certificate (DSC)",
      "Director Identification Number (DIN)",
      "Company Name Approval",
      "Memorandum of Association (MOA)",
      "Articles of Association (AOA)",
      "Registered Office Proof",
      "Nominee Details",
      "Consent of Director",
    ],
    "PVT LTD": [
      "Digital Signature Certificate (DSC) for Directors",
      "Director Identification Number (DIN)",
      "Company Name Approval",
      "Memorandum of Association (MOA)",
      "Articles of Association (AOA)",
      "Registered Office Proof",
      "Identity Proof of Directors",
      "Address Proof of Directors",
      "Consent of Directors",
    ],
    "Section 8": [
      "Digital Signature Certificate (DSC)",
      "Director Identification Number (DIN)",
      "Company Name Approval",
      "Memorandum of Association (MOA)",
      "Articles of Association (AOA)",
      "Registered Office Proof",
      "Objects of the Company",
      "Declaration by Professionals",
      "Estimated Income and Expenditure",
    ],
  };

  // Initial form state - WITH ALL REQUIRED FIELDS
  const [formData, setFormData] = useState({
    // Company Names
    proposedFirstBusinessName: "",
    proposedSecondBusinessName: "",
    proposedThirdBusinessName: "",
    
    // Company Type & Details
    companyCategory: "",
    businessActivity: "",
    registeredOfficeAddress: "",
    state: "",
    pincode: "",
    email: "",
    mobile: "",
    
    // Authorized Person
    authorizedPersonName: "",
    authorizedPersonPan: "",
    authorizedPersonAadhar: "",
    authorizedPersonAddress: "",
    authorizedPersonEmail: "",
    authorizedPersonMobile: "",
    
    // Capital
    authorizedCapital: "",
    paidUpCapital: "",
    
    // Directors
    directors: [
      {
        name: "",
        din: "",
        pan: "",
        aadhar: "",
        address: "",
        email: "",
        mobile: "",
        isDirector: true,
        isShareholder: true,
      },
    ],
    
    // Documents
    documents: {},
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [activeSection, setActiveSection] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [sectionErrors, setSectionErrors] = useState({});
  const [applicationData, setApplicationData] = useState(null);
  const formRefs = useRef([]);

  const sections = [
    { id: 0, title: "Company Name", icon: BuildingOffice2Icon },
    { id: 1, title: "Company Type", icon: BuildingLibraryIcon },
    { id: 2, title: "Company Details", icon: DocumentTextIcon },
    { id: 3, title: "Capital Structure", icon: CurrencyRupeeIcon },
    { id: 4, title: "Directors/Partners", icon: UserGroupIcon },
    { id: 5, title: "Authorized Person", icon: UserIcon },
    { id: 6, title: "Documents", icon: ArrowUpTrayIcon },
  ];

  // Update required documents when company category changes
  useEffect(() => {
    if (formData.companyCategory && COMPANY_CATEGORIES[formData.companyCategory]) {
      setRequiredDocuments(COMPANY_CATEGORIES[formData.companyCategory]);
      const docsObj = {};
      COMPANY_CATEGORIES[formData.companyCategory].forEach((doc) => {
        docsObj[doc] = null;
      });
      setFormData((prev) => ({ ...prev, documents: docsObj }));
    }
  }, [formData.companyCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    if (sectionErrors[activeSection]) {
      setSectionErrors((prev) => ({
        ...prev,
        [activeSection]: false,
      }));
    }
  };

  const handleDirectorChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedDirectors = [...formData.directors];

    if (name === "pan") {
      updatedDirectors[index][name] = value.toUpperCase();
    } else {
      updatedDirectors[index][name] = type === "checkbox" ? checked : value;
    }

    setFormData({
      ...formData,
      directors: updatedDirectors,
    });

    if (errors[`director_${index}_${name}`]) {
      setErrors({
        ...errors,
        [`director_${index}_${name}`]: "",
      });
    }
  };

  const addDirector = () => {
    setFormData({
      ...formData,
      directors: [
        ...formData.directors,
        {
          name: "",
          din: "",
          pan: "",
          aadhar: "",
          address: "",
          email: "",
          mobile: "",
          isDirector: true,
          isShareholder: true,
        },
      ],
    });
  };

  const removeDirector = (index) => {
    const updatedDirectors = formData.directors.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      directors: updatedDirectors,
    });
  };

  const handleDocumentUpload = (documentName, file) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      
      const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, JPEG, JPG, PNG files are allowed");
        return;
      }
      
      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          [documentName]: file,
        },
      });
      setUploadedFiles((prev) => ({
        ...prev,
        [documentName]: file.name,
      }));
    }
  };

  const removeDocument = (documentName) => {
    const newDocuments = { ...formData.documents };
    delete newDocuments[documentName];
    setFormData({
      ...formData,
      documents: newDocuments,
    });
    setUploadedFiles((prev) => {
      const newUploadedFiles = { ...prev };
      delete newUploadedFiles[documentName];
      return newUploadedFiles;
    });
  };

  const validatePAN = (pan) => {
    if (!pan) return false;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
    return panRegex.test(pan);
  };

  const validateEmail = (email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    if (!mobile) return false;
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const validatePincode = (pincode) => {
    if (!pincode) return false;
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
  };

  const validateAadhar = (aadhar) => {
    if (!aadhar) return false;
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadhar);
  };

  const validateSection = (sectionId) => {
    const newErrors = {};
    let hasError = false;

    switch (sectionId) {
      case 0: // Company Name
        if (!formData.proposedFirstBusinessName.trim()) {
          newErrors.proposedFirstBusinessName = "First proposed business name is required";
          hasError = true;
        }
        break;

      case 1: // Company Type
        if (!formData.companyCategory) {
          newErrors.companyCategory = "Company category is required";
          hasError = true;
        }
        break;

      case 2: // Company Details
        if (!formData.businessActivity.trim()) {
          newErrors.businessActivity = "Business activity is required";
          hasError = true;
        }
        if (!formData.registeredOfficeAddress.trim()) {
          newErrors.registeredOfficeAddress = "Registered office address is required";
          hasError = true;
        }
        if (!formData.state.trim()) {
          newErrors.state = "State is required";
          hasError = true;
        }
        if (!formData.pincode.trim()) {
          newErrors.pincode = "Pincode is required";
          hasError = true;
        } else if (!validatePincode(formData.pincode)) {
          newErrors.pincode = "Enter a valid 6-digit pincode";
          hasError = true;
        }
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
          hasError = true;
        } else if (!validateEmail(formData.email)) {
          newErrors.email = "Enter a valid email address";
          hasError = true;
        }
        if (!formData.mobile.trim()) {
          newErrors.mobile = "Mobile number is required";
          hasError = true;
        } else if (!validateMobile(formData.mobile)) {
          newErrors.mobile = "Enter a valid 10-digit Indian mobile number";
          hasError = true;
        }
        break;

      case 4: // Directors/Partners
        formData.directors.forEach((director, index) => {
          if (!director.name.trim()) {
            newErrors[`director_${index}_name`] = "Director name is required";
            hasError = true;
          }
          if (!director.pan.trim()) {
            newErrors[`director_${index}_pan`] = "PAN number is required";
            hasError = true;
          } else if (!validatePAN(director.pan)) {
            newErrors[`director_${index}_pan`] = "Enter a valid PAN number (e.g., ABCDE1234F)";
            hasError = true;
          }
          if (!director.aadhar.trim()) {
            newErrors[`director_${index}_aadhar`] = "Aadhar number is required";
            hasError = true;
          } else if (!validateAadhar(director.aadhar)) {
            newErrors[`director_${index}_aadhar`] = "Enter a valid 12-digit Aadhar number";
            hasError = true;
          }
          if (!director.email.trim()) {
            newErrors[`director_${index}_email`] = "Email is required";
            hasError = true;
          } else if (!validateEmail(director.email)) {
            newErrors[`director_${index}_email`] = "Enter a valid email address";
            hasError = true;
          }
          if (!director.mobile.trim()) {
            newErrors[`director_${index}_mobile`] = "Mobile number is required";
            hasError = true;
          } else if (!validateMobile(director.mobile)) {
            newErrors[`director_${index}_mobile`] = "Enter a valid 10-digit Indian mobile number";
            hasError = true;
          }
          if (!director.address.trim()) {
            newErrors[`director_${index}_address`] = "Address is required";
            hasError = true;
          }
        });
        break;

      case 5: // Authorized Person
        // Optional fields, but if filled should be valid
        if (formData.authorizedPersonPan && !validatePAN(formData.authorizedPersonPan)) {
          newErrors.authorizedPersonPan = "Enter a valid PAN number";
          hasError = true;
        }
        if (formData.authorizedPersonAadhar && !validateAadhar(formData.authorizedPersonAadhar)) {
          newErrors.authorizedPersonAadhar = "Enter a valid 12-digit Aadhar number";
          hasError = true;
        }
        if (formData.authorizedPersonEmail && !validateEmail(formData.authorizedPersonEmail)) {
          newErrors.authorizedPersonEmail = "Enter a valid email address";
          hasError = true;
        }
        if (formData.authorizedPersonMobile && !validateMobile(formData.authorizedPersonMobile)) {
          newErrors.authorizedPersonMobile = "Enter a valid 10-digit mobile number";
          hasError = true;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    setSectionErrors((prev) => ({
      ...prev,
      [sectionId]: hasError,
    }));

    return !hasError;
  };

  const resetForm = () => {
    setFormData({
      proposedFirstBusinessName: "",
      proposedSecondBusinessName: "",
      proposedThirdBusinessName: "",
      companyCategory: "",
      businessActivity: "",
      registeredOfficeAddress: "",
      state: "",
      pincode: "",
      email: "",
      mobile: "",
      authorizedPersonName: "",
      authorizedPersonPan: "",
      authorizedPersonAadhar: "",
      authorizedPersonAddress: "",
      authorizedPersonEmail: "",
      authorizedPersonMobile: "",
      authorizedCapital: "",
      paidUpCapital: "",
      directors: [
        {
          name: "",
          din: "",
          pan: "",
          aadhar: "",
          address: "",
          email: "",
          mobile: "",
          isDirector: true,
          isShareholder: true,
        },
      ],
      documents: {},
    });
    
    setErrors({});
    setUploadedFiles({});
    setRequiredDocuments([]);
    setActiveSection(0);
    setSectionErrors({});
    setApplicationData(null);
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all sections
    let allValid = true;
    for (let i = 0; i < sections.length; i++) {
      if (!validateSection(i)) {
        allValid = false;
        setActiveSection(i);
        break;
      }
    }
    if (!allValid) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const submitFormData = new FormData();

      // Complete field mapping according to Django model
      const fieldMap = {
        // Company Names
        proposedFirstBusinessName: "proposed_first_business_name",
        proposedSecondBusinessName: "proposed_second_business_name",
        proposedThirdBusinessName: "proposed_third_business_name",

        // Company Details
        companyCategory: "company_category",
        businessActivity: "business_activity",
        registeredOfficeAddress: "registered_office_address",
        state: "state",
        pincode: "pincode",
        email: "email",
        mobile: "mobile",

        // Capital Structure (Decimal fields)
        authorizedCapital: "authorized_capital",
        paidUpCapital: "paid_up_capital",

        // Authorized Person
        authorizedPersonName: "authorized_person_name",
        authorizedPersonPan: "authorized_person_pan",
        authorizedPersonAadhar: "authorized_person_aadhar",
        authorizedPersonAddress: "authorized_person_address",
        authorizedPersonEmail: "authorized_person_email",
        authorizedPersonMobile: "authorized_person_mobile",
      };

      // Add all form fields
      Object.keys(formData).forEach((key) => {
        if (key !== "directors" && key !== "documents") {
          const backendKey = fieldMap[key] || key;
          let value = formData[key];
          
          // Handle decimal fields - convert to number
          if (key === "authorizedCapital" || key === "paidUpCapital") {
            value = value ? parseFloat(value) : null;
          }
          
          // Only append if value exists
          if (value !== null && value !== undefined && value !== "") {
            submitFormData.append(backendKey, value);
          }
        }
      });

      // Add directors as JSON array
      const directorsData = formData.directors.map((director) => ({
        name: director.name,
        din: director.din || "",
        pan: director.pan.toUpperCase(),
        aadhar: director.aadhar,
        address: director.address || "",
        email: director.email || "",
        mobile: director.mobile || "",
        is_director: director.isDirector,
        is_shareholder: director.isShareholder,
      }));

      submitFormData.append("directors", JSON.stringify(directorsData));

      // Add documents
      Object.keys(formData.documents).forEach((docName) => {
        if (formData.documents[docName]) {
          // Create safe key for document
          const safeKey = `document_${docName.toLowerCase().replace(/\s+/g, '_')}`;
          submitFormData.append(safeKey, formData.documents[docName]);
        }
      });

      // Debug log
      console.log("📤 Submitting form data...");
      for (let [key, value] of submitFormData.entries()) {
        if (key === "directors") {
          console.log(`${key}:`, JSON.parse(value));
        } else if (typeof value === "object" && value instanceof File) {
          console.log(`${key}: File - ${value.name} (${(value.size / 1024).toFixed(2)} KB)`);
        } else {
          console.log(`${key}:`, value);
        }
      }

      // API call
      const response = await axios.post(
        "http://localhost:8000/api/company-registration/",
        submitFormData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000, // 30 seconds timeout
        }
      );

      console.log("✅ API Response:", response.data);

      if (response.status === 201 || response.status === 200) {
        const responseData = response.data;
        setApplicationData({
          applicationId: responseData.application_id || responseData.applicationId,
          referenceNumber: responseData.reference_number || responseData.referenceNumber,
          status: responseData.status || "Submitted",
          submittedAt: new Date().toLocaleString(),
        });
        
        setSuccessMessage("success");
        alert("Form Submitted Successfully")
        // resetForm();
      } else {
        throw new Error("Registration failed with status: " + response.status);
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      
      let errorMessage = "❌ Error submitting form. Please try again.";
      
      if (error.response) {
        // Server responded with error
        const errorData = error.response.data;
        console.error("Error response data:", errorData);
        
        if (typeof errorData === 'object') {
          // Django validation errors
          const errors = [];
          Object.keys(errorData).forEach(key => {
            if (Array.isArray(errorData[key])) {
              errors.push(`${key}: ${errorData[key].join(', ')}`);
            } else {
              errors.push(`${key}: ${errorData[key]}`);
            }
          });
          errorMessage = `❌ Validation Error: ${errors.join(' | ')}`;
        } else if (typeof errorData === 'string') {
          errorMessage = `❌ ${errorData}`;
        } else if (errorData.message) {
          errorMessage = `❌ ${errorData.message}`;
        }
      } else if (error.request) {
        // Request made but no response
        errorMessage = "❌ Network error. Please check your connection and try again.";
      } else {
        // Other errors
        errorMessage = `❌ ${error.message}`;
      }
      
      setSuccessMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextSection = () => {
    if (validateSection(activeSection)) {
      if (activeSection < sections.length - 1) {
        setActiveSection(activeSection + 1);
      }
    }
  };

  const prevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  const allDocumentsUploaded = () => {
    if (!formData.companyCategory) return false;
    const requiredDocs = COMPANY_CATEGORIES[formData.companyCategory] || [];
    return requiredDocs.every((doc) => formData.documents[doc]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeSection !== undefined) {
      scrollToTop();
    }
  }, [activeSection]);

  if (successMessage === "success" && applicationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-green-200">
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
                <CheckCircleIcon className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Registration Successful! 🎉
              </h1>
              
              <p className="text-gray-600 mb-8">
                Your company registration has been submitted successfully
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Application ID</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {applicationData.applicationId}
                    </p>
                  </div>
                  
                  {/* <div>
                    <p className="text-sm text-gray-600 mb-1">Reference Number</p>
                    <p className="text-xl font-semibold text-gray-800">
                      {applicationData.referenceNumber}
                    </p>
                  </div> */}
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      {applicationData.status}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Submitted At</p>
                    <p className="text-gray-700">{applicationData.submittedAt}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Document Verification</h3>
                    <p className="text-sm text-gray-600">Our team will verify your submitted documents within 2-3 business days</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200">
                  <div className="bg-purple-100 rounded-full p-2 mt-1">
                    <UserIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">We'll Contact You Soon</h3>
                    <p className="text-sm text-gray-600">Our expert will reach out to you for any additional requirements</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200">
                  <div className="bg-green-100 rounded-full p-2 mt-1">
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email Confirmation</h3>
                    <p className="text-sm text-gray-600">Check your email for detailed application status and next steps</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">📱 Important:</span> Keep your phone handy! We may call you for verification purposes
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                >
                  Submit Another Application
                </button>
                
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Print Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .hover-lift:hover { transform: translateY(-2px); }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <BuildingOffice2Icon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-dark mb-3">
            Company Registration
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Register your company as per India MCA requirements
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {sections.map((section, index) => (
              <React.Fragment key={section.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (index <= activeSection) {
                      setActiveSection(index);
                    }
                  }}
                  className={`flex flex-col items-center relative z-10 transition-all ${
                    index <= activeSection ? "text-blue-600" : "text-gray-400"
                  } ${index > activeSection ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                      index === activeSection
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110"
                        : index < activeSection
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index < activeSection ? (
                      <CheckCircleIcon className="h-6 w-6" />
                    ) : (
                      <section.icon className="h-6 w-6" />
                    )}
                  </div>
                  <span className="text-xs font-medium">{section.title}</span>
                  {sectionErrors[section.id] && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></span>
                  )}
                </button>
                {index < sections.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-200 mx-2">
                    <div
                      className={`h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ${
                        index < activeSection ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {sectionErrors[activeSection] && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium flex items-center">
                <XMarkIcon className="h-4 w-4 mr-2" />
                Please fill all required fields in this section before proceeding.
              </p>
            </div>
          )}
        </div>

        {/* Success/Error Message */}
        {successMessage && successMessage.startsWith("❌") && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl shadow-sm animate-fadeIn">
            <div className="flex items-center">
              <XMarkIcon className="h-6 w-6 text-red-600 mr-3" />
              <p className="text-red-700 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-fadeIn">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            
            {/* Section 1: Company Names */}
            <div className={`${activeSection !== 0 ? "hidden" : ""}`}>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <BuildingOffice2Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-dark">Company Name</h2>
                  <p className="text-sm text-gray-500 mt-1">Enter your preferred company names</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {num === 1 ? "First Preferred Name *" : `Alternative ${num === 2 ? "Second" : "Third"} Name`}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {num}
                      </div>
                      <input
                        type="text"
                        name={`proposed${num === 1 ? "First" : num === 2 ? "Second" : "Third"}BusinessName`}
                        value={formData[`proposed${num === 1 ? "First" : num === 2 ? "Second" : "Third"}BusinessName`]}
                        onChange={handleChange}
                        className={`w-full pl-14 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                          errors[`proposed${num === 1 ? "First" : num === 2 ? "Second" : "Third"}BusinessName`]
                            ? "border-red-300 ring-2 ring-red-100"
                            : "border-gray-200 group-hover:border-blue-300"
                        }`}
                        placeholder={`Enter ${num === 1 ? "first preferred" : `alternative ${num === 2 ? "second" : "third"}`} name`}
                      />
                    </div>
                    {errors[`proposed${num === 1 ? "First" : num === 2 ? "Second" : "Third"}BusinessName`] && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <XMarkIcon className="h-4 w-4 mr-1" />
                        {errors[`proposed${num === 1 ? "First" : num === 2 ? "Second" : "Third"}BusinessName`]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Company Category */}
            <div className={`${activeSection !== 1 ? "hidden" : ""}`}>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <BuildingLibraryIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-dark">Company Type</h2>
                  <p className="text-sm text-gray-500 mt-1">Select your company category</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Company Category *</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.keys(COMPANY_CATEGORIES).map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, companyCategory: category });
                        if (errors.companyCategory) {
                          setErrors({ ...errors, companyCategory: "" });
                        }
                      }}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-300 hover-lift ${
                        formData.companyCategory === category
                          ? "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg scale-[1.02]"
                          : "border-gray-200 bg-white hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                          formData.companyCategory === category
                            ? "bg-gradient-to-r from-blue-600 to-purple-600"
                            : "bg-gray-100"
                        }`}>
                          <BuildingLibraryIcon className={`h-5 w-5 ${
                            formData.companyCategory === category ? "text-white" : "text-gray-500"
                          }`} />
                        </div>
                        <span className={`font-semibold ${
                          formData.companyCategory === category ? "text-blue-700" : "text-gray-700"
                        }`}>
                          {category}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        {COMPANY_CATEGORIES[category].length} documents required
                      </div>
                    </button>
                  ))}
                </div>
                {errors.companyCategory && (
                  <p className="mt-3 text-sm text-red-600 flex items-center">
                    <XMarkIcon className="h-4 w-4 mr-1" />
                    {errors.companyCategory}
                  </p>
                )}
              </div>
            </div>

            {/* Section 3: Company Details */}
            <div className={`${activeSection !== 2 ? "hidden" : ""}`}>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-dark">Company Details</h2>
                  <p className="text-sm text-gray-500 mt-1">Enter your company information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Business Activity *</label>
                  <textarea
                    name="businessActivity"
                    value={formData.businessActivity}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                      errors.businessActivity ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                    }`}
                    placeholder="Describe your business activity in detail"
                  />
                  {errors.businessActivity && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      {errors.businessActivity}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Registered Office Address *</label>
                  <textarea
                    name="registeredOfficeAddress"
                    value={formData.registeredOfficeAddress}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                      errors.registeredOfficeAddress ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                    }`}
                    placeholder="Full address of registered office"
                  />
                  {errors.registeredOfficeAddress && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      {errors.registeredOfficeAddress}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                      errors.state ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                    }`}
                  >
                    <option value="">Select State</option>
                    <option value="MH">Maharashtra</option>
                    <option value="DL">Delhi</option>
                    <option value="KA">Karnataka</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="UP">Uttar Pradesh</option>
                    <option value="GJ">Gujarat</option>
                    <option value="RJ">Rajasthan</option>
                    <option value="WB">West Bengal</option>
                    <option value="AP">Andhra Pradesh</option>
                    <option value="TS">Telangana</option>
                    <option value="KL">Kerala</option>
                    <option value="MP">Madhya Pradesh</option>
                    <option value="HR">Haryana</option>
                    <option value="PB">Punjab</option>
                    <option value="OR">Odisha</option>
                  </select>
                  {errors.state && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      {errors.state}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength="6"
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                      errors.pincode ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                    }`}
                    placeholder="6-digit pincode"
                  />
                  {errors.pincode && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      {errors.pincode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                      errors.email ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                    }`}
                    placeholder="company@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength="10"
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                      errors.mobile ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                    }`}
                    placeholder="9876543210"
                  />
                  {errors.mobile && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      {errors.mobile}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 4: Capital Structure */}
            <div className={`${activeSection !== 3 ? "hidden" : ""}`}>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <CurrencyRupeeIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-dark">Capital Structure</h2>
                  <p className="text-sm text-gray-500 mt-1">Enter your company's capital details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Authorized Capital (INR)</label>
                  <div className="relative">
                    <CurrencyRupeeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="authorizedCapital"
                      value={formData.authorizedCapital}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift"
                      placeholder="Enter amount in INR"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Maximum capital company can raise</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Paid-up Capital (INR)</label>
                  <div className="relative">
                    <CurrencyRupeeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="paidUpCapital"
                      value={formData.paidUpCapital}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift"
                      placeholder="Enter amount in INR"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Capital actually paid by shareholders</p>
                </div>
              </div>
            </div>

            {/* Section 5: Directors/Partners */}
            <div className={`${activeSection !== 4 ? "hidden" : ""}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <UserGroupIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Directors/Partners Details</h2>
                    <p className="text-sm text-gray-500 mt-1">Add all directors/partners information</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addDirector}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover-lift transition-all"
                >
                  <PlusCircleIcon className="h-5 w-5 mr-2" />
                  Add Director
                </button>
              </div>

              {formData.directors.map((director, index) => (
                <div key={index} className="mb-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200 hover-lift transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-dark">Person {index + 1}</h3>
                        <p className="text-sm text-gray-500">Director/Partner Information</p>
                      </div>
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeDirector(index)}
                        className="flex items-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={director.name}
                        onChange={(e) => handleDirectorChange(index, e)}
                        name="name"
                        className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                          errors[`director_${index}_name`] ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                        }`}
                        placeholder="Enter full name"
                      />
                      {errors[`director_${index}_name`] && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <XMarkIcon className="h-4 w-4 mr-1" />
                          {errors[`director_${index}_name`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">DIN (if available)</label>
                      <input
                        type="text"
                        value={director.din}
                        onChange={(e) => handleDirectorChange(index, e)}
                        name="din"
                        maxLength="8"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift"
                        placeholder="Director Identification Number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number *</label>
                      <input
                        type="text"
                        value={director.pan}
                        onChange={(e) => handleDirectorChange(index, e)}
                        name="pan"
                        maxLength="10"
                        className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                          errors[`director_${index}_pan`] ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                        }`}
                        placeholder="ABCDE1234F"
                      />
                      {errors[`director_${index}_pan`] && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <XMarkIcon className="h-4 w-4 mr-1" />
                          {errors[`director_${index}_pan`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhar Number *</label>
                      <input
                        type="text"
                        value={director.aadhar}
                        onChange={(e) => handleDirectorChange(index, e)}
                        name="aadhar"
                        maxLength="12"
                        className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                          errors[`director_${index}_aadhar`] ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                        }`}
                        placeholder="12-digit Aadhar number"
                      />
                      {errors[`director_${index}_aadhar`] && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <XMarkIcon className="h-4 w-4 mr-1" />
                          {errors[`director_${index}_aadhar`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={director.email}
                        onChange={(e) => handleDirectorChange(index, e)}
                        name="email"
                        className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                          errors[`director_${index}_email`] ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                        }`}
                        placeholder="email@example.com"
                      />
                      {errors[`director_${index}_email`] && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <XMarkIcon className="h-4 w-4 mr-1" />
                          {errors[`director_${index}_email`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                      <input
                        type="tel"
                        value={director.mobile}
                        onChange={(e) => handleDirectorChange(index, e)}
                        name="mobile"
                        maxLength="10"
                        className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                          errors[`director_${index}_mobile`] ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                        }`}
                        placeholder="9876543210"
                      />
                      {errors[`director_${index}_mobile`] && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <XMarkIcon className="h-4 w-4 mr-1" />
                          {errors[`director_${index}_mobile`]}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                      <textarea
                        value={director.address}
                        onChange={(e) => handleDirectorChange(index, e)}
                        name="address"
                        rows="2"
                        className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                          errors[`director_${index}_address`] ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                        }`}
                        placeholder="Residential address"
                      />
                      {errors[`director_${index}_address`] && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <XMarkIcon className="h-4 w-4 mr-1" />
                          {errors[`director_${index}_address`]}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex space-x-6">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={director.isDirector}
                              onChange={(e) => handleDirectorChange(index, e)}
                              name="isDirector"
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                              director.isDirector ? "bg-blue-500 border-blue-500" : "border-gray-300"
                            }`}>
                              {director.isDirector && <CheckCircleIcon className="h-4 w-4 text-white" />}
                            </div>
                          </div>
                          <span className="text-gray-700 font-medium">Is Director/Partner</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={director.isShareholder}
                              onChange={(e) => handleDirectorChange(index, e)}
                              name="isShareholder"
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                              director.isShareholder ? "bg-blue-500 border-blue-500" : "border-gray-300"
                            }`}>
                              {director.isShareholder && <CheckCircleIcon className="h-4 w-4 text-white" />}
                            </div>
                          </div>
                          <span className="text-gray-700 font-medium">Is Shareholder</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Section 6: Authorized Person */}
            <div className={`${activeSection !== 5 ? "hidden" : ""}`}>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-dark">Authorized Person Details</h2>
                  <p className="text-sm text-gray-500 mt-1">Enter authorized person information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="authorizedPersonName"
                    value={formData.authorizedPersonName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift"
                    placeholder="Name of authorized person"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number</label>
                  <input
                    type="text"
                    name="authorizedPersonPan"
                    value={formData.authorizedPersonPan}
                    onChange={handleChange}
                    maxLength="10"
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                      errors.authorizedPersonPan ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                    }`}
                    placeholder="ABCDE1234F"
                  />
                  {errors.authorizedPersonPan && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      {errors.authorizedPersonPan}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhar Number</label>
                  <input
                    type="text"
                    name="authorizedPersonAadhar"
                    value={formData.authorizedPersonAadhar}
                    onChange={handleChange}
                    maxLength="12"
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                      errors.authorizedPersonAadhar ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                    }`}
                    placeholder="12-digit Aadhar number"
                  />
                  {errors.authorizedPersonAadhar && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      {errors.authorizedPersonAadhar}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Authorized Person Address</label>
                  <textarea
                    rows={3}
                    name="authorizedPersonAddress"
                    value={formData.authorizedPersonAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift"
                    placeholder="Address of authorized person"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Authorized Person Email</label>
                  <input
                    type="email"
                    name="authorizedPersonEmail"
                    value={formData.authorizedPersonEmail}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                      errors.authorizedPersonEmail ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                    }`}
                    placeholder="example@gmail.com"
                  />
                  {errors.authorizedPersonEmail && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      {errors.authorizedPersonEmail}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Authorized Person Mobile Number</label>
                  <input
                    type="tel"
                    name="authorizedPersonMobile"
                    value={formData.authorizedPersonMobile}
                    onChange={handleChange}
                    maxLength="10"
                    className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 hover-lift ${
                      errors.authorizedPersonMobile ? "border-red-300 ring-2 ring-red-100" : "border-gray-200"
                    }`}
                    placeholder="9876543210"
                  />
                  {errors.authorizedPersonMobile && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      {errors.authorizedPersonMobile}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 7: Documents */}
            <div className={`${activeSection !== 6 ? "hidden" : ""}`}>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <ArrowUpTrayIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-dark">Required Documents</h2>
                  <p className="text-sm text-gray-500 mt-1">Upload all required documents (Max 5MB each)</p>
                </div>
              </div>

              {formData.companyCategory ? (
                <>
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 mb-6">
                    <h3 className="text-xl font-bold text-dark mb-4 flex items-center">
                      <DocumentTextIcon className="h-6 w-6 mr-2" />
                      Required Documents for {formData.companyCategory}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {requiredDocuments.map((doc, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover-lift transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <DocumentTextIcon className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="font-medium text-gray-700">{doc}</span>
                            </div>
                            {uploadedFiles[doc] && <CheckCircleIcon className="h-5 w-5 text-green-500" />}
                          </div>
                          <div className="mt-2">
                            {!uploadedFiles[doc] ? (
                              <label className="block cursor-pointer">
                                <div className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors">
                                  <ArrowUpTrayIcon className="h-5 w-5 text-gray-400 mr-2" />
                                  <span className="text-sm text-gray-600">Click to upload</span>
                                  <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => handleDocumentUpload(doc, e.target.files[0])}
                                    className="hidden"
                                  />
                                </div>
                              </label>
                            ) : (
                              <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-green-700 truncate">{uploadedFiles[doc]}</p>
                                  <p className="text-xs text-green-600">
                                    {formData.documents[doc] && 
                                      `Size: ${(formData.documents[doc].size / 1024 / 1024).toFixed(2)} MB`}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeDocument(doc)}
                                  className="ml-2 text-red-500 hover:text-red-700"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">Documents Upload Status</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          allDocumentsUploaded() ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {allDocumentsUploaded()
                            ? "All documents uploaded ✓"
                            : `${Object.keys(uploadedFiles).length}/${requiredDocuments.length} uploaded`}
                        </span>
                      </div>
                      {!allDocumentsUploaded() && (
                        <p className="text-sm text-gray-500 mt-2">
                          Please upload all required documents to proceed with submission.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-yellow-800">
                      <span className="font-semibold">📝 Note:</span> All documents should be clear and legible. 
                      Accepted formats: PDF, JPEG, JPG, PNG. Max file size: 5MB per document.
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-2xl">
                  <p className="text-yellow-700 text-center">
                    Please select a company category in Section 2 to see the required documents.
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={prevSection}
                disabled={activeSection === 0}
                className={`flex items-center px-6 py-3 rounded-xl transition-all ${
                  activeSection === 0
                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover-lift"
                }`}
              >
                <ChevronRightIcon className="h-5 w-5 mr-2 rotate-180" />
                Previous
              </button>

              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-4">
                  Section {activeSection + 1} of {sections.length}
                </span>
                {activeSection < sections.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextSection}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 hover-lift transition-all"
                  >
                    Next
                    <ChevronRightIcon className="h-5 w-5 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || (formData.companyCategory && !allDocumentsUploaded())}
                    className={`flex items-center px-8 py-3 rounded-xl font-semibold transition-all hover-lift ${
                      isSubmitting || (formData.companyCategory && !allDocumentsUploaded())
                        ? "opacity-50 cursor-not-allowed bg-gradient-to-r from-blue-400 to-purple-400"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        Submit Registration
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Required Note */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                <span className="text-red-500 font-semibold">*</span> Required fields as per MCA guidelines
              </p>
              <p className="text-xs text-gray-400 text-center mt-2">
                All information provided will be kept confidential and used only for registration purposes
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact us at <a href="mailto:support@companyregistration.com" className="text-blue-600 hover:underline">support@companyregistration.com</a>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © {new Date().getFullYear()} Company Registration Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;