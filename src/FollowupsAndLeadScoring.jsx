import React, { useState, useEffect } from 'react';

const FollowupsAndLeadScoring = () => {
  // ==================== STATE MANAGEMENT ====================
  const [leads, setLeads] = useState([]);
  const [followups, setFollowups] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [activeTab, setActiveTab] = useState('leads');
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showAddFollowupModal, setShowAddFollowupModal] = useState(false);
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: 'Website',
    status: 'New',
    score: 0,
    notes: '',
    tags: []
  });
  
  const [newFollowup, setNewFollowup] = useState({
    leadId: '',
    type: 'Email',
    scheduledDate: '',
    scheduledTime: '',
    templateId: '',
    notes: '',
    priority: 'Medium'
  });
  
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    type: 'Email',
    subject: '',
    content: '',
    category: 'Follow-up'
  });
  
  const [newTag, setNewTag] = useState('');

  // ==================== INITIAL DATA ====================
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Initial Leads Data
      const initialLeads = [
        {
          id: 1,
          name: 'Rajesh Kumar',
          email: 'rajesh@techcorp.com',
          phone: '+91 9876543210',
          company: 'TechCorp Solutions',
          source: 'LinkedIn',
          status: 'Hot',
          score: 85,
          lastContact: '2024-01-15',
          nextFollowup: '2024-01-17',
          tags: ['Tech', 'Enterprise'],
          notes: 'Interested in enterprise plan. Requested demo.'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          email: 'priya@retailmart.com',
          phone: '+91 9876543211',
          company: 'RetailMart',
          source: 'Website',
          status: 'Warm',
          score: 65,
          lastContact: '2024-01-14',
          nextFollowup: '2024-01-16',
          tags: ['Retail', 'SME'],
          notes: 'Asked for pricing details. Following up tomorrow.'
        },
        {
          id: 3,
          name: 'Amit Patel',
          email: 'amit@startupio.com',
          phone: '+91 9876543212',
          company: 'StartupIO',
          source: 'Referral',
          status: 'New',
          score: 45,
          lastContact: '2024-01-10',
          nextFollowup: '2024-01-18',
          tags: ['Startup', 'Tech'],
          notes: 'Early stage startup. Need basic package.'
        },
        {
          id: 4,
          name: 'Neha Gupta',
          email: 'neha@consulting.co',
          phone: '+91 9876543213',
          company: 'Consulting Pro',
          source: 'Conference',
          status: 'Cold',
          score: 30,
          lastContact: '2024-01-05',
          nextFollowup: '2024-01-25',
          tags: ['Consulting', 'B2B'],
          notes: 'Will contact when budget is approved.'
        },
        {
          id: 5,
          name: 'Vikram Singh',
          email: 'vikram@manufacturing.com',
          phone: '+91 9876543214',
          company: 'ManufacturePro',
          source: 'Website',
          status: 'Hot',
          score: 90,
          lastContact: '2024-01-16',
          nextFollowup: '2024-01-17',
          tags: ['Manufacturing', 'Enterprise'],
          notes: 'Ready for contract signing. High priority.'
        }
      ];
      
      // Initial Followups Data
      const initialFollowups = [
        {
          id: 1,
          leadId: 1,
          leadName: 'Rajesh Kumar',
          type: 'Call',
          status: 'Scheduled',
          scheduledDate: '2024-01-17',
          scheduledTime: '14:00',
          completedDate: '',
          notes: 'Discuss enterprise features',
          priority: 'High'
        },
        {
          id: 2,
          leadId: 2,
          leadName: 'Priya Sharma',
          type: 'Email',
          status: 'Completed',
          scheduledDate: '2024-01-16',
          scheduledTime: '11:00',
          completedDate: '2024-01-16',
          notes: 'Sent pricing details',
          priority: 'Medium'
        },
        {
          id: 3,
          leadId: 5,
          leadName: 'Vikram Singh',
          type: 'Meeting',
          status: 'Scheduled',
          scheduledDate: '2024-01-17',
          scheduledTime: '16:00',
          completedDate: '',
          notes: 'Contract signing',
          priority: 'High'
        },
        {
          id: 4,
          leadId: 3,
          leadName: 'Amit Patel',
          type: 'Email',
          status: 'Scheduled',
          scheduledDate: '2024-01-18',
          scheduledTime: '10:00',
          completedDate: '',
          notes: 'Follow up on demo request',
          priority: 'Low'
        }
      ];
      
      // Initial Templates Data
      const initialTemplates = [
        {
          id: 1,
          name: 'Initial Contact',
          type: 'Email',
          subject: 'Following up on your inquiry',
          content: 'Hi [Name],\n\nThanks for your interest in our services...',
          category: 'Follow-up',
          usageCount: 42
        },
        {
          id: 2,
          name: 'Demo Follow-up',
          type: 'Email',
          subject: 'Demo session follow-up',
          content: 'Hi [Name],\n\nHope you enjoyed the demo...',
          category: 'Follow-up',
          usageCount: 28
        },
        {
          id: 3,
          name: 'Pricing Discussion',
          type: 'Call',
          subject: 'Pricing discussion call',
          content: 'Agenda:\n1. Pricing plans\n2. Custom requirements\n3. Next steps',
          category: 'Sales',
          usageCount: 15
        },
        {
          id: 4,
          name: 'Contract Finalization',
          type: 'Meeting',
          subject: 'Contract signing meeting',
          content: 'Meeting to finalize and sign the contract.',
          category: 'Closing',
          usageCount: 8
        }
      ];
      
      // Calculate Analytics
      const totalLeads = initialLeads.length;
      const hotLeads = initialLeads.filter(lead => lead.status === 'Hot').length;
      const scheduledFollowups = initialFollowups.filter(f => f.status === 'Scheduled').length;
      const avgScore = initialLeads.reduce((sum, lead) => sum + lead.score, 0) / totalLeads;
      
      setLeads(initialLeads);
      setFollowups(initialFollowups);
      setTemplates(initialTemplates);
      setAnalytics({
        totalLeads,
        hotLeads,
        scheduledFollowups,
        avgScore: avgScore.toFixed(1),
        conversionRate: '24%',
        responseRate: '68%'
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  // ==================== LEAD SCORING CALCULATION ====================
  const calculateLeadScore = (lead) => {
    let score = 0;
    
    // Engagement scoring
    if (lead.lastContact) {
      const daysSinceContact = Math.floor((new Date() - new Date(lead.lastContact)) / (1000 * 60 * 60 * 24));
      if (daysSinceContact < 7) score += 20;
      else if (daysSinceContact < 14) score += 10;
    }
    
    // Source scoring
    const sourceScores = {
      'Referral': 25,
      'LinkedIn': 20,
      'Website': 15,
      'Conference': 10,
      'Other': 5
    };
    score += sourceScores[lead.source] || 5;
    
    // Company size scoring (simplified)
    if (lead.company?.toLowerCase().includes('enterprise') || lead.company?.toLowerCase().includes('corp')) {
      score += 30;
    } else if (lead.company?.toLowerCase().includes('inc') || lead.company?.toLowerCase().includes('ltd')) {
      score += 20;
    } else {
      score += 10;
    }
    
    // Status-based scoring
    const statusScores = {
      'Hot': 40,
      'Warm': 20,
      'New': 10,
      'Cold': 0
    };
    score += statusScores[lead.status] || 0;
    
    return Math.min(100, score);
  };

  // ==================== HANDLERS ====================
  const handleAddLead = () => {
    if (!newLead.name || !newLead.email) return;
    
    const score = calculateLeadScore(newLead);
    const newLeadObj = {
      ...newLead,
      id: leads.length + 1,
      score,
      lastContact: new Date().toISOString().split('T')[0],
      nextFollowup: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    
    setLeads([...leads, newLeadObj]);
    setShowAddLeadModal(false);
    setNewLead({
      name: '',
      email: '',
      phone: '',
      company: '',
      source: 'Website',
      status: 'New',
      score: 0,
      notes: '',
      tags: []
    });
  };

  const handleAddFollowup = () => {
    if (!newFollowup.leadId || !newFollowup.scheduledDate) return;
    
    const lead = leads.find(l => l.id === parseInt(newFollowup.leadId));
    const newFollowupObj = {
      ...newFollowup,
      id: followups.length + 1,
      leadName: lead?.name || 'Unknown Lead',
      status: 'Scheduled'
    };
    
    setFollowups([...followups, newFollowupObj]);
    
    // Update lead's next followup date
    setLeads(leads.map(lead => 
      lead.id === parseInt(newFollowup.leadId) 
        ? { ...lead, nextFollowup: newFollowup.scheduledDate }
        : lead
    ));
    
    setShowAddFollowupModal(false);
    setNewFollowup({
      leadId: '',
      type: 'Email',
      scheduledDate: '',
      scheduledTime: '',
      templateId: '',
      notes: '',
      priority: 'Medium'
    });
  };

  const handleAddTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) return;
    
    const newTemplateObj = {
      ...newTemplate,
      id: templates.length + 1,
      usageCount: 0
    };
    
    setTemplates([...templates, newTemplateObj]);
    setShowAddTemplateModal(false);
    setNewTemplate({
      name: '',
      type: 'Email',
      subject: '',
      content: '',
      category: 'Follow-up'
    });
  };

  const handleUpdateLeadStatus = (id, newStatus) => {
    setLeads(leads.map(lead => 
      lead.id === id 
        ? { ...lead, status: newStatus, score: calculateLeadScore({ ...lead, status: newStatus }) }
        : lead
    ));
  };

  const handleCompleteFollowup = (id) => {
    setFollowups(followups.map(followup => 
      followup.id === id 
        ? { 
            ...followup, 
            status: 'Completed',
            completedDate: new Date().toISOString().split('T')[0]
          }
        : followup
    ));
  };

  const handleAddTag = () => {
    if (newTag.trim() && selectedLead) {
      setLeads(leads.map(lead => 
        lead.id === selectedLead.id 
          ? { ...lead, tags: [...lead.tags, newTag.trim()] }
          : lead
      ));
      setNewTag('');
    }
  };

  const handleRemoveTag = (leadId, tagToRemove) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, tags: lead.tags.filter(tag => tag !== tagToRemove) }
        : lead
    ));
  };

  const handleUpdateScore = (id, newScore) => {
    setLeads(leads.map(lead => 
      lead.id === id 
        ? { ...lead, score: Math.min(100, Math.max(0, newScore)) }
        : lead
    ));
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Hot': return 'bg-red-100 text-red-800';
      case 'Warm': return 'bg-yellow-100 text-yellow-800';
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Cold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // ==================== RENDER FUNCTIONS ====================
  const renderLeads = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Lead Management</h2>
          <p className="text-gray-600 mt-1">Track and score your leads</p>
        </div>
        <button 
          onClick={() => setShowAddLeadModal(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
        >
          <span className="mr-2">+</span> Add New Lead
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search leads by name, company, email or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                style={{ color: '#111827' }}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
            <option>All Status</option>
            <option>Hot</option>
            <option>Warm</option>
            <option>New</option>
            <option>Cold</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
            <option>Sort by Score</option>
            <option>Sort by Name</option>
            <option>Sort by Company</option>
          </select>
        </div>
      </div>

      {/* Leads Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading leads...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLeads.map(lead => (
            <div key={lead.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{lead.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-gray-600">{lead.company}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-gray-600">{lead.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                    <button 
                      onClick={() => setSelectedLead(lead)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ⋮
                    </button>
                  </div>
                </div>

                {/* Lead Score */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Lead Score</span>
                    <span className="text-lg font-bold text-gray-800">{lead.score}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        lead.score >= 80 ? 'bg-red-500' :
                        lead.score >= 60 ? 'bg-yellow-500' :
                        lead.score >= 40 ? 'bg-blue-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${lead.score}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Cold</span>
                    <span>Warm</span>
                    <span>Hot</span>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium text-gray-800">{lead.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Source</div>
                    <div className="font-medium text-gray-800">{lead.source}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Last Contact</div>
                    <div className="font-medium text-gray-800">{lead.lastContact}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Next Follow-up</div>
                    <div className="font-medium text-gray-800">{lead.nextFollowup}</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {lead.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                        {tag}
                        <button 
                          onClick={() => handleRemoveTag(lead.id, tag)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <button 
                      onClick={() => {
                        setSelectedLead(lead);
                        document.getElementById('tagInput')?.focus();
                      }}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                      + Add Tag
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      setNewFollowup({...newFollowup, leadId: lead.id});
                      setShowAddFollowupModal(true);
                    }}
                    className="flex-1 py-2 px-4 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200"
                  >
                    Schedule Follow-up
                  </button>
                  <div className="relative">
                    <select
                      value={lead.status}
                      onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                      className="py-2 px-4 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 appearance-none pr-8"
                    >
                      <option value="Hot">Hot</option>
                      <option value="Warm">Warm</option>
                      <option value="New">New</option>
                      <option value="Cold">Cold</option>
                    </select>
                    <div className="absolute right-2 top-2.5 pointer-events-none">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Notes Preview */}
                {lead.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Notes</div>
                    <div className="text-sm text-gray-700 truncate">{lead.notes}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderFollowups = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Follow-up Management</h2>
          <p className="text-gray-600 mt-1">Schedule and track your follow-ups</p>
        </div>
        <button 
          onClick={() => setShowAddFollowupModal(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
        >
          <span className="mr-2">+</span> Schedule Follow-up
        </button>
      </div>

      {/* Follow-up Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Today's Follow-ups</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">
            {followups.filter(f => f.scheduledDate === new Date().toISOString().split('T')[0]).length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Scheduled</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">
            {followups.filter(f => f.status === 'Scheduled').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Completed</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">
            {followups.filter(f => f.status === 'Completed').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">Overdue</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">
            {followups.filter(f => f.status === 'Scheduled' && new Date(f.scheduledDate) < new Date()).length}
          </div>
        </div>
      </div>

      {/* Follow-ups Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Lead</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Type</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Scheduled</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Priority</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Notes</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {followups.map(followup => (
                <tr key={followup.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-800">{followup.leadName}</div>
                    <div className="text-sm text-gray-500">Lead #{followup.leadId}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      followup.type === 'Call' ? 'bg-blue-100 text-blue-800' :
                      followup.type === 'Email' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {followup.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      followup.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      followup.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {followup.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-800">{followup.scheduledDate}</div>
                    <div className="text-sm text-gray-500">{followup.scheduledTime}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(followup.priority)}`}>
                      {followup.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700 truncate max-w-xs">{followup.notes}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      {followup.status === 'Scheduled' && (
                        <button 
                          onClick={() => handleCompleteFollowup(followup.id)}
                          className="text-green-600 hover:text-green-700 font-medium"
                        >
                          Complete
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Reschedule
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Follow-up Templates</h2>
          <p className="text-gray-600 mt-1">Create and manage reusable templates</p>
        </div>
        <button 
          onClick={() => setShowAddTemplateModal(true)}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
        >
          <span className="mr-2">+</span> New Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map(template => (
          <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-800">{template.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`text-sm font-medium ${
                      template.type === 'Email' ? 'text-green-600' :
                      template.type === 'Call' ? 'text-blue-600' :
                      'text-purple-600'
                    }`}>
                      {template.type}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{template.category}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Used {template.usageCount} times</span>
              </div>
              
              {template.subject && (
                <div className="mb-3">
                  <div className="text-sm text-gray-500">Subject</div>
                  <div className="font-medium text-gray-800">{template.subject}</div>
                </div>
              )}
              
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Content</div>
                <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-line max-h-32 overflow-y-auto">
                  {template.content}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 py-2 px-4 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200">
                  Use Template
                </button>
                <button className="flex-1 py-2 px-4 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Lead Scoring Analytics</h2>
        <p className="text-gray-600 mt-1">Track performance and optimize your scoring</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Leads</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{analytics.totalLeads}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Hot Leads</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{analytics.hotLeads}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl">🔥</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Lead Score</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{analytics.avgScore}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Scheduled Follow-ups</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{analytics.scheduledFollowups}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-xl">📅</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{analytics.conversionRate}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">📈</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Response Rate</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{analytics.responseRate}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 text-xl">💬</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Distribution Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Lead Distribution by Score</h3>
        <div className="space-y-4">
          {[
            { label: 'Hot (80-100)', count: leads.filter(l => l.score >= 80).length, color: 'bg-red-500' },
            { label: 'Warm (60-79)', count: leads.filter(l => l.score >= 60 && l.score < 80).length, color: 'bg-yellow-500' },
            { label: 'Engaged (40-59)', count: leads.filter(l => l.score >= 40 && l.score < 60).length, color: 'bg-blue-500' },
            { label: 'Cold (0-39)', count: leads.filter(l => l.score < 40).length, color: 'bg-gray-400' }
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-32 text-sm text-gray-700">{item.label}</div>
              <div className="flex-1 ml-4">
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${item.color}`}
                      style={{ width: `${(item.count / leads.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="ml-4 text-sm font-medium text-gray-800">{item.count} leads</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-xl">🎯</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Follow-ups & Lead Scoring</h1>
                <p className="text-gray-600 text-sm">Track, score, and follow up with your leads</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium">
                Export Data
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex overflow-x-auto">
            {['leads', 'followups', 'templates', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Input Modal (if lead selected) */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Add Tag to {selectedLead.name}</h2>
                  <button 
                    onClick={() => setSelectedLead(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      id="tagInput"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      placeholder="Enter tag name..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      style={{ color: '#111827' }}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddTag}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700"
                    >
                      Add Tag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div>
          {activeTab === 'leads' && renderLeads()}
          {activeTab === 'followups' && renderFollowups()}
          {activeTab === 'templates' && renderTemplates()}
          {activeTab === 'analytics' && renderAnalytics()}
        </div>
      </main>

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New Lead</h2>
                <button 
                  onClick={() => setShowAddLeadModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newLead.name}
                      onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="John Doe"
                      style={{ color: '#111827' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={newLead.email}
                      onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="john@company.com"
                      style={{ color: '#111827' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={newLead.phone}
                      onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="+91 9876543210"
                      style={{ color: '#111827' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={newLead.company}
                      onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="Company Name"
                      style={{ color: '#111827' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Source
                    </label>
                    <select
                      value={newLead.source}
                      onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      style={{ color: '#111827' }}
                    >
                      <option value="Website">Website</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Referral">Referral</option>
                      <option value="Conference">Conference</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Status
                    </label>
                    <select
                      value={newLead.status}
                      onChange={(e) => setNewLead({...newLead, status: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      style={{ color: '#111827' }}
                    >
                      <option value="New">New</option>
                      <option value="Warm">Warm</option>
                      <option value="Hot">Hot</option>
                      <option value="Cold">Cold</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Manual Score (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newLead.score}
                      onChange={(e) => setNewLead({...newLead, score: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      style={{ color: '#111827' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={newLead.notes}
                    onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 h-32"
                    placeholder="Add notes about this lead..."
                    rows="4"
                    style={{ color: '#111827' }}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowAddLeadModal(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddLead}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700"
                  >
                    Add Lead
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Follow-up Modal */}
      {showAddFollowupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Schedule Follow-up</h2>
                <button 
                  onClick={() => setShowAddFollowupModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Lead *
                  </label>
                  <select
                    value={newFollowup.leadId}
                    onChange={(e) => setNewFollowup({...newFollowup, leadId: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    style={{ color: '#111827' }}
                  >
                    <option value="">Choose a lead...</option>
                    {leads.map(lead => (
                      <option key={lead.id} value={lead.id}>{lead.name} - {lead.company}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Follow-up Type
                    </label>
                    <select
                      value={newFollowup.type}
                      onChange={(e) => setNewFollowup({...newFollowup, type: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      style={{ color: '#111827' }}
                    >
                      <option value="Email">Email</option>
                      <option value="Call">Phone Call</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Message">Message</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={newFollowup.priority}
                      onChange={(e) => setNewFollowup({...newFollowup, priority: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      style={{ color: '#111827' }}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={newFollowup.scheduledDate}
                      onChange={(e) => setNewFollowup({...newFollowup, scheduledDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      style={{ color: '#111827' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={newFollowup.scheduledTime}
                      onChange={(e) => setNewFollowup({...newFollowup, scheduledTime: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      style={{ color: '#111827' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Use Template (Optional)
                  </label>
                  <select
                    value={newFollowup.templateId}
                    onChange={(e) => setNewFollowup({...newFollowup, templateId: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    style={{ color: '#111827' }}
                  >
                    <option value="">Select a template...</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>{template.name} ({template.type})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={newFollowup.notes}
                    onChange={(e) => setNewFollowup({...newFollowup, notes: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 h-32"
                    placeholder="Add notes about this follow-up..."
                    rows="4"
                    style={{ color: '#111827' }}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowAddFollowupModal(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddFollowup}
                    disabled={!newFollowup.leadId || !newFollowup.scheduledDate}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      !newFollowup.leadId || !newFollowup.scheduledDate
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                    }`}
                  >
                    Schedule Follow-up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Template Modal */}
      {showAddTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Create New Template</h2>
                <button 
                  onClick={() => setShowAddTemplateModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template Name *
                    </label>
                    <input
                      type="text"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="e.g., Demo Follow-up"
                      style={{ color: '#111827' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={newTemplate.type}
                      onChange={(e) => setNewTemplate({...newTemplate, type: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      style={{ color: '#111827' }}
                    >
                      <option value="Email">Email</option>
                      <option value="Call">Phone Call Script</option>
                      <option value="Meeting">Meeting Agenda</option>
                      <option value="Message">Message Template</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newTemplate.category}
                      onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      style={{ color: '#111827' }}
                    >
                      <option value="Follow-up">Follow-up</option>
                      <option value="Sales">Sales</option>
                      <option value="Onboarding">Onboarding</option>
                      <option value="Closing">Closing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject (for Email)
                    </label>
                    <input
                      type="text"
                      value={newTemplate.subject}
                      onChange={(e) => setNewTemplate({...newTemplate, subject: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="Email subject line..."
                      style={{ color: '#111827' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 h-48"
                    placeholder="Enter your template content here. Use [Name] for personalization."
                    rows="8"
                    style={{ color: '#111827' }}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Use [Name] for lead's name, [Company] for company name
                  </p>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowAddTemplateModal(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTemplate}
                    disabled={!newTemplate.name || !newTemplate.content}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      !newTemplate.name || !newTemplate.content
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
                    }`}
                  >
                    Create Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for text visibility */}
      <style jsx>{`
        /* Ensure all text is visible */
        input, select, textarea {
          color: #111827 !important;
        }
        
        input::placeholder, select::placeholder, textarea::placeholder {
          color: #6b7280 !important;
        }
        
        /* Ensure modal text is visible */
        .text-gray-900 {
          color: #111827 !important;
        }
        
        /* Fix for select dropdown text */
        select option {
          color: #111827;
          background: white;
        }
        
        /* Ensure table text is visible */
        .text-gray-800 {
          color: #1f2937 !important;
        }
        
        .text-gray-700 {
          color: #374151 !important;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </div>
  );
};

export default FollowupsAndLeadScoring;