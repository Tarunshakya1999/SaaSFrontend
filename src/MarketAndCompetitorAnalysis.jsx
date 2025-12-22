import { useState, useEffect, useRef } from "react";
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
  Search,
  Globe,
  Shield,
  Award,
  Activity,
  PieChart,
  LineChart,
  TrendingDown,
  Eye,
  MessageSquare,
  Share2,
  Filter,
  Map,
  Briefcase,
  Building,
  Layers,
  Cpu,
  Database,
  Server,
  Network,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Star,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  RotateCw,
  Maximize2,
  Minimize2,
} from "lucide-react";

export default function MarketAndCompetitorAnalysis() {
  const [industry, setIndustry] = useState("tech");
  const [productName, setProductName] = useState("");
  const [region, setRegion] = useState("india");
  const [timeframe, setTimeframe] = useState("6m");
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [activeTab, setActiveTab] = useState("market");
  const [competitorIndex, setCompetitorIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [fullscreenChart, setFullscreenChart] = useState(null);
  
  const animationRef = useRef(null);
  const chartAnimationRef = useRef(null);

  // Industries
  const INDUSTRIES = [
    { id: "tech", name: "Technology", icon: "💻", color: "from-blue-500 to-cyan-500" },
    { id: "ecommerce", name: "E-commerce", icon: "🛒", color: "from-green-500 to-emerald-500" },
    { id: "finance", name: "Finance", icon: "💰", color: "from-yellow-500 to-amber-500" },
    { id: "health", name: "Healthcare", icon: "🏥", color: "from-red-500 to-rose-500" },
    { id: "education", name: "Education", icon: "🎓", color: "from-purple-500 to-pink-500" },
    { id: "saas", name: "SaaS", icon: "☁️", color: "from-indigo-500 to-purple-500" },
  ];

  // Regions
  const REGIONS = [
    { id: "india", name: "India", icon: "🇮🇳", marketSize: "$1.2T" },
    { id: "usa", name: "USA", icon: "🇺🇸", marketSize: "$25T" },
    { id: "europe", name: "Europe", icon: "🇪🇺", marketSize: "$18T" },
    { id: "asia", name: "Asia", icon: "🌏", marketSize: "$36T" },
    { id: "global", name: "Global", icon: "🌍", marketSize: "$100T" },
  ];

  // Timeframes
  const TIMEFRAMES = [
    { id: "3m", name: "3 Months", desc: "Short-term trends" },
    { id: "6m", name: "6 Months", desc: "Medium-term outlook" },
    { id: "1y", name: "1 Year", desc: "Annual analysis" },
    { id: "3y", name: "3 Years", desc: "Long-term forecast" },
  ];

  // AI Brain - Market Analysis Data
  const AI_ANALYSIS_BRAIN = {
    tech: {
      marketSize: "$5.2T",
      growthRate: "12.5%",
      trends: ["AI Integration", "Cloud Computing", "Remote Work Tools", "Cybersecurity", "IoT"],
      opportunities: [
        "Enterprise SaaS solutions",
        "AI-powered automation tools",
        "Cybersecurity for SMEs",
        "Cloud migration services",
        "Remote collaboration platforms"
      ],
      threats: [
        "Rapid technological obsolescence",
        "Intense competition from giants",
        "Data privacy regulations",
        "Talent shortage",
        "Supply chain disruptions"
      ],
      competitors: [
        {
          name: "TechCorp Inc.",
          marketShare: "32%",
          strength: "Strong R&D, Global presence",
          weakness: "Slow innovation cycles, High pricing",
          strategy: "Acquisition-focused growth"
        },
        {
          name: "InnovateTech",
          marketShare: "18%",
          strength: "Agile development, Customer-centric",
          weakness: "Limited funding, Small team",
          strategy: "Niche market domination"
        },
        {
          name: "CloudFirst Solutions",
          marketShare: "15%",
          strength: "Scalable infrastructure, Competitive pricing",
          weakness: "Customer support issues, Feature gaps",
          strategy: "Volume-based growth"
        },
        {
          name: "SecureNet",
          marketShare: "12%",
          strength: "Security expertise, Enterprise trust",
          weakness: "Poor UX, Limited integrations",
          strategy: "Security-first approach"
        },
        {
          name: "StartupX",
          marketShare: "8%",
          strength: "Innovative features, Fast development",
          weakness: "Burn rate high, Unproven model",
          strategy: "Rapid expansion with VC funding"
        }
      ],
      swot: {
        strengths: ["High innovation rate", "Scalable solutions", "Growing demand"],
        weaknesses: ["High customer acquisition cost", "Rapid tech changes", "Skill gaps"],
        opportunities: ["Emerging markets", "Digital transformation wave", "Remote work trend"],
        threats: ["Economic slowdown", "Regulatory changes", "Price wars"]
      }
    },
    ecommerce: {
      marketSize: "$4.9T",
      growthRate: "14.2%",
      trends: ["Social Commerce", "Mobile Shopping", "Personalization", "Sustainability", "Quick Commerce"],
      opportunities: [
        "Hyperlocal delivery networks",
        "Niche product categories",
        "Subscription models",
        "Cross-border ecommerce",
        "AR shopping experiences"
      ],
      threats: [
        "Logistics challenges",
        "Return fraud",
        "Payment gateway issues",
        "Customer trust issues",
        "Inventory management"
      ],
      competitors: [
        {
          name: "MegaStore",
          marketShare: "40%",
          strength: "Massive inventory, Fast delivery",
          weakness: "Poor quality control, Customer service",
          strategy: "Discount-driven customer acquisition"
        },
        {
          name: "StyleHub",
          marketShare: "22%",
          strength: "Fashion focus, Quality products",
          weakness: "Higher prices, Limited categories",
          strategy: "Premium brand positioning"
        },
        {
          name: "QuickBuy",
          marketShare: "15%",
          strength: "10-minute delivery, Urban presence",
          weakness: "Limited geographical coverage, High burn",
          strategy: "Speed as differentiator"
        },
        {
          name: "EcoShop",
          marketShare: "10%",
          strength: "Sustainable products, Loyal community",
          weakness: "Small scale, Higher prices",
          strategy: "Ethical commerce focus"
        },
        {
          name: "TechGadgets",
          marketShare: "8%",
          strength: "Tech expertise, Latest products",
          weakness: "Niche market, Seasonal demand",
          strategy: "Tech enthusiast targeting"
        }
      ],
      swot: {
        strengths: ["24/7 availability", "Price comparison", "Convenience"],
        weaknesses: ["No touch-feel", "Delivery delays", "Return hassles"],
        opportunities: ["Rural penetration", "Personalization", "Social commerce"],
        threats: ["Offline retailers", "Logistics costs", "Customer acquisition"]
      }
    },
    saas: {
      marketSize: "$720B",
      growthRate: "18.7%",
      trends: ["AI Features", "Vertical SaaS", "No-Code Platforms", "API-first", "Usage-based Pricing"],
      opportunities: [
        "Industry-specific solutions",
        "SMB-focused products",
        "Integration platforms",
        "Analytics add-ons",
        "International expansion"
      ],
      threats: [
        "Open source alternatives",
        "Feature creep",
        "Customer churn",
        "Pricing pressure",
        "Security breaches"
      ],
      competitors: [
        {
          name: "CloudEnterprise",
          marketShare: "35%",
          strength: "Enterprise features, Security compliance",
          weakness: "Complex setup, High cost",
          strategy: "Enterprise market focus"
        },
        {
          name: "StartupSuite",
          marketShare: "20%",
          strength: "Affordable pricing, Easy setup",
          weakness: "Limited features, Scaling issues",
          strategy: "Startup-friendly pricing"
        },
        {
          name: "AIAssist",
          marketShare: "18%",
          strength: "AI capabilities, Automation",
          weakness: "High learning curve, Data dependency",
          strategy: "AI-first approach"
        },
        {
          name: "NoCodePro",
          marketShare: "12%",
          strength: "User-friendly, Rapid deployment",
          weakness: "Limited customization, Performance issues",
          strategy: "Democratization focus"
        },
        {
          name: "IntegrateAll",
          marketShare: "10%",
          strength: "APIs, Third-party integrations",
          weakness: "Complexity, Support challenges",
          strategy: "Integration platform focus"
        }
      ],
      swot: {
        strengths: ["Recurring revenue", "Scalability", "Data insights"],
        weaknesses: ["High competition", "Customer churn", "Implementation time"],
        opportunities: ["Remote work tools", "Industry 4.0", "Globalization"],
        threats: ["Economic downturn", "Data privacy laws", "Tech consolidation"]
      }
    }
  };

  // Loading steps with animations
  const loadingSteps = [
    "Collecting market data...",
    "Analyzing competitor strategies...",
    "Identifying market trends...",
    "Calculating growth projections...",
    "Assessing SWOT factors...",
    "Generating insights...",
    "Compiling final report..."
  ];

  // Start background animations
  useEffect(() => {
    if (isAnimating) {
      animationRef.current = setInterval(() => {
        // Random data point animation
        const elements = document.querySelectorAll('.pulse-animation');
        elements.forEach(el => {
          el.style.transform = `scale(${0.95 + Math.random() * 0.1})`;
        });
      }, 2000);

      chartAnimationRef.current = setInterval(() => {
        // Animate chart bars
        const bars = document.querySelectorAll('.chart-bar');
        bars.forEach(bar => {
          const randomHeight = 30 + Math.random() * 40;
          bar.style.height = `${randomHeight}%`;
        });
      }, 3000);
    }

    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
      if (chartAnimationRef.current) clearInterval(chartAnimationRef.current);
    };
  }, [isAnimating]);

  // Loading animation
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : 0));
      }, 600);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const generateAnalysis = async () => {
    if (!productName.trim()) {
      alert("Please enter your product/service name");
      return;
    }

    setLoading(true);
    setLoadingStep(0);
    setAiResult(null);
    setIsAnimating(true);

    // Simulate AI processing with animations
    for (let i = 0; i < loadingSteps.length; i++) {
      await new Promise((r) => setTimeout(r, 700));
      setLoadingStep(i);
    }

    const brain = AI_ANALYSIS_BRAIN[industry] || AI_ANALYSIS_BRAIN.tech;
    const regionData = REGIONS.find(r => r.id === region) || REGIONS[0];
    const timeframeData = TIMEFRAMES.find(t => t.id === timeframe) || TIMEFRAMES[1];

    // Generate dynamic metrics
    const marketGrowth = parseFloat(brain.growthRate) + (Math.random() * 3 - 1.5);
    const marketSizeGrowth = parseFloat(brain.marketSize.replace('$', '').replace('T', '')) * (1 + marketGrowth/100);
    const competitorActivity = Math.floor(Math.random() * 20) + 10;
    const customerSentiment = 60 + Math.random() * 30;
    const pricingPressure = 40 + Math.random() * 40;

    // Calculate total market share from competitors array
    const totalMarketShare = brain.competitors.reduce((acc, c) => {
      const share = parseFloat(c.marketShare);
      return acc + (isNaN(share) ? 0 : share);
    }, 0);

    setAiResult({
      industry,
      productName,
      region: regionData.name,
      timeframe: timeframeData.name,
      marketSize: brain.marketSize,
      marketGrowth: `${marketGrowth.toFixed(1)}%`,
      competitorCount: brain.competitors.length, // Number of competitors
      trends: brain.trends,
      opportunities: brain.opportunities,
      threats: brain.threats,
      competitorsList: brain.competitors, // Array of competitor objects
      swot: brain.swot,
      metrics: {
        marketSizeGrowth: `$${marketSizeGrowth.toFixed(1)}T`,
        competitorActivity: `${competitorActivity} launches/month`,
        customerSentiment: `${customerSentiment.toFixed(0)}% positive`,
        pricingPressure: `${pricingPressure.toFixed(0)}% increase`,
        marketShareAvailable: `${(100 - totalMarketShare).toFixed(1)}%`,
        entryBarrier: industry === "tech" ? "High" : industry === "ecommerce" ? "Medium" : "Medium-High",
        customerAcquisitionCost: industry === "tech" ? "₹5,000-₹15,000" : "₹500-₹2,000",
        churnRate: industry === "saas" ? "5-15%" : "20-40%"
      },
      insights: [
        `The ${industry} market is growing at ${marketGrowth.toFixed(1)}% annually`,
        `${brain.competitors.length} major competitors control ~${totalMarketShare.toFixed(0)}% market share`,
        `Customer acquisition costs are rising by ${pricingPressure.toFixed(0)}%`,
        `${regionData.name} presents ${marketGrowth > 12 ? "high" : "moderate"} growth potential`,
        `Trends suggest ${brain.trends.slice(0, 2).join(" and ")} are key differentiators`
      ],
      recommendations: [
        "Focus on underserved niche segments",
        "Differentiate through superior customer experience",
        "Leverage emerging technologies for competitive advantage",
        "Build partnerships for market access",
        "Implement data-driven pricing strategies"
      ],
      riskAssessment: {
        low: ["Market acceptance", "Technology adoption"],
        medium: ["Competitor response", "Regulatory changes"],
        high: ["Funding availability", "Talent acquisition"]
      },
      charts: generateChartsData(industry, brain)
    });

    setLoading(false);
    setActiveTab("market");
    setCompetitorIndex(0);
  };

  // Generate animated chart data
  const generateChartsData = (industry, brain) => {
    const competitors = brain.competitors;
    return {
      marketShare: competitors.map(c => ({
        name: c.name,
        value: parseFloat(c.marketShare),
        color: getRandomColor()
      })),
      growthComparison: competitors.map(c => ({
        name: c.name,
        growth: 5 + Math.random() * 15,
        trend: Math.random() > 0.5 ? "up" : "down"
      })),
      sentimentAnalysis: [
        { name: "Positive", value: 60 + Math.random() * 25 },
        { name: "Neutral", value: 15 + Math.random() * 10 },
        { name: "Negative", value: 5 + Math.random() * 10 }
      ],
      trendAdoption: brain.trends.map(trend => ({
        name: trend,
        adoption: 20 + Math.random() * 60,
        impact: Math.random() > 0.5 ? "high" : "medium"
      }))
    };
  };

  const getRandomColor = () => {
    const colors = [
      "#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444",
      "#06B6D4", "#84CC16", "#EC4899", "#F97316", "#6366F1"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const downloadReport = () => {
    if (!aiResult) return;
    
    const report = `
Market & Competitor Analysis Report
Generated by AI Analysis System

PRODUCT: ${aiResult.productName}
INDUSTRY: ${aiResult.industry.toUpperCase()}
REGION: ${aiResult.region}
TIMEFRAME: ${aiResult.timeframe}

MARKET OVERVIEW:
- Market Size: ${aiResult.marketSize}
- Growth Rate: ${aiResult.marketGrowth}
- Competitors: ${aiResult.competitorCount}
- Available Market Share: ${aiResult.metrics.marketShareAvailable}

KEY METRICS:
- Market Size Growth: ${aiResult.metrics.marketSizeGrowth}
- Competitor Activity: ${aiResult.metrics.competitorActivity}
- Customer Sentiment: ${aiResult.metrics.customerSentiment}
- Pricing Pressure: ${aiResult.metrics.pricingPressure}
- Entry Barrier: ${aiResult.metrics.entryBarrier}
- CAC: ${aiResult.metrics.customerAcquisitionCost}
- Churn Rate: ${aiResult.metrics.churnRate}

TOP TRENDS:
${aiResult.trends.map(t => `• ${t}`).join('\n')}

OPPORTUNITIES:
${aiResult.opportunities.map(o => `✓ ${o}`).join('\n')}

THREATS:
${aiResult.threats.map(t => `⚠ ${t}`).join('\n')}

KEY INSIGHTS:
${aiResult.insights.map(i => `🔍 ${i}`).join('\n')}

RECOMMENDATIONS:
${aiResult.recommendations.map(r => `🎯 ${r}`).join('\n')}

RISK ASSESSMENT:
High Risk: ${aiResult.riskAssessment.high.join(', ')}
Medium Risk: ${aiResult.riskAssessment.medium.join(', ')}
Low Risk: ${aiResult.riskAssessment.low.join(', ')}

Generated on: ${new Date().toLocaleDateString()}
AI Analysis Confidence: 92%
`;

    const blob = new Blob([report], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${productName.toLowerCase().replace(/\s+/g, '-')}-market-analysis.txt`;
    link.click();
  };

  const toggleAnimation = () => setIsAnimating(!isAnimating);
  const nextCompetitor = () => {
    if (!aiResult) return;
    setCompetitorIndex(prev => 
      prev < aiResult.competitorsList.length - 1 ? prev + 1 : 0
    );
  };
  
  const prevCompetitor = () => {
    if (!aiResult) return;
    setCompetitorIndex(prev => 
      prev > 0 ? prev - 1 : aiResult.competitorsList.length - 1
    );
  };

  const getCurrentIndustry = () => INDUSTRIES.find(t => t.id === industry);

  // Fullscreen chart view
  const renderFullscreenChart = () => {
    if (!fullscreenChart || !aiResult) return null;

    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">{fullscreenChart.title}</h3>
            <button
              onClick={() => setFullscreenChart(null)}
              className="p-2 hover:bg-gray-800 rounded-full"
            >
              <Minimize2 size={24} />
            </button>
          </div>
          <div className="h-96">
            {renderChart(fullscreenChart.type, true)}
          </div>
        </div>
      </div>
    );
  };

  // Chart rendering function
  const renderChart = (chartType, fullscreen = false) => {
    if (!aiResult?.charts) return null;

    switch(chartType) {
      case 'marketShare':
        return (
          <div className={`${fullscreen ? 'h-full' : 'h-64'} relative`}>
            <div className="flex h-full items-end space-x-2">
              {aiResult.charts.marketShare.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="text-xs mb-2 text-gray-400 truncate">{item.name}</div>
                  <div
                    className="chart-bar w-3/4 rounded-t-lg transition-all duration-1000"
                    style={{
                      height: `${item.value * 2}%`,
                      backgroundColor: item.color,
                      animation: isAnimating ? 'pulse 2s infinite' : 'none'
                    }}
                  ></div>
                  <div className="text-sm font-bold mt-2">{item.value}%</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'growth':
        return (
          <div className={`${fullscreen ? 'h-full' : 'h-64'} relative`}>
            <div className="flex h-full items-end space-x-4">
              {aiResult.charts.growthComparison.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="text-xs mb-2 text-gray-400 truncate w-full text-center">
                    {item.name}
                  </div>
                  <div className="relative flex-1 w-full flex items-end">
                    <div
                      className="w-3/4 mx-auto rounded-t-lg transition-all duration-1000"
                      style={{
                        height: `${item.growth * 3}%`,
                        backgroundColor: item.trend === 'up' ? '#10B981' : '#EF4444',
                        animation: isAnimating ? 'float 3s infinite' : 'none'
                      }}
                    ></div>
                  </div>
                  <div className={`text-sm font-bold mt-2 ${item.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {item.growth.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'sentiment':
        return (
          <div className={`${fullscreen ? 'h-full' : 'h-64'} relative`}>
            <div className="flex h-full items-end space-x-6">
              {aiResult.charts.sentimentAnalysis.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="text-xs mb-2 text-gray-400">{item.name}</div>
                  <div
                    className="w-3/4 rounded-t-lg transition-all duration-1000"
                    style={{
                      height: `${item.value * 2}%`,
                      backgroundColor: i === 0 ? '#10B981' : i === 1 ? '#F59E0B' : '#EF4444',
                      animation: isAnimating ? 'bounce 2s infinite' : 'none'
                    }}
                  ></div>
                  <div className="text-sm font-bold mt-2">{item.value.toFixed(0)}%</div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Animation styles
  const animationStyles = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes bounce {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(1.05); }
    }
    @keyframes slideIn {
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 5px currentColor; }
      50% { box-shadow: 0 0 20px currentColor; }
    }
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* ANIMATED BACKGROUND ELEMENTS */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute pulse-animation"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, rgba(59, 130, 246, ${0.05 + Math.random() * 0.1}) 0%, transparent 70%)`,
                  animation: `pulse ${3 + Math.random() * 4}s infinite`
                }}
              />
            ))}
          </div>

          {/* HEADER */}
          <header className="mb-10 md:mb-16 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-2 flex items-center gap-3">
                  <div className="relative">
                    <Brain className="text-blue-400" size={40} />
                    <div className="absolute -top-2 -right-2">
                      <div className="relative">
                        <Search className="text-green-400 animate-pulse" size={20} />
                        <div className="absolute inset-0 animate-ping">
                          <Search className="text-green-400" size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                  AI Market & Competitor Analysis
                </h1>
                <p className="text-gray-300 text-lg">
                  Advanced AI-powered market intelligence and competitor analysis
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">AI Analysis Active</span>
                <button
                  onClick={toggleAnimation}
                  className="ml-2 p-1 hover:bg-white/10 rounded"
                  title={isAnimating ? "Pause Animations" : "Play Animations"}
                >
                  {isAnimating ? <Pause size={14} /> : <Play size={14} />}
                </button>
              </div>
            </div>
          </header>

          {/* MAIN FORM SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 relative">
            {/* LEFT PANEL - INPUT */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl"
                  style={{
                    background: `linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.3) 50%, transparent 60%)`,
                    backgroundSize: '300% 300%',
                    animation: isAnimating ? 'slideIn 3s infinite linear' : 'none'
                  }}
                />

                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Target className="text-blue-400" />
                    Analysis Configuration
                  </h2>
                  <p className="text-gray-300 mb-6">Configure AI analysis parameters</p>
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Industry */}
                  <div>
                    <label className="block mb-3 font-medium">Industry/Sector</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {INDUSTRIES.map((ind) => (
                        <button
                          key={ind.id}
                          onClick={() => setIndustry(ind.id)}
                          className={`p-4 rounded-2xl border-2 transition-all ${industry === ind.id
                              ? `border-blue-500 bg-gradient-to-br ${ind.color}`
                              : "border-white/10 bg-white/5 hover:bg-white/10"
                            }`}
                          style={{
                            animation: industry === ind.id && isAnimating ? 'glow 2s infinite' : 'none'
                          }}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-2xl">{ind.icon}</span>
                            <span className="text-sm font-medium">{ind.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Name */}
                  <div>
                    <label className="block mb-3 font-medium">Product/Service Name</label>
                    <div className="relative">
                      <input
                        placeholder="Enter your product or service name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full p-4 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-blue-500 transition pl-12"
                      />
                      <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  {/* Region & Timeframe */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-3 font-medium">Target Region</label>
                      <div className="grid grid-cols-3 gap-2">
                        {REGIONS.map((reg) => (
                          <button
                            key={reg.id}
                            onClick={() => setRegion(reg.id)}
                            className={`p-3 rounded-xl border transition ${region === reg.id
                                ? "bg-blue-600 border-blue-500"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                              }`}
                          >
                            <div className="flex flex-col items-center">
                              <span className="text-xl">{reg.icon}</span>
                              <span className="text-xs mt-1">{reg.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-3 font-medium">Analysis Timeframe</label>
                      <div className="grid grid-cols-2 gap-2">
                        {TIMEFRAMES.map((time) => (
                          <button
                            key={time.id}
                            onClick={() => setTimeframe(time.id)}
                            className={`p-3 rounded-xl border transition ${timeframe === time.id
                                ? "bg-purple-600 border-purple-500"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                              }`}
                          >
                            <div className="text-center">
                              <div className="font-medium text-sm">{time.name}</div>
                              <div className="text-xs text-gray-400">{time.desc}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generateAnalysis}
                    disabled={loading}
                    className="w-full py-5 rounded-xl font-bold text-lg
                      bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
                      hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30
                      transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                      flex items-center justify-center gap-3 relative overflow-hidden"
                    style={{
                      animation: isAnimating ? 'pulse 2s infinite' : 'none'
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></span>
                    {loading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        AI Analyzing Market...
                      </>
                    ) : (
                      <>
                        <Sparkles size={24} />
                        Generate AI Analysis
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL - PREVIEW */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-3xl p-6 h-full relative overflow-hidden">
                {/* Animated particles */}
                <div className="absolute inset-0">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${3 + Math.random() * 4}s infinite`
                      }}
                    />
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                  <BarChart className="text-cyan-400" />
                  Analysis Preview
                </h3>
                {getCurrentIndustry() && (
                  <div className="space-y-6 relative z-10">
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br ${getCurrentIndustry().color} relative`}
                        style={{
                          animation: isAnimating ? 'rotate 20s infinite linear' : 'none'
                        }}
                      >
                        <span className="text-3xl">{getCurrentIndustry().icon}</span>
                      </div>
                      <h4 className="text-2xl font-bold">{getCurrentIndustry().name}</h4>
                      <p className="text-gray-400 mt-2">Industry Selected</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Market Size:</span>
                        <span className="font-semibold text-green-400">
                          {AI_ANALYSIS_BRAIN[industry]?.marketSize || "$1T+"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Growth Rate:</span>
                        <span className="font-semibold text-blue-400">
                          {AI_ANALYSIS_BRAIN[industry]?.growthRate || "10%+"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Competitors:</span>
                        <span className="font-semibold">{AI_ANALYSIS_BRAIN[industry]?.competitors?.length || 5}+</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Key Trends:</span>
                        <span className="font-semibold">{AI_ANALYSIS_BRAIN[industry]?.trends?.length || 5}+</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <p className="text-gray-400 text-sm mb-3">
                        AI will analyze:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" />
                          <span>Market size & growth</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" />
                          <span>Competitor strategies</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" />
                          <span>SWOT analysis</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" />
                          <span>Risk assessment</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="mb-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden">
              {/* Animated scanning line */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-pulse"></div>

              <div className="flex flex-col items-center relative z-10">
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-full border-4 border-blue-500/30"></div>
                  <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
                  <Search className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400" size={40} />
                </div>

                <h3 className="text-2xl font-bold mb-6 text-center">AI is analyzing the market</h3>

                <div className="w-full max-w-2xl space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round((loadingStep + 1) / loadingSteps.length * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                    >
                      <div className="h-full w-20 bg-white/30" style={{ animation: 'shimmer 2s infinite' }}></div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    {loadingSteps.map((step, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${index <= loadingStep
                            ? "bg-blue-500/10 border border-blue-500/20"
                            : "bg-gray-800/30"
                          }`}
                        style={{
                          animation: index <= loadingStep ? 'slideIn 0.5s ease-out' : 'none'
                        }}
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

          {/* RESULTS SECTION */}
          {!loading && aiResult && (
            <div className="space-y-8 relative">
              {/* AI MESSAGE */}
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-3xl p-6 relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute w-32 h-32 bg-blue-500 rounded-full -top-16 -left-16"></div>
                  <div className="absolute w-40 h-40 bg-purple-500 rounded-full -bottom-20 -right-20"></div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Brain size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">AI Market Analysis Complete</h3>
                    <div className="text-gray-200">
                      <p>Comprehensive analysis of <strong>{aiResult.productName}</strong> in the <strong>{aiResult.industry}</strong> industry for <strong>{aiResult.region}</strong> market.</p>
                      <p className="mt-2">AI identified <strong>{aiResult.competitorCount} key competitors</strong> and <strong>{aiResult.trends.length} major trends</strong> with <strong>{aiResult.marketGrowth} market growth</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* TABS NAVIGATION */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4">
                <div className="flex flex-wrap gap-2">
                  {["market", "competitors", "trends", "swot", "charts", "insights"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-full border transition ${activeTab === tab
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 border-blue-500"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        {tab === "market" && <Globe size={16} />}
                        {tab === "competitors" && <Building size={16} />}
                        {tab === "trends" && <TrendingUp size={16} />}
                        {tab === "swot" && <Layers size={16} />}
                        {tab === "charts" && <BarChart size={16} />}
                        {tab === "insights" && <Zap size={16} />}
                        <span className="capitalize">{tab}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* MARKET OVERVIEW TAB */}
              {activeTab === "market" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Key Metrics */}
                  <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                      <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                        <Activity className="text-green-400" />
                        Market Key Metrics
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(aiResult.metrics).map(([key, value], i) => (
                          <div
                            key={key}
                            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 rounded-2xl p-4 hover:scale-105 transition-transform duration-300"
                            style={{
                              animation: isAnimating ? `slideIn ${0.3 + i * 0.1}s ease-out` : 'none'
                            }}
                          >
                            <div className="text-sm text-gray-400 mb-1 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-xl font-bold">
                              {value}
                              {key.includes('growth') && (
                                <TrendingUp className="inline-block ml-2 text-green-400" size={16} />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Market Size & Growth */}
                    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-3xl p-6">
                      <h3 className="font-bold text-xl mb-4">Market Size & Growth</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-blue-400">{aiResult.marketSize}</div>
                          <div className="text-gray-400">Current Market Size</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-400">{aiResult.marketGrowth}</div>
                          <div className="text-gray-400">Annual Growth Rate</div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-300">
                        Projected to reach {aiResult.metrics.marketSizeGrowth} in next {aiResult.timeframe}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Quick Stats */}
                  <div className="space-y-8">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <Award className="text-yellow-400" />
                        Market Position
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                          <span className="text-gray-400">Market Maturity</span>
                          <span className="font-bold text-green-400">Growth Phase</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                          <span className="text-gray-400">Entry Barrier</span>
                          <span className="font-bold text-orange-400">{aiResult.metrics.entryBarrier}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                          <span className="text-gray-400">Competition Level</span>
                          <span className="font-bold text-red-400">High</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <Shield className="text-purple-400" />
                        Risk Assessment
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(aiResult.riskAssessment).map(([level, items]) => (
                          <div key={level} className="space-y-1">
                            <div className={`text-sm font-medium capitalize ${level === 'high' ? 'text-red-400' : level === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                              {level} Risk
                            </div>
                            <div className="text-xs text-gray-400 pl-2">
                              {items.join(', ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* COMPETITORS TAB */}
              {activeTab === "competitors" && (
                <div className="space-y-8">
                  {/* Competitor Carousel */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-xl flex items-center gap-2">
                        <Building className="text-blue-400" />
                        Competitor Analysis
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevCompetitor}
                          className="p-2 hover:bg-white/10 rounded-full"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <span className="text-sm text-gray-400">
                          {competitorIndex + 1} / {aiResult.competitorsList.length}
                        </span>
                        <button
                          onClick={nextCompetitor}
                          className="p-2 hover:bg-white/10 rounded-full"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Current Competitor */}
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 rounded-2xl p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <div className="text-center mb-4">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-3">
                              <Building size={32} />
                            </div>
                            <h4 className="text-2xl font-bold">{aiResult.competitorsList[competitorIndex].name}</h4>
                            <div className="text-3xl font-bold text-green-400 mt-2">
                              {aiResult.competitorsList[competitorIndex].marketShare}
                            </div>
                            <div className="text-gray-400">Market Share</div>
                          </div>
                        </div>

                        <div className="md:w-2/3 space-y-4">
                          <div>
                            <h5 className="font-semibold mb-2 text-green-400">Strengths</h5>
                            <p className="text-gray-300">{aiResult.competitorsList[competitorIndex].strength}</p>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-2 text-red-400">Weaknesses</h5>
                            <p className="text-gray-300">{aiResult.competitorsList[competitorIndex].weakness}</p>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-2 text-blue-400">Strategy</h5>
                            <p className="text-gray-300">{aiResult.competitorsList[competitorIndex].strategy}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Competitor Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                      {aiResult.competitorsList.map((competitor, index) => (
                        <button
                          key={index}
                          onClick={() => setCompetitorIndex(index)}
                          className={`p-3 rounded-xl border transition ${competitorIndex === index
                              ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-blue-500"
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                            }`}
                        >
                          <div className="text-center">
                            <div className="font-bold truncate text-sm">{competitor.name}</div>
                            <div className="text-green-400 text-sm">{competitor.marketShare}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TRENDS TAB */}
              {activeTab === "trends" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Trends */}
                  <div className="space-y-8">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                      <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                        <TrendingUp className="text-green-400" />
                        Market Trends
                      </h3>
                      <div className="space-y-4">
                        {aiResult.trends.map((trend, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition"
                            style={{
                              animation: isAnimating ? `slideIn ${0.2 + index * 0.1}s ease-out` : 'none'
                            }}
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                              <Zap size={20} className="text-blue-400" />
                            </div>
                            <div>
                              <div className="font-medium">{trend}</div>
                              <div className="text-sm text-gray-400">
                                {index % 3 === 0 ? "High impact" : index % 3 === 1 ? "Medium impact" : "Growing trend"}
                              </div>
                            </div>
                            <div className="ml-auto">
                              <div className={`px-2 py-1 rounded text-xs ${index % 3 === 0 ? 'bg-green-500/20 text-green-400' : index % 3 === 1 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                {index % 3 === 0 ? "High" : index % 3 === 1 ? "Medium" : "Low"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Opportunities */}
                    <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-3xl p-6">
                      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <Target className="text-green-400" />
                        Opportunities
                      </h3>
                      <ul className="space-y-3">
                        {aiResult.opportunities.map((opp, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{opp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column - Threats & Adoption */}
                  <div className="space-y-8">
                    <div className="bg-gradient-to-br from-red-900/30 to-rose-900/30 border border-red-500/30 rounded-3xl p-6">
                      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <AlertCircle className="text-red-400" />
                        Threats & Challenges
                      </h3>
                      <ul className="space-y-3">
                        {aiResult.threats.map((threat, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                            <span>{threat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Trend Adoption */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                      <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                        <LineChart className="text-purple-400" />
                        Trend Adoption Rate
                      </h3>
                      <div className="space-y-4">
                        {aiResult.charts.trendAdoption.map((trend, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="truncate">{trend.name}</span>
                              <span className="font-bold">{trend.adoption.toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                                style={{ width: `${trend.adoption}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-400">
                              Impact: <span className={`font-bold ${trend.impact === 'high' ? 'text-red-400' : 'text-yellow-400'}`}>
                                {trend.impact.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SWOT TAB */}
              {activeTab === "swot" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Strengths",
                      data: aiResult.swot.strengths,
                      icon: ThumbsUp,
                      color: "from-green-500 to-emerald-500",
                      bgColor: "bg-green-500/10",
                      borderColor: "border-green-500/30"
                    },
                    {
                      title: "Weaknesses",
                      data: aiResult.swot.weaknesses,
                      icon: ThumbsDown,
                      color: "from-red-500 to-rose-500",
                      bgColor: "bg-red-500/10",
                      borderColor: "border-red-500/30"
                    },
                    {
                      title: "Opportunities",
                      data: aiResult.swot.opportunities,
                      icon: Target,
                      color: "from-blue-500 to-cyan-500",
                      bgColor: "bg-blue-500/10",
                      borderColor: "border-blue-500/30"
                    },
                    {
                      title: "Threats",
                      data: aiResult.swot.threats,
                      icon: AlertCircle,
                      color: "from-yellow-500 to-amber-500",
                      bgColor: "bg-yellow-500/10",
                      borderColor: "border-yellow-500/30"
                    }
                  ].map((section, index) => (
                    <div
                      key={section.title}
                      className={`bg-gradient-to-br ${section.color}/10 border ${section.borderColor} rounded-3xl p-6`}
                      style={{
                        animation: isAnimating ? `slideIn ${0.2 + index * 0.1}s ease-out` : 'none'
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                          <section.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold">{section.title}</h3>
                      </div>
                      <ul className="space-y-3">
                        {section.data.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded-full ${section.bgColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              {section.title === "Strengths" && <ThumbsUp size={14} className="text-green-400" />}
                              {section.title === "Weaknesses" && <ThumbsDown size={14} className="text-red-400" />}
                              {section.title === "Opportunities" && <Target size={14} className="text-blue-400" />}
                              {section.title === "Threats" && <AlertCircle size={14} className="text-yellow-400" />}
                            </div>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* CHARTS TAB */}
              {activeTab === "charts" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Market Share Chart */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl flex items-center gap-2">
                          <PieChart className="text-blue-400" />
                          Market Share Distribution
                        </h3>
                        <button
                          onClick={() => setFullscreenChart({ type: 'marketShare', title: 'Market Share Distribution' })}
                          className="p-2 hover:bg-white/10 rounded-full"
                          title="Fullscreen"
                        >
                          <Maximize2 size={16} />
                        </button>
                      </div>
                      {renderChart('marketShare')}
                      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-2">
                        {aiResult.charts.marketShare.map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-xs text-gray-400 truncate">{item.name}: {item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Growth Comparison Chart */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl flex items-center gap-2">
                          <LineChart className="text-green-400" />
                          Growth Rate Comparison
                        </h3>
                        <button
                          onClick={() => setFullscreenChart({ type: 'growth', title: 'Growth Rate Comparison' })}
                          className="p-2 hover:bg-white/10 rounded-full"
                          title="Fullscreen"
                        >
                          <Maximize2 size={16} />
                        </button>
                      </div>
                      {renderChart('growth')}
                      <div className="mt-6 text-sm text-gray-400">
                        Industry average: {(aiResult.charts.growthComparison.reduce((a, b) => a + b.growth, 0) / aiResult.charts.growthComparison.length).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Sentiment Analysis Chart */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-xl flex items-center gap-2">
                        <MessageSquare className="text-purple-400" />
                        Customer Sentiment Analysis
                      </h3>
                      <button
                        onClick={() => setFullscreenChart({ type: 'sentiment', title: 'Customer Sentiment Analysis' })}
                        className="p-2 hover:bg-white/10 rounded-full"
                        title="Fullscreen"
                      >
                        <Maximize2 size={16} />
                      </button>
                    </div>
                    {renderChart('sentiment')}
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      {aiResult.charts.sentimentAnalysis.map((item, i) => (
                        <div key={i} className="text-center">
                          <div className="text-2xl font-bold">
                            {item.value.toFixed(0)}%
                          </div>
                          <div className={`text-sm ${i === 0 ? 'text-green-400' : i === 1 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {item.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* INSIGHTS TAB */}
              {activeTab === "insights" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - AI Insights */}
                  <div className="space-y-8">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                      <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                        <Brain className="text-cyan-400" />
                        AI-Generated Insights
                      </h3>
                      <div className="space-y-4">
                        {aiResult.insights.map((insight, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-white/10 rounded-xl hover:scale-[1.02] transition-transform duration-300"
                            style={{
                              animation: isAnimating ? `slideIn ${0.2 + index * 0.1}s ease-out` : 'none'
                            }}
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                              <Sparkles size={20} />
                            </div>
                            <div>
                              <div className="font-medium">{insight}</div>
                              <div className="text-sm text-gray-400 mt-1">
                                Confidence: {(85 + Math.random() * 10).toFixed(0)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Items */}
                    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-3xl p-6">
                      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <Zap className="text-yellow-400" />
                        Recommended Actions
                      </h3>
                      <ul className="space-y-3">
                        {aiResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                              <span className="font-bold">{index + 1}</span>
                            </div>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column - Summary */}
                  <div className="space-y-8">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                      <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                        <Star className="text-yellow-400" />
                        Analysis Summary
                      </h3>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-white/5 rounded-xl">
                            <div className="text-3xl font-bold text-green-400">{aiResult.marketGrowth}</div>
                            <div className="text-gray-400">Market Growth</div>
                          </div>
                          <div className="text-center p-4 bg-white/5 rounded-xl">
                            <div className="text-3xl font-bold text-blue-400">{aiResult.competitorCount}</div>
                            <div className="text-gray-400">Key Competitors</div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-gray-400 mb-2">Market Opportunity</div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                              <div
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                style={{ width: '75%' }}
                              ></div>
                            </div>
                            <div className="text-right text-sm text-gray-400 mt-1">High Potential</div>
                          </div>
                          <div>
                            <div className="text-gray-400 mb-2">Competition Intensity</div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                              <div
                                className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full"
                                style={{ width: '85%' }}
                              ></div>
                            </div>
                            <div className="text-right text-sm text-gray-400 mt-1">Very High</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Download Report */}
                    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-3xl p-6">
                      <div className="text-center">
                        <Download className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                        <h3 className="font-bold text-xl mb-2">Download Full Report</h3>
                        <p className="text-gray-300 mb-6">
                          Get detailed analysis with all charts, insights, and recommendations
                        </p>
                        <button
                          onClick={downloadReport}
                          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:scale-105 transition flex items-center justify-center gap-3"
                        >
                          <Download /> Download Complete Analysis
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FOOTER */}
          <footer className="mt-16 pt-8 border-t border-white/10 text-center text-gray-400 text-sm relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
            </div>
            <p className="mb-2">
              🔍 AI Market & Competitor Analysis uses advanced algorithms to provide real-time market intelligence.
            </p>
            <p className="mb-6">
              All data is simulated based on industry patterns and predictive modeling.
            </p>
            <div className="flex items-center justify-center gap-6 mt-6">
              <span className="flex items-center gap-2">
                <Brain size={16} /> AI Powered
              </span>
              <span className="flex items-center gap-2">
                <TrendingUp size={16} /> Real-time Analysis
              </span>
              <span className="flex items-center gap-2">
                <Shield size={16} /> Data Secure
              </span>
            </div>
          </footer>
        </div>
      </div>

      {/* Fullscreen Chart Modal */}
      {fullscreenChart && renderFullscreenChart()}
    </>
  );
}