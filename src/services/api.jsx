// ============================================
// API SERVICE (src/services/api.js)
// ============================================

const API_BASE_URL = 'http://localhost:8000/api';

class WhatsAppAPI {
  
  // Start automation
  async startAutomation(templates) {
    try {
      const response = await fetch(`${API_BASE_URL}/automation/start/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ templates }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to start automation');
      }
      
      return data;
    } catch (error) {
      console.error('Error starting automation:', error);
      throw error;
    }
  }
  
  // Stop automation
  async stopAutomation() {
    try {
      const response = await fetch(`${API_BASE_URL}/automation/stop/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to stop automation');
      }
      
      return data;
    } catch (error) {
      console.error('Error stopping automation:', error);
      throw error;
    }
  }
  
  // Get status and logs
  async getStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/automation/status/`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get status');
      }
      
      return data;
    } catch (error) {
      console.error('Error getting status:', error);
      throw error;
    }
  }
  
  // Poll for status updates
  startPolling(callback, interval = 2000) {
    const pollInterval = setInterval(async () => {
      try {
        const status = await this.getStatus();
        callback(status);
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, interval);
    
    return pollInterval;
  }
  
  stopPolling(pollInterval) {
    if (pollInterval) {
      clearInterval(pollInterval);
    }
  }
}

export default new WhatsAppAPI();

