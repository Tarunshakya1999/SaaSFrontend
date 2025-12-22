import { useState, useRef } from "react";
import { Sparkles, Download, Loader2, PartyPopper, Calendar, MapPin, Users, Clock, Star, Heart, Zap, CheckCircle2 } from "lucide-react";

const FESTIVAL_THEMES = [
  { 
    name: "Diwali Celebration", 
    colors: { primary: "#f59e0b", secondary: "#dc2626", bg: "#fef3c7", accent: "#fbbf24" },
    emoji: "🪔",
    pattern: "diyas"
  },
  { 
    name: "Holi Festival", 
    colors: { primary: "#ec4899", secondary: "#8b5cf6", bg: "#fdf4ff", accent: "#f0abfc" },
    emoji: "🎨",
    pattern: "colors"
  },
  { 
    name: "Christmas Party", 
    colors: { primary: "#dc2626", secondary: "#059669", bg: "#fef2f2", accent: "#f87171" },
    emoji: "🎄",
    pattern: "snowflakes"
  },
  { 
    name: "New Year Bash", 
    colors: { primary: "#6366f1", secondary: "#ec4899", bg: "#eef2ff", accent: "#a78bfa" },
    emoji: "🎆",
    pattern: "stars"
  },
  { 
    name: "Eid Celebration", 
    colors: { primary: "#059669", secondary: "#0891b2", bg: "#ecfdf5", accent: "#34d399" },
    emoji: "🌙",
    pattern: "moons"
  },
  { 
    name: "Navratri Dandiya", 
    colors: { primary: "#f97316", secondary: "#dc2626", bg: "#fff7ed", accent: "#fb923c" },
    emoji: "💃",
    pattern: "dandiya"
  },
  { 
    name: "Music Concert", 
    colors: { primary: "#8b5cf6", secondary: "#ec4899", bg: "#f5f3ff", accent: "#c084fc" },
    emoji: "🎵",
    pattern: "music"
  },
  { 
    name: "Food Festival", 
    colors: { primary: "#ef4444", secondary: "#f59e0b", bg: "#fef2f2", accent: "#fca5a5" },
    emoji: "🍽️",
    pattern: "food"
  },
  { 
    name: "Independence Day", 
    colors: { primary: "#f97316", secondary: "#059669", bg: "#fff7ed", accent: "#fb923c" },
    emoji: "🇮🇳",
    pattern: "tricolor"
  },
  { 
    name: "Valentine's Day", 
    colors: { primary: "#ec4899", secondary: "#f43f5e", bg: "#fdf2f8", accent: "#f9a8d4" },
    emoji: "❤️",
    pattern: "hearts"
  },
  { 
    name: "Halloween Party", 
    colors: { primary: "#f97316", secondary: "#6b21a8", bg: "#fff7ed", accent: "#fb923c" },
    emoji: "🎃",
    pattern: "pumpkins"
  },
  { 
    name: "Summer Festival", 
    colors: { primary: "#eab308", secondary: "#f97316", bg: "#fef9c3", accent: "#fde047" },
    emoji: "☀️",
    pattern: "sun"
  },
  { 
    name: "Ganesh Chaturthi", 
    colors: { primary: "#f97316", secondary: "#dc2626", bg: "#fff7ed", accent: "#fb923c" },
    emoji: "🙏",
    pattern: "flowers"
  },
  { 
    name: "Republic Day", 
    colors: { primary: "#f97316", secondary: "#3b82f6", bg: "#fff7ed", accent: "#fb923c" },
    emoji: "🇮🇳",
    pattern: "tricolor"
  },
  { 
    name: "Birthday Bash", 
    colors: { primary: "#ec4899", secondary: "#8b5cf6", bg: "#fdf2f8", accent: "#f9a8d4" },
    emoji: "🎂",
    pattern: "balloons"
  }
];

export default function AiFestivalPosterGenerator() {
  const [form, setForm] = useState({
    festivalName: "",
    date: "",
    time: "",
    venue: "",
    organizer: "",
    description: "",
    contact: "",
    specialGuest: ""
  });

  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [progress, setProgress] = useState(0);
  const posterRefs = useRef([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePosters = async () => {
    if (!form.festivalName || !form.date) {
      alert("Please fill Festival Name and Date");
      return;
    }

    setLoading(true);
    setGenerated(false);
    setProgress(0);

    const steps = [20, 40, 60, 80, 100];
    for (let step of steps) {
      await new Promise(resolve => setTimeout(resolve, 450));
      setProgress(step);
    }

    setLoading(false);
    setGenerated(true);
  };

  const downloadPoster = async (index) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // A3 size poster (300 DPI)
    canvas.width = 3508;
    canvas.height = 4961;

    const theme = FESTIVAL_THEMES[index];
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, theme.colors.bg);
    gradient.addColorStop(0.5, theme.colors.primary + '40');
    gradient.addColorStop(1, theme.colors.secondary + '40');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative shapes
    ctx.fillStyle = theme.colors.accent + '30';
    for (let i = 0; i < 15; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 300 + 100,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Top decorative bar
    ctx.fillStyle = theme.colors.primary;
    ctx.fillRect(0, 0, canvas.width, 300);
    
    // Bottom decorative bar
    ctx.fillStyle = theme.colors.secondary;
    ctx.fillRect(0, canvas.height - 400, canvas.width, 400);

    // Festival emoji
    ctx.font = '300px Arial';
    ctx.fillText(theme.emoji, canvas.width / 2 - 150, 800);

    // Festival Name
    ctx.fillStyle = theme.colors.primary;
    ctx.font = 'bold 220px Arial';
    ctx.textAlign = 'center';
    const nameLines = wrapText(ctx, form.festivalName.toUpperCase(), canvas.width - 400);
    let yPos = 1200;
    nameLines.forEach(line => {
      ctx.fillText(line, canvas.width / 2, yPos);
      yPos += 250;
    });

    // Decorative line
    ctx.fillStyle = theme.colors.secondary;
    ctx.fillRect(canvas.width / 2 - 600, yPos, 1200, 20);
    yPos += 150;

    // Description
    if (form.description) {
      ctx.fillStyle = '#1e293b';
      ctx.font = '100px Arial';
      const descLines = wrapText(ctx, form.description, canvas.width - 600);
      descLines.slice(0, 3).forEach(line => {
        ctx.fillText(line, canvas.width / 2, yPos);
        yPos += 130;
      });
      yPos += 100;
    }

    // Details box
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 40;
    ctx.fillRect(200, yPos, canvas.width - 400, 1200);
    ctx.shadowBlur = 0;

    yPos += 180;

    // Date
    ctx.fillStyle = theme.colors.primary;
    ctx.font = 'bold 110px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('📅 DATE', 300, yPos);
    ctx.fillStyle = '#1e293b';
    ctx.font = '100px Arial';
    ctx.fillText(form.date, 300, yPos + 140);
    yPos += 300;

    // Time
    if (form.time) {
      ctx.fillStyle = theme.colors.primary;
      ctx.font = 'bold 110px Arial';
      ctx.fillText('🕐 TIME', 300, yPos);
      ctx.fillStyle = '#1e293b';
      ctx.font = '100px Arial';
      ctx.fillText(form.time, 300, yPos + 140);
      yPos += 300;
    }

    // Venue
    if (form.venue) {
      ctx.fillStyle = theme.colors.primary;
      ctx.font = 'bold 110px Arial';
      ctx.fillText('📍 VENUE', 300, yPos);
      ctx.fillStyle = '#1e293b';
      ctx.font = '100px Arial';
      const venueLines = wrapText(ctx, form.venue, canvas.width - 800);
      venueLines.slice(0, 2).forEach((line, i) => {
        ctx.fillText(line, 300, yPos + 140 + i * 120);
      });
      yPos += 300;
    }

    // Special Guest
    if (form.specialGuest) {
      yPos += 100;
      ctx.fillStyle = theme.colors.secondary;
      ctx.font = 'bold 120px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('⭐ SPECIAL GUEST ⭐', canvas.width / 2, yPos);
      ctx.font = 'bold 140px Arial';
      ctx.fillText(form.specialGuest, canvas.width / 2, yPos + 180);
    }

    // Footer
    ctx.fillStyle = 'white';
    ctx.font = 'bold 110px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(form.organizer || 'Event Organizers', canvas.width / 2, canvas.height - 200);
    
    if (form.contact) {
      ctx.font = '90px Arial';
      ctx.fillText(`Contact: ${form.contact}`, canvas.width / 2, canvas.height - 80);
    }

    const link = document.createElement('a');
    link.download = `${form.festivalName}_${theme.name.replace(/\s+/g, '_')}_Poster.png`;
    link.href = canvas.toDataURL();
    link.click();

    alert(`✅ ${theme.name} poster downloaded!`);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <PartyPopper className="w-12 h-12 text-yellow-400 animate-bounce" />
            <h1 className="text-5xl font-bold text-white">AI Festival Poster Studio</h1>
            <Star className="w-12 h-12 text-pink-400 animate-pulse" />
          </div>
          <p className="text-xl text-purple-200">Create stunning festival posters with AI in seconds</p>
        </div>

        {/* Input Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                <PartyPopper className="w-5 h-5" />
                Festival/Event Name *
              </label>
              <input
                type="text"
                name="festivalName"
                value={form.festivalName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="e.g., Diwali Celebration 2025"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Event Date *
              </label>
              <input
                type="text"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="e.g., 25th December 2025"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Event Time
              </label>
              <input
                type="text"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="e.g., 7:00 PM onwards"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Venue
              </label>
              <input
                type="text"
                name="venue"
                value={form.venue}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Event location"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Organized By
              </label>
              <input
                type="text"
                name="organizer"
                value={form.organizer}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Organization/Person name"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Special Guest (Optional)
              </label>
              <input
                type="text"
                name="specialGuest"
                value={form.specialGuest}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Celebrity/Chief Guest name"
                disabled={loading}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Event Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500 h-24 resize-none"
                placeholder="Brief description of your event..."
                disabled={loading}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                📞 Contact Information
              </label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Phone/Email for inquiries"
                disabled={loading}
              />
            </div>
          </div>

          <button
            onClick={generatePosters}
            disabled={loading}
            className="w-full mt-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white font-bold text-lg rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                AI Creating Magic...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Generate Festival Posters
              </>
            )}
          </button>

          {loading && (
            <div className="mt-6">
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-orange-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-center gap-2 text-purple-200 mt-3">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span className="text-sm">AI designing beautiful posters for your festival...</span>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {generated && (
          <div className="space-y-8">
            {/* Success Message */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-400/30 flex items-center justify-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <p className="text-2xl font-bold text-white">
                Generated {FESTIVAL_THEMES.length} Stunning Poster Designs!
              </p>
            </div>

            {/* Poster Grid */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <PartyPopper className="w-8 h-8 text-yellow-400" />
                <h2 className="text-3xl font-bold text-white">Festival Posters</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FESTIVAL_THEMES.map((theme, i) => (
                  <div key={i} className="group">
                    <div 
                      ref={el => posterRefs.current[i] = el}
                      className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:scale-105"
                      style={{ 
                        backgroundColor: theme.colors.bg,
                        aspectRatio: '3/4'
                      }}
                    >
                      {/* Decorative circles */}
                      <div 
                        className="absolute w-32 h-32 rounded-full opacity-30 top-10 right-10"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                      <div 
                        className="absolute w-24 h-24 rounded-full opacity-30 bottom-20 left-10"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div 
                        className="absolute w-20 h-20 rounded-full opacity-30 top-1/2 left-1/4"
                        style={{ backgroundColor: theme.colors.primary }}
                      />

                      {/* Top bar */}
                      <div 
                        className="h-16"
                        style={{ backgroundColor: theme.colors.primary }}
                      />

                      <div className="relative z-10 p-6 text-center">
                        {/* Emoji */}
                        <div className="text-7xl mb-4">{theme.emoji}</div>

                        {/* Festival Name */}
                        <h3 
                          className="text-3xl font-bold mb-3 leading-tight"
                          style={{ color: theme.colors.primary }}
                        >
                          {form.festivalName.toUpperCase()}
                        </h3>

                        {/* Decorative line */}
                        <div 
                          className="w-24 h-1 mx-auto rounded mb-4"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />

                        {/* Description */}
                        {form.description && (
                          <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                            {form.description}
                          </p>
                        )}

                        {/* Details Box */}
                        <div className="bg-white/80 rounded-xl p-4 shadow-lg mb-4 text-left space-y-2">
                          <div className="flex items-start gap-2">
                            <Calendar className="w-5 h-5 mt-1" style={{ color: theme.colors.primary }} />
                            <div>
                              <p className="font-bold text-sm" style={{ color: theme.colors.primary }}>DATE</p>
                              <p className="text-sm text-gray-700">{form.date}</p>
                            </div>
                          </div>
                          
                          {form.time && (
                            <div className="flex items-start gap-2">
                              <Clock className="w-5 h-5 mt-1" style={{ color: theme.colors.primary }} />
                              <div>
                                <p className="font-bold text-sm" style={{ color: theme.colors.primary }}>TIME</p>
                                <p className="text-sm text-gray-700">{form.time}</p>
                              </div>
                            </div>
                          )}
                          
                          {form.venue && (
                            <div className="flex items-start gap-2">
                              <MapPin className="w-5 h-5 mt-1" style={{ color: theme.colors.primary }} />
                              <div>
                                <p className="font-bold text-sm" style={{ color: theme.colors.primary }}>VENUE</p>
                                <p className="text-sm text-gray-700 line-clamp-1">{form.venue}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Special Guest */}
                        {form.specialGuest && (
                          <div 
                            className="rounded-xl p-3 mb-3"
                            style={{ backgroundColor: theme.colors.secondary + '20' }}
                          >
                            <p className="text-xs font-bold" style={{ color: theme.colors.secondary }}>
                              ⭐ SPECIAL GUEST ⭐
                            </p>
                            <p className="text-sm font-bold text-gray-800">{form.specialGuest}</p>
                          </div>
                        )}
                      </div>

                      {/* Bottom bar */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 p-4 text-center"
                        style={{ backgroundColor: theme.colors.secondary }}
                      >
                        <p className="text-white font-bold text-sm">
                          {form.organizer || 'Event Organizers'}
                        </p>
                        {form.contact && (
                          <p className="text-white text-xs mt-1">{form.contact}</p>
                        )}
                      </div>

                      {/* Theme label */}
                      <div className="absolute top-20 left-0 px-4 py-2 rounded-r-xl text-white text-xs font-bold"
                        style={{ backgroundColor: theme.colors.primary }}
                      >
                        {theme.name}
                      </div>
                    </div>

                    <button
                      onClick={() => downloadPoster(i)}
                      className="w-full mt-3 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-white/20"
                    >
                      <Download className="w-5 h-5" />
                      Download {theme.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 30}px`,
              opacity: 0.3,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          >
            {['🎊', '🎉', '✨', '⭐', '🎈', '🎆'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>
    </div>
  );
}