import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Mail,
  Smartphone,
  Zap,
  TrendingUp,
  CheckCircle,
  CreditCard,
  Users,
  BarChart,
  Calendar,
  Shield,
  Cloud,
  Cpu,
  Settings,
  Sparkles,
  Globe,
  Lock,
  PieChart,
  Target,
  Rocket,
  Star,
  ArrowRight,
  ChevronRight,
  Brain,
  Bot,
  Repeat,
  FileText,
  Bell,
  ShieldCheck,
  DollarSign,
  Clock
} from 'lucide-react';

const AutomationOverview = () => {
  const [activeFeature, setActiveFeature] = useState('whatsapp');

  const features = {
    whatsapp: {
      title: 'WhatsApp AI Bot',
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
      description: 'AI-powered WhatsApp automation for business communication',
      detailedExplanation: `
        The WhatsApp AI Bot is an intelligent automation system that handles customer conversations 
        24/7 using artificial intelligence. It understands natural language, provides instant responses, 
        and can handle thousands of simultaneous conversations. The bot learns from interactions to 
        improve responses over time and integrates with your CRM to provide personalized customer service.

        • Natural Language Processing (NLP) for understanding customer queries
        • Multi-language support for global businesses
        • Automated lead qualification and routing
        • Rich media support (images, documents, videos)
        • Seamless handoff to human agents when needed
        • Analytics dashboard for conversation insights

        How it works:
        1. Customer sends a message on WhatsApp
        2. AI analyzes the message intent
        3. Bot provides instant, accurate response
        4. Conversation is logged in CRM
        5. Follow-up actions are triggered automatically
      `,
      useCases: [
        'Customer support automation',
        'Lead generation and qualification',
        'Order status updates',
        'Appointment scheduling',
        'Feedback collection'
      ]
    },
    email: {
      title: 'Email Automation',
      icon: <Mail className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/10',
      description: 'Automated email campaigns with personalized content delivery',
      detailedExplanation: `
        Email Automation system sends targeted, personalized emails based on user behavior and 
        preferences. It uses AI to determine the best time to send emails, creates dynamic content, 
        and tracks engagement to optimize future campaigns.

        Key Components:
        • Smart Segmentation: Groups users based on behavior, demographics, and engagement
        • Dynamic Content: Personalized email content for each recipient
        • A/B Testing: Tests subject lines, content, and timing for optimal results
        • Behavioral Triggers: Sends emails based on specific user actions
        • Analytics Suite: Tracks opens, clicks, conversions, and ROI

        Workflow Process:
        1. User subscribes or takes specific action
        2. System adds user to relevant segment
        3. Automated email sequence begins
        4. AI optimizes send times and content
        5. Performance analytics collected
        6. Campaign automatically adjusts based on results
      `,
      useCases: [
        'Welcome email sequences',
        'Abandoned cart recovery',
        'Newsletter automation',
        'Re-engagement campaigns',
        'Product launch announcements'
      ]
    },
    sms: {
      title: 'SMS Automation',
      icon: <Smartphone className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
      description: 'Bulk SMS campaigns with instant delivery and high engagement',
      detailedExplanation: `
        SMS Automation enables businesses to send bulk text messages instantly with 98% open rates. 
        The system supports two-way communication, scheduled messaging, and personalized content 
        delivery.

        Features Include:
        • Bulk Messaging: Send thousands of SMS simultaneously
        • Two-way Communication: Receive and respond to customer replies
        • Scheduled Delivery: Plan campaigns in advance
        • Personalization: Include recipient names and custom data
        • Delivery Reports: Track delivery status in real-time
        • Compliance Management: Automatic opt-in/opt-out handling

        How It Operates:
        1. Create SMS campaign with personalized content
        2. Upload recipient list or segment audience
        3. Schedule delivery time
        4. System sends messages via global carriers
        5. Track opens, clicks, and responses
        6. Automate follow-up based on engagement
      `,
      useCases: [
        'Appointment reminders',
        'Promotional offers',
        'Security alerts',
        'Order confirmations',
        'Emergency notifications'
      ]
    },
    followups: {
      title: 'Follow-ups & Lead Scoring',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-500/10',
      description: 'Automated follow-up sequences with intelligent lead scoring',
      detailedExplanation: `
        This system automates follow-up processes and scores leads based on engagement and behavior. 
        It ensures no lead falls through the cracks and helps sales teams focus on high-potential prospects.

        Lead Scoring Mechanism:
        • Engagement Score: Based on email opens, clicks, website visits
        • Demographic Score: Industry, company size, job title
        • Behavioral Score: Content downloads, webinar attendance, product trials
        • Timing Score: Recent activity and engagement patterns
        • Predictive Score: AI predicts conversion likelihood

        Automation Features:
        • Automated follow-up sequences
        • Lead nurturing workflows
        • Priority-based lead routing
        • Conversion prediction algorithms
        • Performance analytics dashboard

        Process Flow:
        1. Lead enters system (form submission, download, etc.)
        2. System assigns initial score based on source and data
        3. Automated follow-up sequence begins
        4. Score updates with each interaction
        5. High-score leads routed to sales team
        6. Low-engagement leads moved to nurturing campaigns
      `,
      useCases: [
        'Sales pipeline management',
        'Lead qualification automation',
        'Nurture campaign automation',
        'Conversion optimization',
        'Sales team productivity'
      ]
    },
    tasks: {
      title: 'Task & Workflow Manager',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'from-indigo-500 to-violet-600',
      bgColor: 'bg-indigo-500/10',
      description: 'Automated task management with intelligent workflow orchestration',
      detailedExplanation: `
        The Task & Workflow Manager automates business processes, assigns tasks, and ensures 
        timely completion. It uses AI to optimize workflows and predict bottlenecks before they occur.

        Core Capabilities:
        • Workflow Automation: Create custom business process workflows
        • Task Assignment: Automatic task allocation based on skills and availability
        • Deadline Management: Smart deadline setting and reminders
        • Progress Tracking: Real-time progress monitoring
        • Collaboration Tools: Team communication and file sharing
        • Integration Hub: Connect with other business tools

        Intelligent Features:
        • AI-powered task prioritization
        • Predictive timeline estimation
        • Automatic bottleneck detection
        • Resource optimization suggestions
        • Performance analytics and reporting

        How It Works:
        1. Define workflow with triggers and actions
        2. System monitors for trigger conditions
        3. Tasks automatically created and assigned
        4. Team members receive notifications
        5. Progress tracked in real-time
        6. Reports generated upon completion
      `,
      useCases: [
        'Project management automation',
        'Employee onboarding workflows',
        'Customer support ticket routing',
        'Approval process automation',
        'Quality assurance workflows'
      ]
    },
    payments: {
      title: 'Payment & Invoice Automation',
      icon: <CreditCard className="w-8 h-8" />,
      color: 'from-yellow-500 to-amber-600',
      bgColor: 'bg-yellow-500/10',
      description: 'Automated payment processing and invoice management system',
      detailedExplanation: `
        This system automates the entire payment lifecycle from invoice generation to payment 
        collection and reconciliation. It reduces manual work, minimizes errors, and improves 
        cash flow management.

        Key Features:
        • Automated Invoicing: Generate and send invoices automatically
        • Recurring Billing: Set up subscription-based payments
        • Payment Reminders: Automated follow-up for overdue payments
        • Multi-Gateway Support: Integrate with various payment processors
        • Tax Calculation: Automatic tax computation based on location
        • Financial Reporting: Real-time revenue and expense tracking

        Automation Processes:
        • Invoice generation based on triggers (order completion, subscription renewal)
        • Automatic payment collection via saved payment methods
        • Payment reconciliation with accounting systems
        • Late payment detection and automated follow-up
        • Refund processing automation
        • Financial report generation

        Benefits:
        • 90% reduction in manual invoicing work
        • 60% decrease in late payments
        • Real-time financial visibility
        • Automatic compliance with tax regulations
        • Seamless integration with accounting software
      `,
      useCases: [
        'Subscription billing automation',
        'One-time payment processing',
        'Invoice management',
        'Expense tracking',
        'Financial reporting'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-4 md:p-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl border border-gray-800 backdrop-blur-sm">
              <Zap className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Automation & Workflow
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Complete automation solutions explained in detail. Understand how each feature works and benefits your business.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Feature Selection */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/40 backdrop-blur-xl rounded-3xl border-2 border-gray-800 shadow-2xl p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-500" />
                <span>Automation Features</span>
              </h3>
              
              <div className="space-y-2">
                {Object.entries(features).map(([key, feature]) => (
                  <button
                    key={key}
                    onClick={() => setActiveFeature(key)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                      activeFeature === key
                        ? `bg-gradient-to-r ${feature.color.replace('from-', 'from-')} ${feature.color.replace('to-', 'to-')}/20 border-2 ${feature.bgColor.replace('bg-', 'border-')}`
                        : 'bg-gray-800/30 hover:bg-gray-800/50 border-2 border-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                      <div className={activeFeature === key ? feature.color.split(' ')[0].replace('from-', 'text-') : 'text-gray-400'}>
                        {feature.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{feature.title}</div>
                      <div className="text-xs text-gray-400 truncate">{feature.description}</div>
                    </div>
                    {activeFeature === key && (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-green-500" />
                  <span>Automation Impact</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Time Saved</span>
                    <span className="font-medium text-green-400">70-90%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Error Reduction</span>
                    <span className="font-medium text-blue-400">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Productivity Gain</span>
                    <span className="font-medium text-purple-400">3-5x</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">ROI Increase</span>
                    <span className="font-medium text-yellow-400">200-300%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Feature Details */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900/40 backdrop-blur-xl rounded-3xl border-2 border-gray-800 shadow-2xl overflow-hidden">
              <div className={`p-6 md:p-8 bg-gradient-to-r ${features[activeFeature].color} bg-opacity-10`}>
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-2xl ${features[activeFeature].bgColor}`}>
                    {features[activeFeature].icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{features[activeFeature].title}</h2>
                    <p className="text-gray-300 text-lg">{features[activeFeature].description}</p>
                  </div>
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                    <span className="text-sm font-medium">AI-Powered</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Detailed Explanation */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    <span>How It Works</span>
                  </h3>
                  <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
                    <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                      {features[activeFeature].detailedExplanation}
                    </div>
                  </div>
                </div>

                {/* Use Cases */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Target className="w-6 h-6 text-orange-500" />
                    <span>Common Use Cases</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features[activeFeature].useCases.map((useCase, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-gray-800/30 border border-gray-700 hover:border-gray-600 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{useCase}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Key Benefits */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Rocket className="w-6 h-6 text-green-500" />
                    <span>Key Benefits</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { 
                        title: 'Time Efficiency', 
                        description: 'Automates repetitive tasks, saving hours of manual work',
                        icon: <Clock className="w-6 h-6" />,
                        color: 'text-blue-400'
                      },
                      { 
                        title: 'Cost Savings', 
                        description: 'Reduces operational costs by eliminating manual processes',
                        icon: <DollarSign className="w-6 h-6" />,
                        color: 'text-green-400'
                      },
                      { 
                        title: 'Accuracy', 
                        description: 'Minimizes human errors with automated precision',
                        icon: <ShieldCheck className="w-6 h-6" />,
                        color: 'text-purple-400'
                      },
                      { 
                        title: 'Scalability', 
                        description: 'Handles increased workload without additional resources',
                        icon: <TrendingUp className="w-6 h-6" />,
                        color: 'text-orange-400'
                      },
                      { 
                        title: 'Consistency', 
                        description: 'Maintains uniform quality across all automated processes',
                        icon: <Repeat className="w-6 h-6" />,
                        color: 'text-cyan-400'
                      },
                      { 
                        title: 'Insights', 
                        description: 'Provides analytics and insights for continuous improvement',
                        icon: <PieChart className="w-6 h-6" />,
                        color: 'text-pink-400'
                      }
                    ].map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-5 rounded-2xl bg-gray-800/30 border border-gray-700 hover:border-gray-600 transition-all duration-300"
                      >
                        <div className={`p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 w-fit mb-4 ${benefit.color}`}>
                          {benefit.icon}
                        </div>
                        <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                        <p className="text-gray-400 text-sm">{benefit.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technical Integration */}
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-gray-800/30 to-gray-900/30 border border-gray-700">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    <span>Technical Integration</span>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-xl bg-gray-800/50">
                      <div className="text-2xl font-bold text-green-400">API First</div>
                      <div className="text-sm text-gray-400 mt-1">RESTful APIs</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gray-800/50">
                      <div className="text-2xl font-bold text-blue-400">24/7 Uptime</div>
                      <div className="text-sm text-gray-400 mt-1">99.9% SLA</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gray-800/50">
                      <div className="text-2xl font-bold text-purple-400">Real-time</div>
                      <div className="text-sm text-gray-400 mt-1">Instant Processing</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gray-800/50">
                      <div className="text-2xl font-bold text-yellow-400">Secure</div>
                      <div className="text-sm text-gray-400 mt-1">Encrypted Data</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Architecture Overview */}
            <div className="mt-8 bg-gray-900/40 backdrop-blur-xl rounded-3xl border-2 border-gray-800 shadow-2xl p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-cyan-500" />
                <span>System Architecture</span>
              </h3>
              
              <div className="relative">
                {/* Architecture Visualization */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Cloud className="w-6 h-6 text-blue-400" />
                      </div>
                      <h4 className="font-semibold">Cloud Infrastructure</h4>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Scalable cloud servers with load balancing and auto-scaling capabilities
                    </p>
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Brain className="w-6 h-6 text-purple-400" />
                      </div>
                      <h4 className="font-semibold">AI Engine</h4>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Machine learning algorithms for intelligent automation and predictions
                    </p>
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Shield className="w-6 h-6 text-green-400" />
                      </div>
                      <h4 className="font-semibold">Security Layer</h4>
                    </div>
                    <p className="text-gray-400 text-sm">
                      End-to-end encryption and compliance with data protection regulations
                    </p>
                  </div>
                </div>

                {/* Workflow Diagram */}
                <div className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700">
                  <h4 className="font-semibold mb-4 text-lg">Automation Workflow</h4>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="p-3 bg-blue-500/20 rounded-xl mb-2">
                        <Bell className="w-6 h-6 text-blue-400 mx-auto" />
                      </div>
                      <div className="text-sm">Trigger</div>
                    </div>
                    
                    <ArrowRight className="w-6 h-6 text-gray-500" />
                    
                    <div className="text-center">
                      <div className="p-3 bg-purple-500/20 rounded-xl mb-2">
                        <Cpu className="w-6 h-6 text-purple-400 mx-auto" />
                      </div>
                      <div className="text-sm">Processing</div>
                    </div>
                    
                    <ArrowRight className="w-6 h-6 text-gray-500" />
                    
                    <div className="text-center">
                      <div className="p-3 bg-green-500/20 rounded-xl mb-2">
                        <Bot className="w-6 h-6 text-green-400 mx-auto" />
                      </div>
                      <div className="text-sm">Action</div>
                    </div>
                    
                    <ArrowRight className="w-6 h-6 text-gray-500" />
                    
                    <div className="text-center">
                      <div className="p-3 bg-yellow-500/20 rounded-xl mb-2">
                        <BarChart className="w-6 h-6 text-yellow-400 mx-auto" />
                      </div>
                      <div className="text-sm">Analytics</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© 2024 Automation & Workflow System | Feature Explanations</p>
          <p className="mt-2 text-xs">This is an educational overview of automation features and their functionality</p>
        </footer>
      </div>
    </div>
  );
};

export default AutomationOverview;