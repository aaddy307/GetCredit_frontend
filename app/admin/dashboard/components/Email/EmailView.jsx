"use client";
import { useState } from "react";
import { Send, Mail, Users, FileText, LayoutTemplate } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

const MONTH_TENURE_LOANS = ['Personal Loan', 'Non-Salaried Loan', 'Business Loan'];

const templates = [
  { id: 'blank', label: 'Blank Email', desc: 'Start from scratch' },
  { id: 'enquiry', label: 'Enquiry Acknowledgment', desc: 'Confirm receipt of loan enquiry' },
  { id: 'emi-followup', label: 'EMI Follow-up', desc: 'Follow up on EMI calculator lead' },
  { id: 'approval', label: 'Loan Approval', desc: 'Notify customer of loan approval' },
  { id: 'callback', label: 'Callback Confirmation', desc: 'Confirm callback request received' },
];

const loanTypes = [
  'Home Loan', 'Loan Against Property', 'Education Loan',
  'Personal Loan', 'Business Loan', 'Vehicle Loan', 'Non-Salaried Loan'
];

function getTemplateBody(templateId, loanType, tenure, tenureUnit) {
  const name = "{Customer Name}";
  const unit = tenureUnit || (MONTH_TENURE_LOANS.includes(loanType) ? 'Months' : 'Years');

  const templatesMap = {
    enquiry: `Dear ${name},

Thank you for reaching out to Get Credit regarding your ${loanType || "loan"} enquiry.

We have received your application and one of our dedicated loan experts will review your details shortly. You can expect to hear from us within 24 hours.

Enquiry Summary:
• Loan Type: ${loanType || "—"}
• Tenure: ${tenure || "—"} ${unit}
• Status: Under Review

If you have any questions in the meantime, please don't hesitate to reach out to us.

Warm regards,
The Get Credit Team`,
    'emi-followup': `Dear ${name},

Thank you for using the Get Credit EMI Calculator to plan your ${loanType || "loan"}.

Based on your calculation:
• Loan Type: ${loanType || "—"}
• Tenure: ${tenure || "—"} ${unit}
• Monthly EMI: As calculated

Our team is ready to help you take the next step. We can assist with documentation, provide current interest rates, and guide you through the approval process.

Please reply to this email or call us to schedule a callback at your convenience.

Best regards,
The Get Credit Team`,
    approval: `Dear ${name},

Congratulations! We are pleased to inform you that your ${loanType || "loan"} application has been approved.

Approved Details:
• Loan Type: ${loanType || "—"}
• Tenure: ${tenure || "—"} ${unit}

Our relationship manager will contact you shortly to discuss the next steps, including documentation and disbursement.

Welcome to the Get Credit family!

Warm regards,
The Get Credit Team`,
    callback: `Dear ${name},

Thank you for requesting a callback from Get Credit regarding your ${loanType || "loan"} enquiry.

We have received your request and one of our loan experts will call you within the next 24 hours. Our team is ready to assist you with personalized loan solutions tailored to your needs.

If your situation is urgent, please feel free to contact us directly.

Best regards,
The Get Credit Team`,
    blank: ''
  };

  return templatesMap[templateId] || '';
}

function getTenureUnit(loanType) {
  return MONTH_TENURE_LOANS.includes(loanType) ? 'Months' : 'Years';
}

export default function EmailView() {
  const [activeTab, setActiveTab] = useState('compose');
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [tenure, setTenure] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setShowTemplates(false);
    if (templateId !== 'blank') {
      const tenureUnit = getTenureUnit(selectedLoanType);
      setBody(getTemplateBody(templateId, selectedLoanType, tenure, tenureUnit));
      if (!subject) {
        const subjects = {
          enquiry: `Enquiry Acknowledgment – ${selectedLoanType || 'Loan'} – Get Credit`,
          'emi-followup': `Follow-up on Your EMI Calculation – Get Credit`,
          approval: `Your ${selectedLoanType || 'Loan'} Has Been Approved – Get Credit`,
          callback: `Callback Request Confirmed – Get Credit`,
        };
        setSubject(subjects[templateId] || '');
      }
    } else {
      setBody('');
    }
  };

  const handleLoanTypeChange = (loanType) => {
    setSelectedLoanType(loanType);
    if (selectedTemplate !== 'blank' && body) {
      const tenureUnit = getTenureUnit(loanType);
      setBody(getTemplateBody(selectedTemplate, loanType, tenure, tenureUnit));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!to.trim() || !subject.trim() || !body.trim()) {
      toast.error("All fields are required");
      return;
    }

    setSending(true);
    try {
      const res = await api.post('/admin/email/send', {
        to: to.split(',').map(e => e.trim()).filter(Boolean),
        subject,
        body: body.replace(/\n/g, '<br>'),
      });
      const data = res.data;
      if (data.success) {
        toast.success(data.message);
        setTo("");
        setSubject("");
        setBody("");
        setSelectedTemplate('blank');
        setSelectedLoanType('');
        setTenure('');
      } else {
        toast.error(data.message || "Failed to send email");
      }
    } catch (error) {
      toast.error("Network error. Could not send email.");
    }
    setSending(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Logo.jpeg"
          alt="Get Credit – Loan Consultancy Logo"
          className="w-12 h-12 rounded-xl object-cover shadow-sm ring-2 ring-[#C9A84C]/20"
        />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Email</h1>
          <p className="text-sm text-gray-500">Compose and send branded emails to your customers</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <button
                onClick={() => { setActiveTab('compose'); setShowTemplates(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'compose'
                    ? 'bg-gradient-to-r from-[#C9A84C]/10 to-[#E5C76B]/10 text-[#8B7A2E] border border-[#C9A84C]/30'
                    : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  activeTab === 'compose' ? 'bg-[#C9A84C] text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  <Send className="w-4 h-4" />
                </div>
                <span>Compose Email</span>
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <LayoutTemplate className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Templates</span>
              </div>
              <div className="space-y-1">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => handleTemplateSelect(tpl.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
                      selectedTemplate === tpl.id
                        ? 'bg-[#C9A84C]/10 text-[#8B7A2E] font-medium border border-[#C9A84C]/20'
                        : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="font-medium">{tpl.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{tpl.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {selectedTemplate !== 'blank' && (
              <div className="px-6 pt-5 pb-3 bg-gradient-to-r from-[#C9A84C]/5 to-[#E5C76B]/5 border-b border-[#C9A84C]/10">
                <div className="flex items-center gap-2 text-sm text-[#8B7A2E] font-medium">
                  <FileText className="w-4 h-4" />
                  <span>Template: {templates.find(t => t.id === selectedTemplate)?.label}</span>
                </div>
                <div className="mt-3 flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Loan Type</label>
                    <select
                      value={selectedLoanType}
                      onChange={(e) => handleLoanTypeChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20 bg-white"
                    >
                      <option value="">Select loan type</option>
                      {loanTypes.map(lt => (
                        <option key={lt} value={lt}>{lt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:w-40">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Tenure ({getTenureUnit(selectedLoanType)})</label>
                    <input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                      min="1"
                      max={getTenureUnit(selectedLoanType) === 'Months' ? 84 : 30}
                      placeholder={getTenureUnit(selectedLoanType) === 'Months' ? 'e.g. 60' : 'e.g. 20'}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Users className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                    To <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="customer@example.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20 transition-colors text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1">Separate multiple recipients with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Mail className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter email subject"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20 transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message Body <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={14}
                  placeholder={selectedTemplate === 'blank' ? "Write your email message here..." : "Customize the template content above..."}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20 transition-colors text-sm resize-y font-mono leading-relaxed"
                />
                <p className="text-xs text-gray-400 mt-1">Use {`{Customer Name}`} as a placeholder — it will be sent as-is.</p>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Logo.jpeg" alt="Get Credit – Loan Consultancy Logo" className="w-5 h-5 rounded object-cover" />
                <span>Sent from <strong className="text-gray-600">support@get-credit.in</strong></span>
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#C9A84C] to-[#B8943D] text-white rounded-xl font-medium text-sm hover:from-[#B8943D] hover:to-[#A8892A] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {sending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {sending ? 'Sending...' : 'Send Email'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
