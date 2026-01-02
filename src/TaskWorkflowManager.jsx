import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  PlusCircle, 
  CheckCircle, 
  Clock, 
  Edit2, 
  Trash2, 
  XCircle,
  Save,
  ListTodo,
  Brain,
  Users,
  Calendar,
  Clock as TimeIcon,
  Target,
  BarChart3,
  Sparkles,
  ChevronRight,
  Zap,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Cpu,
  PieChart,
  AlertTriangle
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/api/tasks/';

const TaskWorkflowManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    status: 'to_do' 
  });
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState({});
  const [realTimeAnalysis, setRealTimeAnalysis] = useState(null);

  // Enhanced Status configurations
  const statusConfig = {
    to_do: {
      title: 'To Do',
      icon: <ListTodo className="w-5 h-5" />,
      color: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200',
      textColor: 'text-yellow-700',
      badgeColor: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      accentColor: 'from-yellow-400 to-orange-400'
    },
    in_progress: {
      title: 'In Progress',
      icon: <Clock className="w-5 h-5" />,
      color: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200',
      textColor: 'text-blue-700',
      badgeColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      accentColor: 'from-blue-400 to-cyan-400'
    },
    done: {
      title: 'Completed',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
      textColor: 'text-green-700',
      badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      accentColor: 'from-green-400 to-emerald-400'
    }
  };

  // AI Task Complexity Levels
  const complexityLevels = {
    low: { 
      label: 'Easy', 
      color: 'bg-green-100 text-green-800', 
      time: '1-2 hours',
      icon: '🟢',
      description: 'Quick task, minimal effort'
    },
    medium: { 
      label: 'Medium', 
      color: 'bg-yellow-100 text-yellow-800', 
      time: '1-2 days',
      icon: '🟡',
      description: 'Standard task, moderate effort'
    },
    high: { 
      label: 'Complex', 
      color: 'bg-orange-100 text-orange-800', 
      time: '3-5 days',
      icon: '🟠',
      description: 'Challenging task, requires focus'
    },
    very_high: { 
      label: 'Advanced', 
      color: 'bg-red-100 text-red-800', 
      time: '1-2 weeks',
      icon: '🔴',
      description: 'Major task, significant resources'
    }
  };

  // Priority Levels
  const priorityLevels = {
    low: { label: 'Low', color: 'bg-gray-100 text-gray-800', icon: '📅' },
    medium: { label: 'Medium', color: 'bg-blue-100 text-blue-800', icon: '⚠️' },
    high: { label: 'High', color: 'bg-red-100 text-red-800', icon: '🚨' }
  };

  // Fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  // Real-time analysis on input change
  useEffect(() => {
    if (newTask.title || newTask.description) {
      const analysis = analyzeTaskInRealTime(newTask);
      setRealTimeAnalysis(analysis);
    } else {
      setRealTimeAnalysis(null);
    }
  }, [newTask.title, newTask.description]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Real-time AI Analysis - Instant results
  const analyzeTaskInRealTime = (task) => {
    if (!task.title && !task.description) return null;
    
    const words = (task.title + ' ' + task.description).toLowerCase();
    const wordCount = words.split(/\s+/).length;
    
    // Calculate complexity score
    let complexityScore = 0;
    let estimatedHours = 4;
    let teamSize = 1;
    let requiredSkills = new Set();
    
    // Title length factor
    if (task.title.length > 50) complexityScore += 2;
    else if (task.title.length > 20) complexityScore += 1;
    
    // Description length factor
    if (wordCount > 100) complexityScore += 3;
    else if (wordCount > 50) complexityScore += 2;
    else if (wordCount > 20) complexityScore += 1;
    
    // Keyword analysis
    const keywords = {
      urgent: { score: 3, hours: 8, team: 2, skills: [] },
      critical: { score: 3, hours: 12, team: 2, skills: [] },
      complex: { score: 3, hours: 16, team: 3, skills: ['Developer'] },
      major: { score: 2, hours: 12, team: 2, skills: [] },
      design: { score: 1, hours: 8, team: 1, skills: ['Designer'] },
      develop: { score: 2, hours: 10, team: 2, skills: ['Developer'] },
      code: { score: 2, hours: 10, team: 2, skills: ['Developer'] },
      test: { score: 1, hours: 6, team: 1, skills: ['QA Engineer'] },
      plan: { score: 1, hours: 4, team: 1, skills: ['Project Manager'] },
      manage: { score: 1, hours: 4, team: 1, skills: ['Project Manager'] },
      review: { score: 1, hours: 2, team: 1, skills: [] },
      simple: { score: -1, hours: 2, team: 1, skills: [] },
      quick: { score: -1, hours: 2, team: 1, skills: [] },
      easy: { score: -1, hours: 2, team: 1, skills: [] },
      fix: { score: 0, hours: 3, team: 1, skills: ['Developer'] },
      create: { score: 1, hours: 6, team: 1, skills: [] },
      build: { score: 2, hours: 8, team: 2, skills: ['Developer'] },
      implement: { score: 2, hours: 10, team: 2, skills: ['Developer'] }
    };
    
    Object.entries(keywords).forEach(([keyword, data]) => {
      if (words.includes(keyword)) {
        complexityScore += data.score;
        estimatedHours += data.hours;
        teamSize = Math.max(teamSize, data.team);
        data.skills.forEach(skill => requiredSkills.add(skill));
      }
    });
    
    // Determine complexity level
    let complexity = 'medium';
    if (complexityScore >= 5) complexity = 'very_high';
    else if (complexityScore >= 3) complexity = 'high';
    else if (complexityScore <= 0) complexity = 'low';
    
    // Adjust hours based on complexity
    if (complexity === 'very_high') estimatedHours *= 3;
    else if (complexity === 'high') estimatedHours *= 2;
    else if (complexity === 'low') estimatedHours /= 2;
    
    // Adjust team size
    if (complexity === 'very_high') teamSize = Math.max(3, teamSize);
    else if (complexity === 'high') teamSize = Math.max(2, teamSize);
    
    // If no specific skills detected, add based on complexity
    if (requiredSkills.size === 0) {
      if (complexity === 'very_high') {
        requiredSkills.add('Senior Developer');
        requiredSkills.add('Architect');
      } else if (complexity === 'high') {
        requiredSkills.add('Developer');
        requiredSkills.add('QA');
      } else {
        requiredSkills.add('Generalist');
      }
    }
    
    // Determine priority
    let priority = 'medium';
    if (words.includes('urgent') || words.includes('critical') || complexity === 'very_high') {
      priority = 'high';
    } else if (words.includes('simple') || words.includes('easy') || complexity === 'low') {
      priority = 'low';
    }
    
    // Generate suggestions
    const suggestions = [];
    if (complexity === 'very_high') {
      suggestions.push('Break into smaller milestones');
      suggestions.push('Weekly progress reviews needed');
      suggestions.push('Consider external expertise');
    } else if (complexity === 'high') {
      suggestions.push('Daily standups recommended');
      suggestions.push('Pair programming would help');
      suggestions.push('Regular client updates');
    } else if (complexity === 'medium') {
      suggestions.push('Track progress weekly');
      suggestions.push('Document key decisions');
      suggestions.push('Set clear deliverables');
    } else {
      suggestions.push('Can be done in single session');
      suggestions.push('Minimal documentation needed');
      suggestions.push('Self-contained task');
    }
    
    return {
      complexity,
      estimatedDays: Math.ceil(estimatedHours / 8),
      estimatedHours: Math.round(estimatedHours),
      teamSize,
      requiredSkills: Array.from(requiredSkills),
      priority,
      confidence: Math.min(95, Math.max(70, 85 - complexityScore * 3)),
      suggestions: suggestions.slice(0, 2),
      riskLevel: complexity === 'very_high' ? 'High' : complexity === 'high' ? 'Medium' : 'Low',
      estimatedStartDate: new Date(Date.now() + (priority === 'high' ? 86400000 : 259200000)).toLocaleDateString(),
      keyChallenges: getKeyChallenges(complexity, words)
    };
  };

  const getKeyChallenges = (complexity, words) => {
    const challenges = {
      very_high: [
        'Requires specialized expertise',
        'High coordination overhead',
        'Multiple dependencies',
        'Extended timeline'
      ],
      high: [
        'Technical complexity',
        'Team coordination needed',
        'Quality assurance critical',
        'Client communication'
      ],
      medium: [
        'Balancing quality vs speed',
        'Documentation required',
        'Regular updates needed'
      ],
      low: [
        'Minimal challenges expected',
        'Quick execution needed',
        'Basic quality checks'
      ]
    };
    
    const specificChallenges = [];
    if (words.includes('design')) specificChallenges.push('User experience considerations');
    if (words.includes('develop') || words.includes('code')) specificChallenges.push('Technical implementation');
    if (words.includes('test')) specificChallenges.push('Quality assurance');
    if (words.includes('plan') || words.includes('manage')) specificChallenges.push('Project coordination');
    
    return [...challenges[complexity].slice(0, 2), ...specificChallenges.slice(0, 1)];
  };

  // Full AI Analysis Simulation for saving
  const analyzeTask = async (task) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const analysis = analyzeTaskInRealTime(task);
    
    setAiAnalysis(prev => ({ ...prev, [task.id || 'new']: analysis }));
    setIsAnalyzing(false);
    return analysis;
  };

  // Add or update task with AI Analysis
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // First, analyze the task
      const analysis = await analyzeTask(newTask);
      
      if (editingTask) {
        await axios.put(`${API_BASE_URL}${editingTask.id}/`, {
          ...newTask,
          ai_analysis: analysis
        });
        setEditingTask(null);
      } else {
        await axios.post(API_BASE_URL, {
          ...newTask,
          ai_analysis: analysis
        });
      }
      
      setNewTask({ title: '', description: '', status: 'to_do' });
      setRealTimeAnalysis(null);
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit task
  const handleEdit = (task) => {
    setNewTask({ 
      title: task.title, 
      description: task.description, 
      status: task.status 
    });
    setEditingTask(task);
    // Scroll to form
    document.getElementById('task-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Delete task
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_BASE_URL}${id}/`);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  // Clear form
  const handleCancel = () => {
    setEditingTask(null);
    setNewTask({ title: '', description: '', status: 'to_do' });
    setRealTimeAnalysis(null);
  };

  // Toggle AI Analysis view
  const toggleAnalysis = (taskId) => {
    setShowAnalysis(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Get AI Analysis for a task
  const getTaskAnalysis = (task) => {
    return aiAnalysis[task.id] || task.ai_analysis;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Futuristic Header */}
        <div className="mb-10 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl rounded-full" />
          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI TaskFlow Pro
              </h1>
            </div>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Real-time AI analysis for every task - Know effort, team, and timeline instantly
            </p>
          </div>
        </div>

        {/* Real-time Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = tasks.filter(task => task.status === status).length;
            const analysis = tasks
              .filter(task => task.status === status)
              .reduce((acc, task) => {
                const taskAnalysis = getTaskAnalysis(task);
                if (taskAnalysis) {
                  acc.totalHours += taskAnalysis.estimatedHours || 0;
                  acc.totalTeam += taskAnalysis.teamSize || 1;
                }
                return acc;
              }, { totalHours: 0, totalTeam: 0 });
            
            return (
              <div 
                key={status} 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-5 hover:border-gray-600 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${config.accentColor}`}>
                    {config.icon}
                  </div>
                  <span className={`px-3 py-1 ${config.badgeColor} text-white text-sm font-medium rounded-full`}>
                    {count}
                  </span>
                </div>
                <h3 className={`text-lg font-semibold ${config.textColor} mb-2`}>
                  {config.title}
                </h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <TimeIcon className="w-4 h-4" />
                    {analysis.totalHours} total hours
                  </p>
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {analysis.totalTeam} team members
                  </p>
                </div>
              </div>
            );
          })}
          
          {/* AI Insights Card */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-purple-700/30 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full">
                AI Live
              </span>
            </div>
            <h3 className="text-lg font-semibold text-purple-300 mb-2">
              AI Insights
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-300">
                {tasks.length} tasks analyzed
              </p>
              <p className="text-sm text-gray-400">
                Real-time estimates active
              </p>
            </div>
          </div>
        </div>

        {/* Futuristic Task Form with Real-time AI */}
        <div className="mb-10">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden shadow-2xl">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-lg opacity-70" />
                    <div className="relative p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                      {editingTask ? <Save className="w-6 h-6 text-white" /> : <PlusCircle className="w-6 h-6 text-white" />}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {editingTask ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <p className="text-gray-400">
                      {editingTask ? 'Update your task details' : 'Add a new task with AI analysis'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-400">AI Analyzing Live</span>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <form 
              id="task-form"
              onSubmit={handleSubmit} 
              className="p-6 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                      Task Title *
                    </label>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      className="w-full px-4 py-3.5 bg-gray-900/50 border-2 border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 text-white placeholder-gray-500"
                      placeholder="What needs to be done?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                      Description
                    </label>
                    <textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      className="w-full px-4 py-3.5 bg-gray-900/50 border-2 border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 text-white placeholder-gray-500 min-h-[140px]"
                      placeholder="Describe the task in detail for better AI analysis..."
                    />
                  </div>
                </div>

                {/* Right Column - Real-time AI Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-400" />
                    Real-time AI Analysis
                  </label>
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700 rounded-xl p-5 h-full">
                    {realTimeAnalysis ? (
                      <div className="space-y-4">
                        {/* Complexity & Priority Row */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-400">Complexity</span>
                              <span className={`px-2 py-1 ${complexityLevels[realTimeAnalysis.complexity].color} rounded-full text-xs font-medium`}>
                                {complexityLevels[realTimeAnalysis.complexity].icon} {complexityLevels[realTimeAnalysis.complexity].label}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">
                              {complexityLevels[realTimeAnalysis.complexity].description}
                            </p>
                          </div>
                          
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-400">Priority</span>
                              <span className={`px-2 py-1 ${priorityLevels[realTimeAnalysis.priority].color} rounded-full text-xs font-medium`}>
                                {priorityLevels[realTimeAnalysis.priority].icon} {priorityLevels[realTimeAnalysis.priority].label}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">
                              {realTimeAnalysis.priority === 'high' ? 'Immediate attention needed' : 
                               realTimeAnalysis.priority === 'medium' ? 'Schedule this week' : 'Plan for later'}
                            </p>
                          </div>
                        </div>

                        {/* Time Estimate */}
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="flex items-center gap-3 mb-2">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <div>
                              <p className="text-sm text-gray-400">Time Estimate</p>
                              <p className="text-white font-medium">
                                {realTimeAnalysis.estimatedDays} days ({realTimeAnalysis.estimatedHours} hours)
                              </p>
                            </div>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                              style={{ width: `${Math.min(100, realTimeAnalysis.estimatedHours / 40 * 100)}%` }}
                            />
                          </div>
                        </div>

                        {/* Team Requirements */}
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="flex items-center gap-3 mb-2">
                            <Users className="w-4 h-4 text-green-400" />
                            <div>
                              <p className="text-sm text-gray-400">Team Required</p>
                              <p className="text-white font-medium">
                                {realTimeAnalysis.teamSize} {realTimeAnalysis.teamSize > 1 ? 'members' : 'member'}
                              </p>
                            </div>
                          </div>
                          {realTimeAnalysis.requiredSkills.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {realTimeAnalysis.requiredSkills.map((skill, index) => (
                                <span 
                                  key={index}
                                  className="px-2 py-1 bg-gradient-to-r from-green-900/30 to-emerald-900/30 text-green-300 rounded-full text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* AI Confidence */}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">AI Confidence:</span>
                          <span className={`font-medium ${realTimeAnalysis.confidence > 85 ? 'text-green-400' : realTimeAnalysis.confidence > 75 ? 'text-yellow-400' : 'text-orange-400'}`}>
                            {realTimeAnalysis.confidence}%
                          </span>
                        </div>
                      </div>
                    ) : newTask.title ? (
                      <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full py-8">
                        <Brain className="w-12 h-12 text-gray-600 mb-3" />
                        <p className="text-gray-500 text-center">
                          Start typing to see<br />real-time AI analysis
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-700">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={newTask.status}
                      onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-700 rounded-xl appearance-none text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300"
                    >
                      {Object.entries(statusConfig).map(([value, config]) => (
                        <option key={value} value={value} className="bg-gray-800 text-white">
                          {config.title}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isLoading || isAnalyzing || !newTask.title}
                    className="flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isLoading || isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saving with AI...</span>
                      </>
                    ) : editingTask ? (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Update Task</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 group-hover:animate-pulse" />
                        <span>Add Task + AI Analysis</span>
                      </>
                    )}
                  </button>

                  {editingTask && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3.5 bg-gray-800 text-gray-300 font-medium rounded-xl hover:bg-gray-700 transition-all duration-300 border border-gray-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* AI-Powered Task Board */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl">
                <PieChart className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                AI Task Analysis Board
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Sparkles className="w-4 h-4" />
              <span>Click brain icon for detailed analysis</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(statusConfig).map(([status, config]) => (
              <div 
                key={status} 
                className={`${config.color} border border-gray-700 rounded-3xl shadow-2xl overflow-hidden`}
              >
                {/* Column Header */}
                <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-5 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${config.accentColor}`}>
                        {config.icon}
                      </div>
                      <div>
                        <h2 className={`text-xl font-bold ${config.textColor}`}>
                          {config.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {tasks.filter(task => task.status === status).length} tasks
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 ${config.badgeColor} text-white text-sm font-medium rounded-full`}>
                      {tasks.filter(task => task.status === status).length}
                    </span>
                  </div>
                </div>

                {/* Task Cards */}
                <div className="p-5 space-y-4 max-h-[600px] overflow-y-auto">
                  {tasks.filter(task => task.status === status).length === 0 ? (
                    <div className="text-center py-10">
                      <div className="p-4 bg-gray-800/50 rounded-2xl inline-block mb-3">
                        <Target className="w-8 h-8 text-gray-600" />
                      </div>
                      <p className="text-gray-500">No tasks in this column</p>
                      <p className="text-sm text-gray-600 mt-1">Add tasks to see AI analysis</p>
                    </div>
                  ) : (
                    tasks
                      .filter(task => task.status === status)
                      .map(task => {
                        const analysis = getTaskAnalysis(task);
                        const complexity = analysis?.complexity || 'medium';
                        const complexityInfo = complexityLevels[complexity];
                        const priorityInfo = priorityLevels[analysis?.priority || 'medium'];
                        
                        return (
                          <div 
                            key={task.id} 
                            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-5 hover:border-gray-600 transition-all duration-300 group"
                          >
                            {/* Task Header with Quick Info */}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors mb-2">
                                  {task.title}
                                </h3>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`px-2 py-1 ${complexityInfo.color} rounded-full text-xs font-medium`}>
                                    {complexityInfo.icon} {complexityInfo.label}
                                  </span>
                                  <span className={`px-2 py-1 ${priorityInfo.color} rounded-full text-xs font-medium`}>
                                    {priorityInfo.icon} {priorityInfo.label}
                                  </span>
                                  {analysis && (
                                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                                      {analysis.estimatedDays}d • {analysis.teamSize}👥
                                    </span>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => toggleAnalysis(task.id)}
                                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                title="Toggle AI Analysis"
                              >
                                <Brain className={`w-5 h-5 ${showAnalysis[task.id] ? 'text-purple-400 animate-pulse' : 'text-gray-400'}`} />
                              </button>
                            </div>
                            
                            {/* Task Description */}
                            {task.description && (
                              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                {task.description}
                              </p>
                            )}
                            
                            {/* AI Analysis - Collapsible */}
                            {showAnalysis[task.id] && analysis && (
                              <div className="mt-4 pt-4 border-t border-gray-700 space-y-4 animate-slideDown">
                                <div className="flex items-center gap-2 mb-3">
                                  <Sparkles className="w-4 h-4 text-purple-400" />
                                  <span className="text-sm font-medium text-purple-300">AI Analysis</span>
                                  <span className="text-xs text-gray-500 ml-auto">
                                    {analysis.confidence}% confidence
                                  </span>
                                </div>
                                
                                {/* Detailed Analysis Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="bg-gray-900/50 rounded-xl p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Calendar className="w-4 h-4 text-blue-400" />
                                      <span className="text-sm text-gray-400">Time Estimate</span>
                                    </div>
                                    <p className="text-white font-medium">
                                      {analysis.estimatedDays} days
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      ({analysis.estimatedHours} hours)
                                    </p>
                                    <p className="text-xs text-blue-400 mt-1">
                                      Start by: {analysis.estimatedStartDate}
                                    </p>
                                  </div>
                                  
                                  <div className="bg-gray-900/50 rounded-xl p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Users className="w-4 h-4 text-green-400" />
                                      <span className="text-sm text-gray-400">Team Required</span>
                                    </div>
                                    <p className="text-white font-medium">
                                      {analysis.teamSize} {analysis.teamSize > 1 ? 'members' : 'member'}
                                    </p>
                                    {analysis.requiredSkills && analysis.requiredSkills.length > 0 && (
                                      <p className="text-xs text-gray-500 mt-1">
                                        Skills: {analysis.requiredSkills.join(', ')}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Risk & Challenges */}
                                <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-xl p-3 border border-red-800/30">
                                  <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                    <span className="text-sm font-medium text-red-300">Key Challenges</span>
                                  </div>
                                  <ul className="text-sm text-gray-300 space-y-1">
                                    {analysis.keyChallenges?.map((challenge, idx) => (
                                      <li key={idx} className="flex items-start">
                                        <span className="text-red-400 mr-2">•</span>
                                        {challenge}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                {/* AI Suggestions */}
                                {analysis.suggestions && analysis.suggestions.length > 0 && (
                                  <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-3 border border-purple-800/30">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                                      <span className="text-sm font-medium text-yellow-300">AI Suggests:</span>
                                    </div>
                                    <ul className="text-sm text-gray-300 space-y-1">
                                      {analysis.suggestions.map((suggestion, idx) => (
                                        <li key={idx} className="flex items-start">
                                          <span className="text-yellow-400 mr-2">💡</span>
                                          {suggestion}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                                {/* Risk Level */}
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-400">Risk Level:</span>
                                  <span className={`px-3 py-1 ${
                                    analysis.riskLevel === 'High' ? 'bg-red-900/30 text-red-300' :
                                    analysis.riskLevel === 'Medium' ? 'bg-yellow-900/30 text-yellow-300' :
                                    'bg-green-900/30 text-green-300'
                                  } rounded-full text-sm font-medium`}>
                                    {analysis.riskLevel}
                                  </span>
                                </div>
                              </div>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                              <span className="text-xs text-gray-500">
                                Created: {new Date(task.created_at || Date.now()).toLocaleDateString()}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEdit(task)}
                                  className="p-2 hover:bg-blue-900/30 text-blue-400 hover:text-blue-300 rounded-lg transition-colors"
                                  title="Edit task"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(task.id)}
                                  className="p-2 hover:bg-red-900/30 text-red-400 hover:text-red-300 rounded-lg transition-colors"
                                  title="Delete task"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">AI Insights & Recommendations</h3>
              <p className="text-gray-400">Based on analysis of all tasks</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-300">Workload Analysis</span>
              </div>
              <p className="text-gray-300 text-sm">
                {tasks.filter(t => t.status === 'in_progress').length > 3 
                  ? `🚨 ${tasks.filter(t => t.status === 'in_progress').length} tasks in progress - team overloaded!`
                  : '✅ Workload distribution looks balanced.'}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Total estimated hours: {tasks.reduce((acc, task) => acc + (getTaskAnalysis(task)?.estimatedHours || 0), 0)}
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-green-300">Team Optimization</span>
              </div>
              <p className="text-gray-300 text-sm">
                {tasks.length > 0 
                  ? `Optimal team: ${Math.ceil(tasks.reduce((acc, task) => acc + (getTaskAnalysis(task)?.teamSize || 1), 0) / 2)} members`
                  : 'Add tasks to get team recommendations'}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Skills needed: {[...new Set(tasks.flatMap(t => getTaskAnalysis(t)?.requiredSkills || []))].slice(0, 3).join(', ')}
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-purple-300">Productivity Tips</span>
              </div>
              <p className="text-gray-300 text-sm">
                {tasks.filter(t => t.status === 'done').length / tasks.length > 0.5
                  ? '🎯 Great completion rate! Focus on quality now.'
                  : '📈 Complete pending tasks before adding new ones.'}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Completion rate: {tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {(isLoading || isAnalyzing) && (
          <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-8 rounded-3xl shadow-2xl max-w-md">
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl opacity-50 rounded-full" />
                  <div className="relative w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {isAnalyzing ? 'AI is Analyzing...' : 'Processing...'}
                </h3>
                <p className="text-gray-400 text-center">
                  {isAnalyzing 
                    ? 'Finalizing detailed analysis and recommendations'
                    : 'Saving task and updating board'}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse delay-150" />
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse delay-300" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskWorkflowManager;