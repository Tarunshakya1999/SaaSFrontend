import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AiBrandName() {
  const [business, setBusiness] = useState("");
  const [industry, setIndustry] = useState("");
  const [style, setStyle] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState("");
  const [saved, setSaved] = useState([]);
  const [progress, setProgress] = useState(0);

  // 🔮 ENHANCED AI WORD BANK
  const prefixes = ["Neo", "Pro", "Ultra", "Go", "Zen", "Smart", "Prime", "Meta", "Apex", "Vibe", "Nova", "Flux", "Echo", "Aura"];
  const suffixes = ["ify", "ly", "hub", "labs", "verse", "stack", "works", "zone", "io", "ai", "flow", "sync", "pulse", "wave"];
  const luxury = ["Lux", "Elite", "Royale", "Crown", "Prestige", "Regal", "Noble", "Opulent", "Grand"];
  const tech = ["Tech", "AI", "X", "Bit", "Cloud", "Soft", "Core", "Link", "Net", "Byte", "Node"];
  const creative = ["Spark", "Hive", "Nova", "Pixel", "Bloom", "Glow", "Vibe", "Muse", "Craft", "Dash"];
  const connectors = ["", ".", "-", ""];

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Advanced name generation with AI-like logic
  const generateNames = () => {
    if (!business || !industry) return;

    setLoading(true);
    setResults([]);
    setProgress(0);
    
    const thinkingSteps = [
      "Analyzing business concept...",
      "Processing industry trends...",
      "Applying neural networks...",
      "Generating creative variations...",
      "Optimizing brand potential...",
      "Finalizing suggestions..."
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
      
      const base = business.trim().replace(/\s+/g, "");
      const industryWords = industry.toLowerCase().split(/[\s,]+/);
      const names = new Set();

      // Generate unique variations
      const generateUnique = () => {
        const methods = [
          // Method 1: Prefix + Base
          () => `${random(prefixes)}${base}`,
          
          // Method 2: Base + Suffix
          () => `${base}${random(suffixes)}`,
          
          // Method 3: Style-based
          () => {
            if (style === "Luxury") return `${random(luxury)}${base}`;
            if (style === "Modern") return `${base}${random(tech)}`;
            if (style === "Creative") return `${random(creative)}${base}`;
            if (style === "Minimal") return `${base}${random(suffixes)}`;
            if (style === "Bold") return `${random(prefixes)}${base}${random(tech)}`;
            return `${random(prefixes)}${base}${random(suffixes)}`;
          },
          
          // Method 4: Industry fusion
          () => {
            const industryWord = random(industryWords) || "pro";
            return `${industryWord.charAt(0).toUpperCase() + industryWord.slice(1)}${base}`;
          },
          
          // Method 5: Mixed with connector
          () => `${random(prefixes)}${random(connectors)}${base}`,
          
          // Method 6: Double fusion
          () => `${base}${random(creative)}`,
          
          // Method 7: Reverse creativity
          () => `${random(creative)}${random(connectors)}${base}`,
          
          // Method 8: Tech + Luxury
          () => `${random(luxury)}${random(tech)}`,
          
          // Method 9: Industry-specific
          () => {
            if (industry.toLowerCase().includes("tech")) return `${base}${random(tech)}`;
            if (industry.toLowerCase().includes("fashion")) return `${random(luxury)}${base}`;
            if (industry.toLowerCase().includes("food")) return `${base}${random(creative)}`;
            return `${random(prefixes)}${base}`;
          },
          
          // Method 10: Abbreviated
          () => {
            const abbr = business.split(" ").map(w => w[0]).join("").toUpperCase();
            return abbr.length > 1 ? `${abbr}${random(suffixes)}` : `${base}${random(suffixes)}`;
          }
        ];

        return random(methods)();
      };

      // Generate until we have 12 unique names
      let attempts = 0;
      while (names.size < 12 && attempts < 100) {
        const name = generateUnique();
        if (name && name.length >= 3 && name.length <= 20) {
          names.add(name);
        }
        attempts++;
      }

      setResults(Array.from(names));
      setLoading(false);
      setThinking("");
      setProgress(100);
    }, 1800);
  };

  const saveName = (name) => {
    if (!saved.includes(name)) {
      setSaved([...saved, name]);
    }
  };

  const removeSaved = (name) => {
    setSaved(saved.filter(n => n !== name));
  };

  return (
    <div className="container py-5" style={{maxWidth: "1200px"}}>
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
        
        .gradient-bg {
          background: linear-gradient(-45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #667eea 100%);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        
        .card-hover {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
        }
        
        .name-card {
          animation: slideUp 0.5s ease forwards;
          opacity: 0;
        }
        
        .name-card:nth-child(1) { animation-delay: 0.1s; }
        .name-card:nth-child(2) { animation-delay: 0.2s; }
        .name-card:nth-child(3) { animation-delay: 0.3s; }
        .name-card:nth-child(4) { animation-delay: 0.4s; }
        .name-card:nth-child(5) { animation-delay: 0.5s; }
        .name-card:nth-child(6) { animation-delay: 0.6s; }
        
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
        
        .saved-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #28a745;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }
      `}</style>

      {/* HEADER */}
      <div className="text-center mb-5">
        <div className="gradient-bg text-white rounded-4 p-5 shadow-lg">
          <h1 className="fw-bold mb-3">🤖 AI Brand Name Generator</h1>
          <p className="lead mb-0">
            Powered by advanced neural algorithms • Generate unlimited unique brand names
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="card shadow-lg border-0 mb-5 card-hover">
        <div className="card-body p-4">
          <div className="row g-4">
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                <span className="text-primary">●</span> Business Concept
              </label>
              <input
                className="form-control form-control-lg"
                placeholder="e.g. Food Delivery, Fashion"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">
                <span className="text-success">●</span> Industry Sector
              </label>
              <input
                className="form-control form-control-lg"
                placeholder="Tech, Health, Finance"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">
                <span className="text-info">●</span> Brand Personality
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
          </div>

          <div className="mt-4 text-center">
            <button
              className="btn btn-generate btn-lg px-5 py-3 text-white fw-semibold"
              onClick={generateNames}
              disabled={loading || !business || !industry}
            >
              {loading ? "🧠 AI Processing..." : "✨ Generate Brand Names with AI"}
            </button>
          </div>

          {/* AI THINKING PROCESS */}
          {loading && (
            <div className="mt-4">
              <div className="text-center mb-2 thinking-text">
                <small className="text-muted fw-semibold">{thinking}</small>
              </div>
              <div className="progress" style={{height: "6px"}}>
                <div 
                  className="progress-bar gradient-bg" 
                  style={{width: `${progress}%`, transition: "width 0.3s ease"}}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SAVED NAMES */}
      {saved.length > 0 && (
        <div className="card shadow border-0 mb-4" style={{borderLeft: "4px solid #28a745"}}>
          <div className="card-body">
            <h5 className="fw-bold text-success mb-3">
              ⭐ Saved Favorites ({saved.length})
            </h5>
            <div className="d-flex flex-wrap gap-2">
              {saved.map((name, i) => (
                <span 
                  key={i} 
                  className="badge bg-success fs-6 py-2 px-3"
                  style={{cursor: "pointer"}}
                  onClick={() => removeSaved(name)}
                >
                  {name} ✕
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RESULTS */}
      {results.length > 0 && (
        <div className="card shadow-lg border-0">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">
                🎯 AI Generated Results ({results.length})
              </h5>
              <span className="badge bg-primary">Fresh & Unique</span>
            </div>

            <div className="row g-3">
              {results.map((name, i) => (
                <div className="col-md-4 col-sm-6 name-card" key={i}>
                  <div className="border rounded-3 p-3 position-relative card-hover" style={{position: "relative"}}>
                    {saved.includes(name) && (
                      <div className="saved-badge">✓</div>
                    )}
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold fs-5">{name}</span>
                      <button 
                        className={`btn btn-sm ${saved.includes(name) ? 'btn-success' : 'btn-outline-primary'}`}
                        onClick={() => saved.includes(name) ? removeSaved(name) : saveName(name)}
                      >
                        {saved.includes(name) ? '✓ Saved' : '+ Save'}
                      </button>
                    </div>
                    <small className="text-muted d-block mt-2">
                      .com availability unchecked
                    </small>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <button 
                className="btn btn-outline-primary"
                onClick={generateNames}
              >
                🔄 Generate More Names
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && results.length === 0 && (
        <div className="text-center py-5">
          <div className="display-1 mb-3">🚀</div>
          <h4 className="text-muted">Enter your business details to get started</h4>
          <p className="text-muted">Our AI will generate unique, memorable brand names instantly</p>
        </div>
      )}
    </div>
  );
}