import React, { useState, useRef } from 'react';
import { Sparkles, Music, Play, Pause, Download, Loader2, Wand2 } from 'lucide-react';

export default function BrandVoiceGenerator() {
  const [formData, setFormData] = useState({
    businessName: '',
    description: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [voices, setVoices] = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio());

  const categories = ['Upbeat', 'Professional', 'Calm', 'Energetic', 'Luxury'];

  const handleGenerate = async () => {
    if (!formData.businessName.trim() || !formData.description.trim()) {
      alert('Please fill in both fields');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setShowResults(false);

    // AI generation simulation
    const steps = [
      { text: 'Analyzing brand identity...', duration: 1000 },
      { text: 'Processing brand voice parameters...', duration: 1200 },
      { text: 'Generating AI audio signatures...', duration: 1500 },
      { text: 'Optimizing sound profiles...', duration: 1000 },
      { text: 'Finalizing your brand voices...', duration: 800 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      setProgress(((i + 1) / steps.length) * 100);
    }

    // Fetch from API
    try {
      const response = await fetch('http://127.0.0.1:8000/api/voices/');
      const data = await response.json();
      
      // Group by category
      const grouped = {};
      data.forEach(voice => {
        const category = categories[Math.floor(Math.random() * categories.length)];
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push(voice);
      });
      
      setVoices(grouped);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching voices:', error);
      alert('Failed to generate voices. Make sure the API is running.');
    }

    setIsGenerating(false);
  };

  const togglePlay = (voice, index) => {
    const voiceId = `${voice.name}-${index}`;
    if (playingId === voiceId) {
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      // Convert relative path to absolute URL if needed
      const audioUrl = voice.file.startsWith('http') 
        ? voice.file 
        : `http://127.0.0.1:8000${voice.file}`;
      
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(err => {
        console.error('Audio play error:', err);
        alert('Unable to play audio. Check file path or CORS settings.');
      });
      setPlayingId(voiceId);
      audioRef.current.onended = () => setPlayingId(null);
    }
  };

  const handleDownload = (voice, index) => {
    const audioUrl = voice.file.startsWith('http') 
      ? voice.file 
      : `http://127.0.0.1:8000${voice.file}`;
    
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `${formData.businessName}_Audio_${index + 1}.mp3`;
    a.target = '_blank';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
            <h1 className="text-5xl font-bold text-white">AI Brand Voice Generator</h1>
            <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-xl text-purple-200">Create unique audio logos powered by AI in seconds</p>
        </div>

        {/* Input Form */}
        {!showResults && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2 text-lg">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your business name..."
                  disabled={isGenerating}
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-lg">
                  Business Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500 h-32 resize-none"
                  placeholder="Describe your business, values, and target audience..."
                  disabled={isGenerating}
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Generating AI Voices...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-6 h-6" />
                    Generate Brand Voices
                  </>
                )}
              </button>

              {/* Progress Bar */}
              {isGenerating && (
                <div className="space-y-3">
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-pink-500 transition-all duration-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 text-purple-200">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="text-sm">AI is crafting your unique brand voices...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="space-y-8">
            {/* Success Message */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-400/30 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                ✨ AI Generated {Object.values(voices).flat().length} Unique Voices for {formData.businessName}!
              </h2>
              <p className="text-purple-200">Each voice is tailored to your brand identity</p>
            </div>

            {/* Voice Categories */}
            {Object.entries(voices).map(([category, categoryVoices]) => (
              <div key={category} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <Music className="w-6 h-6 text-pink-400" />
                  <h3 className="text-2xl font-bold text-white">{category} Voices</h3>
                  <span className="bg-pink-500/30 px-3 py-1 rounded-full text-sm text-white">
                    {categoryVoices.length} options
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryVoices.map((voice, idx) => (
                    <div 
                      key={idx}
                      className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-white/20 hover:border-pink-400/50 transition-all hover:scale-105"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold text-lg">Audio {idx + 1}</h4>
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => togglePlay(voice, idx)}
                          className="flex-1 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                          {playingId === `${voice.name}-${idx}` ? (
                            <>
                              <Pause className="w-4 h-4" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              Play
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => handleDownload(voice, idx)}
                          className="px-4 py-2 bg-pink-500/30 hover:bg-pink-500/50 text-white rounded-lg transition-all"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Generate Again Button */}
            <button
              onClick={() => {
                setShowResults(false);
                setFormData({ businessName: '', description: '' });
                setVoices([]);
                if (audioRef.current) audioRef.current.pause();
                setPlayingId(null);
              }}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-lg rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
            >
              <Wand2 className="w-6 h-6" />
              Generate New Voices
            </button>
          </div>
        )}
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}