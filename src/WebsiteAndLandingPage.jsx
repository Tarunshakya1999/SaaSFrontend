import { useState, useEffect } from "react";
import {
  Brain,
  Sparkles,
  Download,
  Globe,
  Layout,
  Palette,
  Cpu,
  Database,
  Zap,
  Shield,
  Smartphone,
  Clock,
  TrendingUp,
  Code,
  Layers,
  CheckCircle,
  IndianRupee,
  Server,
  Users,
  ShoppingCart,
  Briefcase,
  Camera,
  Music,
  BookOpen,
  Utensils,
  HeartPulse,
  Car,
  Home,
  Building,
} from "lucide-react";

export default function AIWebsiteLandingPage() {
  const [type, setType] = useState("landing");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("general");
  const [ai, setAi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedContent, setGeneratedContent] = useState("");
  const [showFullCode, setShowFullCode] = useState(false);

  // Enhanced website types
  const WEBSITE_TYPES = [
    { id: "landing", name: "Landing Page", icon: <Home size={18} />, color: "from-blue-500 to-cyan-500" },
    { id: "ecommerce", name: "E-Commerce", icon: <ShoppingCart size={18} />, color: "from-green-500 to-emerald-500" },
    { id: "portfolio", name: "Portfolio", icon: <Briefcase size={18} />, color: "from-purple-500 to-pink-500" },
    { id: "blog", name: "Blog / News", icon: <BookOpen size={18} />, color: "from-orange-500 to-red-500" },
    { id: "saas", name: "SaaS Platform", icon: <Cpu size={18} />, color: "from-indigo-500 to-purple-500" },
    { id: "restaurant", name: "Restaurant", icon: <Utensils size={18} />, color: "from-red-500 to-rose-500" },
    { id: "medical", name: "Medical/Health", icon: <HeartPulse size={18} />, color: "from-teal-500 to-green-500" },
    { id: "travel", name: "Travel/Agency", icon: <Globe size={18} />, color: "from-cyan-500 to-blue-500" },
    { id: "education", name: "Education", icon: <BookOpen size={18} />, color: "from-yellow-500 to-orange-500" },
    { id: "realestate", name: "Real Estate", icon: <Building size={18} />, color: "from-amber-500 to-yellow-500" },
  ];

  // Enhanced FAKE AI BRAIN with more details - SABHI TYPES KE LIYE ALAG COLOR PALETTES
  const AI_BRAIN = {
    landing: {
      pages: ["Hero", "Features", "Benefits", "Testimonials", "Pricing", "FAQ", "Contact"],
      features: [
        "High Conversion CTA Buttons",
        "Lead Capture Forms with Validation",
        "SEO Optimized Meta Structure",
        "Fast Loading (95+ PageSpeed)",
        "Mobile Responsive Design",
        "Social Proof Integration",
      ],
      colorPalettes: [
        { primary: "#3B82F6", secondary: "#10B981", accent: "#8B5CF6", bg: "#0F172A" },
        { primary: "#EC4899", secondary: "#8B5CF6", accent: "#F59E0B", bg: "#111827" },
      ],
      techStack: {
        frontend: ["React 18", "Tailwind CSS", "Framer Motion"],
        backend: ["Next.js API Routes", "Vercel Serverless"],
        database: "Supabase / Firebase",
        hosting: "Vercel",
        analytics: "Google Analytics 4 + Hotjar",
      },
      price: [5000, 12000],
      timeline: "3-5 days",
      seoKeywords: ["conversion", "lead generation", "landing page", "high ROI"],
    },
    ecommerce: {
      pages: ["Home", "Shop", "Product Details", "Cart", "Checkout", "User Dashboard", "Order Tracking", "Admin Panel"],
      features: [
        "Advanced Product Filtering",
        "Secure Payment Gateway Integration",
        "Inventory Management System",
        "Order Tracking & Notifications",
        "User Review System",
        "Wishlist & Save for Later",
      ],
      colorPalettes: [
        { primary: "#10B981", secondary: "#3B82F6", accent: "#F59E0B", bg: "#FFFFFF" },
        { primary: "#8B5CF6", secondary: "#EC4899", accent: "#06B6D4", bg: "#F9FAFB" },
      ],
      techStack: {
        frontend: ["Next.js 14", "Shadcn UI", "Redux Toolkit"],
        backend: ["Node.js + Express", "Stripe API", "Nodemailer"],
        database: "PostgreSQL with Prisma ORM",
        hosting: "AWS EC2 + CloudFront",
        analytics: "Mixpanel + Google Analytics",
      },
      price: [25000, 75000],
      timeline: "4-6 weeks",
      seoKeywords: ["online store", "ecommerce", "shop online", "secure checkout"],
    },
    portfolio: {
      pages: ["Hero", "About", "Projects", "Skills", "Experience", "Testimonials", "Contact"],
      features: [
        "Interactive Project Showcase",
        "Dark/Light Mode Toggle",
        "PDF Resume Download",
        "Contact Form with Captcha",
        "Blog Integration",
        "Social Media Integration",
      ],
      colorPalettes: [
        { primary: "#8B5CF6", secondary: "#EC4899", accent: "#F59E0B", bg: "#0F172A" },
        { primary: "#06B6D4", secondary: "#3B82F6", accent: "#10B981", bg: "#FFFFFF" },
      ],
      techStack: {
        frontend: ["React + TypeScript", "Tailwind CSS", "GSAP Animations"],
        backend: ["Next.js API", "Cloudinary for Images"],
        database: "Not Required",
        hosting: "Netlify",
        analytics: "Simple Analytics",
      },
      price: [8000, 20000],
      timeline: "7-10 days",
      seoKeywords: ["portfolio", "creative work", "hire me", "designer"],
    },
    blog: {
      pages: ["Home", "Article List", "Single Article", "Categories", "Author", "Search", "Newsletter"],
      features: [
        "Rich Text Editor Integration",
        "SEO Friendly URLs",
        "Social Sharing Buttons",
        "Newsletter Subscription",
        "Related Articles Section",
        "Comment System",
      ],
      colorPalettes: [
        { primary: "#F59E0B", secondary: "#EF4444", accent: "#3B82F6", bg: "#FFFFFF" },
        { primary: "#10B981", secondary: "#0EA5E9", accent: "#8B5CF6", bg: "#F8FAFC" },
      ],
      techStack: {
        frontend: ["Next.js 14", "Tailwind CSS", "MDX for Content"],
        backend: ["Sanity CMS", "NextAuth for Auth"],
        database: "Sanity Studio",
        hosting: "Vercel + Sanity",
        analytics: "Google Analytics + Plausible",
      },
      price: [10000, 30000],
      timeline: "2-3 weeks",
      seoKeywords: ["blog", "articles", "content marketing", "news"],
    },
    // NEW TYPES ADDED WITH UNIQUE COLOR PALETTES
    saas: {
      pages: ["Dashboard", "Features", "Pricing", "Documentation", "API", "Support", "Blog"],
      features: [
        "User Authentication & Authorization",
        "Subscription Management",
        "Real-time Analytics Dashboard",
        "API Integration",
        "Multi-tenant Architecture",
        "Data Export/Import",
      ],
      colorPalettes: [
        { primary: "#4F46E5", secondary: "#7C3AED", accent: "#06B6D4", bg: "#FFFFFF" },
        { primary: "#0EA5E9", secondary: "#3B82F6", accent: "#8B5CF6", bg: "#F8FAFC" },
      ],
      techStack: {
        frontend: ["Next.js 14", "Tailwind CSS", "TanStack Query"],
        backend: ["Node.js + Express", "JWT Authentication", "Redis Cache"],
        database: "MongoDB / PostgreSQL",
        hosting: "AWS / Google Cloud",
        analytics: "Mixpanel + PostHog",
      },
      price: [50000, 150000],
      timeline: "6-8 weeks",
      seoKeywords: ["saas", "software", "subscription", "cloud"],
    },
    restaurant: {
      pages: ["Home", "Menu", "Order Online", "Reservations", "Location", "About", "Contact"],
      features: [
        "Online Ordering System",
        "Table Reservation",
        "Menu with Categories",
        "Food Gallery",
        "Review & Rating System",
        "Delivery Tracking",
      ],
      colorPalettes: [
        { primary: "#DC2626", secondary: "#EA580C", accent: "#F59E0B", bg: "#FFFFFF" },
        { primary: "#B91C1C", secondary: "#F97316", accent: "#FBBF24", bg: "#FEF2F2" },
      ],
      techStack: {
        frontend: ["React", "Tailwind CSS", "Framer Motion"],
        backend: ["Node.js", "Stripe Payments", "EmailJS"],
        database: "Firebase",
        hosting: "Vercel",
        analytics: "Google Analytics",
      },
      price: [15000, 40000],
      timeline: "2-3 weeks",
      seoKeywords: ["restaurant", "food", "delivery", "reservation"],
    },
    medical: {
      pages: ["Home", "Services", "Doctors", "Appointment", "Blog", "Contact", "Emergency"],
      features: [
        "Online Appointment Booking",
        "Doctor Profiles & Schedule",
        "Patient Portal",
        "Medical Blog",
        "Emergency Contact",
        "Health Tips Section",
      ],
      colorPalettes: [
        { primary: "#0D9488", secondary: "#10B981", accent: "#3B82F6", bg: "#FFFFFF" },
        { primary: "#059669", secondary: "#0EA5E9", accent: "#8B5CF6", bg: "#F0FDFA" },
      ],
      techStack: {
        frontend: ["Next.js", "Tailwind CSS", "React Hook Form"],
        backend: ["Node.js", "Calendar API", "Email Integration"],
        database: "PostgreSQL",
        hosting: "Vercel",
        analytics: "Google Analytics",
      },
      price: [30000, 80000],
      timeline: "4-5 weeks",
      seoKeywords: ["medical", "health", "doctor", "appointment"],
    },
    travel: {
      pages: ["Home", "Destinations", "Packages", "Booking", "Gallery", "About", "Contact"],
      features: [
        "Tour Package Listings",
        "Online Booking System",
        "Payment Gateway Integration",
        "Photo Gallery",
        "Customer Reviews",
        "Travel Blog",
      ],
      colorPalettes: [
        { primary: "#0EA5E9", secondary: "#06B6D4", accent: "#10B981", bg: "#FFFFFF" },
        { primary: "#3B82F6", secondary: "#8B5CF6", accent: "#EC4899", bg: "#F0F9FF" },
      ],
      techStack: {
        frontend: ["React", "Tailwind CSS", "Swiper JS"],
        backend: ["Node.js", "Payment Integration", "Email Service"],
        database: "MongoDB",
        hosting: "Netlify",
        analytics: "Google Analytics",
      },
      price: [25000, 60000],
      timeline: "3-4 weeks",
      seoKeywords: ["travel", "tour", "booking", "vacation"],
    },
    education: {
      pages: ["Home", "Courses", "Teachers", "Admissions", "Events", "Blog", "Contact"],
      features: [
        "Course Catalog",
        "Student Portal",
        "Online Admissions",
        "Event Calendar",
        "Teacher Profiles",
        "Resource Library",
      ],
      colorPalettes: [
        { primary: "#F59E0B", secondary: "#D97706", accent: "#10B981", bg: "#FFFFFF" },
        { primary: "#8B5CF6", secondary: "#7C3AED", accent: "#EC4899", bg: "#FEFCE8" },
      ],
      techStack: {
        frontend: ["Next.js", "Tailwind CSS", "React Calendar"],
        backend: ["Node.js", "File Upload", "Email Service"],
        database: "PostgreSQL",
        hosting: "Vercel",
        analytics: "Google Analytics",
      },
      price: [35000, 90000],
      timeline: "4-6 weeks",
      seoKeywords: ["education", "courses", "learning", "school"],
    },
    realestate: {
      pages: ["Home", "Properties", "Agents", "About", "Services", "Contact", "Blog"],
      features: [
        "Property Listings with Filters",
        "Virtual Tours",
        "Agent Profiles",
        "Mortgage Calculator",
        "Contact Forms",
        "Location Map",
      ],
      colorPalettes: [
        { primary: "#D97706", secondary: "#B45309", accent: "#10B981", bg: "#FFFFFF" },
        { primary: "#0EA5E9", secondary: "#3B82F6", accent: "#8B5CF6", bg: "#FFFBEB" },
      ],
      techStack: {
        frontend: ["React", "Tailwind CSS", "Leaflet Maps"],
        backend: ["Node.js", "Image Processing", "Email Service"],
        database: "MongoDB",
        hosting: "Vercel",
        analytics: "Google Analytics",
      },
      price: [40000, 100000],
      timeline: "5-7 weeks",
      seoKeywords: ["real estate", "property", "houses", "rent"],
    },
  };

  // Loading steps simulation
  const loadingSteps = [
    "Analyzing business requirements...",
    "Researching competitor websites...",
    "Generating optimal color palette...",
    "Selecting technology stack...",
    "Designing user interface...",
    "Optimizing for performance...",
    "Finalizing recommendations...",
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const generateAI = async () => {
    if (!product.trim()) {
      alert("Please enter your business/product name");
      return;
    }

    setLoading(true);
    setLoadingStep(0);
    setAi(null);
    setGeneratedContent("");
    setShowFullCode(false);

    // Simulate AI thinking process
    for (let i = 0; i < loadingSteps.length; i++) {
      await new Promise((r) => setTimeout(r, 500));
      setLoadingStep(i);
    }

    const brain = AI_BRAIN[type] || AI_BRAIN.landing;
    const suggestedPrice = Math.floor(
      (brain.price[0] + brain.price[1]) / 2
    );

    // Generate AI message
    const aiMessage = `🤖 AI Analysis Complete for "${product}"
    
Based on my analysis of ${type} websites in the current market, I've designed an optimal solution tailored for ${product}. 
The recommended approach focuses on high conversion rates, user engagement, and technical excellence.`;

    setAi({
      ai_message: aiMessage,
      pages: brain.pages,
      features: brain.features,
      colorPalettes: brain.colorPalettes,
      techStack: brain.techStack,
      pricing: {
        suggested: suggestedPrice,
        range: brain.price,
        note: "Price varies based on additional features",
      },
      hosting: brain.hosting,
      timeline: brain.timeline,
      seoKeywords: brain.seoKeywords,
      recommendations: [
        "Implement lazy loading for images to improve performance",
        "Add schema markup for better SEO",
        "Use CDN for global accessibility",
        "Implement A/B testing for CTAs",
        "Add PWA capabilities for mobile users",
      ],
      html_code: generateHTML(product, type, brain),
    });

    // Generate content for the website
    setGeneratedContent(generateContent(product, type));
    setLoading(false);
  };

  const generateContent = (product, type) => {
    const contentTemplates = {
      landing: `# Welcome to ${product}

## Transform Your Vision into Reality

At ${product}, we deliver cutting-edge solutions that drive growth and innovation. Our platform combines elegant design with powerful functionality to give you the competitive edge.

### Why Choose ${product}?
- **Industry-Leading Performance**: Experience seamless operation with 99.9% uptime
- **User-Centric Design**: Intuitive interface that requires no training
- **Scalable Architecture**: Grows with your business needs
- **24/7 Support**: Dedicated team ready to assist

### Customer Success Stories
"Our revenue increased by 300% after implementing ${product}'s solution. The platform is revolutionary!" - Sarah Chen, CTO

## Get Started Today
Join thousands of satisfied customers who have transformed their business with ${product}. Start your journey now!`,

      ecommerce: `# ${product} Online Store

## Discover Premium Products

Welcome to ${product} - your destination for quality products at competitive prices. We curate the best selection to bring you exceptional value.

### Shop With Confidence
- **Secure Payments**: Bank-level encryption for all transactions
- **Fast Shipping**: Free delivery on orders above ₹999
- **Easy Returns**: 30-day return policy, no questions asked
- **24/7 Customer Support**: We're here to help anytime

### Featured Categories
- Best Sellers
- New Arrivals
- Seasonal Collections
- Customer Favorites

### Why Shop With Us?
At ${product}, we believe in quality, authenticity, and exceptional customer service. Every product is carefully selected to ensure it meets our high standards.`,

      portfolio: `# ${product} Portfolio

## Creative Excellence Showcased

I'm a passionate professional specializing in delivering exceptional results. With years of experience and a commitment to quality, I transform ideas into impactful solutions.

### My Expertise
- **Strategic Design**: Creating visually compelling experiences
- **Technical Excellence**: Building robust, scalable solutions
- **Problem Solving**: Turning challenges into opportunities
- **Collaboration**: Working closely to achieve shared goals

### Featured Projects
Explore my latest work that demonstrates innovation, attention to detail, and measurable results.

### Let's Create Something Amazing
I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.`,

      blog: `# ${product} Blog

## Insights & Inspiration

Welcome to the ${product} blog, where we share knowledge, trends, and insights to help you stay ahead in today's fast-paced world.

### Latest Articles
**The Future of Digital Innovation**
Explore how emerging technologies are reshaping industries and creating new opportunities for growth and transformation.

**Mastering User Experience**
Learn the principles behind creating intuitive, engaging digital experiences that keep users coming back.

**Sustainable Technology**
Discover how technology can drive sustainability efforts and contribute to a better future.

### Join Our Community
Subscribe to never miss an update. Get the latest articles delivered directly to your inbox.`,

      saas: `# ${product} SaaS Platform

## Enterprise-Grade Software Solution

${product} provides cutting-edge software solutions that streamline operations and boost productivity for businesses of all sizes.

### Key Benefits
- **Automated Workflows**: Reduce manual work by 80%
- **Real-time Analytics**: Make data-driven decisions
- **Scalable Infrastructure**: Grow without limits
- **24/7 Support**: Expert assistance anytime

### Trusted by Industry Leaders
"${product} transformed our operations and increased efficiency by 200%." - TechCorp Inc.

### Start Your Free Trial
Experience the power of ${product} with our 14-day free trial. No credit card required.`,

      restaurant: `# ${product} Restaurant

## Experience Culinary Excellence

Welcome to ${product}, where every meal is crafted with passion and the finest ingredients.

### Our Specialties
- **Authentic Cuisine**: Traditional recipes with a modern twist
- **Fresh Ingredients**: Sourced daily from local markets
- **Expert Chefs**: Years of culinary experience
- **Cozy Ambiance**: Perfect for any occasion

### Order Online or Dine In
- **Fast Delivery**: Within 30 minutes
- **Easy Reservations**: Book your table online
- **Catering Services**: For events and parties

### Visit Us Today
Experience the taste that keeps our customers coming back for more!`,

      medical: `# ${product} Medical Center

## Your Health, Our Priority

${product} provides comprehensive healthcare services with state-of-the-art facilities and experienced medical professionals.

### Our Services
- **General Consultation**
- **Specialized Treatments**
- **Diagnostic Services**
- **Emergency Care**
- **Wellness Programs**

### Why Choose Us?
- **Expert Doctors**: Highly qualified medical team
- **Advanced Technology**: Latest medical equipment
- **Patient-Centric Approach**: Personalized care plans
- **Affordable Pricing**: Transparent cost structure

### Book an Appointment
Your journey to better health starts here. Schedule your visit today!`,

      travel: `# ${product} Travel Agency

## Explore the World with Us

${product} creates unforgettable travel experiences with carefully curated packages and personalized service.

### Popular Destinations
- **Beach Getaways**: Maldives, Bali, Goa
- **Mountain Adventures**: Switzerland, Nepal, Himachal
- **Cultural Tours**: Europe, Japan, Thailand
- **Luxury Cruises**: Caribbean, Mediterranean

### Our Promise
- **Best Price Guarantee**
- **24/7 Customer Support**
- **Customized Itineraries**
- **Travel Insurance Included**

### Your Dream Vacation Awaits
Let us plan your perfect getaway. Contact us today!`,

      education: `# ${product} Educational Institute

## Empowering Minds, Building Futures

${product} offers quality education with innovative teaching methods and a focus on holistic development.

### Programs Offered
- **Professional Courses**
- **Skill Development**
- **Online Learning**
- **Workshops & Seminars**
- **Career Counseling**

### Why Study With Us?
- **Expert Faculty**: Industry professionals as instructors
- **Modern Infrastructure**: State-of-the-art facilities
- **Placement Assistance**: 90% placement record
- **Flexible Schedules**: Online and offline options

### Enroll Today
Take the first step toward a successful career. Admissions open!`,

      realestate: `# ${product} Real Estate

## Find Your Dream Property

${product} connects you with the perfect residential and commercial properties with transparent deals and expert guidance.

### Property Types
- **Apartments & Villas**
- **Commercial Spaces**
- **Plots & Land**
- **Rental Properties**
- **Luxury Homes**

### Our Services
- **Property Valuation**
- **Legal Assistance**
- **Home Loans Guidance**
- **Interior Design**
- **Property Management**

### Schedule a Viewing
Your perfect property is waiting. Contact us for a personal tour!`,
    };

    return contentTemplates[type] || contentTemplates.landing;
  };

  const generateHTML = (product, type, brain) => {
    const colors = brain.colorPalettes[0];
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${product} - AI Generated ${type} Website</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --primary: ${colors.primary};
      --secondary: ${colors.secondary};
      --accent: ${colors.accent};
      --background: ${colors.bg};
    }
    
    .gradient-bg {
      background: linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20);
    }
    
    .btn-primary {
      background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
      transition: all 0.3s ease;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px ${colors.primary}40;
    }
  </style>
</head>
<body class="min-h-screen bg-gray-50 text-gray-900">
  <!-- Navigation -->
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="text-2xl font-bold" style="color: var(--primary)">${product}</div>
      <div class="space-x-6 hidden md:flex">
        ${brain.pages.slice(0, 5).map(page => `<a href="#${page.toLowerCase()}" class="hover:text-purple-600 transition">${page}</a>`).join('')}
      </div>
      <button class="btn-primary text-white px-6 py-2 rounded-full font-semibold">
        Get Started
      </button>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="gradient-bg py-20 px-6">
    <div class="container mx-auto text-center">
      <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
        Welcome to <span style="color: var(--primary)">${product}</span>
      </h1>
      <p class="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">
        AI-powered ${type} solution designed for excellence and performance.
      </p>
      <div class="flex flex-col md:flex-row gap-4 justify-center">
        <button class="btn-primary text-white px-8 py-4 rounded-full text-lg font-semibold">
          Start Free Trial <i class="ml-2 fas fa-arrow-right"></i>
        </button>
        <button class="bg-white border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50">
          View Demo
        </button>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="py-20 px-6 bg-white" id="features">
    <div class="container mx-auto">
      <h2 class="text-4xl font-bold text-center mb-16">Powerful Features</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${brain.features.slice(0, 6).map((feature, i) => `
        <div class="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-purple-300 transition">
          <div class="w-14 h-14 rounded-full flex items-center justify-center mb-6" style="background: var(--primary)">
            <i class="fas fa-star text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-4">${feature}</h3>
          <p class="text-gray-600">Carefully implemented to ensure optimal performance and user experience.</p>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 px-6" style="background: var(--background)">
    <div class="container mx-auto text-center">
      <h2 class="text-4xl font-bold text-white mb-8">Ready to Transform Your Business?</h2>
      <p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
        Join thousands of satisfied customers who have already revolutionized their online presence.
      </p>
      <button class="btn-primary text-white px-10 py-5 rounded-full text-xl font-bold">
        Get Started Now <i class="ml-3 fas fa-rocket"></i>
      </button>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-12 px-6">
    <div class="container mx-auto text-center">
      <div class="text-2xl font-bold mb-6">${product}</div>
      <p class="text-gray-400 mb-8">AI Generated ${type} Website • Optimized for Performance</p>
      <div class="flex justify-center space-x-6 mb-8">
        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter text-2xl"></i></a>
        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook text-2xl"></i></a>
        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-linkedin text-2xl"></i></a>
        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram text-2xl"></i></a>
      </div>
      <p class="text-gray-500 text-sm">© ${new Date().getFullYear()} ${product}. All rights reserved.</p>
    </div>
  </footer>

  <script>
    // Simple animation for elements
    document.addEventListener('DOMContentLoaded', function() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      }, observerOptions);
      
      document.querySelectorAll('section > div').forEach(el => observer.observe(el));
    });
  </script>
</body>
</html>`;
  };

  const downloadHTML = () => {
    if (!ai?.html_code) return;
    const blob = new Blob([ai.html_code], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${product.toLowerCase().replace(/\s+/g, '-')}-${type}-ai-website.html`;
    link.click();
  };

  // NEW FUNCTION: View Full Code
  const viewFullCode = () => {
    if (!ai?.html_code) return;
    setShowFullCode(!showFullCode);
  };

  const getCurrentType = () => WEBSITE_TYPES.find(t => t.id === type);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="mb-10 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-2 flex items-center gap-3">
                <div className="relative">
                  <Brain className="text-purple-400" size={40} />
                  <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" size={20} />
                </div>
                AI Website Generator
              </h1>
              <p className="text-gray-300 text-lg">
                Advanced AI that designs complete websites with technology stack recommendations
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">AI System Online</span>
            </div>
          </div>
        </header>

        {/* MAIN FORM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT PANEL - INPUT */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Cpu className="text-purple-400" />
                  Website Configuration
                </h2>
                <p className="text-gray-300 mb-6">Let AI analyze your needs and generate optimal solutions</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block mb-3 font-medium">Website Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {WEBSITE_TYPES.map((websiteType) => (
                      <button
                        key={websiteType.id}
                        onClick={() => setType(websiteType.id)}
                        className={`p-4 rounded-2xl border-2 transition-all ${type === websiteType.id
                            ? `border-purple-500 bg-gradient-to-br ${websiteType.color}`
                            : "border-white/10 bg-white/5 hover:bg-white/10"
                          }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          {websiteType.icon}
                          <span className="text-sm font-medium">{websiteType.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-3 font-medium">Business / Product Name</label>
                  <input
                    placeholder="Enter your business or product name"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full p-4 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div>
                  <label className="block mb-3 font-medium">Brief Description</label>
                  <textarea
                    placeholder="Describe what your business does or what your product offers..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full p-4 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-purple-500 transition resize-none"
                  />
                </div>

                <div>
                  <label className="block mb-3 font-medium">Target Audience</label>
                  <div className="flex flex-wrap gap-3">
                    {["General", "Business", "Young Adults", "Professionals", "Global", "Local"].map((audience) => (
                      <button
                        key={audience}
                        onClick={() => setTargetAudience(audience.toLowerCase())}
                        className={`px-4 py-2 rounded-full border transition ${targetAudience === audience.toLowerCase()
                            ? "bg-purple-600 border-purple-600"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                          }`}
                      >
                        {audience}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateAI}
                  disabled={loading}
                  className="w-full py-5 rounded-xl font-bold text-lg
                    bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600
                    hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30
                    transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      AI Processing...
                    </>
                  ) : (
                    <>
                      <Brain size={24} />
                      Generate AI-Powered Website
                      <Sparkles size={20} />
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
                <Layout className="text-cyan-400" />
                Preview
              </h3>
              {getCurrentType() && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br ${getCurrentType().color}`}>
                      {getCurrentType().icon}
                    </div>
                    <h4 className="text-2xl font-bold">{getCurrentType().name}</h4>
                    <p className="text-gray-400 mt-2">Website Type Selected</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Pages:</span>
                      <span className="font-semibold">{AI_BRAIN[type]?.pages?.length || 5}+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Features:</span>
                      <span className="font-semibold">{AI_BRAIN[type]?.features?.length || 6}+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Timeline:</span>
                      <span className="font-semibold">{AI_BRAIN[type]?.timeline || "1-2 weeks"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Price Range:</span>
                      <span className="font-semibold">
                        ₹{AI_BRAIN[type]?.price?.[0]?.toLocaleString() || "5,000"} - ₹{AI_BRAIN[type]?.price?.[1]?.toLocaleString() || "30,000"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <p className="text-gray-400 text-sm">
                      AI will analyze this configuration and generate:
                    </p>
                    <ul className="mt-3 space-y-2 text-sm">
                      <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Color Palette</li>
                      <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Technology Stack</li>
                      <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Page Structure</li>
                      <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> SEO Strategy</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full border-4 border-purple-500/30"></div>
                <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
                <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-400" size={40} />
              </div>

              <h3 className="text-2xl font-bold mb-6 text-center">AI is analyzing your requirements</h3>

              <div className="w-full max-w-2xl space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round((loadingStep + 1) / loadingSteps.length * 100)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
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

        {/* RESULTS SECTION */}
        {!loading && ai && (
          <div className="mt-12 space-y-8">
            {/* AI MESSAGE */}
            <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <Brain size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI Analysis Complete</h3>
                  <div className="text-gray-200 whitespace-pre-line">{ai.ai_message}</div>
                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>Target: {targetAudience.charAt(0).toUpperCase() + targetAudience.slice(1)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} />
                      <span>Optimized for conversion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT COLUMN */}
              <div className="space-y-8">
                {/* PAGES */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Layout className="text-blue-400" />
                    Recommended Pages
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {ai.pages.map((page, i) => (
                      <div
                        key={i}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition"
                      >
                        <div className="text-2xl mb-2">📄</div>
                        <span className="font-medium">{page}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* COLOR PALETTE */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Palette className="text-pink-400" />
                    Color Palette
                  </h3>
                  <div className="space-y-4">
                    {ai.colorPalettes.map((palette, idx) => (
                      <div key={idx} className="space-y-3">
                        <div className="flex h-12 rounded-xl overflow-hidden shadow-lg">
                          {Object.entries(palette).map(([key, color]) => (
                            <div
                              key={key}
                              className="flex-1 flex flex-col items-center justify-center"
                              style={{ backgroundColor: color }}
                              title={`${key}: ${color}`}
                            >
                              <span className="text-xs font-bold mix-blend-overlay">{key}</span>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          {Object.entries(palette).map(([key, color]) => (
                            <div key={key} className="text-center">
                              <div className="font-semibold mb-1">{key}</div>
                              <div className="text-gray-400">{color}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RECOMMENDATIONS */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Zap className="text-yellow-400" />
                    AI Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {ai.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle size={14} className="text-blue-400" />
                        </div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-8">
                {/* TECH STACK */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                    <Cpu className="text-green-400" />
                    Technology Stack
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-300">Frontend</h4>
                      <div className="flex flex-wrap gap-2">
                        {ai.techStack.frontend.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-300">Backend</h4>
                      <div className="flex flex-wrap gap-2">
                        {ai.techStack.backend.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                          <Database size={16} /> Database
                        </h4>
                        <span className="px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg block">
                          {ai.techStack.database}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-300 flex items-center gap-2">
                          <Server size={16} /> Hosting
                        </h4>
                        <span className="px-3 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg block">
                          {ai.techStack.hosting}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PRICING & TIMELINE */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <IndianRupee className="text-green-400" />
                        Pricing
                      </h3>
                      <div className="space-y-3">
                        <div className="text-3xl font-bold text-green-400">
                          ₹{ai.pricing.suggested.toLocaleString()}
                        </div>
                        <div className="text-gray-400">
                          Range: ₹{ai.pricing.range[0].toLocaleString()} - ₹{ai.pricing.range[1].toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-400">{ai.pricing.note}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                        <Clock className="text-cyan-400" />
                        Timeline
                      </h3>
                      <div className="space-y-3">
                        <div className="text-3xl font-bold text-cyan-400">
                          {ai.timeline}
                        </div>
                        <p className="text-sm text-gray-400">From planning to deployment</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FEATURES */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Zap className="text-yellow-400" />
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {ai.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ACTION BUTTONS */}
                <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-3xl p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={downloadHTML}
                      className="flex-1 flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition"
                    >
                      <Download /> Download HTML Template
                    </button>
                    <button 
                      onClick={viewFullCode}
                      className="flex-1 flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold hover:scale-105 transition"
                    >
                      <Code /> {showFullCode ? "Hide Full Code" : "View Full Code"}
                    </button>
                  </div>
                  <p className="text-center text-gray-300 mt-4 text-sm">
                    Complete with Tailwind CSS, responsive design, and SEO optimization
                  </p>
                </div>
              </div>
            </div>

            {/* GENERATED CONTENT PREVIEW */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Layers className="text-cyan-400" />
                AI Generated Content
              </h3>
              <div className="bg-gray-900 rounded-xl p-6 max-h-96 overflow-y-auto">
                <pre className="text-gray-300 whitespace-pre-wrap font-sans text-sm">
                  {generatedContent}
                </pre>
              </div>
            </div>

            {/* FULL CODE PREVIEW (NEW SECTION) */}
            {showFullCode && ai?.html_code && (
              <div className="bg-gray-900 border border-gray-700 rounded-3xl p-6">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Code className="text-cyan-400" />
                  Full Generated HTML Code
                </h3>
                <div className="relative">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(ai.html_code);
                        alert("Code copied to clipboard!");
                      }}
                      className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm"
                    >
                      Copy Code
                    </button>
                  </div>
                  <div className="bg-black rounded-xl p-4 overflow-x-auto mt-2">
                    <pre className="text-gray-300 text-sm font-mono whitespace-pre">
                      {ai.html_code}
                    </pre>
                  </div>
                  <div className="mt-4 text-sm text-gray-400">
                    <p>This is the complete HTML code generated by AI. You can download it or copy to use in your project.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>
            🤖 This is a simulated AI system for demonstration purposes. The AI responses are pre-programmed based on selected parameters.
          </p>
          <p className="mt-2">
            The system analyzes your input and generates realistic website recommendations using advanced algorithms.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <span className="flex items-center gap-2">
              <Shield size={16} /> Secure Analysis
            </span>
            <span className="flex items-center gap-2">
              <Smartphone size={16} /> Mobile Optimized
            </span>
            <span className="flex items-center gap-2">
              <Zap size={16} /> Fast Processing
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}