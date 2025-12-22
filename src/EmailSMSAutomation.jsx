import React, { useState, useEffect } from 'react';

const EmailSMSAutomation = () => {
  // ==================== STATE MANAGEMENT ====================
  const [activeTab, setActiveTab] = useState('dashboard');
  const [automations, setAutomations] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewContent, setPreviewContent] = useState({});
  const [newAutomation, setNewAutomation] = useState({
    name: '',
    type: 'email',
    trigger: 'welcome',
    audience: 'all',
    schedule: 'immediate',
    status: 'draft'
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // ==================== INITIAL DATA ====================
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAutomations([
        {
          id: 1,
          name: 'Welcome Email Series',
          type: 'email',
          status: 'active',
          trigger: 'user_signup',
          sent: 1250,
          openRate: 78,
          clickRate: 32,
          lastRun: '2024-01-15',
          nextRun: '2024-01-16'
        },
        {
          id: 2,
          name: 'Abandoned Cart SMS',
          type: 'sms',
          status: 'active',
          trigger: 'cart_abandoned',
          sent: 845,
          openRate: 92,
          clickRate: 28,
          lastRun: '2024-01-14',
          nextRun: '2024-01-15'
        },
        {
          id: 3,
          name: 'Weekly Newsletter',
          type: 'email',
          status: 'paused',
          trigger: 'weekly',
          sent: 3200,
          openRate: 65,
          clickRate: 18,
          lastRun: '2024-01-10',
          nextRun: '2024-01-17'
        },
        {
          id: 4,
          name: 'Order Confirmation',
          type: 'email',
          status: 'active',
          trigger: 'order_placed',
          sent: 2150,
          openRate: 95,
          clickRate: 45,
          lastRun: '2024-01-15',
          nextRun: 'Immediate'
        },
        {
          id: 5,
          name: 'Birthday SMS',
          type: 'sms',
          status: 'draft',
          trigger: 'birthday',
          sent: 0,
          openRate: 0,
          clickRate: 0,
          lastRun: 'Never',
          nextRun: '2024-01-25'
        }
      ]);

      setTemplates([
        {
          id: 1,
          name: 'Welcome Email',
          type: 'email',
          category: 'Onboarding',
          lastEdited: '2024-01-10',
          usage: 1250
        },
        {
          id: 2,
          name: 'Order Confirmation',
          type: 'email',
          category: 'Transactional',
          lastEdited: '2024-01-12',
          usage: 2150
        },
        {
          id: 3,
          name: 'Cart Reminder',
          type: 'sms',
          category: 'Marketing',
          lastEdited: '2024-01-08',
          usage: 845
        },
        {
          id: 4,
          name: 'Newsletter Template',
          type: 'email',
          category: 'Newsletter',
          lastEdited: '2024-01-05',
          usage: 3200
        }
      ]);

      setContacts([
        { id: 1, email: 'john@example.com', phone: '+1-234-567-8901', status: 'active', lastActive: 'Today' },
        { id: 2, email: 'sarah@business.com', phone: '+1-234-567-8902', status: 'active', lastActive: 'Yesterday' },
        { id: 3, email: 'mike@company.org', phone: '+1-234-567-8903', status: 'unsubscribed', lastActive: '2 days ago' },
        { id: 4, email: 'lisa@startup.io', phone: '+1-234-567-8904', status: 'active', lastActive: 'Today' },
        { id: 5, email: 'david@enterprise.com', phone: '+1-234-567-8905', status: 'active', lastActive: 'Yesterday' }
      ]);

      setAnalytics({
        totalSent: 7445,
        openRate: 78.5,
        clickRate: 28.3,
        bounceRate: 2.1,
        unsubscribeRate: 0.8,
        revenueGenerated: 45250,
        topPerforming: 'Welcome Email Series'
      });

      setLoading(false);
    }, 1000);
  }, []);

  // ==================== HANDLERS ====================
  const handleCreateAutomation = () => {
    const newAuto = {
      ...newAutomation,
      id: automations.length + 1,
      sent: 0,
      openRate: 0,
      clickRate: 0,
      lastRun: 'Never'
    };
    setAutomations([...automations, newAuto]);
    setShowCreateModal(false);
    setNewAutomation({
      name: '',
      type: 'email',
      trigger: 'welcome',
      audience: 'all',
      schedule: 'immediate',
      status: 'draft'
    });
  };

  const handleToggleStatus = (id) => {
    setAutomations(automations.map(auto => 
      auto.id === id 
        ? { ...auto, status: auto.status === 'active' ? 'paused' : 'active' }
        : auto
    ));
  };

  const handleDeleteAutomation = (id) => {
    setAutomations(automations.filter(auto => auto.id !== id));
  };

  const handlePreview = (content) => {
    setPreviewContent(content);
    setShowPreviewModal(true);
  };

  const filteredAutomations = automations.filter(auto =>
    auto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auto.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ==================== RENDER FUNCTIONS ====================
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sent</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{analytics.totalSent?.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">📨</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <span>↑ 12.5%</span>
              <span className="mx-1">•</span>
              <span>vs last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Open Rate</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{analytics.openRate}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">👁️</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <span>↑ 3.2%</span>
              <span className="mx-1">•</span>
              <span>vs last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Click Rate</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{analytics.clickRate}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">🔗</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <span>↑ 1.8%</span>
              <span className="mx-1">•</span>
              <span>vs last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Revenue Generated</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">${analytics.revenueGenerated?.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-xl">💰</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <span>↑ 24.7%</span>
              <span className="mx-1">•</span>
              <span>vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 text-sm">📧</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Welcome Email Sent</p>
                  <p className="text-sm text-gray-500">To 125 new users</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm">📱</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">SMS Campaign Completed</p>
                  <p className="text-sm text-gray-500">845 messages delivered</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 text-sm">📊</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Weekly Report Generated</p>
                  <p className="text-sm text-gray-500">Performance analytics ready</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">✨</span>
                <span className="font-medium">Create New Automation</span>
              </div>
              <span>→</span>
            </button>
            <button 
              onClick={() => handlePreview({type: 'email', name: 'New Template'})}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">📝</span>
                <span className="font-medium">Create Template</span>
              </div>
              <span>→</span>
            </button>
            <button 
              onClick={() => setActiveTab('contacts')}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all"
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">👥</span>
                <span className="font-medium">Import Contacts</span>
              </div>
              <span>→</span>
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">📈</span>
                <span className="font-medium">View Reports</span>
              </div>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Performing Automations */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Top Performing Automations</h3>
          <button 
            onClick={() => setActiveTab('automations')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Sent</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Open Rate</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Click Rate</th>
              </tr>
            </thead>
            <tbody>
              {automations.slice(0, 3).map(auto => (
                <tr key={auto.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-800">{auto.name}</div>
                    <div className="text-sm text-gray-500">Trigger: {auto.trigger.replace('_', ' ')}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${auto.type === 'email' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {auto.type === 'email' ? '📧 Email' : '📱 SMS'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${auto.status === 'active' ? 'bg-green-100 text-green-800' : auto.status === 'paused' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                      {auto.status.charAt(0).toUpperCase() + auto.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-800">{auto.sent.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-800 mr-2">{auto.openRate}%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${auto.openRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-800 mr-2">{auto.clickRate}%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${auto.clickRate}%` }}
                        ></div>
                      </div>
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

  const renderAutomations = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Automation Workflows</h2>
          <p className="text-gray-600 mt-1">Create and manage your email & SMS automation sequences</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
        >
          <span className="mr-2">+</span> Create Automation
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search automations..."
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
            <option>All Types</option>
            <option>Email</option>
            <option>SMS</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900">
            <option>All Status</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      {/* Automations Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading automations...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAutomations.map(auto => (
            <div key={auto.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{auto.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className={`text-sm font-medium ${auto.type === 'email' ? 'text-blue-600' : 'text-green-600'}`}>
                        {auto.type === 'email' ? '📧 Email' : '📱 SMS'}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">Trigger: {auto.trigger.replace('_', ' ')}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <button className="text-gray-400 hover:text-gray-600">
                      ⋮
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{auto.sent.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Sent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{auto.openRate}%</div>
                    <div className="text-xs text-gray-500">Open Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{auto.clickRate}%</div>
                    <div className="text-xs text-gray-500">Click Rate</div>
                  </div>
                </div>

                {/* Schedule Info */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Run:</span>
                    <span className="font-medium text-gray-800">{auto.lastRun}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Next Run:</span>
                    <span className="font-medium text-gray-800">{auto.nextRun}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleToggleStatus(auto.id)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium ${auto.status === 'active' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                  >
                    {auto.status === 'active' ? 'Pause' : 'Activate'}
                  </button>
                  <button 
                    onClick={() => handlePreview(auto)}
                    className="flex-1 py-2 px-4 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200"
                  >
                    Preview
                  </button>
                  <button 
                    onClick={() => handleDeleteAutomation(auto.id)}
                    className="py-2 px-4 bg-red-100 text-red-800 rounded-lg font-medium hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Email & SMS Templates</h2>
          <p className="text-gray-600 mt-1">Create and manage reusable templates</p>
        </div>
        <button 
          onClick={() => handlePreview({type: 'email', name: 'New Template'})}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
        >
          <span className="mr-2">+</span> New Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-800">{template.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`text-sm font-medium ${template.type === 'email' ? 'text-blue-600' : 'text-green-600'}`}>
                      {template.type === 'email' ? '📧 Email' : '📱 SMS'}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{template.category}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Used {template.usage.toLocaleString()} times</span>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Last Edited</div>
                <div className="font-medium text-gray-800">{template.lastEdited}</div>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => handlePreview(template)}
                  className="flex-1 py-2 px-4 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200"
                >
                  Edit
                </button>
                <button className="flex-1 py-2 px-4 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200">
                  Duplicate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Contacts</h2>
          <p className="text-gray-600 mt-1">Manage your audience and segments</p>
        </div>
        <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center">
          <span className="mr-2">+</span> Import Contacts
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Email</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Phone</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Last Active</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-800">{contact.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-600">{contact.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${contact.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{contact.lastActive}</td>
                  <td className="py-4 px-6">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Analytics & Reports</h2>
        <p className="text-gray-600 mt-1">Track performance and generate insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Overview</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-gray-600">Performance chart would appear here</p>
                <p className="text-sm text-gray-500 mt-1">Open Rate: {analytics.openRate}% • Click Rate: {analytics.clickRate}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-500">Top Performing</div>
              <div className="font-medium text-gray-800">{analytics.topPerforming}</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-500">Bounce Rate</div>
              <div className="font-medium text-gray-800">{analytics.bounceRate}%</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-sm text-gray-500">Unsubscribe Rate</div>
              <div className="font-medium text-gray-800">{analytics.unsubscribeRate}%</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-500">Avg. Engagement</div>
              <div className="font-medium text-gray-800">High</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
            <div className="text-2xl mb-2">📥</div>
            <div className="font-medium text-gray-800">Daily Report</div>
            <div className="text-sm text-gray-500 mt-1">Export today's metrics</div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-center">
            <div className="text-2xl mb-2">📈</div>
            <div className="font-medium text-gray-800">Weekly Report</div>
            <div className="text-sm text-gray-500 mt-1">Last 7 days performance</div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-center">
            <div className="text-2xl mb-2">📋</div>
            <div className="font-medium text-gray-800">Custom Report</div>
            <div className="text-sm text-gray-500 mt-1">Select date range & metrics</div>
          </button>
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
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-xl">✉️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Email/SMS Automation</h1>
                <p className="text-gray-600 text-sm">Automate your marketing communications</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium">
                Support
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                A
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
            {['dashboard', 'automations', 'templates', 'contacts', 'analytics'].map((tab) => (
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

        {/* Content Area */}
        <div>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'automations' && renderAutomations()}
          {activeTab === 'templates' && renderTemplates()}
          {activeTab === 'contacts' && renderContacts()}
          {activeTab === 'analytics' && renderAnalytics()}
        </div>
      </main>

      {/* Create Automation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Create New Automation</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Automation Name
                  </label>
                  <input
                    type="text"
                    value={newAutomation.name}
                    onChange={(e) => setNewAutomation({...newAutomation, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="e.g., Welcome Email Series"
                    style={{ color: '#111827' }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={newAutomation.type}
                      onChange={(e) => setNewAutomation({...newAutomation, type: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      style={{ color: '#111827' }}
                    >
                      <option value="email">📧 Email</option>
                      <option value="sms">📱 SMS</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trigger
                    </label>
                    <select
                      value={newAutomation.trigger}
                      onChange={(e) => setNewAutomation({...newAutomation, trigger: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      style={{ color: '#111827' }}
                    >
                      <option value="welcome">Welcome</option>
                      <option value="user_signup">User Signup</option>
                      <option value="order_placed">Order Placed</option>
                      <option value="cart_abandoned">Cart Abandoned</option>
                      <option value="birthday">Birthday</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audience
                  </label>
                  <select
                    value={newAutomation.audience}
                    onChange={(e) => setNewAutomation({...newAutomation, audience: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    style={{ color: '#111827' }}
                  >
                    <option value="all">All Contacts</option>
                    <option value="active">Active Users</option>
                    <option value="new">New Subscribers</option>
                    <option value="premium">Premium Users</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule
                  </label>
                  <select
                    value={newAutomation.schedule}
                    onChange={(e) => setNewAutomation({...newAutomation, schedule: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    style={{ color: '#111827' }}
                  >
                    <option value="immediate">Immediate</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="custom">Custom Schedule</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateAutomation}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700"
                  >
                    Create Automation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Preview</h2>
                <button 
                  onClick={() => setShowPreviewModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <div className="max-w-lg mx-auto">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <div className="text-sm text-gray-500">Subject:</div>
                      <div className="font-medium text-gray-800">Welcome to Our Platform!</div>
                    </div>
                    
                    <div className="space-y-4 text-gray-800">
                      <p>Hi [Name],</p>
                      <p>Welcome to our platform! We're excited to have you on board.</p>
                      <p>Here are some things you can do to get started:</p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-800">
                        <li>Complete your profile</li>
                        <li>Explore our features</li>
                        <li>Connect with other users</li>
                      </ul>
                      <div className="my-6">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                          Get Started
                        </button>
                      </div>
                      <p>Best regards,<br/>The Team</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700">
                  Edit Template
                </button>
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
        
        input::placeholder, select::placeholder {
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
      `}</style>
    </div>
  );
};

export default EmailSMSAutomation;