// ============================================
// COMPLETE REACT COMPONENT WITH FULL UI
// ============================================

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Settings, Trash2, Edit2, Play, Square, Monitor, CheckCircle, AlertCircle } from 'lucide-react';

// API Service inline (ya separate file me rakh sakte ho)
const API_BASE_URL = 'http://localhost:8000/api';

const WhatsAppAPI = {
  async startAutomation(templates) {
    const response = await fetch(`${API_BASE_URL}/automation/start/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templates }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to start');
    return data;
  },
  
  async stopAutomation() {
    const response = await fetch(`${API_BASE_URL}/automation/stop/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to stop');
    return data;
  },
  
  async getStatus() {
    const response = await fetch(`${API_BASE_URL}/automation/status/`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to get status');
    return data;
  },
  
  startPolling(callback, interval = 2000) {
    return setInterval(async () => {
      try {
        const status = await this.getStatus();
        callback(status);
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, interval);
  },
  
  stopPolling(pollInterval) {
    if (pollInterval) clearInterval(pollInterval);
  }
};

export default function WhatsAppAIBot() {
  const [templates, setTemplates] = useState([]);
  const [newTrigger, setNewTrigger] = useState('');
  const [newResponse, setNewResponse] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [screenPermission, setScreenPermission] = useState('not_requested');
  const [logs, setLogs] = useState([]);
  const [backendConnected, setBackendConnected] = useState(false);
  const pollIntervalRef = useRef(null);

  // Check backend connection on mount
  useEffect(() => {
    checkBackendConnection();
  }, []);

  // Load templates from storage
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const result = await window.storage.get('whatsapp-templates');
        if (result) {
          setTemplates(JSON.parse(result.value));
        }
      } catch (error) {
        console.log('No existing templates');
      }
    };
    loadTemplates();
  }, []);

  // Save templates to storage
  const saveTemplates = async (updatedTemplates) => {
    try {
      await window.storage.set('whatsapp-templates', JSON.stringify(updatedTemplates));
    } catch (error) {
      console.error('Failed to save templates:', error);
    }
  };

  // Check if Django backend is running
  const checkBackendConnection = async () => {
    try {
      await WhatsAppAPI.getStatus();
      setBackendConnected(true);
      addLog('✅ Backend connected successfully');
    } catch (error) {
      setBackendConnected(false);
      addLog('❌ Backend not connected. Make sure Django server is running on port 8000');
    }
  };

  const requestScreenPermission = async () => {
    setScreenPermission('requesting');
    addLog('Screen capture permission request...');
    
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' }
      });
      
      stream.getTracks().forEach(track => track.stop());
      setScreenPermission('granted');
      addLog('✅ Screen capture permission granted!');
      return true;
    } catch (error) {
      setScreenPermission('denied');
      addLog('❌ Screen capture permission denied');
      return false;
    }
  };

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString('en-IN');
    setLogs(prev => [...prev, { time: timestamp, message }].slice(-20));
  };

  const addTemplate = () => {
    if (newTrigger.trim() && newResponse.trim()) {
      const newTemplate = {
        id: Date.now(),
        trigger: newTrigger.trim(),
        response: newResponse.trim(),
        active: true
      };
      const updated = [...templates, newTemplate];
      setTemplates(updated);
      saveTemplates(updated);
      setNewTrigger('');
      setNewResponse('');
      addLog(`Template added: "${newTrigger}" → "${newResponse}"`);
    }
  };

  const deleteTemplate = (id) => {
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated);
    saveTemplates(updated);
    addLog('Template deleted');
  };

  const startEditing = (template) => {
    setEditingId(template.id);
    setNewTrigger(template.trigger);
    setNewResponse(template.response);
  };

  const saveEdit = () => {
    const updated = templates.map(t => 
      t.id === editingId 
        ? { ...t, trigger: newTrigger, response: newResponse }
        : t
    );
    setTemplates(updated);
    saveTemplates(updated);
    setEditingId(null);
    setNewTrigger('');
    setNewResponse('');
    addLog('Template updated');
  };

  const toggleActive = (id) => {
    const updated = templates.map(t => 
      t.id === id ? { ...t, active: !t.active } : t
    );
    setTemplates(updated);
    saveTemplates(updated);
  };

  const startAutomation = async () => {
    if (!backendConnected) {
      alert('Django backend running nahi hai! Pehle backend start karo.');
      return;
    }

    if (screenPermission !== 'granted') {
      const granted = await requestScreenPermission();
      if (!granted) {
        alert('Screen permission zaroori hai automation ke liye!');
        return;
      }
    }

    if (templates.filter(t => t.active).length === 0) {
      alert('Koi active template nahi hai! Pehle templates add karo.');
      return;
    }

    try {
      addLog('🚀 Starting automation...');
      
      // Send templates to backend
      await WhatsAppAPI.startAutomation(templates.filter(t => t.active));
      
      setIsRunning(true);
      addLog('✅ Automation started on backend');
      
      // Start polling for logs
      pollIntervalRef.current = WhatsAppAPI.startPolling((status) => {
        if (status.logs && status.logs.length > 0) {
          setLogs(status.logs);
        }
        setIsRunning(status.is_running);
      });
      
    } catch (error) {
      addLog(`❌ Error: ${error.message}`);
      alert('Automation start karne me error: ' + error.message);
    }
  };

  const stopAutomation = async () => {
    try {
      addLog('⏹️ Stopping automation...');
      
      await WhatsAppAPI.stopAutomation();
      
      setIsRunning(false);
      addLog('✅ Automation stopped');
      
      // Stop polling
      if (pollIntervalRef.current) {
        WhatsAppAPI.stopPolling(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      
    } catch (error) {
      addLog(`❌ Error: ${error.message}`);
      alert('Automation stop karne me error: ' + error.message);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        WhatsAppAPI.stopPolling(pollIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Backend Status Banner */}
        {!backendConnected && (
          <div className="bg-red-100 border-2 border-red-400 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="text-red-600" size={24} />
            <div className="flex-1">
              <p className="font-bold text-red-800">Backend Not Connected</p>
              <p className="text-sm text-red-700">
                Django server http://localhost:8000 par running nahi hai.
                Terminal me <code className="bg-red-200 px-2 py-1 rounded">python manage.py runserver</code> run karo.
              </p>
            </div>
            <button
              onClick={checkBackendConnection}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-3 rounded-xl">
                <MessageSquare className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">WhatsApp Automation</h1>
                <p className="text-gray-600">
                  Auto-reply system with Django + Selenium backend
                  {backendConnected && (
                    <span className="ml-2 text-green-600 font-semibold">● Connected</span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              {!isRunning ? (
                <button
                  onClick={startAutomation}
                  disabled={!backendConnected}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                    backendConnected
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Play size={20} />
                  Start Automation
                </button>
              ) : (
                <button
                  onClick={stopAutomation}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  <Square size={20} />
                  Stop
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Template Management */}
          <div className="space-y-6">
            {/* Screen Permission Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="text-blue-500" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Screen Permission</h2>
              </div>
              
              <div className="space-y-3">
                {screenPermission === 'not_requested' && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <AlertCircle className="text-gray-400" size={24} />
                    <div>
                      <p className="font-medium text-gray-700">Permission Required</p>
                      <p className="text-sm text-gray-500">Screen read karne ke liye permission chahiye</p>
                    </div>
                  </div>
                )}
                
                {screenPermission === 'requesting' && (
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <p className="font-medium text-blue-700">Permission request pending...</p>
                  </div>
                )}
                
                {screenPermission === 'granted' && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                    <CheckCircle className="text-green-500" size={24} />
                    <div>
                      <p className="font-medium text-green-700">Permission Granted ✅</p>
                      <p className="text-sm text-green-600">Screen read kar sakte hain</p>
                    </div>
                  </div>
                )}
                
                {screenPermission === 'denied' && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl">
                    <AlertCircle className="text-red-500" size={24} />
                    <div>
                      <p className="font-medium text-red-700">Permission Denied</p>
                      <p className="text-sm text-red-600">Automation ke liye permission zaroori hai</p>
                      <button
                        onClick={requestScreenPermission}
                        className="mt-2 text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Request Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Add/Edit Template */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="text-purple-500" size={24} />
                <h2 className="text-xl font-bold text-gray-800">
                  {editingId ? 'Edit Template' : 'Add New Template'}
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trigger Message (jab yeh aaye)
                  </label>
                  <input
                    type="text"
                    value={newTrigger}
                    onChange={(e) => setNewTrigger(e.target.value)}
                    placeholder="e.g., hi, hello, hey"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auto Response (yeh reply bhejo)
                  </label>
                  <textarea
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    placeholder="e.g., Hello! Kaise madad kar sakta hoon?"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                  />
                </div>
                
                <button
                  onClick={editingId ? saveEdit : addTemplate}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 rounded-xl font-semibold transition-all"
                >
                  {editingId ? 'Update Template' : 'Add Template'}
                </button>
                
                {editingId && (
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setNewTrigger('');
                      setNewResponse('');
                    }}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Templates List & Logs */}
          <div className="space-y-6">
            {/* Templates List */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Active Templates ({templates.length})</h2>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {templates.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <MessageSquare size={48} className="mx-auto mb-3 opacity-50" />
                    <p>Abhi koi template nahi hai</p>
                    <p className="text-sm">Pehla template add karo!</p>
                  </div>
                ) : (
                  templates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        template.active 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-700">
                            Trigger: <span className="text-blue-600">{template.trigger}</span>
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Response: {template.response}
                          </p>
                        </div>
                        
                        <div className="flex gap-2 ml-3">
                          <button
                            onClick={() => toggleActive(template.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              template.active 
                                ? 'bg-green-500 hover:bg-green-600' 
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            title={template.active ? 'Active' : 'Inactive'}
                          >
                            <CheckCircle size={16} className="text-white" />
                          </button>
                          
                          <button
                            onClick={() => startEditing(template)}
                            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} className="text-white" />
                          </button>
                          
                          <button
                            onClick={() => deleteTemplate(template.id)}
                            className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} className="text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Activity Logs */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Activity Logs</h2>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-center text-gray-400 py-4">No activity yet</p>
                ) : (
                  logs.map((log, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg text-sm">
                      <span className="text-gray-500 font-mono">{log.time}</span>
                      <span className="text-gray-700">{log.message}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Complete automation ke liye Django backend aur Selenium Python code running hona chahiye. 
            Make sure Django server port 8000 par chal raha hai.
          </p>
        </div>
      </div>
    </div>
  );
}