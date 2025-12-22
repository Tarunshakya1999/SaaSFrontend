import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Bot, 
  Video, 
  Music, 
  Type, 
  Clock,
  Play,
  Pause,
  Download,
  RefreshCw,
  CheckCircle,
  Zap,
  Brain,
  Cpu,
  Wand2,
  Rocket,
  Star,
  Globe,
  Palette,
  Volume2,
  Layers,
  Target,
  Shield,
  Cloud,
  Database,
  Server,
  BrainCircuit,
  Sparkle,
  Atom,
  Cctv,
  Satellite,
  Maximize2,
  VolumeX,
  Volume2 as VolumeHigh,
  TrendingUp,
  Users,
  DollarSign,
  Building,
  Lightbulb,
  BarChart3,
  Target as TargetIcon,
  ShieldCheck,
  Award,
  Briefcase,
  ChartLine
} from 'lucide-react';

const ExplainerVideoGenerator = () => {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [script, setScript] = useState('');
  const [voiceType, setVoiceType] = useState('ai_neural');
  const [music, setMusic] = useState('corporate_ambient');
  const [animationStyle, setAnimationStyle] = useState('motion_graphics');
  const [duration, setDuration] = useState(60);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aiSteps, setAiSteps] = useState([]);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [neuralNetwork, setNeuralNetwork] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVideoControls, setShowVideoControls] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [selectedVideoId, setSelectedVideoId] = useState(1);
  
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Business Related Video URLs
  const businessVideos = [
    {
      id: 1,
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
      title: 'Business Setup Masterclass',
      description: 'Complete guide to setting up your business from scratch with legal compliance',
      duration: '4:20',
      quality: '4K Ultra HD',
      aiScore: '98%',
      category: 'Setup',
      tags: ['Startup', 'Legal', 'Planning'],
      icon: <Building className="w-4 h-4" />
    },
    {
      id: 2,
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop',
      title: 'Growth Strategies 2024',
      description: 'Proven strategies to scale your business and achieve exponential growth',
      duration: '3:45',
      quality: '4K Ultra HD',
      aiScore: '96%',
      category: 'Growth',
      tags: ['Scaling', 'Marketing', 'Strategy'],
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: 3,
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop',
      title: 'Digital Marketing Explained',
      description: 'Comprehensive guide to digital marketing for modern businesses',
      duration: '5:15',
      quality: '4K Ultra HD',
      aiScore: '95%',
      category: 'Marketing',
      tags: ['SEO', 'Social Media', 'Ads'],
      icon: <TargetIcon className="w-4 h-4" />
    },
    {
      id: 4,
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?w=800&auto=format&fit=crop',
      title: 'Financial Planning for Startups',
      description: 'Learn how to manage finances and secure funding for your startup',
      duration: '6:30',
      quality: '4K Ultra HD',
      aiScore: '97%',
      category: 'Finance',
      tags: ['Funding', 'Budgeting', 'Investors'],
      icon: <DollarSign className="w-4 h-4" />
    },
    {
      id: 5,
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
      title: 'Team Building & Leadership',
      description: 'Build high-performing teams and develop leadership skills',
      duration: '4:50',
      quality: '4K Ultra HD',
      aiScore: '94%',
      category: 'Leadership',
      tags: ['Management', 'HR', 'Culture'],
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 6,
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-4b5c5d8e7f2c?w=800&auto=format&fit=crop',
      title: 'Product Development Cycle',
      description: 'From idea to market: Complete product development guide',
      duration: '7:10',
      quality: '4K Ultra HD',
      aiScore: '96%',
      category: 'Product',
      tags: ['Development', 'MVP', 'Launch'],
      icon: <Lightbulb className="w-4 h-4" />
    },
    {
      id: 7,
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop',
      title: 'Sales Funnel Optimization',
      description: 'Convert more leads into customers with optimized sales funnels',
      duration: '5:45',
      quality: '4K Ultra HD',
      aiScore: '95%',
      category: 'Sales',
      tags: ['Conversion', 'CRM', 'Pipelines'],
      icon: <BarChart3 className="w-4 h-4" />
    },
    {
      id: 8,
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
      title: 'Customer Success Strategies',
      description: 'Build loyal customers and reduce churn with proven strategies',
      duration: '6:20',
      quality: '4K Ultra HD',
      aiScore: '97%',
      category: 'Customer',
      tags: ['Retention', 'Support', 'Experience'],
      icon: <ShieldCheck className="w-4 h-4" />
    },
    {
      id: 9,
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop',
      title: 'Business Analytics & Metrics',
      description: 'Track the right metrics and make data-driven decisions',
      duration: '4:35',
      quality: '4K Ultra HD',
      aiScore: '96%',
      category: 'Analytics',
      tags: ['Data', 'KPIs', 'Reporting'],
      icon: <ChartLine className="w-4 h-4" />
    },
    {
      id: 10,
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop',
      title: 'AI in Modern Business',
      description: 'Leverage artificial intelligence to automate and optimize your business',
      duration: '8:15',
      quality: '4K Ultra HD',
      aiScore: '99%',
      category: 'Technology',
      tags: ['Automation', 'AI Tools', 'Innovation'],
      icon: <Brain className="w-4 h-4" />
    }
  ];

  // Video controls functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setCurrentTime(current);
      setVideoProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const seekTime = (e.target.value / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setVideoProgress(e.target.value);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      } else if (videoContainerRef.current.webkitRequestFullscreen) {
        videoContainerRef.current.webkitRequestFullscreen();
      } else if (videoContainerRef.current.msRequestFullscreen) {
        videoContainerRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleMouseMove = () => {
    setShowVideoControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowVideoControls(false);
      }
    }, 3000);
  };

  // AI Neural Network Particles
  useEffect(() => {
    const nodes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.8 + 0.3,
      color: `hsl(${Math.random() * 60 + 200}, 100%, 60%)`,
      connections: []
    }));
    
    // Create connections
    nodes.forEach((node, i) => {
      const numConnections = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numConnections; j++) {
        const targetIndex = Math.floor(Math.random() * nodes.length);
        if (targetIndex !== i) {
          node.connections.push(targetIndex);
        }
      }
    });
    
    setNeuralNetwork(nodes);

    // Cleanup
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // AI Suggestions based on script
  useEffect(() => {
    if (script.length > 50) {
      setAiThinking(true);
      setTimeout(() => {
        const businessSuggestions = [
          "AI suggests adding a clear value proposition",
          "Consider including a call-to-action for business inquiries",
          "Recommended to showcase business metrics and results",
          "AI detected keywords for B2B marketing optimization",
          "Suggest adding customer testimonials section",
          "Include data visualization for better understanding"
        ];
        setAiSuggestions(businessSuggestions.slice(0, Math.floor(Math.random() * 3) + 2));
        setAiThinking(false);
      }, 800);
    } else {
      setAiSuggestions([]);
    }
  }, [script]);

  const voiceOptions = [
    { value: 'ai_neural', label: 'Neural AI Voice', icon: <BrainCircuit className="w-5 h-5" />, description: 'Most advanced AI voice for business' },
    { value: 'corporate_ai', label: 'Corporate AI', icon: <Briefcase className="w-5 h-5" />, description: 'Professional business tone' },
    { value: 'friendly_ai', label: 'Friendly AI', icon: <Users className="w-5 h-5" />, description: 'Warm and engaging for customers' },
    { value: 'executive', label: 'Executive Voice', icon: <Award className="w-5 h-5" />, description: 'Authoritative and confident' }
  ];

  const musicOptions = [
    { value: 'corporate_ambient', label: 'Corporate Ambient', icon: <Building className="w-5 h-5" />, description: 'Professional background music' },
    { value: 'energetic_ai', label: 'Energetic AI', icon: <TrendingUp className="w-5 h-5" />, description: 'High-energy for presentations' },
    { value: 'cinematic_ai', label: 'Cinematic AI', icon: <Video className="w-5 h-5" />, description: 'Epic soundscapes for impact' },
    { value: 'minimal_tech', label: 'Minimal Tech', icon: <Cpu className="w-5 h-5" />, description: 'Modern tech vibe' }
  ];

  const animationOptions = [
    { value: 'motion_graphics', label: 'Motion Graphics', icon: <Layers className="w-5 h-5" />, description: 'Professional business animations' },
    { value: 'data_visual', label: 'Data Visualization', icon: <ChartLine className="w-5 h-5" />, description: 'Data-driven visuals' },
    { value: 'corporate_3d', label: 'Corporate 3D', icon: <Building className="w-5 h-5" />, description: '3D business animations' },
    { value: 'minimal_modern', label: 'Minimal Modern', icon: <Sparkles className="w-5 h-5" />, description: 'Clean and modern style' }
  ];

  const simulateAIProcessing = () => {
    setIsGenerating(true);
    setProgress(0);
    
    const steps = [
      { name: "Initializing Business Intelligence AI...", emoji: "🏢", icon: <Building className="w-5 h-5" /> },
      { name: "Analyzing business script semantics...", emoji: "📊", icon: <ChartLine className="w-5 h-5" /> },
      { name: "Generating professional AI voiceover...", emoji: "🎙️", icon: <Volume2 className="w-5 h-5" /> },
      { name: "Creating business-grade animations...", emoji: "💼", icon: <Briefcase className="w-5 h-5" /> },
      { name: "Composing corporate background score...", emoji: "🎵", icon: <Music className="w-5 h-5" /> },
      { name: "Rendering with AI optimization...", emoji: "⚡", icon: <Zap className="w-5 h-5" /> },
      { name: "Applying business intelligence insights...", emoji: "🧠", icon: <Brain className="w-5 h-5" /> },
      { name: "Final quality assurance...", emoji: "🛡️", icon: <ShieldCheck className="w-5 h-5" /> }
    ];

    setAiSteps(steps.map(step => ({ ...step, completed: false })));

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setAiSteps(prev => 
          prev.map((step, i) => 
            i === currentStep ? { ...step, completed: true } : step
          )
        );
        currentStep++;
        setProgress((currentStep / steps.length) * 100);
        
        // Random AI processing events
        if (Math.random() > 0.7) {
          setTimeout(() => {
            const events = [
              "AI optimizing business presentation...",
              "Neural network analyzing market trends...",
              "Enhancing corporate branding...",
              "Applying professional color grading...",
              "Generating data visualizations..."
            ];
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            console.log(`AI Event: ${randomEvent}`);
          }, 100);
        }
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
          // Select the chosen video or default to first
          const selectedVideo = businessVideos.find(v => v.id === selectedVideoId) || businessVideos[0];
          setGeneratedVideo({
            ...selectedVideo,
            title: projectName || selectedVideo.title,
            duration: `${duration}s`
          });
          setStep(4);
        }, 1500);
      }
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3);
    simulateAIProcessing();
  };

  const resetForm = () => {
    setStep(1);
    setProjectName('');
    setScript('');
    setVoiceType('ai_neural');
    setMusic('corporate_ambient');
    setAnimationStyle('motion_graphics');
    setDuration(60);
    setIsGenerating(false);
    setProgress(0);
    setAiSteps([]);
    setGeneratedVideo(null);
    setAiSuggestions([]);
    setIsPlaying(false);
    setVideoProgress(0);
    setCurrentTime(0);
    setSelectedVideoId(1);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const renderNeuralNetwork = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {neuralNetwork.map((node) => (
        <React.Fragment key={node.id}>
          {/* Connections */}
          {node.connections.map((targetId, idx) => {
            const target = neuralNetwork[targetId];
            if (target) {
              return (
                <motion.div
                  key={`connection-${node.id}-${idx}`}
                  className="absolute"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    width: `${Math.sqrt(Math.pow(target.x - node.x, 2) + Math.pow(target.y - node.y, 2))}%`,
                    height: '1px',
                    background: `linear-gradient(90deg, ${node.color}, ${target.color})`,
                    transformOrigin: 'left center',
                    transform: `rotate(${Math.atan2(target.y - node.y, target.x - node.x) * 180 / Math.PI}deg)`,
                    opacity: 0.3
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: node.id * 0.1
                  }}
                />
              );
            }
            return null;
          })}
          
          {/* Nodes */}
          <motion.div
            className="absolute rounded-full"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.size,
              height: node.size,
              background: node.color,
              boxShadow: `0 0 10px ${node.color}, 0 0 20px ${node.color}`
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, Math.sin(node.id) * 5, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: node.speed * 3,
              repeat: Infinity,
              delay: node.id * 0.1
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );

  const renderVideoPlayer = () => (
    <div 
      ref={videoContainerRef}
      className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 mb-8 bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (isPlaying) {
          setShowVideoControls(false);
        }
      }}
    >
      <div className="aspect-video relative">
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={generatedVideo.url}
          poster={generatedVideo.thumbnail}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
        >
          Your browser does not support the video tag.
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

        {/* Play/Pause Overlay Button */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 backdrop-blur-sm"
            >
              <Play className="w-12 h-12 text-white ml-2" />
            </motion.button>
          </div>
        )}

        {/* Video Controls */}
        <AnimatePresence>
          {showVideoControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent"
            >
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={videoProgress}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-300 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{generatedVideo.duration}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white" />
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : volume < 0.5 ? (
                        <Volume2 className="w-5 h-5 text-white" />
                      ) : (
                        <VolumeHigh className="w-5 h-5 text-white" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-24 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-white">
                    {generatedVideo.quality}
                  </span>
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Maximize2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Info */}
        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full">
                  {generatedVideo.icon}
                  <span className="text-sm font-medium text-blue-300">{generatedVideo.category}</span>
                </div>
                <div className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-full">
                  <span className="text-sm font-medium text-cyan-300">AI Score: {generatedVideo.aiScore}</span>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">{generatedVideo.title}</h4>
              <p className="text-gray-300 text-base mb-3">{generatedVideo.description}</p>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-sm text-gray-300">
                  <Clock className="w-4 h-4" />
                  {generatedVideo.duration}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-300">
                  <Sparkles className="w-4 h-4" />
                  {generatedVideo.quality}
                </span>
                <div className="flex gap-2">
                  {generatedVideo.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-gray-800/50 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse">
            <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
            Business Video Configuration
          </h2>
          <p className="text-gray-400">Create professional business explainer videos with AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3 flex items-center gap-2">
              <Type className="w-5 h-5 text-blue-500" />
              <span>Business/Project Name</span>
              <span className="ml-auto text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded-full">
                AI Processing
              </span>
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-800 bg-gray-900/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 text-white placeholder-gray-500"
              placeholder="Enter your business or project name..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <span>Video Type</span>
              <span className="ml-auto text-xs bg-gradient-to-r from-purple-900/30 to-pink-900/30 px-2 py-1 rounded-full">
                Business Focus
              </span>
            </label>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {businessVideos.slice(0, 4).map((video) => (
                  <motion.button
                    key={video.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedVideoId(video.id)}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center ${
                      selectedVideoId === video.id
                        ? 'border-blue-500 bg-gradient-to-br from-blue-900/20 to-cyan-900/20'
                        : 'border-gray-800 bg-gray-900/30 hover:border-gray-700'
                    }`}
                  >
                    <div className={`p-2 rounded-lg mb-2 ${
                      selectedVideoId === video.id
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-800 text-gray-400'
                    }`}>
                      {video.icon}
                    </div>
                    <div className="text-xs font-medium">{video.title.split(' ')[0]}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-500" />
              <span>Video Duration</span>
              <span className="ml-auto text-xs bg-gradient-to-r from-cyan-900/30 to-blue-900/30 px-2 py-1 rounded-full">
                AI Recommended: 3-5 mins
              </span>
            </label>
            <div className="space-y-4">
              <input
                type="range"
                min="30"
                max="600"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full h-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-cyan-600"
              />
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Short (30s)</span>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                  {Math.floor(duration/60)}:{duration%60 < 10 ? '0' : ''}{duration%60}
                </span>
                <span className="text-gray-400">Detailed (10m)</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            <span className="flex items-center gap-2">
              <ChartLine className="w-5 h-5 text-cyan-500" />
              <span>Business Script/Content</span>
              {aiThinking && (
                <span className="ml-auto flex items-center gap-1 text-xs text-cyan-400">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  AI is analyzing...
                </span>
              )}
            </span>
            <span className="text-xs text-gray-500 block mt-1">
              Describe your business, product, or service. AI will generate professional content
            </span>
          </label>
          <div className="relative">
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              rows="8"
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-800 bg-gray-900/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 text-white placeholder-gray-500 resize-none"
              placeholder="Describe your business, target audience, unique value proposition, or key messages..."
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500">
              {script.length}/5000
            </div>
          </div>
          
          {/* AI Business Suggestions */}
          <AnimatePresence>
            {aiSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4 space-y-2"
              >
                <div className="flex items-center gap-2 text-sm text-blue-400">
                  <Brain className="w-4 h-4" />
                  <span>AI Business Insights:</span>
                </div>
                {aiSuggestions.map((suggestion, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2 text-xs text-gray-300 bg-gray-900/50 p-3 rounded-lg border border-gray-800"
                  >
                    <Sparkle className="w-3 h-3 text-yellow-500" />
                    {suggestion}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Business Keywords */}
          <div className="mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
              <TargetIcon className="w-4 h-4" />
              <span>Suggested Business Keywords:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Startup', 'Growth', 'Strategy', 'Marketing', 'Sales', 'Leadership', 'Finance', 'Innovation'].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => setScript(prev => prev + ` ${keyword}`)}
                  className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-full border border-gray-700 transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl">
          <Wand2 className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Business Enhancements & Style
          </h3>
          <p className="text-gray-400">Professional customization for business videos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Voice Options */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Volume2 className="w-5 h-5 text-blue-500" />
            <h4 className="text-lg font-semibold">Professional Voice</h4>
          </div>
          <div className="space-y-3">
            {voiceOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setVoiceType(option.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                  voiceType === option.value
                    ? 'border-blue-500 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 shadow-lg shadow-blue-500/20'
                    : 'border-gray-800 bg-gray-900/30 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    voiceType === option.value
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-gray-800 text-gray-400'
                  }`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                  {voiceType === option.value && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Music Options */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-5 h-5 text-purple-500" />
            <h4 className="text-lg font-semibold">Background Music</h4>
          </div>
          <div className="space-y-3">
            {musicOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMusic(option.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                  music === option.value
                    ? 'border-purple-500 bg-gradient-to-r from-purple-900/20 to-pink-900/20 shadow-lg shadow-purple-500/20'
                    : 'border-gray-800 bg-gray-900/30 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    music === option.value
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-gray-800 text-gray-400'
                  }`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                  {music === option.value && (
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Animation Options */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-pink-500" />
            <h4 className="text-lg font-semibold">Animation Style</h4>
          </div>
          <div className="space-y-3">
            {animationOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setAnimationStyle(option.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                  animationStyle === option.value
                    ? 'border-pink-500 bg-gradient-to-r from-pink-900/20 to-rose-900/20 shadow-lg shadow-pink-500/20'
                    : 'border-gray-800 bg-gray-900/30 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    animationStyle === option.value
                      ? 'bg-pink-500/20 text-pink-400'
                      : 'bg-gray-800 text-gray-400'
                  }`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                  {animationStyle === option.value && (
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Business Template Preview */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-cyan-500" />
          <span>Business Video Templates</span>
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {businessVideos.map((video) => (
            <motion.button
              key={video.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedVideoId(video.id)}
              className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                selectedVideoId === video.id
                  ? 'border-blue-500 shadow-lg shadow-blue-500/30'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="aspect-square bg-gray-900 relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className={`p-2 rounded-lg backdrop-blur-sm ${
                    selectedVideoId === video.id
                      ? 'bg-blue-500/30'
                      : 'bg-gray-900/50'
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${
                        selectedVideoId === video.id
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-gray-800 text-gray-400'
                      }`}>
                        {video.icon}
                      </div>
                      <span className="text-xs font-medium truncate">{video.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* AI Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 border-2 border-gray-800"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-1">Business Video Preview</h4>
            <p className="text-sm text-gray-400">
              Your business video will be generated with <span className="text-blue-400">{voiceType.replace('_', ' ')}</span> voice, 
              <span className="text-purple-400"> {music.replace('_', ' ')}</span> music, 
              <span className="text-pink-400"> {animationStyle.replace('_', ' ')}</span> animations
              and <span className="text-cyan-400">{businessVideos.find(v => v.id === selectedVideoId)?.category || 'Business'} template</span>
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Professional Score: 97%
            </div>
            <div className="text-xs text-gray-500">Business Impact Prediction</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-[600px] flex items-center justify-center"
    >
      {/* Neural Network Background */}
      {renderNeuralNetwork()}
      
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
            className="w-40 h-40 mx-auto mb-8 relative"
          >
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-transparent rounded-full 
                          bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 
                          animate-spin [animation-duration:8s]">
              <div className="absolute inset-4 rounded-full bg-gray-900"></div>
            </div>
            
            {/* Middle Ring */}
            <div className="absolute inset-8 border-4 border-transparent rounded-full 
                          bg-gradient-to-r from-purple-600 via-pink-500 to-rose-600 
                          animate-spin [animation-duration:6s] [animation-direction:reverse]">
              <div className="absolute inset-4 rounded-full bg-gray-900"></div>
            </div>
            
            {/* Inner Core */}
            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 
                          flex items-center justify-center">
              <Briefcase className="w-12 h-12 text-white" />
            </div>
            
            {/* Floating Orbs */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"
                style={{
                  left: `${50 + 30 * Math.cos((i * 120 * Math.PI) / 180)}%`,
                  top: `${50 + 30 * Math.sin((i * 120 * Math.PI) / 180)}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </motion.div>

          <motion.h3 
            className="text-4xl font-bold mb-4"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity
            }}
            style={{
              background: 'linear-gradient(90deg, #2563eb, #06b6d4, #8b5cf6, #2563eb)',
              backgroundSize: '300% 300%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Business Intelligence Processing
          </motion.h3>
          
          <p className="text-gray-400 text-lg mb-8">
            Our AI is creating professional business content with advanced analytics
          </p>

          {/* AI Status */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-900/50 rounded-full border border-gray-800 mb-8">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300"></div>
            </div>
            <span className="text-sm font-medium">Live Business AI Processing</span>
            <Server className="w-4 h-4 text-green-500 animate-pulse" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Initializing</span>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {Math.round(progress)}%
            </span>
            <span>Complete</span>
          </div>
          <div className="h-3 bg-gray-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                            animate-shimmer bg-[length:200%_100%]"></div>
            </motion.div>
          </div>
        </div>

        {/* AI Processing Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                step.completed
                  ? 'border-green-500/50 bg-gradient-to-r from-green-900/20 to-emerald-900/20'
                  : 'border-gray-800 bg-gray-900/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  step.completed
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-800 text-gray-400'
                }`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${
                    step.completed ? 'text-green-300' : 'text-gray-300'
                  }`}>
                    {step.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {step.completed ? 'AI processed successfully' : 'Business intelligence processing...'}
                  </div>
                </div>
                {step.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live AI Events */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-4 rounded-xl bg-gray-900/50 border border-gray-800"
        >
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Satellite className="w-4 h-4" />
            <span>Live Business AI Events</span>
          </div>
          <div className="text-xs text-blue-400 font-mono">
            {progress < 25 && "> Analyzing business requirements..."}
            {progress >= 25 && progress < 50 && "> Generating professional content..."}
            {progress >= 50 && progress < 75 && "> Creating business-grade visuals..."}
            {progress >= 75 && "> Finalizing professional output..."}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotateY: [0, 360, 0]
        }}
        transition={{ 
          y: { duration: 3, repeat: Infinity },
          rotateY: { duration: 4, repeat: Infinity, delay: 1 }
        }}
        className="inline-flex items-center justify-center w-24 h-24 mb-8"
      >
        <div className="absolute w-full h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-600 rounded-2xl animate-pulse"></div>
        <div className="relative w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center">
          <Briefcase className="w-10 h-10 text-cyan-400" />
        </div>
      </motion.div>
      
      <motion.h3 
        className="text-4xl font-bold mb-3"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity
        }}
        style={{
          background: 'linear-gradient(90deg, #2563eb, #06b6d4, #0ea5e9, #2563eb)',
          backgroundSize: '200% 200%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}
      >
        Business Video Generated Successfully!
      </motion.h3>
      
      <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
        Your professional business explainer video is ready with AI enhancements
      </p>

      <div className="max-w-6xl mx-auto mb-12">
        {/* Video Player */}
        {generatedVideo && renderVideoPlayer()}
        
        {/* Business Video Library */}
        <div className="mb-12">
          <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-500" />
            <span>Business Video Library</span>
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {businessVideos.map((video) => (
              <motion.div
                key={video.id}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => {
                  setGeneratedVideo(video);
                  setIsPlaying(false);
                  setVideoProgress(0);
                  setCurrentTime(0);
                  if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                  }
                }}
              >
                <div className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  generatedVideo?.id === video.id
                    ? 'border-blue-500 shadow-lg shadow-blue-500/30'
                    : 'border-gray-800 group-hover:border-gray-700'
                }`}>
                  <div className="aspect-square bg-gray-900 relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-900 to-transparent">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="text-xs font-semibold truncate">{video.title.split(' ')[0]}</div>
                          <div className="text-[10px] text-gray-400">{video.category}</div>
                        </div>
                        <div className="text-xs px-1.5 py-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded">
                          AI {video.aiScore}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Business Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Simulate download
              const link = document.createElement('a');
              link.href = generatedVideo.url;
              link.download = `${generatedVideo.title.replace(/\s+/g, '_')}_Business_Video.mp4`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/30 hover:border-blue-500 transition-all duration-300"
          >
            <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl group-hover:scale-110 transition-transform">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg">Download 4K</div>
              <div className="text-sm text-gray-400">Professional Quality</div>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Share functionality
              const shareText = `Check out this professional business explainer video: ${generatedVideo.title}`;
              if (navigator.share) {
                navigator.share({
                  title: generatedVideo.title,
                  text: shareText,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
                alert('Business video link copied to clipboard!');
              }
            }}
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/30 hover:border-purple-500 transition-all duration-300"
          >
            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg">Share Business</div>
              <div className="text-sm text-gray-400">Clients & Investors</div>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetForm}
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700 hover:border-gray-600 transition-all duration-300"
          >
            <div className="p-3 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl group-hover:scale-110 transition-transform">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg">Create New</div>
              <div className="text-sm text-gray-400">Another Business Video</div>
            </div>
          </motion.button>
        </div>

        {/* Business Use Cases */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-900 border-2 border-gray-800">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <span>Business Use Cases</span>
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-gray-800/30 border border-gray-700">
              <div className="text-2xl font-bold text-blue-400 mb-2">Pitch Decks</div>
              <div className="text-sm text-gray-400">Investor presentations</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gray-800/30 border border-gray-700">
              <div className="text-2xl font-bold text-cyan-400 mb-2">Training</div>
              <div className="text-sm text-gray-400">Employee onboarding</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gray-800/30 border border-gray-700">
              <div className="text-2xl font-bold text-purple-400 mb-2">Marketing</div>
              <div className="text-sm text-gray-400">Product launches</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gray-800/30 border border-gray-700">
              <div className="text-2xl font-bold text-green-400 mb-2">Reports</div>
              <div className="text-sm text-gray-400">Quarterly updates</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Business AI Stats */}
      <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-900 border-2 border-gray-800">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ChartLine className="w-5 h-5 text-blue-500" />
          <span>Business Intelligence Statistics</span>
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              9.8s
            </div>
            <div className="text-sm text-gray-400">Processing Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              97%
            </div>
            <div className="text-sm text-gray-400">Professional Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              184
            </div>
            <div className="text-sm text-gray-400">Business Models</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
              3.8GB
            </div>
            <div className="text-sm text-gray-400">Business Data</div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-4 md:p-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
            className="inline-block mb-6"
          >
            <div className="p-4 bg-gradient-to-br from-blue-600/20 via-cyan-500/20 to-purple-600/20 rounded-3xl border border-gray-800 backdrop-blur-sm">
              <Briefcase className="w-12 h-12 text-blue-400" />
            </div>
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity
            }}
            style={{
              background: 'linear-gradient(90deg, #2563eb, #06b6d4, #8b5cf6, #2563eb)',
              backgroundSize: '300% 300%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Business Explainer Video Generator
          </motion.h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Create professional business videos with AI-powered intelligence and analytics
          </p>
          
          {/* Live AI Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 mt-6 px-6 py-3 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Business AI: Online</span>
            </div>
            <div className="w-px h-4 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Business Intelligence: Active</span>
            </div>
          </motion.div>
        </motion.header>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/40 backdrop-blur-xl rounded-3xl border-2 border-gray-800 shadow-2xl overflow-hidden mb-12"
        >
          {/* Progress Steps */}
          <div className="border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-900">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((stepNum) => (
                  <motion.div
                    key={stepNum}
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold
                        transition-all duration-300 relative
                        ${step >= stepNum 
                          ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30' 
                          : 'bg-gray-800 text-gray-400'
                        }
                        ${step === stepNum ? 'ring-4 ring-blue-500/30 scale-110' : ''}
                      `}>
                        {stepNum}
                        {step === stepNum && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                        )}
                      </div>
                      <span className="text-sm mt-3 font-medium">
                        {stepNum === 1 && 'Business Input'}
                        {stepNum === 2 && 'Professional Style'}
                        {stepNum === 3 && 'AI Processing'}
                        {stepNum === 4 && 'Business Output'}
                      </span>
                    </div>
                    
                    {/* Connector Lines */}
                    {stepNum < 4 && (
                      <div className="absolute top-8 left-3/4 w-full h-1 -translate-y-1/2">
                        <div className={`h-0.5 w-full ${
                          step > stepNum 
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600' 
                            : 'bg-gray-800'
                        }`}></div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8 lg:p-12">
            <AnimatePresence mode="wait">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          {step < 3 && (
            <div className="border-t border-gray-800 p-6 md:p-8 bg-gradient-to-r from-gray-900 to-gray-900">
              <div className="flex justify-between items-center">
                {step > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-700 bg-gray-800 hover:bg-gray-700 hover:border-gray-600 transition-all duration-300"
                  >
                    <span>← Back</span>
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={step === 2 ? handleSubmit : () => setStep(step + 1)}
                  className={`
                    ml-auto px-8 py-4 rounded-xl font-bold text-lg
                    transition-all duration-300 flex items-center gap-3
                    ${step === 2
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90'
                    }
                  `}
                >
                  {step === 2 ? (
                    <>
                      <Sparkles className="w-6 h-6" />
                      Generate Business Video
                      <Rocket className="w-5 h-5" />
                    </>
                  ) : (
                    'Continue to Professional Style →'
                  )}
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Business Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="group p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-900 border-2 border-gray-800 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">Professional</div>
                <div className="text-gray-400">Business-grade quality</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="group p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-900 border-2 border-gray-800 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">Growth Focused</div>
                <div className="text-gray-400">Business strategies</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="group p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-900 border-2 border-gray-800 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">AI Enhanced</div>
                <div className="text-gray-400">Smart analytics</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Business Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center justify-center gap-3">
            <Star className="w-6 h-6 text-yellow-500" />
            <span>Perfect For Business Needs</span>
            <Star className="w-6 h-6 text-yellow-500" />
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/30 transition-all duration-300">
              <div className="text-4xl mb-3">🏢</div>
              <div className="font-semibold">Startups</div>
              <div className="text-sm text-gray-400 mt-2">Pitch to investors</div>
            </div>
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300">
              <div className="text-4xl mb-3">📈</div>
              <div className="font-semibold">Corporates</div>
              <div className="text-sm text-gray-400 mt-2">Internal training</div>
            </div>
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/30 transition-all duration-300">
              <div className="text-4xl mb-3">🎯</div>
              <div className="font-semibold">Marketing</div>
              <div className="text-sm text-gray-400 mt-2">Product launches</div>
            </div>
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-green-500/30 transition-all duration-300">
              <div className="text-4xl mb-3">👥</div>
              <div className="font-semibold">Consultants</div>
              <div className="text-sm text-gray-400 mt-2">Client presentations</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© 2024 Business Explainer Video Generator | Powered by Business Intelligence AI</p>
        <p className="mt-2 text-xs">Professional business video creation platform</p>
        <p className="mt-1 text-xs">10+ business video templates available</p>
      </footer>
    </div>
  );
};

export default ExplainerVideoGenerator;