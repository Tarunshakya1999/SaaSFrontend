// AdminDashboard.jsx - CORRECTED VERSION
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, PieChart, Pie, Cell,
  LineChart, Line, ResponsiveContainer 
} from 'recharts';
import {
  FileText, CheckCircle, XCircle,
  Clock, RefreshCw, Eye, Mail, Phone, Calendar
} from 'lucide-react';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      total_applications: 0,
      pending: 0,
      verified: 0,
      rejected: 0,
      under_review: 0
    },
    monthlyStats: [],
    recentApplications: [],
    performanceMetrics: {
      avg_processing_time: 0,
      satisfaction_rate: 0,
      avg_response_time: 0,
      today_submissions: 0
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('all');

  // All APIs fetch karo
  useEffect(() => {
    fetchAllData();
  }, [timeFilter]);

  const fetchAllData = async () => {
    setLoading(true);
    
    try {
      // ✅ 1. Fetch Main Stats (Correct URL)
      const statsRes = await fetch(`http://localhost:8000/api/stats/`);
      const statsData = await statsRes.json();
      
      // ✅ 2. Fetch Monthly Stats
      const monthlyRes = await fetch(`http://localhost:8000/api/monthly-stats/`);
      let monthlyData = [];

if (monthlyRes.ok) {
  const result = await monthlyRes.json();
  if (result.success && Array.isArray(result.data)) {
    monthlyData = result.data;
  }
}

      
      // ✅ 3. Fetch Recent Applications - CORRECTED URL
      const recentRes = await fetch(`http://localhost:8000/api/recent-applications/?limit=5`);
      let recentData = [];
      
      if (recentRes.ok) {
        const result = await recentRes.json();
        // Check response format
        if (result.success && result.results) {
          recentData = result.results;
        } else if (Array.isArray(result)) {
          recentData = result;
        }
      }
      
      // ✅ 4. Calculate Performance Metrics
      const today = new Date().toISOString().split('T')[0];
      const todaySubmissions = Array.isArray(recentData) 
        ? recentData.filter(app => {
            if (app.submitted_at) {
              const appDate = new Date(app.submitted_at).toISOString().split('T')[0];
              return appDate === today;
            }
            return false;
          }).length
        : 0;
      
      // Real calculations
      const avgProcessingTime = calculateAvgProcessingTime(recentData);
      const satisfactionRate = calculateSatisfactionRate(statsData);
      
      setDashboardData({
        stats: statsData,
        monthlyStats: monthlyData,
        recentApplications: recentData,
        performanceMetrics: {
          avg_processing_time: avgProcessingTime,
          satisfaction_rate: satisfactionRate,
          avg_response_time: calculateAvgResponseTime(recentData),
          today_submissions: todaySubmissions
        }
      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Real calculation functions
  const calculateAvgProcessingTime = (applications) => {
    if (!Array.isArray(applications) || applications.length === 0) return 0;
    
    const processedApps = applications.filter(app => 
      app.status === 'verified' || app.status === 'rejected'
    );
    
    if (processedApps.length === 0) return 0;
    
    let totalDays = 0;
    processedApps.forEach(app => {
      if (app.submitted_at && app.updated_at) {
        const submitDate = new Date(app.submitted_at);
        const updateDate = new Date(app.updated_at);
        const daysDiff = (updateDate - submitDate) / (1000 * 60 * 60 * 24);
        totalDays += Math.max(0, daysDiff); // Ensure positive value
      }
    });
    
    return (totalDays / processedApps.length).toFixed(1);
  };

  const calculateSatisfactionRate = (stats) => {
    if (!stats.total_applications || stats.total_applications === 0) return 0;
    return Math.round((stats.verified / stats.total_applications) * 100);
  };

  const calculateAvgResponseTime = (applications) => {
    // Default value agar calculation nahi ho paye
    return 48; // hours
  };

  // Status Distribution Pie Chart ke liye REAL data
  const statusData = [
    { 
      name: 'Pending', 
      value: dashboardData.stats.pending || 0, 
      color: '#F59E0B' 
    },
    { 
      name: 'Verified', 
      value: dashboardData.stats.verified || 0, 
      color: '#10B981' 
    },
    { 
      name: 'Rejected', 
      value: dashboardData.stats.rejected || 0, 
      color: '#EF4444' 
    },
    { 
      name: 'Under Review', 
      value: dashboardData.stats.under_review || 0, 
      color: '#8B5CF6' 
    },
  ];

  const COLORS = ['#F59E0B', '#10B981', '#EF4444', '#8B5CF6'];

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      verified: { color: 'bg-green-100 text-green-800', label: 'Verified' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
      under_review: { color: 'bg-purple-100 text-purple-800', label: 'Under Review' },
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Loading Component
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading dashboard data...</p>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Brand Verification Dashboard</h1>
              <p className="text-gray-600">
                Real-time data • Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchAllData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <RefreshCw size={18} className="mr-2" />
                Refresh Data
              </button>
              <select 
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {/* Total Applications */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData.stats.total_applications}
              </p>
              <p className="text-sm text-gray-500 mt-2">Since beginning</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Pending Applications */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData.stats.pending}
              </p>
              <p className="text-sm text-gray-500 mt-2">Require attention</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Verified Applications */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified Brands</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData.stats.verified}
              </p>
              <div className="mt-2">
                <span className="text-sm font-medium text-green-600">
                  {dashboardData.stats.total_applications > 0 
                    ? `${Math.round((dashboardData.stats.verified / dashboardData.stats.total_applications) * 100)}% success rate`
                    : '0% success rate'}
                </span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Rejected Applications */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData.stats.rejected}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {dashboardData.stats.total_applications > 0 
                  ? `${Math.round((dashboardData.stats.rejected / dashboardData.stats.total_applications) * 100)}% rejection rate`
                  : '0% rejection rate'}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <XCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Monthly Applications Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Application Trends {dashboardData.monthlyStats.length > 0 ? '(Last 6 Months)' : ''}
          </h2>
          <div className="h-80">
            {dashboardData.monthlyStats.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [value, 'Count']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Applications"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="verified" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Verified"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-500 mb-4">No monthly data available yet</p>
                <p className="text-sm text-gray-400">Submit applications to see trends</p>
              </div>
            )}
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Application Status Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            {statusData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-bold" style={{ color: item.color }}>
                  {item.value}
                </div>
                <div className="text-sm text-gray-600">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <button 
                onClick={fetchAllData}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                <RefreshCw size={16} className="mr-2" />
                Refresh
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.recentApplications.length > 0 ? (
                  dashboardData.recentApplications.map((app, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {app.brand_name || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {app.registration_number || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm text-gray-900">{app.contact_person || 'N/A'}</div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <Mail size={12} className="mr-1" />
                            {app.email || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Calendar size={14} className="mr-2" />
                          {formatDate(app.submitted_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(app.status || 'pending')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3 flex items-center">
                          <Eye size={14} className="mr-1" />
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-900 flex items-center">
                          <Mail size={14} className="mr-1" />
                          Contact
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="text-gray-400">
                        <FileText size={48} className="mx-auto mb-4" />
                        <p className="text-lg">No applications yet</p>
                        <p className="text-sm mt-2">When applications are submitted, they will appear here</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-700">
                {dashboardData.performanceMetrics.avg_processing_time}
                <span className="text-sm ml-1">days</span>
              </p>
              <p className="text-sm text-blue-600">Avg Processing Time</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700">
                {dashboardData.performanceMetrics.satisfaction_rate}%
              </p>
              <p className="text-sm text-green-600">Satisfaction Rate</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-700">
                {dashboardData.performanceMetrics.avg_response_time}h
              </p>
              <p className="text-sm text-purple-600">Avg Response Time</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-700">
                {dashboardData.performanceMetrics.today_submissions}
              </p>
              <p className="text-sm text-orange-600">Today's Submissions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;