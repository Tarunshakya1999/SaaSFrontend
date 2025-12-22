import React, { useState, useEffect, useRef } from 'react';

const WhatsAppAIBot = () => {
  // ==================== INITIAL CONFIGURATION ====================
  const initialBusinessConfig = {
    name: "Indokona Fintech",
    ceo: "Ravi Sharma",
    industry: "Financial Technology",
    founded: "2018",
    tagline: "Revolutionizing Digital Banking Solutions",
    description: "Indokona Fintech is a leading financial technology company providing innovative digital banking, payment solutions, and financial services to businesses and individuals across India.",
    contact: {
      email: "contact@indokona.com",
      phone: "+91 9876543210",
      website: "www.indokona.com",
      address: "Mumbai, Maharashtra, India"
    }
  };

  const initialServices = [
    { 
      id: 1, 
      name: "Digital Banking Platform", 
      description: "Complete digital banking solution for retail and corporate banking",
      price: "₹50,000/month",
      features: ["Mobile Banking", "Internet Banking", "API Integration", "24/7 Support"]
    },
    { 
      id: 2, 
      name: "Payment Gateway", 
      description: "Secure payment processing with multiple payment options",
      price: "₹25,000/month + 1.5% transaction fee",
      features: ["UPI Integration", "Credit/Debit Cards", "Net Banking", "Wallet Payments"]
    }
  ];

  const initialCustomResponses = [
    {
      question: "hello",
      responses: [
        `Hello! Welcome to ${initialBusinessConfig.name}. I'm your AI assistant. How can I help you today?`,
        `Hi there! I'm the AI assistant for ${initialBusinessConfig.name}. What can I do for you?`,
        `Welcome to ${initialBusinessConfig.name}! I'm here to assist you with our services and information.`
      ]
    },
    {
      question: "about business",
      responses: [
        `${initialBusinessConfig.name} is a ${initialBusinessConfig.industry} company founded in ${initialBusinessConfig.founded}. ${initialBusinessConfig.description}`,
        `We are ${initialBusinessConfig.name} - ${initialBusinessConfig.tagline}. ${initialBusinessConfig.description} Our CEO is ${initialBusinessConfig.ceo}.`
      ]
    }
  ];

  // ==================== STATE MANAGEMENT ====================
  const [businessConfig, setBusinessConfig] = useState(initialBusinessConfig);
  const [services, setServices] = useState(initialServices);
  const [customResponses, setCustomResponses] = useState(initialCustomResponses);
  
  // Form states for configuration
  const [businessForm, setBusinessForm] = useState(initialBusinessConfig);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    features: ""
  });
  const [newResponse, setNewResponse] = useState({
    question: "",
    response: ""
  });
  const [editingResponseIndex, setEditingResponseIndex] = useState(null);
  
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: getResponse("hello"), 
      sender: 'bot', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeConfigTab, setActiveConfigTab] = useState('business');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // ==================== EMOJI LIST ====================
  const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];
  
  // ==================== HELPER FUNCTIONS ====================
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get response based on current configuration
  function getResponse(question) {
    const lowerQuestion = question.toLowerCase().trim();
    
    // Check custom responses
    for (const customResponse of customResponses) {
      if (lowerQuestion.includes(customResponse.question)) {
        const randomIndex = Math.floor(Math.random() * customResponse.responses.length);
        return customResponse.responses[randomIndex];
      }
    }
    
    // Check for service queries
    const serviceName = extractServiceName(question);
    if (serviceName) {
      const service = services.find(s => s.name.toLowerCase().includes(serviceName.toLowerCase()));
      if (service) {
        return `Here are details about ${service.name}:\n\nDescription: ${service.description}\n\nPrice: ${service.price}\n\nFeatures:\n${service.features.map(f => `✅ ${f}`).join('\n')}`;
      }
    }
    
    // Default responses based on business config
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
      return `Hello! Welcome to ${businessConfig.name}. I'm your AI assistant. How can I help you today?`;
    } else if (lowerQuestion.includes('about') && lowerQuestion.includes('business')) {
      return `${businessConfig.name} is a ${businessConfig.industry} company founded in ${businessConfig.founded}. ${businessConfig.description}`;
    } else if (lowerQuestion.includes('service')) {
      return `We offer ${services.length} services:\n\n${services.map(s => `• ${s.name} - ${s.price}`).join('\n')}`;
    } else if (lowerQuestion.includes('contact')) {
      return `Contact us at:\n📧 ${businessConfig.contact.email}\n📞 ${businessConfig.contact.phone}`;
    } else if (lowerQuestion.includes('ceo')) {
      return `Our CEO is ${businessConfig.ceo}`;
    }
    
    return "I understand. How else can I assist you?";
  }

  const extractServiceName = (message) => {
    const serviceKeywords = services.map(s => s.name.toLowerCase().split(' ')[0]);
    for (const keyword of serviceKeywords) {
      if (message.toLowerCase().includes(keyword)) {
        return keyword;
      }
    }
    return null;
  };

  // ==================== CONFIGURATION HANDLERS ====================
  const handleBusinessConfigUpdate = () => {
    setBusinessConfig(businessForm);
    
    // Update responses that include business name
    const updatedResponses = customResponses.map(response => ({
      ...response,
      responses: response.responses.map(resp => 
        resp.replace(new RegExp(initialBusinessConfig.name, 'g'), businessForm.name)
           .replace(new RegExp(initialBusinessConfig.ceo, 'g'), businessForm.ceo)
           .replace(new RegExp(initialBusinessConfig.industry, 'g'), businessForm.industry)
           .replace(new RegExp(initialBusinessConfig.founded, 'g'), businessForm.founded)
      )
    }));
    
    setCustomResponses(updatedResponses);
    
    // Show success message
    const successMessage = {
      id: messages.length + 1,
      text: `✅ Business configuration updated! Now using: ${businessForm.name}`,
      sender: 'system',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    };
    setMessages(prev => [...prev, successMessage]);
  };

  const handleAddService = () => {
    if (!newService.name || !newService.price) return;
    
    const newServiceObj = {
      id: services.length + 1,
      name: newService.name,
      description: newService.description,
      price: newService.price,
      features: newService.features.split(',').map(f => f.trim()).filter(f => f)
    };
    
    setServices([...services, newServiceObj]);
    setNewService({ name: "", description: "", price: "", features: "" });
    
    const successMessage = {
      id: messages.length + 1,
      text: `✅ New service added: ${newServiceObj.name}`,
      sender: 'system',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    };
    setMessages(prev => [...prev, successMessage]);
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleAddResponse = () => {
    if (!newResponse.question || !newResponse.response) return;
    
    const existingResponseIndex = customResponses.findIndex(
      r => r.question === newResponse.question.toLowerCase()
    );
    
    if (editingResponseIndex !== null) {
      // Edit existing response
      const updatedResponses = [...customResponses];
      updatedResponses[editingResponseIndex].responses.push(newResponse.response);
      setCustomResponses(updatedResponses);
      setEditingResponseIndex(null);
    } else if (existingResponseIndex !== -1) {
      // Add to existing question
      const updatedResponses = [...customResponses];
      updatedResponses[existingResponseIndex].responses.push(newResponse.response);
      setCustomResponses(updatedResponses);
    } else {
      // Add new question-response pair
      const newResponseObj = {
        question: newResponse.question.toLowerCase(),
        responses: [newResponse.response]
      };
      setCustomResponses([...customResponses, newResponseObj]);
    }
    
    setNewResponse({ question: "", response: "" });
    
    const successMessage = {
      id: messages.length + 1,
      text: `✅ Chatbot response added for: "${newResponse.question}"`,
      sender: 'system',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    };
    setMessages(prev => [...prev, successMessage]);
  };

  const handleEditResponse = (index) => {
    const response = customResponses[index];
    setNewResponse({
      question: response.question,
      response: response.responses[0] || ""
    });
    setEditingResponseIndex(index);
  };

  const handleDeleteResponse = (index) => {
    setCustomResponses(customResponses.filter((_, i) => i !== index));
  };

  const handleResetConfig = () => {
    setBusinessConfig(initialBusinessConfig);
    setBusinessForm(initialBusinessConfig);
    setServices(initialServices);
    setCustomResponses(initialCustomResponses);
    
    const successMessage = {
      id: messages.length + 1,
      text: "✅ Configuration reset to default settings",
      sender: 'system',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    };
    setMessages(prev => [...prev, successMessage]);
  };

  // ==================== CHAT HANDLERS ====================
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };
    
    setMessages([...messages, newUserMessage]);
    setInputMessage('');
    setShowEmojiPicker(false);
    
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = getResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleQuickAction = (action, question) => {
    const quickMessage = {
      id: messages.length + 1,
      text: action,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };
    
    setMessages([...messages, quickMessage]);
    
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getResponse(question);
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  // ==================== FILE UPLOAD ====================
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileMessage = {
          id: messages.length + index + 1,
          text: `File: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
          sender: 'user',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'file',
          fileName: file.name,
          fileSize: file.size
        };
        
        setMessages(prev => [...prev, fileMessage]);
        setUploadedFiles(prev => [...prev, file]);
        
        setTimeout(() => {
          const botMessage = {
            id: messages.length + index + 2,
            text: `Thanks for sharing "${file.name}"! How can I help you further?`,
            sender: 'bot',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
          };
          
          setMessages(prev => [...prev, botMessage]);
        }, 1000);
      };
      
      reader.readAsDataURL(file);
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // ==================== EMOJI HANDLER ====================
  const handleEmojiClick = (emoji) => {
    setInputMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // ==================== HEADER BUTTON ACTIONS ====================
  const handleCameraClick = () => {
    const newMessage = {
      id: messages.length + 1,
      text: "📸 Camera opened",
      sender: 'system',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    };
    setMessages([...messages, newMessage]);
  };

  const handleEyeClick = () => {
    setIsOnline(!isOnline);
    const newMessage = {
      id: messages.length + 1,
      text: isOnline ? "👁️ Read receipts disabled" : "👁️ Read receipts enabled",
      sender: 'system',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    };
    setMessages([...messages, newMessage]);
  };

  const quickActions = [
    { text: "Tell me about your business", question: "about business" },
    { text: "What services do you offer?", question: "services" },
    { text: "How can I contact you?", question: "contact" },
    { text: "Who is your CEO?", question: "ceo" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              WhatsApp AI Bot
            </h1>
            <p className="text-gray-600 mt-1">
              Business: <span className="font-semibold text-green-600">{businessConfig.name}</span>
            </p>
          </div>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {showConfig ? "Hide Config" : "⚙️ Configure Bot"}
          </button>
        </div>
        
        {/* Configuration Panel */}
        {showConfig && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Bot Configuration</h2>
              <button
                onClick={handleResetConfig}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded"
              >
                Reset to Default
              </button>
            </div>
            
            {/* Configuration Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              {['business', 'services', 'responses'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveConfigTab(tab)}
                  className={`px-4 py-2 font-medium capitalize ${activeConfigTab === tab ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Business Configuration Tab */}
            {activeConfigTab === 'business' && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-4">Business Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(businessForm).map(([key, value]) => (
                    <div key={key} className={key === 'description' ? 'md:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                      {typeof value === 'object' ? (
                        <div className="space-y-2">
                          {Object.entries(value).map(([subKey, subValue]) => (
                            <div key={subKey}>
                              <label className="block text-xs text-gray-600 capitalize">
                                {subKey}
                              </label>
                              <input
                                type="text"
                                value={subValue}
                                onChange={(e) => setBusinessForm(prev => ({
                                  ...prev,
                                  contact: { ...prev.contact, [subKey]: e.target.value }
                                }))}
                                className="w-full p-2 border border-gray-300 rounded text-gray-900"
                              />
                            </div>
                          ))}
                        </div>
                      ) : key === 'description' ? (
                        <textarea
                          value={value}
                          onChange={(e) => setBusinessForm(prev => ({ ...prev, [key]: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded text-gray-900 h-32"
                          rows="4"
                        />
                      ) : (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => setBusinessForm(prev => ({ ...prev, [key]: e.target.value }))}
                          className="w-full p-2 border border-gray-300 rounded text-gray-900"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleBusinessConfigUpdate}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
                >
                  Update Business Details
                </button>
              </div>
            )}
            
            {/* Services Configuration Tab */}
            {activeConfigTab === 'services' && (
              <div>
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-4">Add New Service</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                      <input
                        type="text"
                        value={newService.name}
                        onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded text-gray-900"
                        placeholder="e.g., Digital Banking"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="text"
                        value={newService.price}
                        onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded text-gray-900"
                        placeholder="e.g., ₹50,000/month"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={newService.description}
                        onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded text-gray-900"
                        placeholder="Brief description of the service"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                      <input
                        type="text"
                        value={newService.features}
                        onChange={(e) => setNewService(prev => ({ ...prev, features: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded text-gray-900"
                        placeholder="e.g., Mobile Banking, API Integration, 24/7 Support"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleAddService}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
                  >
                    Add Service
                  </button>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4">Current Services ({services.length})</h3>
                  <div className="space-y-3">
                    {services.map(service => (
                      <div key={service.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-800">{service.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                            <div className="flex items-center mt-2">
                              <span className="text-green-600 font-medium">{service.price}</span>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-sm text-gray-500">{service.features.length} features</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Responses Configuration Tab */}
            {activeConfigTab === 'responses' && (
              <div>
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-4">
                    {editingResponseIndex !== null ? 'Edit Response' : 'Add Chatbot Response'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Question/Keyword</label>
                      <input
                        type="text"
                        value={newResponse.question}
                        onChange={(e) => setNewResponse(prev => ({ ...prev, question: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded text-gray-900"
                        placeholder="e.g., hello, about business, pricing"
                        disabled={editingResponseIndex !== null}
                      />
                      <p className="text-xs text-gray-500 mt-1">User message containing this word will trigger response</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Response</label>
                      <textarea
                        value={newResponse.response}
                        onChange={(e) => setNewResponse(prev => ({ ...prev, response: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded text-gray-900 h-32"
                        placeholder="Enter the bot's response..."
                        rows="4"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleAddResponse}
                    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-medium"
                  >
                    {editingResponseIndex !== null ? 'Update Response' : 'Add Response'}
                  </button>
                  {editingResponseIndex !== null && (
                    <button
                      onClick={() => {
                        setNewResponse({ question: "", response: "" });
                        setEditingResponseIndex(null);
                      }}
                      className="mt-4 ml-2 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded font-medium"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4">Configured Responses ({customResponses.length})</h3>
                  <div className="space-y-4">
                    {customResponses.map((response, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-gray-800">
                              When user asks about: <span className="text-green-600">"{response.question}"</span>
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {response.responses.length} response{response.responses.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditResponse(index)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteResponse(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {response.responses.map((resp, respIndex) => (
                            <div key={respIndex} className="p-3 bg-gray-50 rounded text-sm text-gray-700">
                              {resp}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Main Chat Interface */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Business Info */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center text-white text-3xl font-bold">
                    {businessConfig.name.charAt(0)}
                  </div>
                  <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-800">{businessConfig.name}</h2>
                  <p className="text-gray-600 flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {isOnline ? 'Online • Replies instantly' : 'Offline'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{businessConfig.tagline}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">About {businessConfig.name}</h3>
                <p className="text-gray-600 text-sm">
                  {businessConfig.description}
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.text, action.question)}
                      className="w-full text-left p-3 rounded-lg border border-green-100 bg-green-50 hover:bg-green-100 transition-colors text-sm text-gray-700 hover:text-gray-900"
                    >
                      {action.text}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mt-6 pt-4 border-t border-gray-100">
                <span>Configured Responses: {customResponses.length}</span>
                <div className="flex items-center">
                  <span className="mr-2">Services: {services.length}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-700 mb-3">Services Preview</h3>
              <div className="space-y-3">
                {services.slice(0, 3).map(service => (
                  <div key={service.id} className="p-3 border border-gray-100 rounded-lg">
                    <div className="font-medium text-gray-800">{service.name}</div>
                    <div className="text-green-600 text-sm mt-1">{service.price}</div>
                  </div>
                ))}
                {services.length > 3 && (
                  <p className="text-center text-gray-500 text-sm">
                    +{services.length - 3} more services
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Panel - Chat Interface */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
              {/* Chat Header */}
              <div className="bg-green-600 text-white p-4 flex items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold">
                    {businessConfig.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-bold">{businessConfig.name}</h3>
                    <div className="flex items-center text-sm text-green-100">
                      <div className={`w-2 h-2 rounded-full mr-1 ${isOnline ? 'bg-green-300' : 'bg-gray-300'}`}></div>
                      {isOnline ? 'Online • Typically replies instantly' : 'Offline'}
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex space-x-3">
                  <button 
                    onClick={handleCameraClick}
                    className="p-2 hover:bg-green-700 rounded-full transition-colors"
                    title="Camera"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    onClick={handleEyeClick}
                    className="p-2 hover:bg-green-700 rounded-full transition-colors"
                    title="Toggle Read Receipts"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Chat Messages Area */}
              <div className="flex-grow p-4 bg-gradient-to-b from-gray-50 to-gray-100 overflow-y-auto" style={{ maxHeight: '500px' }}>
                <div className="text-center mb-4">
                  <span className="inline-block bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    Today
                  </span>
                </div>
                
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${message.sender === 'system' ? 'justify-center' : ''}`}
                  >
                    {message.sender === 'system' ? (
                      <div className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                        {message.text}
                      </div>
                    ) : message.type === 'file' ? (
                      <div className="max-w-xs md:max-w-md lg:max-w-lg rounded-2xl p-3 bg-green-100">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-green-700 text-xl">📎</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{message.fileName}</p>
                            <p className="text-xs text-gray-600">{(message.fileSize / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1 text-right">
                          {message.time}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl p-3 whitespace-pre-line ${message.sender === 'user'
                            ? 'bg-green-100 text-gray-800 rounded-br-none'
                            : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                          }`}
                      >
                        <p className="break-words text-gray-900">{message.text}</p>
                        <div className="text-xs text-gray-500 mt-1 text-right">
                          {message.time}
                          {message.sender === 'user' && (
                            <span className="ml-1">
                              {isOnline ? '✓✓' : '✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none shadow-sm p-3">
                      <div className="flex items-center">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <span className="ml-2 text-gray-500 text-sm">{businessConfig.name} AI is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat Input Area */}
              <div className="border-t border-gray-200 p-4 bg-white">
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  multiple
                />
                
                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Emojis</span>
                      <button 
                        onClick={() => setShowEmojiPicker(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => handleEmojiClick(emoji)}
                          className="text-xl hover:bg-gray-200 rounded p-1"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center">
                  {/* Emoji Button */}
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    title="Emoji"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  
                  {/* File Upload Button */}
                  <button 
                    onClick={triggerFileInput}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    title="Attach File"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  
                  {/* Message Input */}
                  <div className="flex-grow mx-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Message ${businessConfig.name}`}
                      className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      style={{ color: '#111827' }}
                    />
                  </div>
                  
                  {/* Send Button */}
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className={`p-3 rounded-full ${inputMessage.trim() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300'} text-white transition-colors`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex justify-center mt-3 text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Configure bot responses in the settings panel above
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center text-gray-500 text-sm">
              <p>✅ <strong>Full UI Configuration:</strong> Edit business details, services, and chatbot responses directly in the interface</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS */}
      <style jsx>{`
        .typing-indicator {
          display: inline-block;
          position: relative;
          width: 60px;
          height: 24px;
        }
        
        .typing-indicator span {
          position: absolute;
          top: 8px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #9ca3af;
          animation-timing-function: cubic-bezier(0, 1, 1, 0);
        }
        
        .typing-indicator span:nth-child(1) {
          left: 8px;
          animation: typing1 0.6s infinite;
        }
        
        .typing-indicator span:nth-child(2) {
          left: 8px;
          animation: typing2 0.6s infinite;
        }
        
        .typing-indicator span:nth-child(3) {
          left: 24px;
          animation: typing2 0.6s infinite;
        }
        
        .typing-indicator span:nth-child(4) {
          left: 40px;
          animation: typing3 0.6s infinite;
        }
        
        @keyframes typing1 {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes typing3 {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }
        
        @keyframes typing2 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(16px, 0);
          }
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c5c5c5;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        /* WhatsApp colors */
        .bg-green-100 {
          background-color: #dcf8c6 !important;
        }
        
        .bg-green-600 {
          background-color: #075e54 !important;
        }
        
        .bg-green-700 {
          background-color: #054d44 !important;
        }
        
        .hover\:bg-green-700:hover {
          background-color: #054d44 !important;
        }
        
        /* Ensure text is visible */
        input[type="text"], textarea {
          color: #111827 !important;
        }
        
        input[type="text"]::placeholder, textarea::placeholder {
          color: #6b7280 !important;
        }
      `}</style>
    </div>
  );
};

export default WhatsAppAIBot;