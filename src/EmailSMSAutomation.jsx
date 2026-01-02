import { useState, useEffect } from "react";
import axios from "axios";
import {
  Mail,
  MessageSquare,
  Send,
  Calendar,
  Users,
  Sparkles,
  Zap,
  CheckCircle,
  Plus,
  Trash2,
  Clock,
  Save,
  FolderPlus,
  Edit,
  X,
  Type,
} from "lucide-react";

export default function EmailSMSAutomation() {
  const [title, setTitle] = useState("");
  const [channel, setChannel] = useState("email");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [scheduleTimes, setScheduleTimes] = useState([""]);
  const [contacts, setContacts] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // Template Management States
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [smsTemplates, setSmsTemplates] = useState([]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [showManageTemplates, setShowManageTemplates] = useState(false);

  // Load templates from localStorage on component mount
  useEffect(() => {
    const savedEmailTemplates = localStorage.getItem("emailTemplates");
    const savedSmsTemplates = localStorage.getItem("smsTemplates");

    if (savedEmailTemplates) {
      setEmailTemplates(JSON.parse(savedEmailTemplates));
    } else {
      // Default templates
      const defaultEmailTemplates = [
        {
          id: Date.now() + 1,
          name: "Welcome Email",
          subject: "Welcome to Our Service!",
          message:
            "Hi {name},\n\nWelcome to our platform! We're excited to have you onboard.",
        },
        {
          id: Date.now() + 2,
          name: "Promotional Email",
          subject: "Special Offer Just for You!",
          message:
            "Dear customer,\n\nDon't miss out on our exclusive offer! Get 50% off on your first purchase.",
        },
        {
          id: Date.now() + 3,
          name: "Newsletter",
          subject: "Monthly Updates & News",
          message:
            "Hello,\n\nHere are this month's updates and exciting news from our team.",
        },
      ];
      setEmailTemplates(defaultEmailTemplates);
      localStorage.setItem(
        "emailTemplates",
        JSON.stringify(defaultEmailTemplates)
      );
    }

    if (savedSmsTemplates) {
      setSmsTemplates(JSON.parse(savedSmsTemplates));
    } else {
      // Default templates
      const defaultSmsTemplates = [
        {
          id: Date.now() + 4,
          name: "Welcome SMS",
          message:
            "Welcome to our service! We're glad to have you. Reply HELP for assistance.",
        },
        {
          id: Date.now() + 5,
          name: "Promotional SMS",
          message:
            "FLASH SALE! Get 50% OFF today only. Use code: FLASH50. Shop now!",
        },
        {
          id: Date.now() + 6,
          name: "Alert SMS",
          message:
            "Important alert: Your order has been shipped. Track here: {link}",
        },
      ];
      setSmsTemplates(defaultSmsTemplates);
      localStorage.setItem("smsTemplates", JSON.stringify(defaultSmsTemplates));
    }
  }, []);

  const templates = channel === "email" ? emailTemplates : smsTemplates;

  // Template Management Functions
  const saveTemplatesToLocalStorage = () => {
    localStorage.setItem("emailTemplates", JSON.stringify(emailTemplates));
    localStorage.setItem("smsTemplates", JSON.stringify(smsTemplates));
  };

  const saveCurrentAsTemplate = () => {
    if (!templateName.trim()) {
      alert("Please enter a template name");
      return;
    }

    const newTemplate = {
      id: editingTemplate ? editingTemplate.id : Date.now(),
      name: templateName,
      subject: channel === "email" ? subject : "",
      message: message,
    };

    if (channel === "email") {
      if (editingTemplate) {
        setEmailTemplates((prev) =>
          prev.map((t) => (t.id === editingTemplate.id ? newTemplate : t))
        );
      } else {
        setEmailTemplates((prev) => [...prev, newTemplate]);
      }
      saveTemplatesToLocalStorage();
    } else {
      if (editingTemplate) {
        setSmsTemplates((prev) =>
          prev.map((t) => (t.id === editingTemplate.id ? newTemplate : t))
        );
      } else {
        setSmsTemplates((prev) => [...prev, newTemplate]);
      }
      saveTemplatesToLocalStorage();
    }

    setShowTemplateModal(false);
    setTemplateName("");
    setEditingTemplate(null);
    alert(`Template "${templateName}" saved successfully!`);
  };

  const deleteTemplate = (templateId) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      if (channel === "email") {
        setEmailTemplates((prev) => prev.filter((t) => t.id !== templateId));
      } else {
        setSmsTemplates((prev) => prev.filter((t) => t.id !== templateId));
      }
      saveTemplatesToLocalStorage();
    }
  };

  const editTemplate = (template) => {
    setTemplateName(template.name);
    if (channel === "email") {
      setSubject(template.subject || "");
    }
    setMessage(template.message);
    setEditingTemplate(template);
    setShowTemplateModal(true);
  };

  const openNewTemplateModal = () => {
    setTemplateName("");
    setEditingTemplate(null);
    setShowTemplateModal(true);
  };

  const applyTemplate = (template) => {
    setSelectedTemplate(template.id);
    if (channel === "email") {
      setSubject(template.subject || "");
    }
    setMessage(template.message);
  };

  // Schedule Time Functions
  const addScheduleTime = () => {
    setScheduleTimes([...scheduleTimes, ""]);
  };

  const removeScheduleTime = (index) => {
    const newTimes = scheduleTimes.filter((_, i) => i !== index);
    setScheduleTimes(newTimes);
  };

  const updateScheduleTime = (index, value) => {
    const newTimes = [...scheduleTimes];
    newTimes[index] = value;
    setScheduleTimes(newTimes);
  };
  const submit = async () => {
    const validScheduleTimes = scheduleTimes.filter((t) => t);

    if (validScheduleTimes.length === 0) {
      alert("Please add at least one schedule time!");
      return;
    }

    try {
      setIsSubmitting(true);
      const contactsList = contacts.split(",").map((c) => c.trim());
      
      // Create campaign for EACH schedule time
      const promises = validScheduleTimes.map((scheduleTime, index) => {
        const payload = {
          title: `${title} (Schedule #${index + 1})`,
          channel,
          subject,
          message,
          schedule_time: scheduleTime,
          contacts: contactsList,
        };

        return axios.post(
          "http://127.0.0.1:8000/api/campaign/",
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
      });

      // Wait for all campaigns to be created
      await Promise.all(promises);
      
      console.log(`✅ ${validScheduleTimes.length} campaigns scheduled!`);
      setShowSuccess(true);
      
      // Auto-hide success after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Campaign failed ❌\n" + (err.response?.data?.error || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 sm:p-8 relative overflow-hidden">
      {/* Animated floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-400 rounded-full opacity-15 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400 rounded-full opacity-20 animate-float-slow"></div>
        <div className="absolute top-1/2 right-10 w-64 h-64 bg-green-400 rounded-full opacity-15 animate-float"></div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 animate-fade-down">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl mb-6 shadow-2xl animate-bounce-slow">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-3 tracking-tight">
            Campaign<span className="text-yellow-400"> Automation</span>
          </h1>
          <p className="text-xl text-purple-200">
            Launch powerful email & SMS campaigns in seconds
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8 animate-slide-up-fade border-4 border-purple-200">
          {/* Campaign Title */}
          <div className="space-y-3 animate-fade-in">
            <label className="flex items-center gap-3 text-lg font-bold text-gray-800">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Send className="w-5 h-5 text-white" />
              </div>
              Campaign Title
            </label>
            <input
              className="w-full px-5 py-4 text-lg rounded-2xl border-3 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition-all duration-300 bg-gradient-to-r from-blue-50 to-cyan-50 text-gray-900 placeholder-gray-500 font-medium shadow-inner"
              placeholder="My Awesome Campaign"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Channel Selection */}
          <div className="space-y-3 animate-fade-in animation-delay-100">
            <label className="flex items-center gap-3 text-lg font-bold text-gray-800">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              Choose Channel
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setChannel("email");
                  setSelectedTemplate("");
                }}
                className={`group relative p-6 rounded-2xl border-4 transition-all duration-300 flex flex-col items-center justify-center gap-3 font-bold text-lg overflow-hidden ${
                  channel === "email"
                    ? "border-blue-500 bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-2xl scale-105"
                    : "border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:border-blue-400 hover:shadow-xl hover:scale-105"
                }`}
              >
                <Mail className="w-8 h-8" />
                <span>Email</span>
                {channel === "email" && (
                  <div className="absolute inset-0 bg-white opacity-20 animate-pulse-glow"></div>
                )}
              </button>
              <button
                onClick={() => {
                  setChannel("sms");
                  setSelectedTemplate("");
                }}
                className={`group relative p-6 rounded-2xl border-4 transition-all duration-300 flex flex-col items-center justify-center gap-3 font-bold text-lg overflow-hidden ${
                  channel === "sms"
                    ? "border-green-500 bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-2xl scale-105"
                    : "border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:border-green-400 hover:shadow-xl hover:scale-105"
                }`}
              >
                <MessageSquare className="w-8 h-8" />
                <span>SMS</span>
                {channel === "sms" && (
                  <div className="absolute inset-0 bg-white opacity-20 animate-pulse-glow"></div>
                )}
              </button>
            </div>
          </div>

          {/* Template Section */}
          <div className="space-y-3 animate-fade-in animation-delay-150">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 text-lg font-bold text-gray-800">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                Templates ({templates.length} available)
              </label>
              <div className="flex gap-2">
                <button
                  onClick={openNewTemplateModal}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                >
                  <FolderPlus className="w-4 h-4" />
                  Save Current as Template
                </button>
                <button
                  onClick={() => setShowManageTemplates(!showManageTemplates)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                >
                  <Type className="w-4 h-4" />
                  {showManageTemplates ? "Hide" : "Manage"} Templates
                </button>
              </div>
            </div>

            {/* Template List */}
            {templates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`group relative p-4 rounded-xl border-3 transition-all duration-300 ${
                      selectedTemplate === template.id
                        ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-gray-800">
                        {template.name}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => editTemplate(template)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit Template"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTemplate(template.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Delete Template"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {channel === "email"
                        ? `Subject: ${template.subject || "No Subject"}`
                        : template.message.substring(0, 60) + "..."}
                    </div>
                    <button
                      onClick={() => applyTemplate(template)}
                      className="w-full py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-lg font-medium hover:from-purple-200 hover:to-pink-200 transition-all duration-300"
                    >
                      Use This Template
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border-3 border-dashed border-gray-300 rounded-2xl">
                <FolderPlus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">
                  No templates found. Create your first template!
                </p>
                <button
                  onClick={openNewTemplateModal}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  Create Template
                </button>
              </div>
            )}

            {/* Manage Templates View */}
            {showManageTemplates && templates.length > 0 && (
              <div className="mt-6 p-4 border-2 border-gray-200 rounded-2xl">
                <h3 className="font-bold text-lg text-gray-800 mb-4">
                  Manage Templates ({templates.length})
                </h3>
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-800">
                          {template.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {channel === "email"
                            ? `Subject: ${template.subject || "No Subject"}`
                            : template.message.substring(0, 80) + "..."}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editTemplate(template)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTemplate(template.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Email Subject (conditional) */}
          {channel === "email" && (
            <div className="space-y-3 animate-scale-in">
              <label className="flex items-center gap-3 text-lg font-bold text-gray-800">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                Email Subject
              </label>
              <input
                className="w-full px-5 py-4 text-lg rounded-2xl border-3 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-300 bg-gradient-to-r from-purple-50 to-pink-50 text-gray-900 placeholder-gray-500 font-medium shadow-inner"
                placeholder="Don't miss this amazing offer!"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          )}

          {/* Message */}
          <div className="space-y-3 animate-fade-in animation-delay-200">
            <label className="flex items-center gap-3 text-lg font-bold text-gray-800">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              Your Message
            </label>
            <textarea
              className="w-full px-5 py-4 text-lg rounded-2xl border-3 border-gray-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200 outline-none transition-all duration-300 bg-gradient-to-r from-pink-50 to-rose-50 text-gray-900 placeholder-gray-500 font-medium resize-none shadow-inner"
              rows="6"
              placeholder="Write your compelling message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Recipients */}
          <div className="space-y-3 animate-fade-in animation-delay-300">
            <label className="flex items-center gap-3 text-lg font-bold text-gray-800">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              Recipients (comma separated)
            </label>
            <textarea
              className="w-full px-5 py-4 text-lg rounded-2xl border-3 border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 outline-none transition-all duration-300 bg-gradient-to-r from-orange-50 to-yellow-50 text-gray-900 placeholder-gray-500 font-medium resize-none shadow-inner"
              rows="4"
              placeholder={
                channel === "email"
                  ? "john@example.com, jane@example.com, bob@example.com"
                  : "+1234567890, +0987654321, +1122334455"
              }
              value={contacts}
              onChange={(e) => setContacts(e.target.value)}
            />
          </div>

          {/* Multiple Schedule Times */}
          <div className="space-y-3 animate-fade-in animation-delay-400">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 text-lg font-bold text-gray-800">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                Schedule Times (Multiple)
              </label>
              <button
                onClick={addScheduleTime}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
                Add Time
              </button>
            </div>

            {scheduleTimes.map((time, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <Clock className="w-5 h-5" />
                  <span>Time #{index + 1}</span>
                </div>
                <input
                  type="datetime-local"
                  className="flex-1 px-5 py-4 text-lg rounded-2xl border-3 border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-200 outline-none transition-all duration-300 bg-gradient-to-r from-teal-50 to-cyan-50 text-gray-900 font-medium shadow-inner"
                  value={time}
                  onChange={(e) => updateScheduleTime(index, e.target.value)}
                />
                {scheduleTimes.length > 1 && (
                  <button
                    onClick={() => removeScheduleTime(index)}
                    className="p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            {scheduleTimes.length > 0 &&
              scheduleTimes.every((t) => t.trim() === "") && (
                <div className="text-amber-600 bg-amber-50 p-3 rounded-xl border-2 border-amber-200">
                  ⚠️ Please add at least one schedule time
                </div>
              )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in animation-delay-500">
            <button
              onClick={openNewTemplateModal}
              className="relative overflow-hidden group bg-gradient-to-r from-gray-600 to-gray-800 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-4 border-white"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Save className="w-5 h-5" />
                Save as Template
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={submit}
              disabled={isSubmitting}
              className="relative overflow-hidden group bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-5 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 border-4 border-white"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Scheduling Campaigns...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Schedule Campaigns (
                    {scheduleTimes.filter((t) => t.trim() !== "").length} times)
                    <Send className="w-6 h-6" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {!isSubmitting && (
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-scale-in border-4 border-purple-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-gray-800">
                {editingTemplate ? "Edit Template" : "Save as Template"}
              </h3>
              <button
                onClick={() => {
                  setShowTemplateModal(false);
                  setTemplateName("");
                  setEditingTemplate(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-xl"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full px-4 py-3 text-lg rounded-2xl border-3 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-300 bg-gradient-to-r from-purple-50 to-pink-50"
                  placeholder="Enter template name"
                />
              </div>

              {channel === "email" && (
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 text-lg rounded-2xl border-3 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-300 bg-gradient-to-r from-purple-50 to-pink-50"
                    placeholder="Email subject"
                  />
                </div>
              )}

              <div>
                <label className="block text-lg font-bold text-gray-800 mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 text-lg rounded-2xl border-3 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-300 bg-gradient-to-r from-purple-50 to-pink-50 resize-none"
                  placeholder="Message content"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowTemplateModal(false);
                    setTemplateName("");
                    setEditingTemplate(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCurrentAsTemplate}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingTemplate ? "Update Template" : "Save Template"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-8 right-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-6 rounded-3xl shadow-2xl flex items-center gap-4 animate-bounce-in z-50 border-4 border-white">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center animate-spin-slow">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <p className="font-black text-xl">Campaigns Scheduled!</p>
            <p className="text-lg text-green-100">
              {scheduleTimes.filter((t) => t.trim() !== "").length} schedule(s)
              created 🚀
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-25px, 25px) rotate(-120deg);
          }
          66% {
            transform: translate(25px, -25px) rotate(-240deg);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(15px, -15px) scale(1.1);
          }
        }

        @keyframes fade-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up-fade {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: translateX(100px) scale(0.5);
          }
          50% {
            transform: translateX(-10px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-fade-down {
          animation: fade-down 0.8s ease-out;
        }
        .animate-slide-up-fade {
          animation: slide-up-fade 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-150 {
          animation-delay: 0.15s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
