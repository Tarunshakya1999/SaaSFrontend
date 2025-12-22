import { useState, useRef } from "react";
import { Sparkles, Download, Zap, CreditCard, FileText, Loader2, CheckCircle } from "lucide-react";

const CARD_DESIGNS = [
  { name: "Modern Minimal", gradient: "from-slate-900 to-slate-700", accent: "#3b82f6" },
  { name: "Ocean Blue", gradient: "from-blue-600 to-cyan-500", accent: "#0ea5e9" },
  { name: "Purple Dream", gradient: "from-purple-600 to-pink-500", accent: "#a855f7" },
  { name: "Forest Green", gradient: "from-emerald-600 to-teal-500", accent: "#10b981" },
  { name: "Sunset Orange", gradient: "from-orange-500 to-red-600", accent: "#f97316" },
  { name: "Royal Gold", gradient: "from-yellow-600 to-amber-700", accent: "#eab308" },
  { name: "Midnight Blue", gradient: "from-indigo-900 to-blue-800", accent: "#4f46e5" },
  { name: "Rose Pink", gradient: "from-pink-500 to-rose-600", accent: "#ec4899" },
  { name: "Tech Gradient", gradient: "from-cyan-500 to-blue-600", accent: "#06b6d4" },
  { name: "Elegant Black", gradient: "from-gray-900 to-gray-800", accent: "#6366f1" },
  { name: "Lime Fresh", gradient: "from-lime-500 to-green-600", accent: "#84cc16" },
  { name: "Crimson Red", gradient: "from-red-600 to-rose-700", accent: "#dc2626" },
  { name: "Lavender", gradient: "from-violet-500 to-purple-600", accent: "#8b5cf6" },
  { name: "Teal Wave", gradient: "from-teal-500 to-cyan-600", accent: "#14b8a6" },
  { name: "Bronze", gradient: "from-amber-600 to-orange-700", accent: "#d97706" }
];

const LETTERHEAD_DESIGNS = [
  { name: "Corporate Blue", color: "#2563eb", pattern: "lines" },
  { name: "Professional Gray", color: "#64748b", pattern: "dots" },
  { name: "Creative Purple", color: "#9333ea", pattern: "waves" },
  { name: "Modern Teal", color: "#0d9488", pattern: "grid" },
  { name: "Elegant Black", color: "#1e293b", pattern: "diagonal" },
  { name: "Fresh Green", color: "#16a34a", pattern: "circles" },
  { name: "Bold Red", color: "#dc2626", pattern: "lines" },
  { name: "Royal Navy", color: "#1e40af", pattern: "dots" },
  { name: "Warm Orange", color: "#ea580c", pattern: "waves" },
  { name: "Deep Indigo", color: "#4f46e5", pattern: "grid" }
];

export default function AiVisitingCardPro() {
  const [form, setForm] = useState({
    business: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    website: ""
  });

  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [progress, setProgress] = useState(0);
  const cardRefs = useRef([]);
  const letterRefs = useRef([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const generateDesigns = async () => {
    if (!form.business || !form.name) {
      alert("Please fill Business Name and Your Name");
      return;
    }
    
    setLoading(true);
    setGenerated(false);
    setProgress(0);

    // AI generation simulation
    const steps = [25, 50, 75, 100];
    for (let step of steps) {
      await new Promise(resolve => setTimeout(resolve, 450));
      setProgress(step);
    }

    setLoading(false);
    setGenerated(true);
  };

  const downloadCard = async (index) => {
    const element = cardRefs.current[index];
    if (!element) return;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Card dimensions (3.5 x 2 inches at 300 DPI)
      canvas.width = 1050;
      canvas.height = 600;

      const design = CARD_DESIGNS[index];
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const colors = design.gradient.includes('slate') ? ['#0f172a', '#334155'] :
                     design.gradient.includes('blue') && design.gradient.includes('cyan') ? ['#2563eb', '#06b6d4'] :
                     design.gradient.includes('purple') ? ['#9333ea', '#ec4899'] :
                     design.gradient.includes('emerald') ? ['#059669', '#14b8a6'] :
                     design.gradient.includes('orange') && design.gradient.includes('red') ? ['#f97316', '#dc2626'] :
                     design.gradient.includes('yellow') ? ['#ca8a04', '#d97706'] :
                     design.gradient.includes('indigo') ? ['#312e81', '#1e40af'] :
                     design.gradient.includes('pink') ? ['#ec4899', '#f43f5e'] :
                     design.gradient.includes('cyan') && design.gradient.includes('blue') ? ['#06b6d4', '#2563eb'] :
                     design.gradient.includes('gray-900') ? ['#111827', '#1f2937'] :
                     design.gradient.includes('lime') ? ['#84cc16', '#16a34a'] :
                     design.gradient.includes('red') && design.gradient.includes('rose') ? ['#dc2626', '#e11d48'] :
                     design.gradient.includes('violet') ? ['#8b5cf6', '#9333ea'] :
                     design.gradient.includes('teal') ? ['#14b8a6', '#06b6d4'] :
                     ['#d97706', '#ea580c'];
      
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add decorative elements
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.beginPath();
      ctx.arc(900, 100, 150, 0, Math.PI * 2);
      ctx.fill();

      // Text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 60px Arial';
      ctx.fillText(form.business, 50, 120);
      
      ctx.font = '36px Arial';
      ctx.fillText(form.name, 50, 200);
      
      ctx.font = '28px Arial';
      ctx.fillText(form.phone, 50, 350);
      ctx.fillText(form.email, 50, 400);
      if (form.website) ctx.fillText(form.website, 50, 450);

      // Accent line
      ctx.fillStyle = design.accent;
      ctx.fillRect(50, 240, 200, 6);

      // Download
      const link = document.createElement('a');
      link.download = `${form.business}_VisitingCard_${index + 1}.png`;
      link.href = canvas.toDataURL();
      link.click();

      alert('✅ Visiting Card downloaded!');
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    }
  };

  const downloadLetterhead = async (index) => {
    const element = letterRefs.current[index];
    if (!element) return;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // A4 size at 150 DPI
      canvas.width = 1240;
      canvas.height = 1754;

      const design = LETTERHEAD_DESIGNS[index];
      
      // White background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Header accent
      ctx.fillStyle = design.color;
      ctx.fillRect(0, 0, 40, canvas.height);

      // Pattern
      ctx.fillStyle = design.color;
      ctx.globalAlpha = 0.05;
      if (design.pattern === 'lines') {
        for (let i = 0; i < 20; i++) {
          ctx.fillRect(0, i * 90, canvas.width, 2);
        }
      } else if (design.pattern === 'dots') {
        for (let x = 0; x < canvas.width; x += 60) {
          for (let y = 0; y < canvas.height; y += 60) {
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Header
      ctx.fillStyle = design.color;
      ctx.font = 'bold 70px Arial';
      ctx.fillText(form.business, 100, 150);

      ctx.fillStyle = '#64748b';
      ctx.font = '32px Arial';
      ctx.fillText(form.address || 'Your Business Address', 100, 220);

      // Divider
      ctx.fillStyle = design.color;
      ctx.fillRect(100, 260, 1040, 4);

      // Content based on index
      ctx.fillStyle = '#1e293b';
      ctx.font = '28px Arial';
      
      const contents = [
        { title: 'Dear Valued Customer,', lines: ['We are pleased to inform you about our premium services', 'and solutions tailored for your business needs. Our commitment', 'to excellence ensures the highest quality standards in every', 'project we undertake.', '', 'For inquiries and partnerships, please feel free to reach out', 'to us. We look forward to serving you.'] },
        { title: 'To Whom It May Concern,', lines: ['This letter serves to introduce our company and the exceptional', 'range of services we provide. With years of industry experience,', 'we guarantee customer satisfaction and timely delivery.', '', 'We are eager to discuss how we can contribute to your success.', 'Please contact us at your convenience.'] },
        { title: 'Dear Business Partner,', lines: ['Thank you for considering our services. We specialize in', 'delivering innovative solutions that drive results. Our dedicated', 'team is committed to meeting your expectations with', 'professionalism and expertise.', '', 'Let us help you achieve your business goals. Reach out today.'] },
        { title: 'Respected Sir/Madam,', lines: ['We take pride in offering world-class services that cater to', 'diverse business requirements. Our proven track record speaks', 'to our dedication and reliability in every engagement.', '', 'We would be delighted to discuss potential collaboration', 'opportunities with you.'] },
        { title: 'Dear Esteemed Client,', lines: ['It is our pleasure to present our comprehensive suite of', 'business solutions. From consultation to execution, we ensure', 'seamless service delivery with attention to every detail.', '', 'Connect with us to explore how we can add value to your', 'organization.'] },
        { title: 'Dear Prospective Client,', lines: ['Our organization is built on the foundation of trust, quality,', 'and innovation. We offer customized solutions designed to', 'meet your unique business challenges and opportunities.', '', 'We invite you to partner with us for long-term success.'] },
        { title: 'Dear Associate,', lines: ['With a commitment to excellence, we deliver services that', 'exceed expectations. Our client-centric approach ensures that', 'every project is handled with utmost care and precision.', '', 'Feel free to contact us for more information about our offerings.'] },
        { title: 'Dear Valued Partner,', lines: ['We are dedicated to providing superior business solutions', 'backed by experience and innovation. Our team works tirelessly', 'to ensure your satisfaction at every stage of collaboration.', '', 'Let\'s work together to achieve remarkable outcomes.'] },
        { title: 'Dear Client,', lines: ['Our mission is to deliver outstanding services that help', 'businesses thrive. We combine expertise with dedication to', 'provide solutions that are both effective and reliable.', '', 'Contact us today to learn more about how we can assist you.'] },
        { title: 'Dear Respected Customer,', lines: ['We appreciate your interest in our services. Our professional', 'team is ready to support your business with innovative', 'strategies and reliable execution that deliver measurable results.', '', 'We look forward to building a lasting partnership with you.'] }
      ];

      const content = contents[index % 10];
      ctx.font = 'bold 32px Arial';
      ctx.fillText(content.title, 100, 340);
      
      ctx.font = '26px Arial';
      let yPos = 390;
      content.lines.forEach(line => {
        if (line === '') {
          yPos += 20;
        } else {
          ctx.fillText(line, 100, yPos);
          yPos += 38;
        }
      });

      // Footer
      ctx.fillStyle = design.color;
      ctx.font = '28px Arial';
      ctx.fillText(`${form.phone} | ${form.email}`, 100, canvas.height - 80);
      if (form.website) {
        ctx.fillText(form.website, 100, canvas.height - 40);
      }

      // Download
      const link = document.createElement('a');
      link.download = `${form.business}_Letterhead_${index + 1}.png`;
      link.href = canvas.toDataURL();
      link.click();

      alert('✅ Letterhead downloaded!');
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-12 h-12 text-yellow-400" />
            <h1 className="text-5xl font-bold text-white">AI Design Studio</h1>
          </div>
          <p className="text-xl text-purple-200">Create professional visiting cards & letterheads powered by AI</p>
        </div>

        {/* Input Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "business", label: "Business Name", icon: "🏢" },
              { name: "name", label: "Your Name", icon: "👤" },
              { name: "phone", label: "Phone Number", icon: "📞" },
              { name: "email", label: "Email Address", icon: "📧" },
              { name: "website", label: "Website (Optional)", icon: "🌐" },
              { name: "address", label: "Business Address", icon: "📍" }
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-white font-semibold mb-2 text-sm">
                  {field.icon} {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  disabled={loading}
                />
              </div>
            ))}
          </div>

          <button
            onClick={generateDesigns}
            disabled={loading}
            className="w-full mt-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Generating AI Designs...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Generate Designs with AI
              </>
            )}
          </button>

          {loading && (
            <div className="mt-6">
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-pink-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-purple-200 mt-3 text-sm">
                AI analyzing your brand and creating unique designs...
              </p>
            </div>
          )}
        </div>

        {/* Results */}
        {generated && (
          <div className="space-y-12">
            {/* Success Banner */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-400/30 flex items-center justify-center gap-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <p className="text-2xl font-bold text-white">
                Generated {CARD_DESIGNS.length} Visiting Cards & {LETTERHEAD_DESIGNS.length} Letterheads!
              </p>
            </div>

            {/* Visiting Cards */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-8 h-8 text-pink-400" />
                <h2 className="text-3xl font-bold text-white">Visiting Cards</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CARD_DESIGNS.map((design, i) => (
                  <div key={i} className="group">
                    <div 
                      ref={el => cardRefs.current[i] = el}
                      className={`bg-gradient-to-br ${design.gradient} rounded-2xl p-6 shadow-2xl border-2 border-white/20 transform transition-all hover:scale-105 hover:shadow-pink-500/50 relative overflow-hidden`}
                      style={{ minHeight: '240px' }}
                    >
                      {/* Decorative Circle */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                      
                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-2">{form.business}</h3>
                        <div 
                          className="w-20 h-1 rounded mb-4"
                          style={{ backgroundColor: design.accent }}
                        ></div>
                        <p className="text-lg font-semibold text-white/90 mb-3">{form.name}</p>
                        <div className="space-y-1 text-white/80 text-sm">
                          <p>📞 {form.phone}</p>
                          <p>📧 {form.email}</p>
                          {form.website && <p>🌐 {form.website}</p>}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadCard(i)}
                      className="w-full mt-3 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-white/20"
                    >
                      <Download className="w-5 h-5" />
                      Download {design.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Letterheads */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-blue-400" />
                <h2 className="text-3xl font-bold text-white">Professional Letterheads</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {LETTERHEAD_DESIGNS.map((design, i) => (
                  <div key={i} className="group">
                    <div 
                      ref={el => letterRefs.current[i] = el}
                      className="bg-white rounded-2xl p-8 shadow-2xl transform transition-all hover:scale-105 relative overflow-hidden border-l-8"
                      style={{ 
                        borderLeftColor: design.color,
                        minHeight: '320px'
                      }}
                    >
                      {/* Pattern Background */}
                      <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: design.pattern === 'lines' ? 'repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 50px)' :
                                        design.pattern === 'dots' ? 'radial-gradient(circle, #000 2px, transparent 2px)' :
                                        design.pattern === 'waves' ? 'repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 20px)' :
                                        design.pattern === 'grid' ? 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)' :
                                        'repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 40px)',
                        backgroundSize: design.pattern === 'dots' ? '30px 30px' : 
                                       design.pattern === 'grid' ? '50px 50px' : '100% 100%'
                      }}></div>

                      <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-2" style={{ color: design.color }}>{form.business}</h3>
                        <p className="text-gray-600 mb-4">{form.address || 'Your Business Address Here'}</p>
                        <div 
                          className="w-full h-1 rounded mb-6"
                          style={{ backgroundColor: design.color }}
                        ></div>
                        
                        <div className="space-y-3 my-8 text-gray-700 text-sm">
                          {i % 10 === 0 && (
                            <div>
                              <p className="font-semibold mb-2">Dear Valued Customer,</p>
                              <p>We are pleased to inform you about our premium services and solutions tailored for your business needs. Our commitment to excellence ensures the highest quality standards in every project we undertake.</p>
                              <p className="mt-2">For inquiries and partnerships, please feel free to reach out to us. We look forward to serving you.</p>
                            </div>
                          )}
                          {i % 10 === 1 && (
                            <div>
                              <p className="font-semibold mb-2">To Whom It May Concern,</p>
                              <p>This letter serves to introduce our company and the exceptional range of services we provide. With years of industry experience, we guarantee customer satisfaction and timely delivery.</p>
                              <p className="mt-2">We are eager to discuss how we can contribute to your success. Please contact us at your convenience.</p>
                            </div>
                          )}
                          {i % 10 === 2 && (
                            <div>
                              <p className="font-semibold mb-2">Dear Business Partner,</p>
                              <p>Thank you for considering our services. We specialize in delivering innovative solutions that drive results. Our dedicated team is committed to meeting your expectations with professionalism and expertise.</p>
                              <p className="mt-2">Let us help you achieve your business goals. Reach out today to get started.</p>
                            </div>
                          )}
                          {i % 10 === 3 && (
                            <div>
                              <p className="font-semibold mb-2">Respected Sir/Madam,</p>
                              <p>We take pride in offering world-class services that cater to diverse business requirements. Our proven track record speaks to our dedication and reliability in every engagement.</p>
                              <p className="mt-2">We would be delighted to discuss potential collaboration opportunities with you.</p>
                            </div>
                          )}
                          {i % 10 === 4 && (
                            <div>
                              <p className="font-semibold mb-2">Dear Esteemed Client,</p>
                              <p>It is our pleasure to present our comprehensive suite of business solutions. From consultation to execution, we ensure seamless service delivery with attention to every detail.</p>
                              <p className="mt-2">Connect with us to explore how we can add value to your organization.</p>
                            </div>
                          )}
                          {i % 10 === 5 && (
                            <div>
                              <p className="font-semibold mb-2">Dear Prospective Client,</p>
                              <p>Our organization is built on the foundation of trust, quality, and innovation. We offer customized solutions designed to meet your unique business challenges and opportunities.</p>
                              <p className="mt-2">We invite you to partner with us for long-term success and growth.</p>
                            </div>
                          )}
                          {i % 10 === 6 && (
                            <div>
                              <p className="font-semibold mb-2">Dear Associate,</p>
                              <p>With a commitment to excellence, we deliver services that exceed expectations. Our client-centric approach ensures that every project is handled with utmost care and precision.</p>
                              <p className="mt-2">Feel free to contact us for more information about our offerings.</p>
                            </div>
                          )}
                          {i % 10 === 7 && (
                            <div>
                              <p className="font-semibold mb-2">Dear Valued Partner,</p>
                              <p>We are dedicated to providing superior business solutions backed by experience and innovation. Our team works tirelessly to ensure your satisfaction at every stage of our collaboration.</p>
                              <p className="mt-2">Let's work together to achieve remarkable outcomes for your business.</p>
                            </div>
                          )}
                          {i % 10 === 8 && (
                            <div>
                              <p className="font-semibold mb-2">Dear Client,</p>
                              <p>Our mission is to deliver outstanding services that help businesses thrive. We combine expertise with dedication to provide solutions that are both effective and reliable.</p>
                              <p className="mt-2">Contact us today to learn more about how we can assist your organization.</p>
                            </div>
                          )}
                          {i % 10 === 9 && (
                            <div>
                              <p className="font-semibold mb-2">Dear Respected Customer,</p>
                              <p>We appreciate your interest in our services. Our professional team is ready to support your business with innovative strategies and reliable execution that deliver measurable results.</p>
                              <p className="mt-2">We look forward to the opportunity to serve you and build a lasting partnership.</p>
                            </div>
                          )}
                        </div>

                        <div className="mt-auto pt-6 border-t-2" style={{ borderColor: design.color }}>
                          <p className="text-sm text-gray-600">
                            📞 {form.phone} | 📧 {form.email}
                            {form.website && ` | 🌐 ${form.website}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadLetterhead(i)}
                      className="w-full mt-3 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-white/20"
                    >
                      <Download className="w-5 h-5" />
                      Download {design.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}