import { useState } from "react";
import {
  Rocket,
  DollarSign,
  Globe,
  TrendingUp,
  BarChart3,
  Video,
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Users,
  Brain,
} from "lucide-react";

const AiProductLauncherOverview = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Rocket,
      title: "Product Name & Pricing",
      description:
        "AI-powered product naming with intelligent pricing strategies based on market analysis and competitor insights.",
      color: "from-blue-500 to-cyan-500",
      benefits: [
        "Smart naming suggestions",
        "Dynamic pricing models",
        "Competitive analysis",
        "Market positioning",
      ],
      stats: { label: "Accuracy", value: "95%" },
    },
    {
      icon: Globe,
      title: "Website & Landing Page",
      description:
        "Create stunning, conversion-optimized landing pages with AI-generated content and professional design templates.",
      color: "from-purple-500 to-pink-500",
      benefits: [
        "Professional templates",
        "SEO optimized",
        "Mobile responsive",
        "Fast loading",
      ],
      stats: { label: "Conversion", value: "3.5x" },
    },
    {
      icon: TrendingUp,
      title: "Sales Funnel Builder",
      description:
        "Design high-converting sales funnels with automated email sequences, upsells, and customer journey mapping.",
      color: "from-green-500 to-emerald-500",
      benefits: [
        "Drag & drop builder",
        "Email automation",
        "A/B testing",
        "Analytics dashboard",
      ],
      stats: { label: "ROI Increase", value: "250%" },
    },
    {
      icon: BarChart3,
      title: "Market & Competitor Analysis",
      description:
        "Deep market insights with competitor tracking, trend analysis, and strategic recommendations powered by AI.",
      color: "from-orange-500 to-red-500",
      benefits: [
        "Real-time tracking",
        "SWOT analysis",
        "Market trends",
        "Strategic insights",
      ],
      stats: { label: "Data Points", value: "10M+" },
    },
    {
      icon: Video,
      title: "Explainer Video Generator",
      description:
        "Generate professional explainer videos with AI voiceovers, animations, and customizable templates in minutes.",
      color: "from-indigo-500 to-purple-500",
      benefits: [
        "Auto-generated scripts",
        "Professional voiceovers",
        "Custom animations",
        "Multiple formats",
      ],
      stats: { label: "Time Saved", value: "90%" },
    },
  ];

  const stats = [
    {
      icon: Users,
      label: "Active Users",
      value: "50K+",
      color: "text-blue-500",
    },
    {
      icon: Zap,
      label: "Products Launched",
      value: "125K+",
      color: "text-purple-500",
    },
    {
      icon: Target,
      label: "Success Rate",
      value: "94%",
      color: "text-green-500",
    },
    { icon: Brain, label: "AI Models", value: "15+", color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="stars"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-white font-medium">
              AI-Powered Product Launch Platform
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient leading-tight">
            AI Product Launcher
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your ideas into successful products with our comprehensive
            AI-powered suite. From naming to launch, we handle everything you
            need to succeed.
          </p>

          {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2 group">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-full font-semibold hover:scale-105 hover:bg-white/20 transition-all duration-300">
              Watch Demo
            </button>
          </div> */}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon
                  className={`w-8 h-8 ${stat.color} mb-2 group-hover:scale-110 transition-transform`}
                />
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Everything you need to launch and scale your product successfully
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="feature-card group"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Benefits */}
                    <div className="space-y-2 mb-6">
                      {feature.benefits.map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300"
                          style={{ transitionDelay: `${i * 50}ms` }}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color}`}
                          ></div>
                          {benefit}
                        </div>
                      ))}
                    </div>

                    {/* Stats Badge */}
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${feature.color} rounded-full text-white font-semibold text-sm`}
                    >
                      <Zap className="w-4 h-4" />
                      {feature.stats.label}: {feature.stats.value}
                    </div>

                    {/* Hover Effect Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300 pointer-events-none`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Launch your product in 4 simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                num: "01",
                title: "Define",
                desc: "Input your product idea and target audience",
              },
              {
                num: "02",
                title: "Generate",
                desc: "AI creates names, pricing, and content",
              },
              {
                num: "03",
                title: "Design",
                desc: "Build your website and sales funnel",
              },
              {
                num: "04",
                title: "Launch",
                desc: "Deploy and track your success",
              },
            ].map((step, index) => (
              <div key={index} className="step-card text-center">
                <div className="step-number">{step.num}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center cta-section">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Launch Your Product?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who have successfully launched their
            products with AI
          </p>
          <div className="px-12 py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center gap-3 mx-auto group max-w-4xl">
            This Is The Entire Overview Of Our 3rd Module AiProduct Launcher
            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        /* Floating Orbs */
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
          animation: float 20s infinite ease-in-out;
        }
        .orb-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(45deg, #00ffff, #0080ff);
          top: -250px;
          left: -250px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 600px;
          height: 600px;
          background: linear-gradient(45deg, #ff00ff, #8000ff);
          bottom: -300px;
          right: -300px;
          animation-delay: 7s;
        }
        .orb-3 {
          width: 400px;
          height: 400px;
          background: linear-gradient(45deg, #00ff88, #0088ff);
          top: 50%;
          left: 50%;
          animation-delay: 14s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(100px, -100px) scale(1.1) rotate(90deg);
          }
          50% {
            transform: translate(-50px, 50px) scale(0.9) rotate(180deg);
          }
          75% {
            transform: translate(50px, 100px) scale(1.05) rotate(270deg);
          }
        }

        /* Stars Background */
        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(
              2px 2px at 20px 30px,
              white,
              transparent
            ),
            radial-gradient(2px 2px at 60px 70px, white, transparent),
            radial-gradient(1px 1px at 50px 50px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, white, transparent),
            radial-gradient(2px 2px at 90px 10px, white, transparent);
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: twinkle 5s infinite;
          opacity: 0.5;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        /* Animations */
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient-shift 3s linear infinite;
        }

        /* Feature Card */
        .feature-card {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.05)
          );
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 32px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fade-in 0.6s ease-out backwards;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(99, 179, 237, 0.5),
            transparent
          );
          opacity: 0;
          transition: opacity 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-12px) scale(1.02);
          border-color: rgba(99, 179, 237, 0.4);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5),
            0 0 60px rgba(99, 179, 237, 0.2);
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        /* Stat Card */
        .stat-card {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.05)
          );
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 24px;
          transition: all 0.3s ease;
          animation: fade-in 0.6s ease-out backwards;
          cursor: pointer;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          border-color: rgba(99, 179, 237, 0.4);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }

        /* Step Card */
        .step-card {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.05)
          );
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 32px 24px;
          transition: all 0.3s ease;
          position: relative;
        }

        .step-card:hover {
          transform: translateY(-8px);
          border-color: rgba(99, 179, 237, 0.4);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }

        .step-number {
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00ffff, #0080ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0.3;
          line-height: 1;
          margin-bottom: 16px;
        }

        .step-card:hover .step-number {
          opacity: 0.6;
          transform: scale(1.1);
          transition: all 0.3s ease;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(
            135deg,
            rgba(99, 179, 237, 0.1),
            rgba(124, 58, 237, 0.1)
          );
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 32px;
          padding: 64px 32px;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            from 0deg,
            transparent,
            rgba(99, 179, 237, 0.1),
            transparent 30%
          );
          animation: rotate 10s linear infinite;
        }

        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .feature-card {
            padding: 24px;
          }

          h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AiProductLauncherOverview;
