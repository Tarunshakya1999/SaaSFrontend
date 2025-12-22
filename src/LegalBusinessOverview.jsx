import React, { useState } from 'react';
import { Building2, FileText, CheckCircle, Award, Scale, ChevronRight } from 'lucide-react';

export default function LegalBusinessOverview() {
  const [activeCard, setActiveCard] = useState(null);

  const services = [
    {
      icon: Building2,
      title: "Company Registration",
      color: "from-blue-500 to-blue-600",
      description: "Register your company legally and establish your business entity",
      details: [
        "Private Limited, LLP, OPC, Partnership registration options",
        "Obtain PAN, TAN, and CIN numbers",
        "Digital Signature Certificate (DSC) setup assistance",
        "Bank account opening support",
        "Complete documentation and filing services"
      ],
      benefits: "Gain legal protection, enhance credibility, and unlock funding opportunities"
    },
    {
      icon: FileText,
      title: "GST / MSME / ISO / Trademark",
      color: "from-green-500 to-green-600",
      description: "Essential business certifications and registrations",
      details: [
        "GST Registration - mandatory for tax compliance",
        "MSME Certificate - access government schemes and loans",
        "ISO Certification - maintain quality standards",
        "Trademark Registration - protect your brand name and logo",
        "Import-Export Code (IEC) also available"
      ],
      benefits: "Enjoy tax benefits, build credibility, gain legal protection, and access government schemes"
    },
    {
      icon: CheckCircle,
      title: "ROC Compliance & Filing",
      color: "from-purple-500 to-purple-600",
      description: "Handle all Registrar of Companies compliance requirements",
      details: [
        "Annual Filing (AOC-4, MGT-7) - mandatory yearly submission",
        "Board Meetings and resolutions documentation",
        "Director KYC (DIR-3 KYC) yearly filing",
        "Financial statements filing",
        "Reporting changes in company structure"
      ],
      benefits: "Avoid penalties, maintain active company status, and stay clear of legal troubles"
    },
    {
      icon: Scale,
      title: "Legal Document Builder",
      color: "from-orange-500 to-orange-600",
      description: "Create essential legal documents for your business",
      details: [
        "NDA (Non-Disclosure Agreement) - protect confidential information",
        "Service Agreements - contracts with clients",
        "Employment Contracts - proper agreements for employees",
        "Terms & Conditions, Privacy Policy for your website",
        "Partnership Deeds and Shareholder Agreements"
      ],
      benefits: "Protection from legal disputes, professional image, and clear business terms"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Legal & Business Setup
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Make your SaaS business legally compliant and professional
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeCard === index;
            
            return (
              <div
                key={index}
                onClick={() => setActiveCard(isActive ? null : index)}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl ${
                  isActive ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                        <p className="text-white/90 text-sm">{service.description}</p>
                      </div>
                    </div>
                    <ChevronRight 
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isActive ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  isActive ? 'max-h-96' : 'max-h-0'
                }`}>
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                    <ul className="space-y-2 mb-4">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-gray-700 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <p className="text-sm text-blue-900">
                        <span className="font-semibold">💡 Key Benefits: </span>
                        {service.benefits}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Collapsed State Footer */}
                {!isActive && (
                  <div className="px-6 pb-6">
                    <button className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center">
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Why Important Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Why Is This Important?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="font-semibold mb-2">Legal Protection</h3>
              <p className="text-white/90 text-sm">
                Keep your personal assets safe and give your business a separate legal entity
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">💼</div>
              <h3 className="font-semibold mb-2">Professional Image</h3>
              <p className="text-white/90 text-sm">
                Build trust with clients and investors, and secure larger deals
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold mb-2">Business Growth</h3>
              <p className="text-white/90 text-sm">
                Raise funding and take advantage of government schemes and benefits
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            💡 <span className="font-medium">Pro Tip:</span> Start with company registration, then proceed with GST and other certificates
          </p>
        </div>
      </div>
    </div>
  );
}