import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, User } from "lucide-react";

export default function BrandChat() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const sendMessage = async () => {
    if (!msg.trim()) return;

    const userMsg = { sender: "user", text: msg };
    setChat([...chat, userMsg]);
    const currentMsg = msg;
    setMsg("");
    setIsTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/brand-chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentMsg }),
      });

      const data = await res.json();
      const aiMsg = { sender: "ai", text: data.reply };
      setChat(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg = { sender: "ai", text: "Sorry, something went wrong. Please try again." };
      setChat(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.5s ease-out;
        }

        .slide-in-right {
          animation: slideInRight 0.4s ease-out;
        }

        .slide-in-left {
          animation: slideInLeft 0.4s ease-out;
        }

        .typing-indicator {
          animation: pulse 1.5s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(90deg, #a855f7, #3b82f6, #8b5cf6);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .message-bubble {
          max-width: 80%;
          word-wrap: break-word;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }

        .send-button {
          transition: all 0.3s ease;
        }

        .send-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
        }

        .send-button:active {
          transform: translateY(0);
        }

        .input-field {
          transition: all 0.3s ease;
        }

        .input-field:focus {
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
        }
      `}</style>

      <div className="w-full max-w-4xl fade-in-up">
        {/* Header */}
        <div className="glass-effect rounded-t-3xl p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-3 rounded-2xl">
              <Sparkles className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                AI Brand Name Generator
              </h1>
              <p className="text-purple-200 text-sm mt-1">
                Powered by AI • Create unique brand names instantly
              </p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="glass-effect p-6 h-96 overflow-y-auto custom-scrollbar">
          {chat.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-6 rounded-full inline-block mb-4">
                  <Bot className="text-white" size={48} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Start Your Brand Journey
                </h2>
                <p className="text-purple-200">
                  Describe your business and I'll generate creative brand names for you
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {chat.map((c, i) => (
                <div
                  key={i}
                  className={`flex ${c.sender === "user" ? "justify-end slide-in-left" : "justify-start slide-in-right"}`}
                >
                  <div className={`flex gap-3 items-start message-bubble ${c.sender === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`p-2 rounded-full ${c.sender === "user" ? "bg-gradient-to-br from-blue-500 to-purple-500" : "bg-gradient-to-br from-green-500 to-emerald-500"}`}>
                      {c.sender === "user" ? (
                        <User className="text-white" size={20} />
                      ) : (
                        <Bot className="text-white" size={20} />
                      )}
                    </div>
                    <div
                      className={`px-5 py-3 rounded-2xl ${
                        c.sender === "user"
                          ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-tr-sm"
                          : "bg-white/20 text-white rounded-tl-sm"
                      } shadow-lg`}
                    >
                      <p className="text-sm leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start slide-in-right">
                  <div className="flex gap-3 items-start">
                    <div className="p-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-500">
                      <Bot className="text-white" size={20} />
                    </div>
                    <div className="px-5 py-3 rounded-2xl bg-white/20 rounded-tl-sm shadow-lg">
                      <div className="flex gap-2 typing-indicator">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="glass-effect rounded-b-3xl p-6 border-t border-white/20">
          <div className="flex gap-3">
            <input
              className="flex-1 bg-white/20 text-white placeholder-purple-200 px-6 py-4 rounded-2xl border border-white/30 focus:outline-none input-field"
              placeholder="Describe your business idea..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={sendMessage}
              disabled={!msg.trim() || isTyping}
              className="bg-gradient-to-br from-purple-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 send-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}