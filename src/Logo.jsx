import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AiLogoGenerator() {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [style, setStyle] = useState("");
  const [description, setDescription] = useState("");
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState("");
  const [saved, setSaved] = useState([]);
  const [progress, setProgress] = useState(0);

  // Color Psychology Data
  const colorPsychology = {
    Tech: { primary: "#667eea", secondary: "#4facfe", meaning: "Innovation & Trust" },
    Finance: { primary: "#2ECC71", secondary: "#27AE60", meaning: "Growth & Prosperity" },
    Health: { primary: "#3498DB", secondary: "#E74C3C", meaning: "Trust & Vitality" },
    Food: { primary: "#E74C3C", secondary: "#F39C12", meaning: "Appetite & Energy" },
    Fashion: { primary: "#E91E63", secondary: "#9C27B0", meaning: "Elegance & Creativity" },
    Education: { primary: "#FF9800", secondary: "#2196F3", meaning: "Knowledge & Growth" },
    Luxury: { primary: "#FFD700", secondary: "#000000", meaning: "Premium & Exclusivity" },
    Creative: { primary: "#FF6B6B", secondary: "#4ECDC4", meaning: "Imagination & Energy" },
    Minimal: { primary: "#2C3E50", secondary: "#ECF0F1", meaning: "Simplicity & Clarity" },
    Bold: { primary: "#FF1744", secondary: "#FFEB3B", meaning: "Power & Confidence" }
  };

  // Logo shapes and styles
  const shapes = ["circle", "square", "hexagon", "rounded", "shield", "diamond"];
  const iconTypes = ["letter", "abstract", "geometric", "minimal", "combined"];

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Generate SVG Logo
  const generateSVGLogo = (index, colorScheme) => {
    const shape = random(shapes);
    const iconType = random(iconTypes);
    const letter = brandName.charAt(0).toUpperCase() || "A";
    const { primary, secondary } = colorScheme;

    const svgTemplates = [
      // Circle with Letter
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="90" fill="${primary}"/>
        <circle cx="100" cy="100" r="70" fill="${secondary}" opacity="0.3"/>
        <text x="100" y="130" font-size="80" fill="white" text-anchor="middle" font-weight="bold">${letter}</text>
      </svg>`,
      
      // Geometric Abstract
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="160" height="160" rx="30" fill="${primary}"/>
        <polygon points="100,40 160,100 100,160 40,100" fill="${secondary}"/>
        <text x="100" y="120" font-size="50" fill="white" text-anchor="middle" font-weight="bold">${letter}</text>
      </svg>`,
      
      // Hexagon Design
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="100,10 180,55 180,145 100,190 20,145 20,55" fill="${primary}"/>
        <polygon points="100,40 150,70 150,130 100,160 50,130 50,70" fill="${secondary}"/>
        <text x="100" y="120" font-size="50" fill="white" text-anchor="middle" font-weight="bold">${letter}</text>
      </svg>`,
      
      // Modern Gradient
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${primary};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${secondary};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" rx="40" fill="url(#grad${index})"/>
        <text x="100" y="130" font-size="90" fill="white" text-anchor="middle" font-weight="bold">${letter}</text>
      </svg>`,
      
      // Shield Style
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M100,10 L180,50 L180,110 Q180,170 100,190 Q20,170 20,110 L20,50 Z" fill="${primary}"/>
        <path d="M100,40 L150,65 L150,110 Q150,150 100,165 Q50,150 50,110 L50,65 Z" fill="${secondary}"/>
        <text x="100" y="120" font-size="50" fill="white" text-anchor="middle" font-weight="bold">${letter}</text>
      </svg>`,
      
      // Dual Circle
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="100" r="70" fill="${primary}"/>
        <circle cx="120" cy="100" r="70" fill="${secondary}" opacity="0.8"/>
        <text x="100" y="120" font-size="60" fill="white" text-anchor="middle" font-weight="bold">${letter}</text>
      </svg>`,
      
      // Triangle Modern
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="100,20 190,180 10,180" fill="${primary}"/>
        <polygon points="100,60 150,150 50,150" fill="${secondary}"/>
        <text x="100" y="140" font-size="50" fill="white" text-anchor="middle" font-weight="bold">${letter}</text>
      </svg>`,
      
      // Rounded Square
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="160" height="160" rx="50" fill="${primary}"/>
        <rect x="50" y="50" width="100" height="100" rx="30" fill="${secondary}" opacity="0.5"/>
        <text x="100" y="130" font-size="70" fill="white" text-anchor="middle" font-weight="bold">${letter}</text>
      </svg>`,
      
      // Star Burst
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="90" fill="${primary}"/>
        <polygon points="100,30 115,75 160,75 120,105 135,150 100,120 65,150 80,105 40,75 85,75" fill="${secondary}"/>
        <text x="100" y="120" font-size="50" fill="white" text-anchor="middle" font-weight="bold">${letter}</text>
      </svg>`,
      
      // Wave Design
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" rx="30" fill="${primary}"/>
        <path d="M0,100 Q50,60 100,100 T200,100 L200,200 L0,200 Z" fill="${secondary}" opacity="0.6"/>
        <text x="100" y="90" font-size="60" fill="white" text-anchor="middle" font-weight="bold">${letter}</text>
      </svg>`,
      
      // Diamond Cut
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="100,20 180,100 100,180 20,100" fill="${primary}"/>
        <polygon points="100,50 150,100 100,150 50,100" fill="${secondary}"/>
        <text x="100" y="120" font-size="50" fill="white" text-anchor="middle" font-weight="bold">${letter}</text>
      </svg>`,
      
      // Infinity Symbol
      `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,100 Q50,50 80,50 Q110,50 110,100 Q110,150 80,150 Q50,150 50,100 M110,100 Q110,50 140,50 Q170,50 170,100 Q170,150 140,150 Q110,150 110,100" fill="${primary}"/>
        <text x="100" y="120" font-size="40" fill="white" text-anchor="middle" font-weight="bold">${letter}</text>
      </svg>`
    ];

    return random(svgTemplates);
  };

  const generateLogos = () => {
    if (!brandName || !industry) return;

    setLoading(true);
    setLogos([]);
    setProgress(0);

    const thinkingSteps = [
      "Analyzing brand identity...",
      "Processing color psychology...",
      "Applying design principles...",
      "Generating logo variations...",
      "Optimizing visual balance...",
      "Finalizing designs..."
    ];

    let stepIndex = 0;
    const thinkingInterval = setInterval(() => {
      if (stepIndex < thinkingSteps.length) {
        setThinking(thinkingSteps[stepIndex]);
        setProgress(((stepIndex + 1) / thinkingSteps.length) * 100);
        stepIndex++;
      }
    }, 300);

    setTimeout(() => {
      clearInterval(thinkingInterval);

      // Determine color scheme
      let colorScheme = colorPsychology.Tech;
      
      if (style && colorPsychology[style]) {
        colorScheme = colorPsychology[style];
      } else {
        Object.keys(colorPsychology).forEach(key => {
          if (industry.toLowerCase().includes(key.toLowerCase())) {
            colorScheme = colorPsychology[key];
          }
        });
      }

      // Generate 12 unique logos
      const generatedLogos = [];
      for (let i = 0; i < 12; i++) {
        const svg = generateSVGLogo(i, colorScheme);
        generatedLogos.push({
          id: i,
          svg: svg,
          colors: colorScheme,
          name: `${brandName} Logo ${i + 1}`
        });
      }

      setLogos(generatedLogos);
      setLoading(false);
      setThinking("");
      setProgress(100);
    }, 1800);
  };

  const saveLogo = (logo) => {
    if (!saved.find(s => s.id === logo.id)) {
      setSaved([...saved, logo]);
    }
  };

  const removeSaved = (logoId) => {
    setSaved(saved.filter(s => s.id !== logoId));
  };

  const downloadLogo = (logo) => {
    const blob = new Blob([logo.svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandName.replace(/\s+/g, '-')}-logo-${logo.id}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container py-5" style={{ maxWidth: "1400px" }}>
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .gradient-bg {
          background: linear-gradient(-45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #667eea 100%);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
        }
        
        .logo-card {
          animation: slideUp 0.5s ease forwards;
          opacity: 0;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        .logo-card:nth-child(1) { animation-delay: 0.1s; }
        .logo-card:nth-child(2) { animation-delay: 0.2s; }
        .logo-card:nth-child(3) { animation-delay: 0.3s; }
        .logo-card:nth-child(4) { animation-delay: 0.4s; }
        .logo-card:nth-child(5) { animation-delay: 0.5s; }
        .logo-card:nth-child(6) { animation-delay: 0.6s; }
        
        .logo-preview {
          width: 100%;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 10px;
          padding: 20px;
        }
        
        .logo-preview svg {
          width: 140px;
          height: 140px;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
        }
        
        .logo-actions {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255,255,255,0.95);
          padding: 10px;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }
        
        .logo-card:hover .logo-actions {
          transform: translateY(0);
        }
        
        .thinking-text {
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        .btn-generate {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          transition: all 0.3s ease;
        }
        
        .btn-generate:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }
        
        .color-badge {
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          margin: 0 5px;
        }
        
        .saved-indicator {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #28a745;
          color: white;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          z-index: 10;
        }
      `}</style>

      {/* HEADER */}
      <div className="text-center mb-5">
        <div className="gradient-bg text-white rounded-4 p-5 shadow-lg">
          <h1 className="fw-bold mb-3">🎨 AI Logo & Color Psychology</h1>
          <p className="lead mb-0">
            Generate stunning logos with AI-powered color psychology • Perfect for your brand identity
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="card shadow-lg border-0 mb-5 card-hover">
        <div className="card-body p-4">
          <div className="row g-4">
            <div className="col-md-3">
              <label className="form-label fw-semibold">
                <span className="text-primary">●</span> Brand Name
              </label>
              <input
                className="form-control form-control-lg"
                placeholder="e.g. TechFlow"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">
                <span className="text-success">●</span> Industry
              </label>
              <input
                className="form-control form-control-lg"
                placeholder="Tech, Food, Fashion"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">
                <span className="text-info">●</span> Style
              </label>
              <select
                className="form-select form-select-lg"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              >
                <option value="">AI Auto-Select</option>
                <option>Modern</option>
                <option>Luxury</option>
                <option>Creative</option>
                <option>Minimal</option>
                <option>Bold</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">
                <span className="text-warning">●</span> Description (Optional)
              </label>
              <input
                className="form-control form-control-lg"
                placeholder="Modern, Elegant..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              className="btn btn-generate btn-lg px-5 py-3 text-white fw-semibold"
              onClick={generateLogos}
              disabled={loading || !brandName || !industry}
            >
              {loading ? "🎨 AI Creating..." : "✨ Generate Logos with AI"}
            </button>
          </div>

          {/* AI THINKING PROCESS */}
          {loading && (
            <div className="mt-4">
              <div className="text-center mb-2 thinking-text">
                <small className="text-muted fw-semibold">{thinking}</small>
              </div>
              <div className="progress" style={{ height: "6px" }}>
                <div
                  className="progress-bar gradient-bg"
                  style={{ width: `${progress}%`, transition: "width 0.3s ease" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SAVED LOGOS */}
      {saved.length > 0 && (
        <div className="card shadow border-0 mb-4" style={{ borderLeft: "4px solid #28a745" }}>
          <div className="card-body">
            <h5 className="fw-bold text-success mb-3">
              ⭐ Saved Logos ({saved.length})
            </h5>
            <div className="row g-3">
              {saved.map((logo) => (
                <div className="col-md-2 col-sm-4" key={logo.id}>
                  <div 
                    className="border rounded p-2 text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeSaved(logo.id)}
                  >
                    <div dangerouslySetInnerHTML={{ __html: logo.svg }} style={{ width: "80px", height: "80px", margin: "0 auto" }} />
                    <small className="text-muted d-block mt-1">Click to remove</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* COLOR PSYCHOLOGY INFO */}
      {logos.length > 0 && (
        <div className="card shadow border-0 mb-4" style={{ borderLeft: "4px solid #667eea" }}>
          <div className="card-body">
            <h5 className="fw-bold mb-3">🎨 Color Psychology</h5>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center">
                <span className="color-badge" style={{ backgroundColor: logos[0].colors.primary }}></span>
                <span className="color-badge" style={{ backgroundColor: logos[0].colors.secondary }}></span>
              </div>
              <div>
                <strong>Meaning:</strong> {logos[0].colors.meaning}
              </div>
              <div className="ms-auto">
                <span className="badge bg-primary">{logos[0].colors.primary}</span>
                <span className="badge bg-secondary ms-2">{logos[0].colors.secondary}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOGO RESULTS */}
      {logos.length > 0 && (
        <div className="card shadow-lg border-0">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">
                🎯 AI Generated Logos ({logos.length})
              </h5>
              <span className="badge bg-primary">Professional Quality</span>
            </div>

            <div className="row g-4">
              {logos.map((logo) => (
                <div className="col-md-3 col-sm-6 logo-card" key={logo.id}>
                  <div className="card border-0 shadow-sm h-100">
                    {saved.find(s => s.id === logo.id) && (
                      <div className="saved-indicator">✓</div>
                    )}
                    <div className="logo-preview">
                      <div dangerouslySetInnerHTML={{ __html: logo.svg }} />
                    </div>
                    <div className="logo-actions">
                      <div className="d-flex gap-2 justify-content-center">
                        <button
                          className={`btn btn-sm ${saved.find(s => s.id === logo.id) ? 'btn-success' : 'btn-outline-primary'} flex-fill`}
                          onClick={() => saved.find(s => s.id === logo.id) ? removeSaved(logo.id) : saveLogo(logo)}
                        >
                          {saved.find(s => s.id === logo.id) ? '✓' : '♥'}
                        </button>
                        <button
                          className="btn btn-sm btn-outline-secondary flex-fill"
                          onClick={() => downloadLogo(logo)}
                        >
                          ⬇
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-outline-primary" onClick={generateLogos}>
                🔄 Generate More Logos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && logos.length === 0 && (
        <div className="text-center py-5">
          <div className="display-1 mb-3">🎨</div>
          <h4 className="text-muted">Enter your brand details to create stunning logos</h4>
          <p className="text-muted">AI will generate professional logos with perfect color psychology</p>
        </div>
      )}
    </div>
  );
}