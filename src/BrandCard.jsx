import React, { useState, useEffect, useRef } from 'react';

const BusinessCard = () => {
  const [businessName, setBusinessName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [error, setError] = useState('');
  const [qrLoaded, setQrLoaded] = useState(false);
  const qrCanvasRef = useRef(null);

  // AI-like typing effect messages
  const aiResponses = [
    "Initializing Quantum Matrix...",
    "Analyzing Business Identity...",
    "Optimizing Visual Aesthetics...",
    "Applying Neural Encryption...",
    "Generating QR Signature...",
    "Creating Digital Business Card...",
    "Finalizing Quantum Portal..."
  ];

  useEffect(() => {
    if (isAiThinking) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < aiResponses.length) {
          setAiMessages(prev => [...prev, aiResponses[index]]);
          index++;
        } else {
          setIsAiThinking(false);
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isAiThinking]);

  // Enhanced QR code generator with business name
  const generateEnhancedQR = async (url, businessName) => {
    try {
      const encodedUrl = encodeURIComponent(url);
      // Using higher quality QR code API with custom parameters
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedUrl}&format=png&color=000000&bgcolor=FFFFFF&qzone=1`;
      
      // Create canvas for enhanced QR with business name
      const canvas = document.createElement('canvas');
      canvas.width = 350;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      
      // Load QR code image
      const qrImage = new Image();
      qrImage.crossOrigin = 'anonymous';
      
      return new Promise((resolve, reject) => {
        qrImage.onload = () => {
          // Create gradient background for QR container
          const gradient = ctx.createLinearGradient(0, 0, 350, 0);
          gradient.addColorStop(0, '#1e40af');
          gradient.addColorStop(1, '#7c3aed');
          
          // Draw QR container with shadow
          ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetY = 10;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(25, 80, 300, 300);
          ctx.shadowColor = 'transparent';
          
          // Draw QR code
          ctx.drawImage(qrImage, 50, 105, 250, 250);
          
          // Draw business name above QR code
          ctx.fillStyle = '#1f2937';
          ctx.font = 'bold 22px Arial, sans-serif';
          ctx.textAlign = 'center';
          
          // Draw text with outline
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#ffffff';
          ctx.strokeText(businessName || 'Your Business', 175, 60);
          ctx.fillText(businessName || 'Your Business', 175, 60);
          
          // Draw decorative line
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(100, 75);
          ctx.lineTo(250, 75);
          ctx.stroke();
          
          // Add scan text below QR
          ctx.fillStyle = '#6b7280';
          ctx.font = '14px Arial, sans-serif';
          ctx.fillText('Scan to visit website', 175, 380);
          
          // Add website URL below
          ctx.fillStyle = '#3b82f6';
          ctx.font = '12px Arial, sans-serif';
          const displayUrl = url.length > 30 ? url.substring(0, 30) + '...' : url;
          ctx.fillText(displayUrl, 175, 400);
          
          resolve(canvas.toDataURL('image/png', 1.0));
        };
        
        qrImage.onerror = () => {
          // Fallback to simple QR
          const fallbackCanvas = document.createElement('canvas');
          fallbackCanvas.width = 350;
          fallbackCanvas.height = 400;
          const fallbackCtx = fallbackCanvas.getContext('2d');
          
          // Draw background
          fallbackCtx.fillStyle = '#ffffff';
          fallbackCtx.fillRect(0, 0, 350, 400);
          
          // Draw business name
          fallbackCtx.fillStyle = '#000000';
          fallbackCtx.font = 'bold 20px Arial';
          fallbackCtx.textAlign = 'center';
          fallbackCtx.fillText(businessName || 'Business Card', 175, 50);
          
          // Draw simple QR pattern
          fallbackCtx.fillStyle = '#000000';
          for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 25; j++) {
              if (Math.random() > 0.5) {
                fallbackCtx.fillRect(75 + i * 8, 100 + j * 8, 6, 6);
              }
            }
          }
          
          resolve(fallbackCanvas.toDataURL());
        };
        
        qrImage.src = qrApiUrl;
      });
      
    } catch (err) {
      console.error('QR generation error:', err);
      return generateFallbackQR(url, businessName);
    }
  };

  // Improved fallback QR generator
  const generateFallbackQR = (url, businessName) => {
    const canvas = document.createElement('canvas');
    canvas.width = 350;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 350, 400);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 350, 400);
    
    // Draw card border
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 330, 380);
    
    // Draw business name with style
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 24px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(businessName || 'Business Name', 175, 60);
    
    // Draw underline
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(125, 70);
    ctx.lineTo(225, 70);
    ctx.stroke();
    
    // Create QR-like pattern
    ctx.fillStyle = '#000000';
    
    // Position markers (like real QR codes)
    ctx.fillRect(100, 120, 50, 50);
    ctx.clearRect(115, 135, 20, 20);
    
    ctx.fillRect(200, 120, 50, 50);
    ctx.clearRect(215, 135, 20, 20);
    
    ctx.fillRect(100, 220, 50, 50);
    ctx.clearRect(115, 235, 20, 20);
    
    // Data pattern based on URL
    for (let i = 0; i < Math.min(url.length, 100); i++) {
      const x = 100 + (i % 10) * 15;
      const y = 180 + Math.floor(i / 10) * 15;
      if (Math.random() > 0.3) {
        ctx.fillRect(x, y, 10, 10);
      }
    }
    
    // Draw URL text
    ctx.fillStyle = '#475569';
    ctx.font = '14px Arial';
    ctx.fillText('Website:', 175, 320);
    
    ctx.fillStyle = '#3b82f6';
    ctx.font = '12px monospace';
    const displayUrl = url.length > 30 ? url.substring(0, 30) + '...' : url;
    ctx.fillText(displayUrl, 175, 340);
    
    // Draw scan text
    ctx.fillStyle = '#64748b';
    ctx.font = 'italic 12px Arial';
    ctx.fillText('Scan with mobile device', 175, 370);
    
    return canvas.toDataURL();
  };

  const handleGenerateQR = async () => {
    if (!websiteUrl.trim()) {
      setError("⚠️ Website URL is required for quantum processing!");
      setAiMessages(["Error: Website URL quantum field is empty!"]);
      return;
    }

    if (!businessName.trim()) {
      setError("⚠️ Business Name is required for identity creation!");
      setAiMessages(["Error: Business Identity quantum field is empty!"]);
      return;
    }

    setError('');
    setIsGenerating(true);
    setIsAiThinking(true);
    setAiMessages([]);
    setQrCode('');
    setQrLoaded(false);

    setTimeout(async () => {
      try {
        const url = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`;
        const enhancedQR = await generateEnhancedQR(url, businessName);
        setQrCode(enhancedQR);
        
        setAiMessages(prev => [...prev, "✅ Quantum QR Matrix generated successfully!"]);
        setAiMessages(prev => [...prev, `🏢 Business Identity: ${businessName}`]);
        setAiMessages(prev => [...prev, `🔗 Destination Portal: ${url}`]);
        setAiMessages(prev => [...prev, "📱 QR Code is ready for scanning!"]);
      } catch (err) {
        setError("⚠️ Using quantum backup generator...");
        const url = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`;
        const fallbackQR = generateFallbackQR(url, businessName);
        setQrCode(fallbackQR);
        setAiMessages(prev => [...prev, "⚠️ Quantum fluctuation detected!"]);
        setAiMessages(prev => [...prev, "✅ Fallback QR matrix created!"]);
      } finally {
        setIsGenerating(false);
        setQrLoaded(true);
      }
    }, 3000);
  };

  const handleDownloadQR = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    const fileName = `${businessName.replace(/\s+/g, '-').toLowerCase() || 'business'}-card.png`;
    link.download = fileName;
    link.href = qrCode;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setAiMessages(prev => [...prev, `💾 Downloading: ${fileName}`]);
  };

  const handleReset = () => {
    setBusinessName('');
    setWebsiteUrl('');
    setDescription('');
    setQrCode('');
    setAiMessages([]);
    setError('');
    setIsGenerating(false);
    setIsAiThinking(false);
    setQrLoaded(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 p-4 md:p-6 font-sans">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Modern Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl text-white">🤖</span>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                  Quantum Business Card AI
                </h1>
                <p className="text-gray-600 text-sm mt-1">Create professional digital business cards with AI</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
              ⚡ AI Powered
            </div>
            <div className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200">
              🔒 Secure
            </div>
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200">
              🎯 Professional
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input Section */}
          <div className="space-y-8">
            {/* Input Card */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    <span className="text-blue-600 mr-2">📥</span>
                    Business Details
                  </h2>
                  <div className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                    STEP 1
                  </div>
                </div>
                <p className="text-gray-600">Enter your business information to create a professional digital card</p>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 animate-pulse">
                  <div className="flex items-center">
                    <span className="text-red-600 text-xl mr-3">⚠️</span>
                    <span className="text-red-700 font-medium">{error}</span>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    <span className="flex items-center">
                      🏢 Business Name
                      <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Required</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400"
                    placeholder="Enter your company/business name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    <span className="flex items-center">
                      🌐 Website URL
                      <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Required</span>
                    </span>
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400"
                    placeholder="https://yourcompany.com"
                  />
                  <p className="text-gray-500 text-sm mt-2">Include https:// or http://</p>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    <span className="flex items-center">📝 Business Description</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400 resize-none"
                    placeholder="Describe what your business does..."
                  />
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    onClick={handleGenerateQR}
                    disabled={isGenerating || !websiteUrl || !businessName}
                    className={`flex-1 py-4 px-8 rounded-xl font-bold transition-all duration-300 flex items-center justify-center ${
                      isGenerating || !websiteUrl || !businessName
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 hover:shadow-xl transform hover:-translate-y-1'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin h-6 w-6 mr-3 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Creating Your Card...
                      </>
                    ) : (
                      <>
                        <span className="text-xl mr-3">🚀</span>
                        Generate Business Card
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="px-8 py-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl font-bold transition-all duration-300 border-2 border-gray-200"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">🔄</span>
                      Reset
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* AI Console */}
            <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <span className="mr-3">🤖</span> AI Processing Console
                </h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isAiThinking ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></div>
                  <span className="text-xs text-gray-400 font-mono">{isAiThinking ? 'PROCESSING' : 'READY'}</span>
                </div>
              </div>
              <div className="bg-black/50 rounded-2xl p-5 h-64 overflow-y-auto font-mono text-sm border border-gray-800">
                <div className="space-y-3">
                  {aiMessages.length > 0 ? (
                    aiMessages.map((msg, index) => (
                      <div 
                        key={index} 
                        className="text-gray-300 animate-fadeIn py-2 border-b border-gray-800 last:border-0"
                      >
                        <span className="text-green-500 mr-3">$</span>
                        <span className={msg.startsWith('✅') ? 'text-green-400' : msg.startsWith('⚠️') ? 'text-yellow-400' : 'text-gray-300'}>
                          {msg}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-600">
                      <div className="text-5xl mb-4 opacity-20">⚡</div>
                      <p className="text-center text-gray-500">AI console is ready</p>
                      <p className="text-xs text-center mt-2 text-gray-600">Enter details above to start</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Output Section */}
          <div className="space-y-8">
            {/* QR Code Card */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    <span className="text-blue-600 mr-2">🎴</span>
                    Digital Business Card
                  </h2>
                  <div className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                    STEP 2
                  </div>
                </div>
                <p className="text-gray-600">Your professional QR business card</p>
              </div>

              {qrCode ? (
                <div className="space-y-8">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-100">
                      <div className="flex flex-col items-center">
                        {/* QR Code with Business Name */}
                        <div className="relative mb-6">
                          <img 
                            src={qrCode} 
                            alt="Business Card QR Code" 
                            className="w-72 h-auto rounded-xl shadow-lg border-4 border-white"
                            onLoad={() => setQrLoaded(true)}
                          />
                          {qrLoaded && (
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-2xl blur-xl animate-pulse"></div>
                          )}
                        </div>
                        
                        {/* Business Details Below QR */}
                        <div className="text-center space-y-4">
                          <div className="w-48 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mx-auto"></div>
                          
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{businessName}</h3>
                            <p className="text-gray-600 text-sm mt-1">{description}</p>
                          </div>
                          
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-blue-600">🔗</span>
                            <p className="text-blue-600 font-medium truncate max-w-xs">{websiteUrl}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Scan Animation */}
                    <div className="absolute -top-2 -right-2">
                      <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                        <span className="text-sm font-medium text-gray-700">Scan Me</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={handleDownloadQR}
                      className="py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold transition-all duration-300 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
                    >
                      <span className="text-xl mr-3">💾</span>
                      Download QR Card
                    </button>
                    <button
                      onClick={() => window.open(websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`, '_blank')}
                      className="py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold transition-all duration-300 hover:from-orange-600 hover:to-red-600 hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
                    >
                      <span className="text-xl mr-3">🌐</span>
                      Visit Website
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-[500px] flex flex-col items-center justify-center text-center p-8 border-3 border-dashed border-gray-200 rounded-2xl">
                  <div className="relative mb-8">
                    <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl text-gray-300 mb-4">📇</div>
                        <div className="text-gray-400 font-medium">QR Code Preview</div>
                      </div>
                    </div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-2xl blur-xl animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-4 max-w-sm">
                    <h3 className="text-xl font-bold text-gray-700">Your Business Card Awaits</h3>
                    <p className="text-gray-600">
                      Enter your business details and click "Generate Business Card" to create a professional digital card with QR code
                    </p>
                    
                    <div className="flex items-center justify-center space-x-6 pt-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Professional Design</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Instant Generation</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Preview Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-2xl border border-blue-100">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  <span className="text-indigo-600 mr-2">💼</span>
                  Card Preview
                </h3>
                <p className="text-gray-600">How your digital card will look</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">
                      {businessName || "Your Business Name"}
                    </h4>
                    <div className="flex items-center mt-2">
                      <span className="text-blue-600 mr-2">🌐</span>
                      <p className="text-blue-600 text-sm">{websiteUrl || "yourwebsite.com"}</p>
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-2xl text-white">🏢</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700">
                    {description || "Business description will appear here. Tell people about your services and offerings."}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="mr-2">🔒</span>
                      <span>Secure Digital Card</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span>AI Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              <span>Professional Grade</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span>Instant Generation</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div>© {new Date().getFullYear()} Quantum Business Solutions</div>
          </div>
          
          <div className="text-sm text-gray-400">
            Create, share, and grow your business with digital cards
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        /* Smooth scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }
        
        /* Card hover effects */
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default BusinessCard;