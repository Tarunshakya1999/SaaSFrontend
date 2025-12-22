import { useState, useEffect } from "react";
import axios from "axios";
import {
  Sparkles,
  Brain,
  BadgeCheck,
  TrendingUp,
  ImageIcon,
  Cpu,
} from "lucide-react";

export default function ProductNameAndPricing() {
  const [product, setProduct] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [typedText, setTypedText] = useState("");

  const generateAI = async () => {
    if (!product.trim()) {
      alert("Enter product name");
      return;
    }

    setLoading(true);
    setImages([]);
    setAiData(null);
    setTypedText("");

    // 🔹 AI thinking delay
    await new Promise((r) => setTimeout(r, 4000));

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/ai-product-images/?query=${product}`
      );

      setImages(res.data.images || []);
      setAiData(res.data);
    } catch (err) {
      console.error("AI ERROR ❌", err);
      alert("Backend error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 AI typing effect
  useEffect(() => {
    if (aiData?.ai_message) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText((prev) => prev + aiData.ai_message[i]);
        i++;
        if (i === aiData.ai_message.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [aiData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-purple-950 p-10 text-white">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-5xl font-extrabold flex items-center gap-4 mb-12">
          <Sparkles className="text-purple-400 animate-pulse" />
          AI Product Intelligence Engine
        </h1>

        {/* FORM */}
        <div className="bg-white/10 border border-purple-500/30 p-8 rounded-3xl backdrop-blur-xl shadow-[0_0_60px_rgba(168,85,247,0.4)]">
          <input
            placeholder="Enter product name (mobile, laptop, saree...)"
            className="w-full p-5 rounded-xl bg-black/50 outline-none text-lg placeholder-gray-400 border border-white/10 focus:border-purple-500"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          /> <br /> <br /> 

          <button
            onClick={generateAI}
            disabled={loading}
            className="mt-6 w-full py-4 rounded-full font-bold text-xl
            bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500
            hover:scale-105 transition-all duration-300 shadow-xl
            disabled:opacity-50"
          >
            {loading ? "AI Processing..." : "Generate AI Insights ✨"}
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-16 flex flex-col items-center gap-5 text-xl">
            <Brain className="text-purple-400 animate-spin w-16 h-16" />
            <p className="tracking-wide">AI Neural Network Active</p>
            <div className="text-sm text-purple-300 space-y-1 text-center">
              <p>Scanning product name...</p>
              <p>Detecting category...</p>
              <p>Calculating smart pricing...</p>
              <p>Fetching visual assets...</p>
            </div>
          </div>
        )}

        {/* AI RESULT */}
        {!loading && aiData && (
          <div className="mt-16 bg-white/10 border border-purple-500/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.3)]">
            <h2 className="text-3xl font-bold flex items-center gap-3 mb-6 text-purple-300">
              <Cpu className="text-purple-400" />
              AI Analysis Report
            </h2>

            <p className="mb-3 text-lg">
              ✔ AI detected product as{" "}
              <span className="text-pink-400 font-extrabold uppercase">
                {aiData.category}
              </span>
            </p>

            <p className="mb-6 text-lg">
              Confidence Level:{" "}
              <span className="text-green-400 font-bold text-2xl">
                {aiData.confidence}%
              </span>
            </p>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2 mb-3">
                <TrendingUp className="text-purple-400" />
                AI Smart Pricing
              </h3>

              <ul className="space-y-2 text-lg">
                <li>📊 Market Range: ₹{aiData.pricing.min} – ₹{aiData.pricing.max}</li>
                <li className="text-green-400 font-bold text-3xl">
                  ✅ Suggested Price: ₹{aiData.pricing.suggested}
                </li>
              </ul>
            </div>

            <p className="text-purple-300 italic min-h-[40px]">
              {typedText}
            </p>
          </div>
        )}

        {/* IMAGES */}
        {!loading && images.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-purple-300 flex items-center gap-2">
              <ImageIcon />
              AI Generated Product Visuals
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative rounded-3xl overflow-hidden
                  border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.3)]
                  hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={img}
                    alt="AI Product"
                    className="w-full h-80 object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 left-4 text-sm font-semibold text-purple-300">
                    AI Visual Asset
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
