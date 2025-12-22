import { useState, useRef } from "react";
import { Sparkles, Download, Loader2, Presentation, FileText, TrendingUp, Users, Target, DollarSign, Lightbulb, BarChart3, Rocket, CheckCircle2 } from "lucide-react";

const PITCH_THEMES = [
  { name: "Tech Startup", colors: { primary: "#3b82f6", secondary: "#1e40af", bg: "#eff6ff" }, icon: "💻" },
  { name: "Modern Corporate", colors: { primary: "#6366f1", secondary: "#4f46e5", bg: "#eef2ff" }, icon: "🏢" },
  { name: "Creative Agency", colors: { primary: "#ec4899", secondary: "#db2777", bg: "#fdf2f8" }, icon: "🎨" },
  { name: "Finance & Investment", colors: { primary: "#059669", secondary: "#047857", bg: "#ecfdf5" }, icon: "💰" },
  { name: "Healthcare", colors: { primary: "#0ea5e9", secondary: "#0284c7", bg: "#f0f9ff" }, icon: "⚕️" },
  { name: "E-commerce", colors: { primary: "#f97316", secondary: "#ea580c", bg: "#fff7ed" }, icon: "🛒" },
  { name: "Education", colors: { primary: "#8b5cf6", secondary: "#7c3aed", bg: "#f5f3ff" }, icon: "📚" },
  { name: "Real Estate", colors: { primary: "#14b8a6", secondary: "#0d9488", bg: "#f0fdfa" }, icon: "🏠" },
  { name: "Food & Beverage", colors: { primary: "#ef4444", secondary: "#dc2626", bg: "#fef2f2" }, icon: "🍽️" },
  { name: "Consulting", colors: { primary: "#64748b", secondary: "#475569", bg: "#f8fafc" }, icon: "📊" }
];

const PROFILE_TEMPLATES = [
  { name: "Executive Summary", icon: <FileText className="w-6 h-6" /> },
  { name: "Company Overview", icon: <Users className="w-6 h-6" /> },
  { name: "Market Analysis", icon: <TrendingUp className="w-6 h-6" /> },
  { name: "Product/Service", icon: <Lightbulb className="w-6 h-6" /> },
  { name: "Financial Projection", icon: <BarChart3 className="w-6 h-6" /> }
];

export default function AiPitchDeckGenerator() {
  const [form, setForm] = useState({
    businessName: "",
    tagline: "",
    industry: "",
    problem: "",
    solution: "",
    targetMarket: "",
    revenue: "",
    funding: "",
    team: "",
    vision: ""
  });

  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("pitch");
  const pitchRefs = useRef([]);
  const profileRefs = useRef([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateContent = async () => {
    if (!form.businessName || !form.industry) {
      alert("Please fill Business Name and Industry");
      return;
    }

    setLoading(true);
    setGenerated(false);
    setProgress(0);

    const steps = [15, 30, 45, 60, 75, 90, 100];
    for (let step of steps) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setProgress(step);
    }

    setLoading(false);
    setGenerated(true);
  };

  const downloadPitchDeck = async (index) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1920;
    canvas.height = 1080;

    const theme = PITCH_THEMES[index];
    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, theme.colors.bg);
    gradient.addColorStop(1, theme.colors.primary + '20');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = theme.colors.primary + '15';
    ctx.beginPath();
    ctx.arc(1700, 200, 300, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(200, 900, 250, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = theme.colors.primary;
    ctx.font = 'bold 100px Arial';
    ctx.fillText(form.businessName, 100, 200);

    ctx.fillStyle = theme.colors.secondary;
    ctx.font = '48px Arial';
    ctx.fillText(form.tagline || 'Transforming the Future', 100, 280);

    ctx.fillStyle = theme.colors.primary;
    ctx.fillRect(100, 320, 400, 8);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 52px Arial';
    ctx.fillText('The Problem', 100, 450);
    ctx.font = '36px Arial';
    const problemLines = wrapText(ctx, form.problem || 'Market challenges that need solving', 1600);
    problemLines.slice(0, 3).forEach((line, i) => {
      ctx.fillText(line, 100, 520 + i * 50);
    });

    ctx.fillStyle = theme.colors.primary;
    ctx.font = 'bold 52px Arial';
    ctx.fillText('Our Solution', 100, 750);
    ctx.fillStyle = '#1e293b';
    ctx.font = '36px Arial';
    const solutionLines = wrapText(ctx, form.solution || 'Innovative approach to solve the problem', 1600);
    solutionLines.slice(0, 3).forEach((line, i) => {
      ctx.fillText(line, 100, 820 + i * 50);
    });

    ctx.fillStyle = theme.colors.secondary;
    ctx.font = '32px Arial';
    ctx.fillText(`${theme.icon} ${theme.name} Theme | ${form.industry}`, 100, 1020);

    const link = document.createElement('a');
    link.download = `${form.businessName}_PitchDeck_${theme.name}.png`;
    link.href = canvas.toDataURL();
    link.click();

    alert(`✅ Pitch Deck (${theme.name}) downloaded!`);
  };

  const downloadProfile = async (index) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1754;
    canvas.height = 1240;

    const template = PROFILE_TEMPLATES[index];
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
    const color = colors[index % colors.length];

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, 150);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 70px Arial';
    ctx.fillText(form.businessName, 60, 95);

    ctx.fillStyle = color;
    ctx.font = 'bold 60px Arial';
    ctx.fillText(template.name, 60, 260);

    ctx.fillRect(60, 290, 300, 6);

    ctx.fillStyle = '#1e293b';
    ctx.font = '32px Arial';
    
    let yPos = 370;
    
    if (index === 0) {
      ctx.font = 'bold 38px Arial';
      ctx.fillText('Business Overview', 60, yPos);
      yPos += 60;
      ctx.font = '32px Arial';
      const lines = [
        `${form.businessName} is a ${form.industry || 'innovative'} company`,
        `focused on ${form.solution || 'delivering exceptional solutions'}.`,
        ``,
        `We address ${form.problem || 'critical market needs'} through`,
        `our unique approach and expertise.`
      ];
      lines.forEach(line => {
        if (line) ctx.fillText(line, 60, yPos);
        yPos += 50;
      });
    } else if (index === 1) {
      ctx.font = 'bold 38px Arial';
      ctx.fillText('About Us', 60, yPos);
      yPos += 60;
      ctx.font = '32px Arial';
      const lines = [
        `Industry: ${form.industry || 'Technology & Innovation'}`,
        `Vision: ${form.vision || 'Leading market transformation'}`,
        ``,
        `Our Mission:`,
        `To provide world-class solutions that empower businesses`,
        `and create lasting value for our customers.`
      ];
      lines.forEach(line => {
        if (line) ctx.fillText(line, 60, yPos);
        yPos += 50;
      });
    } else if (index === 2) {
      ctx.font = 'bold 38px Arial';
      ctx.fillText('Market Opportunity', 60, yPos);
      yPos += 60;
      ctx.font = '32px Arial';
      const lines = [
        `Target Market: ${form.targetMarket || 'Global enterprises and SMBs'}`,
        ``,
        `Market Size: Growing rapidly with significant potential`,
        `Competition: Differentiated through innovation`,
        `Strategy: Focused on customer success and scalability`
      ];
      lines.forEach(line => {
        if (line) ctx.fillText(line, 60, yPos);
        yPos += 50;
      });
    } else if (index === 3) {
      ctx.font = 'bold 38px Arial';
      ctx.fillText('Our Offering', 60, yPos);
      yPos += 60;
      ctx.font = '32px Arial';
      const lines = [
        `Solution: ${form.solution || 'Cutting-edge technology platform'}`,
        ``,
        `Key Features:`,
        `• Innovative approach to problem solving`,
        `• Scalable and reliable infrastructure`,
        `• Customer-centric design and experience`
      ];
      lines.forEach(line => {
        if (line) ctx.fillText(line, 60, yPos);
        yPos += 50;
      });
    } else {
      ctx.font = 'bold 38px Arial';
      ctx.fillText('Financial Overview', 60, yPos);
      yPos += 60;
      ctx.font = '32px Arial';
      const lines = [
        `Revenue Model: ${form.revenue || 'Subscription-based recurring revenue'}`,
        `Funding: ${form.funding || 'Bootstrapped / Seeking investment'}`,
        ``,
        `Projected Growth: Strong trajectory with proven metrics`,
        `ROI: Attractive returns for stakeholders`
      ];
      lines.forEach(line => {
        if (line) ctx.fillText(line, 60, yPos);
        yPos += 50;
      });
    }

    ctx.fillStyle = color;
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText(`${form.businessName} | Business Profile`, 60, canvas.height - 45);

    const link = document.createElement('a');
    link.download = `${form.businessName}_Profile_${template.name.replace(/\//g, '-')}.png`;
    link.href = canvas.toDataURL();
    link.click();

    alert(`✅ Business Profile (${template.name}) downloaded!`);
  };

  const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      const testLine = currentLine + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine.trim());
    return lines;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="w-12 h-12 text-yellow-400 animate-bounce" />
            <h1 className="text-5xl font-bold text-white">AI Pitch Deck Studio</h1>
            <Presentation className="w-12 h-12 text-pink-400 animate-pulse" />
          </div>
          <p className="text-xl text-purple-200">Generate professional pitch decks & business profiles with AI</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                🏢 Business Name *
              </label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your business name"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                💡 Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your company tagline"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                🏭 Industry *
              </label>
              <input
                type="text"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Technology, Healthcare, E-commerce"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                🎯 Target Market
              </label>
              <input
                type="text"
                name="targetMarket"
                value={form.targetMarket}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Who are your customers?"
                disabled={loading}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white font-semibold mb-2">
                ⚠️ Problem Statement
              </label>
              <textarea
                name="problem"
                value={form.problem}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                placeholder="What problem are you solving?"
                disabled={loading}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white font-semibold mb-2">
                ✅ Your Solution
              </label>
              <textarea
                name="solution"
                value={form.solution}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                placeholder="How does your product/service solve it?"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                💰 Revenue Model
              </label>
              <input
                type="text"
                name="revenue"
                value={form.revenue}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="How do you make money?"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                🚀 Funding Status
              </label>
              <input
                type="text"
                name="funding"
                value={form.funding}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Bootstrapped / Seeking / Series A, etc."
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                👥 Team Size
              </label>
              <input
                type="text"
                name="team"
                value={form.team}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Number of team members"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                🔮 Vision
              </label>
              <input
                type="text"
                name="vision"
                value={form.vision}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your long-term vision"
                disabled={loading}
              />
            </div>
          </div>

          <button
            onClick={generateContent}
            disabled={loading}
            className="w-full mt-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                AI is Crafting Your Materials...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Generate Pitch Deck & Profile
              </>
            )}
          </button>

          {loading && (
            <div className="mt-6">
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-center gap-2 text-purple-200 mt-3">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="text-sm">Analyzing business data and creating professional materials...</span>
              </div>
            </div>
          )}
        </div>

        {generated && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-400/30 flex items-center justify-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <p className="text-2xl font-bold text-white">
                Generated {PITCH_THEMES.length} Pitch Decks & {PROFILE_TEMPLATES.length} Business Profiles!
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setActiveTab("pitch")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "pitch"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <Presentation className="w-5 h-5" />
                Pitch Decks ({PITCH_THEMES.length})
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "profile"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <FileText className="w-5 h-5" />
                Business Profiles ({PROFILE_TEMPLATES.length})
              </button>
            </div>

            {activeTab === "pitch" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Presentation className="w-8 h-8 text-pink-400" />
                  <h2 className="text-3xl font-bold text-white">Professional Pitch Decks</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PITCH_THEMES.map((theme, i) => (
                    <div key={i} className="group">
                      <div 
                        ref={el => pitchRefs.current[i] = el}
                        className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:scale-105"
                        style={{ 
                          backgroundColor: theme.colors.bg,
                          aspectRatio: '16/9'
                        }}
                      >
                        <div 
                          className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 -mr-24 -mt-24"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div 
                          className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-20 -ml-20 -mb-20"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />

                        <div className="relative z-10 p-8">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">{theme.icon}</span>
                            <h3 
                              className="text-3xl font-bold"
                              style={{ color: theme.colors.primary }}
                            >
                              {form.businessName}
                            </h3>
                          </div>
                          
                          <p 
                            className="text-xl font-semibold mb-4"
                            style={{ color: theme.colors.secondary }}
                          >
                            {form.tagline || "Transforming the Future"}
                          </p>

                          <div 
                            className="w-32 h-1 rounded mb-6"
                            style={{ backgroundColor: theme.colors.primary }}
                          />

                          <div className="space-y-3 text-gray-700">
                            <div>
                              <p className="font-bold text-sm" style={{ color: theme.colors.primary }}>THE PROBLEM</p>
                              <p className="text-sm">{form.problem || "Market challenges that need solving"}</p>
                            </div>
                            <div>
                              <p className="font-bold text-sm" style={{ color: theme.colors.primary }}>OUR SOLUTION</p>
                              <p className="text-sm">{form.solution || "Innovative approach to solve the problem"}</p>
                            </div>
                          </div>
                        </div>

                        <div 
                          className="absolute bottom-0 left-0 right-0 p-4"
                          style={{ backgroundColor: theme.colors.primary + '15' }}
                        >
                          <p className="text-sm font-semibold" style={{ color: theme.colors.secondary }}>
                            {theme.name} | {form.industry}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => downloadPitchDeck(i)}
                        className="w-full mt-3 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-white/20"
                      >
                        <Download className="w-5 h-5" />
                        Download {theme.name} Deck
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-8 h-8 text-blue-400" />
                  <h2 className="text-3xl font-bold text-white">Business Profiles</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PROFILE_TEMPLATES.map((template, i) => {
                    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
                    const color = colors[i % colors.length];

                    return (
                      <div key={i} className="group">
                        <div 
                          ref={el => profileRefs.current[i] = el}
                          className="bg-white rounded-2xl p-6 shadow-2xl transform transition-all hover:scale-105"
                          style={{ minHeight: '320px' }}
                        >
                          <div 
                            className="w-full h-16 rounded-t-xl -mx-6 -mt-6 mb-6 flex items-center px-6"
                            style={{ backgroundColor: color }}
                          >
                            <h3 className="text-2xl font-bold text-white">{form.businessName}</h3>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                              <div 
                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: color + '20' }}
                              >
                                {template.icon}
                              </div>
                              <h4 className="text-xl font-bold" style={{ color: color }}>
                                {template.name}
                              </h4>
                            </div>

                            <div 
                              className="w-full h-1 rounded"
                              style={{ backgroundColor: color }}
                            />

                            <div className="text-sm text-gray-600 space-y-2">
                              {i === 0 && (
                                <>
                                  <p className="font-semibold">Business Overview</p>
                                  <p>{form.businessName} in {form.industry}</p>
                                  <p>Focus: {form.solution || "Innovative solutions"}</p>
                                </>
                              )}
                              {i === 1 && (
                                <>
                                  <p className="font-semibold">Company Details</p>
                                  <p>Industry: {form.industry}</p>
                                  <p>Vision: {form.vision || "Market leader"}</p>
                                </>
                              )}
                              {i === 2 && (
                                <>
                                  <p className="font-semibold">Market Analysis</p>
                                  <p>Target: {form.targetMarket || "Global market"}</p>
                                  <p>Strategy: Growth-focused</p>
                                </>
                              )}
                              {i === 3 && (
                                <>
                                  <p className="font-semibold">Product/Service</p>
                                  <p>Solution: {form.solution || "Innovative platform"}</p>
                                  <p>Market fit: Validated</p>
                                </>
                              )}
                              {i === 4 && (
                                <>
                                  <p className="font-semibold">Financials</p>
                                  <p>Revenue: {form.revenue || "Subscription model"}</p>
                                  <p>Funding: {form.funding || "Seed stage"}</p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => downloadProfile(i)}
                          className="w-full mt-3 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-white/20"
                        >
                          <Download className="w-5 h-5" />
                          Download {template.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              backgroundColor: ['#fbbf24', '#ec4899', '#8b5cf6', '#3b82f6'][Math.floor(Math.random() * 4)],
              opacity: 0.3,
              borderRadius: '50%',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}