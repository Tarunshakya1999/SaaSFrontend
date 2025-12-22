import React, { useState } from 'react';

const BrandVerification = () => {
  // State for form data
  const [formData, setFormData] = useState({
    brand_name: '',
    legal_name: '',
    registration_number: '',
    year_established: '',
    business_type: '',
    industry_category: '',
    website: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    social_media_links: {
      facebook: '',
      instagram: '',
      linkedin: '',
      twitter: ''
    },
    awards_subcategory: '',
    previous_awards: '',
    description: '',
    documents: {
      registration_certificate: null,
      tax_certificate: null,
      identity_proof: null,
      logo: null,
      product_images: null
    },
    terms_accepted: false
  });

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested state for social media links
    if (name.startsWith('social_')) {
      const socialField = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        social_media_links: {
          ...prev.social_media_links,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: file
      }
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    try {
      // Prepare FormData for file upload
      const formDataToSend = new FormData();
      
      // Append text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'documents' && key !== 'social_media_links') {
          if (typeof formData[key] === 'object') {
            formDataToSend.append(key, JSON.stringify(formData[key]));
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      // Append social media links as JSON
      formDataToSend.append('social_media_links', JSON.stringify(formData.social_media_links));
      
      // Append files
      Object.keys(formData.documents).forEach(docKey => {
        if (formData.documents[docKey]) {
          formDataToSend.append(docKey, formData.documents[docKey]);
        }
      });

      // API endpoint (update with your Django API endpoint)
      const apiUrl = 'http://localhost:8000/api/brand-verifications/';
      
      // Send request to Django backend
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend,
        // Headers are automatically set for FormData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      
      setSubmitMessage('Form submitted successfully! Your brand verification request has been received.');
      
      // Reset form after successful submission
      setFormData({
        brand_name: '',
        legal_name: '',
        registration_number: '',
        year_established: '',
        business_type: '',
        industry_category: '',
        website: '',
        contact_person: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        social_media_links: {
          facebook: '',
          instagram: '',
          linkedin: '',
          twitter: ''
        },
        awards_subcategory: '',
        previous_awards: '',
        description: '',
        documents: {
          registration_certificate: null,
          tax_certificate: null,
          identity_proof: null,
          logo: null,
          product_images: null
        },
        terms_accepted: false
      });

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(`Failed to submit form: ${error.message}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Industry categories options
  const industryCategories = [
    'Technology', 'Fashion & Apparel', 'Food & Beverage', 'Healthcare', 
    'Finance', 'Education', 'Entertainment', 'Manufacturing', 
    'Retail', 'Hospitality', 'Automotive', 'Real Estate',
    'Beauty & Cosmetics', 'Sports & Fitness', 'Other'
  ];

  // Awards subcategories
  const awardsSubcategories = [
    'Most Innovative Brand',
    'Best Customer Service',
    'Sustainable Business Award',
    'Emerging Brand of the Year',
    'Excellence in Product Design',
    'Best Social Impact Initiative',
    'Digital Transformation Award'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-3xl font-bold">Brand Verification & Awards Application</h1>
          <p className="mt-2 opacity-90">
            Complete this form to apply for brand verification and award consideration
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Brand Information Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
              Brand Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Name *
                </label>
                <input
                  type="text"
                  name="brand_name"
                  value={formData.brand_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter your brand name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Legal Business Name *
                </label>
                <input
                  type="text"
                  name="legal_name"
                  value={formData.legal_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Registered legal name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Number *
                </label>
                <input
                  type="text"
                  name="registration_number"
                  value={formData.registration_number}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Business registration number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year Established *
                </label>
                <input
                  type="number"
                  name="year_established"
                  value={formData.year_established}
                  onChange={handleChange}
                  required
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="YYYY"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Type *
                </label>
                <select
                  name="business_type"
                  value={formData.business_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Select business type</option>
                  <option value="sole_proprietorship">Sole Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="llc">LLC (Limited Liability Company)</option>
                  <option value="corporation">Corporation</option>
                  <option value="non_profit">Non-Profit</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry Category *
                </label>
                <select
                  name="industry_category"
                  value={formData.industry_category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Select industry</option>
                  {industryCategories.map((category, index) => (
                    <option key={index} value={category.toLowerCase().replace(/\s+/g, '_')}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
              Contact Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Full name of contact person"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="contact@brand.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
              Business Address
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Full business address"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="City"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="State"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Country"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Postal code"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
              Social Media Links
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(formData.social_media_links).map((platform) => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {platform}
                  </label>
                  <input
                    type="url"
                    name={`social_${platform}`}
                    value={formData.social_media_links[platform]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder={`https://${platform}.com/yourbrand`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Awards Information Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
              Awards Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Awards Subcategory
                </label>
                <select
                  name="awards_subcategory"
                  value={formData.awards_subcategory}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Select award category (optional)</option>
                  {awardsSubcategories.map((award, index) => (
                    <option key={index} value={award.toLowerCase().replace(/\s+/g, '_')}>
                      {award}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previous Awards (if any)
                </label>
                <input
                  type="text"
                  name="previous_awards"
                  value={formData.previous_awards}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="List any previous awards won"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand Description & Achievements *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Describe your brand, mission, values, and notable achievements..."
              />
            </div>
          </div>

          {/* Documents Upload Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
              Required Documents
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Please upload the following documents. All documents should be in PDF, JPG, or PNG format.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Registration Certificate *
                </label>
                <input
                  type="file"
                  name="registration_certificate"
                  onChange={handleFileChange}
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Registration Certificate *
                </label>
                <input
                  type="file"
                  name="tax_certificate"
                  onChange={handleFileChange}
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Identity Proof (Director/Proprietor) *
                </label>
                <input
                  type="file"
                  name="identity_proof"
                  onChange={handleFileChange}
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Logo *
                </label>
                <input
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  required
                  accept=".jpg,.jpeg,.png,.svg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">JPG, PNG, SVG (Max 2MB)</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product/Service Images
                </label>
                <input
                  type="file"
                  name="product_images"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">JPG, PNG (Max 10MB)</p>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="terms_accepted"
                  checked={formData.terms_accepted}
                  onChange={handleCheckboxChange}
                  required
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-700">
                  I agree to the terms and conditions *
                </label>
                <p className="text-gray-600">
                  I certify that all information provided is accurate and complete. 
                  I understand that false information may result in rejection of my application.
                </p>
              </div>
            </div>
          </div>

          {/* Submission Status */}
          {submitMessage && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">{submitMessage}</p>
            </div>
          )}
          
          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">{submitError}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:ring-4 focus:ring-blue-300'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Application for Brand Verification & Awards'
              )}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              All fields marked with * are required
            </p>
          </div>
        </form>
        
        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            For any queries, contact us at support@brandverification.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandVerification;