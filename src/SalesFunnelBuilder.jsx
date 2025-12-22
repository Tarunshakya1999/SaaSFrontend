import { useState, useEffect } from "react";
import {
  Brain,
  Sparkles,
  Download,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  BarChart,
  Zap,
  CheckCircle,
  Clock,
  ArrowRight,
  Layers,
  Filter,
  MessageSquare,
  Mail,
  CreditCard,
  Smartphone,
  Globe,
  PieChart,
  Activity,
  Share2,
  Settings,
  RefreshCw,
  Edit,
  Plus,
  Trash2,
  Save,
  Sliders,
} from "lucide-react";

export default function SalesFunnelBuilder() {
  const [businessType, setBusinessType] = useState("ecommerce");
  const [productName, setProductName] = useState("");
  const [targetAudience, setTargetAudience] = useState("general");
  const [budget, setBudget] = useState("medium");
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [showCustomizePanel, setShowCustomizePanel] = useState(false);
  const [customizedFunnel, setCustomizedFunnel] = useState(null);
  const [editingStage, setEditingStage] = useState(null);

  // Business Types
  const BUSINESS_TYPES = [
    { id: "ecommerce", name: "E-commerce", icon: "🛒", color: "from-green-500 to-emerald-500" },
    { id: "saas", name: "SaaS", icon: "💻", color: "from-blue-500 to-cyan-500" },
    { id: "coaching", name: "Coaching", icon: "🎯", color: "from-purple-500 to-pink-500" },
    { id: "agency", name: "Agency", icon: "🏢", color: "from-orange-500 to-red-500" },
    { id: "physical", name: "Physical Product", icon: "📦", color: "from-yellow-500 to-amber-500" },
    { id: "digital", name: "Digital Product", icon: "📱", color: "from-indigo-500 to-purple-500" },
  ];

  // Budget Levels
  const BUDGET_LEVELS = [
    { id: "low", name: "Low (₹5k-₹20k)", range: [5000, 20000] },
    { id: "medium", name: "Medium (₹20k-₹50k)", range: [20000, 50000] },
    { id: "high", name: "High (₹50k-₹2L)", range: [50000, 200000] },
    { id: "enterprise", name: "Enterprise (₹2L+)", range: [200000, 1000000] },
  ];

  // Target Audiences
  const AUDIENCES = [
    { id: "general", name: "General Public", icon: "👥" },
    { id: "business", name: "Business Owners", icon: "💼" },
    { id: "students", name: "Students", icon: "🎓" },
    { id: "professionals", name: "Professionals", icon: "👨‍💼" },
    { id: "parents", name: "Parents", icon: "👨‍👩‍👧" },
    { id: "seniors", name: "Seniors (50+)", icon: "👵" },
  ];

  // AI Brain - Different funnel strategies
  const AI_FUNNEL_BRAIN = {
    ecommerce: {
      stages: [
        {
          name: "Awareness",
          description: "Cold Audience Discovery",
          tactics: [
            "Facebook/Instagram Ads",
            "Google Search Ads",
            "Influencer Marketing",
            "SEO Blog Content"
          ],
          kpis: ["CTR: 2-5%", "CPC: ₹10-₹50", "Reach: 10k-50k"],
          duration: "1-2 weeks",
          budgetAllocation: "30%"
        },
        {
          name: "Interest",
          description: "Engage Warm Audience",
          tactics: [
            "Retargeting Ads",
            "Email Newsletter",
            "Product Demo Videos",
            "Customer Reviews"
          ],
          kpis: ["Engagement: 5-10%", "Email Open: 20-40%", "Video Views: 1k-5k"],
          duration: "1-2 weeks",
          budgetAllocation: "25%"
        },
        {
          name: "Consideration",
          description: "Build Trust & Desire",
          tactics: [
            "Comparison Guides",
            "Live Q&A Sessions",
            "Limited Time Offers",
            "Social Proof"
          ],
          kpis: ["Add to Cart: 3-8%", "Time on Site: 2-5 min", "Bounce Rate: <40%"],
          duration: "2-3 weeks",
          budgetAllocation: "20%"
        },
        {
          name: "Conversion",
          description: "Purchase Decision",
          tactics: [
            "Abandoned Cart Emails",
            "Exit-Intent Popups",
            "Payment Plans",
            "Free Shipping Offers"
          ],
          kpis: ["Conversion: 2-5%", "AOV: ₹1,500-₹5,000", "ROAS: 3-8x"],
          duration: "1 week",
          budgetAllocation: "15%"
        },
        {
          name: "Loyalty",
          description: "Retain & Upsell",
          tactics: [
            "Post-Purchase Emails",
            "Loyalty Programs",
            "Cross-sell Offers",
            "Customer Referrals"
          ],
          kpis: ["Repeat Purchase: 20-40%", "CLV: ₹5,000-₹20,000", "NPS: 50-80"],
          duration: "Ongoing",
          budgetAllocation: "10%"
        }
      ],
      platforms: ["Facebook Ads", "Google Ads", "Instagram", "Email Marketing", "WhatsApp Business"],
      estimatedROI: "300-500%",
      timeline: "6-8 weeks",
      successRate: "85%"
    },
    saas: {
      stages: [
        {
          name: "Discovery",
          description: "Problem Awareness",
          tactics: [
            "Content Marketing",
            "Webinars",
            "LinkedIn Ads",
            "Tech Blogs"
          ],
          kpis: ["Website Visits: 5k-20k", "Lead Cost: ₹500-₹2,000", "Demo Requests: 50-200"],
          duration: "2-3 weeks",
          budgetAllocation: "25%"
        },
        {
          name: "Evaluation",
          description: "Trial Consideration",
          tactics: [
            "Free Trial Offers",
            "Case Studies",
            "Product Demos",
            "Comparison Sheets"
          ],
          kpis: ["Trial Signups: 10-20%", "Feature Usage: 40-70%", "Support Tickets: 5-20/day"],
          duration: "2 weeks",
          budgetAllocation: "20%"
        },
        {
          name: "Conversion",
          description: "Purchase Decision",
          tactics: [
            "Onboarding Emails",
            "Success Managers",
            "Pricing Tiers",
            "Annual Discounts"
          ],
          kpis: ["Trial to Paid: 15-30%", "ACV: ₹20k-₹1L", "Churn Rate: <5%"],
          duration: "3-4 weeks",
          budgetAllocation: "30%"
        },
        {
          name: "Expansion",
          description: "Upsell & Growth",
          tactics: [
            "Usage-based Upsells",
            "Add-on Features",
            "Enterprise Plans",
            "Partner Integrations"
          ],
          kpis: ["Expansion Revenue: 20-40%", "Seat Expansion: 10-30%", "Net Revenue Retention: >100%"],
          duration: "Ongoing",
          budgetAllocation: "15%"
        },
        {
          name: "Advocacy",
          description: "Referral & Advocacy",
          tactics: [
            "Referral Programs",
            "Case Study Features",
            "User Testimonials",
            "Community Building"
          ],
          kpis: ["Referral Rate: 10-25%", "NPS: 60-90", "Social Shares: 100-500"],
          duration: "Ongoing",
          budgetAllocation: "10%"
        }
      ],
      platforms: ["LinkedIn", "Google Ads", "Content Marketing", "Email Sequences", "Product Hunt"],
      estimatedROI: "400-700%",
      timeline: "8-12 weeks",
      successRate: "80%"
    },
    coaching: {
      stages: [
        {
          name: "Attraction",
          description: "Build Authority",
          tactics: [
            "YouTube Content",
            "Free Workshops",
            "Social Media Posts",
            "Guest Podcasts"
          ],
          kpis: ["Social Followers: 1k-10k", "Workshop Attendees: 50-200", "Content Views: 5k-50k"],
          duration: "3-4 weeks",
          budgetAllocation: "20%"
        },
        {
          name: "Engagement",
          description: "Build Relationship",
          tactics: [
            "Email Newsletters",
            "Free Challenges",
            "Live Q&A Sessions",
            "Community Groups"
          ],
          kpis: ["Email List: 500-5k", "Engagement Rate: 5-15%", "Challenge Completion: 20-40%"],
          duration: "2-3 weeks",
          budgetAllocation: "25%"
        },
        {
          name: "Nurture",
          description: "Show Value",
          tactics: [
            "Success Stories",
            "Testimonial Videos",
            "Mini-Courses",
            "Consultation Calls"
          ],
          kpis: ["Call Bookings: 10-30%", "Testimonial Collection: 20-50", "Content Shares: 100-500"],
          duration: "3-4 weeks",
          budgetAllocation: "30%"
        },
        {
          name: "Sale",
          description: "Program Enrollment",
          tactics: [
            "Limited Time Offers",
            "Payment Plans",
            "Bonuses",
            "Group Discounts"
          ],
          kpis: ["Conversion: 5-15%", "Average Ticket: ₹10k-₹50k", "Close Rate: 20-40%"],
          duration: "1-2 weeks",
          budgetAllocation: "15%"
        },
        {
          name: "Results",
          description: "Client Success",
          tactics: [
            "Implementation Support",
            "Group Coaching",
            "Accountability Partners",
            "Alumni Network"
          ],
          kpis: ["Client Success: 70-90%", "Referrals: 3-10/client", "Testimonials: 80%"],
          duration: "Ongoing",
          budgetAllocation: "10%"
        }
      ],
      platforms: ["YouTube", "Instagram", "Email Marketing", "Zoom/Google Meet", "WhatsApp Groups"],
      estimatedROI: "500-1000%",
      timeline: "10-12 weeks",
      successRate: "90%"
    }
  };

  // Loading steps
  const loadingSteps = [
    "Analyzing business model...",
    "Researching target audience...",
    "Designing funnel stages...",
    "Optimizing conversion paths...",
    "Calculating budget allocation...",
    "Generating tactics & KPIs...",
    "Finalizing funnel strategy..."
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : 0));
      }, 600);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const generateFunnel = async () => {
    if (!productName.trim()) {
      alert("Please enter your product/service name");
      return;
    }

    setLoading(true);
    setLoadingStep(0);
    setAiResult(null);
    setShowCustomizePanel(false);
    setCustomizedFunnel(null);

    // Simulate AI processing
    for (let i = 0; i < loadingSteps.length; i++) {
      await new Promise((r) => setTimeout(r, 700));
      setLoadingStep(i);
    }

    const brain = AI_FUNNEL_BRAIN[businessType] || AI_FUNNEL_BRAIN.ecommerce;
    const budgetData = BUDGET_LEVELS.find(b => b.id === budget) || BUDGET_LEVELS[1];
    const audienceData = AUDIENCES.find(a => a.id === targetAudience) || AUDIENCES[0];

    // Calculate metrics based on budget
    const budgetMin = budgetData.range[0];
    const budgetMax = budgetData.range[1];
    const avgBudget = (budgetMin + budgetMax) / 2;
    
    // Generate metrics
    const estimatedLeads = Math.floor(avgBudget / (businessType === "saas" ? 1000 : 500));
    const estimatedCustomers = Math.floor(estimatedLeads * 0.05); // 5% conversion
    const estimatedRevenue = estimatedCustomers * (businessType === "saas" ? 25000 : 5000);
    const estimatedROI = ((estimatedRevenue - avgBudget) / avgBudget * 100).toFixed(0);

    const result = {
      businessType,
      productName,
      targetAudience: audienceData.name,
      budget: budgetData,
      funnelStages: brain.stages,
      platforms: brain.platforms,
      estimatedROI: brain.estimatedROI,
      timeline: brain.timeline,
      successRate: brain.successRate,
      metrics: {
        estimatedLeads,
        estimatedCustomers,
        estimatedRevenue,
        estimatedROI: `${estimatedROI}%`,
        monthlyGrowth: "15-30%",
        customerAcquisitionCost: `₹${Math.floor(avgBudget / estimatedCustomers)}`,
        lifetimeValue: `₹${businessType === "saas" ? "50,000-2,00,000" : "10,000-50,000"}`,
      },
      recommendations: [
        "Start with retargeting ads for warm audiences",
        "Implement email automation sequences",
        "Use social proof at decision stage",
        "Offer multiple payment options",
        "Create urgency with limited-time offers",
        "Follow up with abandoned cart users",
        "Implement referral program for existing customers"
      ],
      nextSteps: [
        "Set up tracking pixels",
        "Create landing pages",
        "Design email sequences",
        "Set up retargeting campaigns",
        "Prepare customer testimonials",
        "Implement analytics tracking"
      ]
    };

    setAiResult(result);
    setCustomizedFunnel(JSON.parse(JSON.stringify(result))); // Create a deep copy for customization
    setLoading(false);
    setActiveStage(0);
  };

  // NEW: Customize Funnel Function
  const handleCustomizeFunnel = () => {
    setShowCustomizePanel(!showCustomizePanel);
    if (!showCustomizePanel) {
      // Reset editing state when opening panel
      setEditingStage(null);
    }
  };

  // NEW: Edit Stage Function
  const handleEditStage = (stageIndex) => {
    setEditingStage(stageIndex);
  };

  // NEW: Save Stage Changes
  const handleSaveStage = () => {
    if (editingStage !== null && customizedFunnel) {
      const updatedFunnel = { ...customizedFunnel };
      setCustomizedFunnel(updatedFunnel);
      setAiResult(updatedFunnel); // Update main result as well
    }
    setEditingStage(null);
  };

  // NEW: Add New Tactic
  const handleAddTactic = (stageIndex) => {
    if (customizedFunnel) {
      const updatedFunnel = { ...customizedFunnel };
      const newTactic = prompt("Enter new tactic:");
      if (newTactic && newTactic.trim()) {
        updatedFunnel.funnelStages[stageIndex].tactics.push(newTactic);
        setCustomizedFunnel(updatedFunnel);
        setAiResult(updatedFunnel);
      }
    }
  };

  // NEW: Remove Tactic
  const handleRemoveTactic = (stageIndex, tacticIndex) => {
    if (customizedFunnel) {
      const updatedFunnel = { ...customizedFunnel };
      updatedFunnel.funnelStages[stageIndex].tactics.splice(tacticIndex, 1);
      setCustomizedFunnel(updatedFunnel);
      setAiResult(updatedFunnel);
    }
  };

  // NEW: Update Budget Allocation
  const handleUpdateBudget = (stageIndex, newBudget) => {
    if (customizedFunnel) {
      const updatedFunnel = { ...customizedFunnel };
      updatedFunnel.funnelStages[stageIndex].budgetAllocation = newBudget;
      setCustomizedFunnel(updatedFunnel);
      setAiResult(updatedFunnel);
    }
  };

  // NEW: Add New Stage
  const handleAddStage = () => {
    if (customizedFunnel) {
      const updatedFunnel = { ...customizedFunnel };
      const newStageName = prompt("Enter new stage name:");
      if (newStageName && newStageName.trim()) {
        updatedFunnel.funnelStages.push({
          name: newStageName,
          description: "Custom stage added by user",
          tactics: ["Custom tactic 1", "Custom tactic 2"],
          kpis: ["Custom KPI: TBD"],
          duration: "1-2 weeks",
          budgetAllocation: "10%"
        });
        setCustomizedFunnel(updatedFunnel);
        setAiResult(updatedFunnel);
      }
    }
  };

  // NEW: Remove Stage
  const handleRemoveStage = (stageIndex) => {
    if (customizedFunnel && customizedFunnel.funnelStages.length > 1) {
      const updatedFunnel = { ...customizedFunnel };
      updatedFunnel.funnelStages.splice(stageIndex, 1);
      setCustomizedFunnel(updatedFunnel);
      setAiResult(updatedFunnel);
      if (activeStage >= updatedFunnel.funnelStages.length) {
        setActiveStage(updatedFunnel.funnelStages.length - 1);
      }
    } else {
      alert("Cannot remove the last stage");
    }
  };

  // NEW: Reset to Original
  const handleResetToOriginal = () => {
    if (aiResult) {
      setCustomizedFunnel(JSON.parse(JSON.stringify(aiResult)));
      setShowCustomizePanel(false);
      setEditingStage(null);
    }
  };

  const downloadStrategy = () => {
    const resultToDownload = customizedFunnel || aiResult;
    if (!resultToDownload) return;
    
    const strategy = `
Sales Funnel Strategy for: ${resultToDownload.productName}
Generated by AI Funnel Builder

BUSINESS DETAILS:
- Type: ${resultToDownload.businessType.toUpperCase()}
- Product: ${resultToDownload.productName}
- Target Audience: ${resultToDownload.targetAudience}
- Budget: ${resultToDownload.budget.name} (₹${resultToDownload.budget.range[0].toLocaleString()} - ₹${resultToDownload.budget.range[1].toLocaleString()})

KEY METRICS:
- Estimated Leads: ${resultToDownload.metrics.estimatedLeads}
- Estimated Customers: ${resultToDownload.metrics.estimatedCustomers}
- Estimated Revenue: ₹${resultToDownload.metrics.estimatedRevenue.toLocaleString()}
- Estimated ROI: ${resultToDownload.metrics.estimatedROI}
- CAC: ${resultToDownload.metrics.customerAcquisitionCost}
- LTV: ${resultToDownload.metrics.lifetimeValue}

FUNNEL STAGES:
${resultToDownload.funnelStages.map((stage, i) => `
${i + 1}. ${stage.name} (${stage.duration})
   - ${stage.description}
   - Budget: ${stage.budgetAllocation}
   - KPIs: ${stage.kpis.join(', ')}
   - Tactics: ${stage.tactics.join(', ')}
`).join('')}

RECOMMENDED PLATFORMS:
${resultToDownload.platforms.map(p => `• ${p}`).join('\n')}

AI RECOMMENDATIONS:
${resultToDownload.recommendations.map(r => `✓ ${r}`).join('\n')}

NEXT STEPS:
${resultToDownload.nextSteps.map(s => `→ ${s}`).join('\n')}

${customizedFunnel ? '✓ Customized by User' : ''}
Generated on: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([strategy], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${productName.toLowerCase().replace(/\s+/g, '-')}-funnel-strategy.txt`;
    link.click();
  };

  const getCurrentBusinessType = () => BUSINESS_TYPES.find(t => t.id === businessType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="mb-10 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-2 flex items-center gap-3">
                <div className="relative">
                  <Brain className="text-purple-400" size={40} />
                  <TrendingUp className="absolute -top-2 -right-2 text-green-400 animate-pulse" size={20} />
                </div>
                AI Sales Funnel Builder
              </h1>
              <p className="text-gray-300 text-lg">
                Build high-converting sales funnels powered by artificial intelligence
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">AI Optimizer Active</span>
            </div>
          </div>
        </header>

        {/* MAIN FORM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* LEFT PANEL - INPUT */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="text-purple-400" />
                  Funnel Configuration
                </h2>
                <p className="text-gray-300 mb-6">Let AI design your perfect sales funnel</p>
              </div>

              <div className="space-y-6">
                {/* Business Type */}
                <div>
                  <label className="block mb-3 font-medium">Business Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {BUSINESS_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setBusinessType(type.id)}
                        className={`p-4 rounded-2xl border-2 transition-all ${businessType === type.id
                            ? `border-purple-500 bg-gradient-to-br ${type.color}`
                            : "border-white/10 bg-white/5 hover:bg-white/10"
                          }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-2xl">{type.icon}</span>
                          <span className="text-sm font-medium">{type.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Name */}
                <div>
                  <label className="block mb-3 font-medium">Product/Service Name</label>
                  <input
                    placeholder="Enter your product or service name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full p-4 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-purple-500 transition"
                  />
                </div>

                {/* Target Audience */}
                <div>
                  <label className="block mb-3 font-medium">Target Audience</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {AUDIENCES.map((audience) => (
                      <button
                        key={audience.id}
                        onClick={() => setTargetAudience(audience.id)}
                        className={`p-3 rounded-xl border transition ${targetAudience === audience.id
                            ? "bg-purple-600 border-purple-600"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{audience.icon}</span>
                          <span className="text-sm">{audience.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block mb-3 font-medium">Monthly Marketing Budget</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {BUDGET_LEVELS.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setBudget(level.id)}
                        className={`p-3 rounded-xl border transition ${budget === level.id
                            ? "bg-gradient-to-r from-green-600 to-emerald-600 border-green-500"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                          }`}
                      >
                        <div className="text-center">
                          <DollarSign className="inline-block mb-1" size={16} />
                          <span className="text-sm font-medium">{level.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateFunnel}
                  disabled={loading}
                  className="w-full py-5 rounded-xl font-bold text-lg
                    bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600
                    hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30
                    transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      AI Building Funnel...
                    </>
                  ) : (
                    <>
                      <Sparkles size={24} />
                      Generate AI-Powered Funnel
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - PREVIEW */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-3xl p-6 h-full">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BarChart className="text-cyan-400" />
                Preview
              </h3>
              {getCurrentBusinessType() && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br ${getCurrentBusinessType().color}`}>
                      <span className="text-3xl">{getCurrentBusinessType().icon}</span>
                    </div>
                    <h4 className="text-2xl font-bold">{getCurrentBusinessType().name}</h4>
                    <p className="text-gray-400 mt-2">Funnel Type</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Funnel Stages:</span>
                      <span className="font-semibold">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Avg. Duration:</span>
                      <span className="font-semibold">6-10 weeks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Success Rate:</span>
                      <span className="font-semibold text-green-400">80-90%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Platforms:</span>
                      <span className="font-semibold">4-5</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <p className="text-gray-400 text-sm mb-3">
                      AI will generate:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Stage-by-stage strategy</li>
                      <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Budget allocation</li>
                      <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Conversion tactics</li>
                      <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> ROI projections</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="mb-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full border-4 border-purple-500/30"></div>
                <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
                <TrendingUp className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-400" size={40} />
              </div>

              <h3 className="text-2xl font-bold mb-6 text-center">AI is building your sales funnel</h3>

              <div className="w-full max-w-2xl space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round((loadingStep + 1) / loadingSteps.length * 100)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                  ></div>
                </div>

                <div className="mt-8 space-y-3">
                  {loadingSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-xl ${index <= loadingStep
                          ? "bg-purple-500/10 border border-purple-500/20"
                          : "bg-gray-800/30"
                        }`}
                    >
                      {index <= loadingStep ? (
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                          <Clock size={14} className="text-gray-400" />
                        </div>
                      )}
                      <span className={index <= loadingStep ? "text-white" : "text-gray-400"}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CUSTOMIZATION PANEL */}
        {showCustomizePanel && aiResult && (
          <div className="mb-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/30 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Edit className="text-yellow-400" />
                Customize Your Funnel
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleResetToOriginal}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2"
                >
                  <RefreshCw size={16} /> Reset
                </button>
                <button
                  onClick={handleCustomizeFunnel}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Add New Stage Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleAddStage}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center gap-2 hover:scale-105 transition"
                >
                  <Plus size={20} /> Add New Stage
                </button>
              </div>

              {/* Stages Customization */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customizedFunnel?.funnelStages.map((stage, stageIndex) => (
                  <div
                    key={stageIndex}
                    className={`bg-gray-800/50 border rounded-xl p-4 ${editingStage === stageIndex ? 'border-yellow-500' : 'border-gray-700'}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold">{stage.name}</h4>
                        <p className="text-sm text-gray-400">{stage.description}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEditStage(stageIndex)}
                          className="p-1 hover:bg-gray-700 rounded"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleRemoveStage(stageIndex)}
                          className="p-1 hover:bg-red-900/30 rounded text-red-400"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {editingStage === stageIndex ? (
                      <div className="space-y-3">
                        {/* Edit Budget Allocation */}
                        <div>
                          <label className="text-sm text-gray-400">Budget Allocation</label>
                          <select
                            value={stage.budgetAllocation}
                            onChange={(e) => handleUpdateBudget(stageIndex, e.target.value)}
                            className="w-full p-2 bg-gray-900 rounded mt-1"
                          >
                            <option value="5%">5%</option>
                            <option value="10%">10%</option>
                            <option value="15%">15%</option>
                            <option value="20%">20%</option>
                            <option value="25%">25%</option>
                            <option value="30%">30%</option>
                          </select>
                        </div>

                        {/* Edit Tactics */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-sm text-gray-400">Tactics</label>
                            <button
                              onClick={() => handleAddTactic(stageIndex)}
                              className="text-xs bg-green-700 hover:bg-green-600 px-2 py-1 rounded flex items-center gap-1"
                            >
                              <Plus size={12} /> Add
                            </button>
                          </div>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {stage.tactics.map((tactic, tacticIndex) => (
                              <div key={tacticIndex} className="flex justify-between items-center bg-gray-900/50 p-2 rounded">
                                <span className="text-sm">{tactic}</span>
                                <button
                                  onClick={() => handleRemoveTactic(stageIndex, tacticIndex)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={handleSaveStage}
                          className="w-full py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded flex items-center justify-center gap-2"
                        >
                          <Save size={16} /> Save Changes
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Budget:</span>
                          <span className="font-semibold text-green-400">{stage.budgetAllocation}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Duration:</span>
                          <span>{stage.duration}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-400">Tactics:</span>
                          <div className="mt-1 text-xs text-gray-300">
                            {stage.tactics.slice(0, 2).map((t, i) => (
                              <div key={i}>• {t}</div>
                            ))}
                            {stage.tactics.length > 2 && (
                              <div className="text-gray-500">+{stage.tactics.length - 2} more</div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Customization Summary */}
              <div className="bg-gray-900/50 rounded-xl p-4 mt-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Sliders className="text-purple-400" />
                  Customization Summary
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{customizedFunnel?.funnelStages.length}</div>
                    <div className="text-gray-400">Total Stages</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {customizedFunnel?.funnelStages.reduce((acc, stage) => 
                        acc + parseInt(stage.budgetAllocation), 0
                      )}%
                    </div>
                    <div className="text-gray-400">Total Budget</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {customizedFunnel?.funnelStages.reduce((acc, stage) => 
                        acc + stage.tactics.length, 0
                      )}
                    </div>
                    <div className="text-gray-400">Total Tactics</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">✓</div>
                    <div className="text-gray-400">Customized</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESULTS SECTION */}
        {!loading && aiResult && (
          <div className="space-y-8">
            {/* AI MESSAGE */}
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Brain size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI Funnel Strategy Generated</h3>
                  <div className="text-gray-200">
                    <p>Successfully designed a {aiResult.businessType} sales funnel for <strong>{aiResult.productName}</strong> targeting <strong>{aiResult.targetAudience}</strong>.</p>
                    <p className="mt-2">Based on your ₹{aiResult.budget.range[0].toLocaleString()}-₹{aiResult.budget.range[1].toLocaleString()} budget, AI predicts <strong>{aiResult.metrics.estimatedROI} ROI</strong> with <strong>{aiResult.successRate} success rate</strong>.</p>
                    {customizedFunnel && customizedFunnel !== aiResult && (
                      <p className="mt-2 text-yellow-400">
                        <Sparkles size={16} className="inline mr-2" />
                        This funnel has been customized with your changes.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* KEY METRICS */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Activity className="text-green-400" />
                Projected Results
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-green-400">{aiResult.metrics.estimatedLeads}+</div>
                  <div className="text-gray-400 text-sm">Estimated Leads</div>
                </div>
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-blue-400">{aiResult.metrics.estimatedCustomers}+</div>
                  <div className="text-gray-400 text-sm">Estimated Customers</div>
                </div>
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-purple-400">₹{aiResult.metrics.estimatedRevenue.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Estimated Revenue</div>
                </div>
                <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-orange-400">{aiResult.metrics.estimatedROI}</div>
                  <div className="text-gray-400 text-sm">Estimated ROI</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-cyan-400" />
                    <span>CAC: {aiResult.metrics.customerAcquisitionCost}</span>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={16} className="text-green-400" />
                    <span>LTV: {aiResult.metrics.lifetimeValue}</span>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp size={16} className="text-purple-400" />
                    <span>Growth: {aiResult.metrics.monthlyGrowth}/month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FUNNEL STAGES VISUALIZATION */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <Layers className="text-purple-400" />
                  Sales Funnel Stages
                  {customizedFunnel && customizedFunnel !== aiResult && (
                    <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full ml-2">
                      Customized
                    </span>
                  )}
                </h3>
                <button
                  onClick={() => setShowCustomizePanel(!showCustomizePanel)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center gap-2 hover:scale-105 transition"
                >
                  <Settings size={16} />
                  {showCustomizePanel ? "Hide Customizer" : "Customize Funnel"}
                </button>
              </div>
              
              {/* Stage Navigation */}
              <div className="flex flex-wrap gap-2 mb-6">
                {aiResult.funnelStages.map((stage, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStage(index)}
                    className={`px-4 py-2 rounded-full border transition ${activeStage === index
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{stage.name}</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {index + 1}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Stage Details */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                        <span className="font-bold">{activeStage + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">{aiResult.funnelStages[activeStage].name}</h4>
                        <p className="text-gray-400">{aiResult.funnelStages[activeStage].description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-black/30 rounded-xl p-4">
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <Clock size={16} className="text-cyan-400" />
                          Duration & Budget
                        </h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Duration:</span>
                            <span className="font-semibold">{aiResult.funnelStages[activeStage].duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Budget Allocation:</span>
                            <span className="font-semibold text-green-400">{aiResult.funnelStages[activeStage].budgetAllocation}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-black/30 rounded-xl p-4">
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <BarChart size={16} className="text-green-400" />
                          Key Performance Indicators
                        </h5>
                        <ul className="space-y-1">
                          {aiResult.funnelStages[activeStage].kpis.map((kpi, i) => (
                            <li key={i} className="text-sm text-gray-300">{kpi}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Tactics */}
                  <div className="md:w-1/3">
                    <div className="bg-black/40 rounded-xl p-4 border border-white/10">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-semibold flex items-center gap-2">
                          <Zap size={16} className="text-yellow-400" />
                          Recommended Tactics
                        </h5>
                        {showCustomizePanel && (
                          <button
                            onClick={() => handleEditStage(activeStage)}
                            className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded flex items-center gap-1"
                          >
                            <Edit size={12} /> Edit
                          </button>
                        )}
                      </div>
                      <ul className="space-y-2">
                        {aiResult.funnelStages[activeStage].tactics.map((tactic, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle size={12} className="text-green-400" />
                            </div>
                            <span>{tactic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Funnel Progress</span>
                  <span>Stage {activeStage + 1} of {aiResult.funnelStages.length}</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-500"
                    style={{ width: `${((activeStage + 1) / aiResult.funnelStages.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* PLATFORMS & RECOMMENDATIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Recommended Platforms */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Globe className="text-blue-400" />
                    Recommended Platforms
                  </h3>
                  <div className="space-y-3">
                    {aiResult.platforms.map((platform, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                            {platform.includes("Facebook") && "📘"}
                            {platform.includes("Google") && "🔍"}
                            {platform.includes("Instagram") && "📷"}
                            {platform.includes("Email") && "📧"}
                            {platform.includes("LinkedIn") && "💼"}
                            {platform.includes("YouTube") && "🎬"}
                            {!["Facebook", "Google", "Instagram", "Email", "LinkedIn", "YouTube"].some(p => platform.includes(p)) && "📱"}
                          </div>
                          <span className="font-medium">{platform}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {platform.includes("Ads") ? "Paid" : "Organic"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Sparkles className="text-yellow-400" />
                    AI Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {aiResult.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle size={14} className="text-purple-400" />
                        </div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Timeline & ROI */}
                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-3xl p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <Clock className="text-cyan-400" />
                        Timeline
                      </h3>
                      <div className="space-y-3">
                        <div className="text-3xl font-bold text-cyan-400">
                          {aiResult.timeline}
                        </div>
                        <p className="text-gray-400 text-sm">From setup to results</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <TrendingUp className="text-green-400" />
                        Expected ROI
                      </h3>
                      <div className="space-y-3">
                        <div className="text-3xl font-bold text-green-400">
                          {aiResult.estimatedROI}
                        </div>
                        <p className="text-gray-400 text-sm">Based on industry data</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <ArrowRight className="text-green-400" />
                    Next Steps
                  </h3>
                  <ul className="space-y-3">
                    {aiResult.nextSteps.map((step, i) => (
                      <li key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                          <span className="font-bold">{i + 1}</span>
                        </div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-3xl p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={downloadStrategy}
                      className="flex-1 flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold hover:scale-105 transition"
                    >
                      <Download /> Download Strategy
                    </button>
                    <button 
                      onClick={handleCustomizeFunnel}
                      className="flex-1 flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold hover:scale-105 transition"
                    >
                      <Settings /> {showCustomizePanel ? "Hide Customizer" : "Customize Funnel"}
                    </button>
                  </div>
                  <p className="text-center text-gray-300 mt-4 text-sm">
                    Complete with timelines, budgets, and conversion tactics
                  </p>
                </div>
              </div>
            </div>

            {/* FUNNEL VISUALIZATION */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Filter className="text-purple-400" />
                Funnel Visualization
              </h3>
              <div className="relative">
                {/* Funnel Graphic */}
                <div className="flex flex-col items-center">
                  {aiResult.funnelStages.map((stage, index) => (
                    <div key={index} className="relative w-full max-w-2xl">
                      {/* Stage Bar */}
                      <div className={`flex items-center justify-between p-4 rounded-xl mb-4 transition-all duration-300 ${activeStage === index
                          ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/50"
                          : "bg-white/5 border border-white/10"
                        }`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activeStage === index
                              ? "bg-gradient-to-r from-purple-600 to-blue-600"
                              : "bg-white/10"
                            }`}>
                            <span className="font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-bold">{stage.name}</h4>
                            <p className="text-gray-400 text-sm">{stage.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">Budget</div>
                          <div className="font-bold text-green-400">{stage.budgetAllocation}</div>
                        </div>
                      </div>

                      {/* Connector Line */}
                      {index < aiResult.funnelStages.length - 1 && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Conversion Metrics */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
                  {aiResult.funnelStages.map((stage, index) => (
                    <div
                      key={index}
                      className="text-center"
                      onClick={() => setActiveStage(index)}
                    >
                      <div className={`w-16 h-16 rounded-full flex flex-col items-center justify-center mx-auto mb-2 cursor-pointer transition ${activeStage === index
                          ? "bg-gradient-to-r from-purple-600 to-blue-600"
                          : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        <span className="text-xs">Stage</span>
                        <span className="text-xl font-bold">{index + 1}</span>
                      </div>
                      <div className="text-sm font-medium">{stage.name}</div>
                      <div className="text-xs text-gray-400">{stage.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>
            🚀 AI Sales Funnel Builder generates data-driven funnel strategies based on industry best practices.
          </p>
          <p className="mt-2">
            All projections are estimates based on historical data and current market trends.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <span className="flex items-center gap-2">
              <Target size={16} /> Conversion Focused
            </span>
            <span className="flex items-center gap-2">
              <BarChart size={16} /> Data Driven
            </span>
            <span className="flex items-center gap-2">
              <Zap size={16} /> AI Optimized
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}