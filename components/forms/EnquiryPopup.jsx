"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { X, Home, GraduationCap, Building2, User, Phone, Mail, MapPin, Calculator, Briefcase, Car, Wallet } from "lucide-react";
import { api } from "@/lib/api";

const loanTypes = [
  { id: "home", label: "Home Loan", icon: Home },
  { id: "education", label: "Education Loan", icon: GraduationCap },
  { id: "lap", label: "Loan Against Property", icon: Building2 },
  { id: "personal", label: "Personal Loan", icon: Wallet },
  { id: "business", label: "Business Loan", icon: Briefcase },
  { id: "vehicle", label: "Vehicle Loan", icon: Car },
];

const propertyTypesHome = [
  { value: "Ready to Move", label: "Ready to Move" },
  { value: "Under Construction", label: "Under Construction" },
  { value: "Plot + Construction", label: "Plot + Construction" },
  { value: "Resale", label: "Resale" },
];

const propertyTypesLAP = [
  { value: "Residential", label: "Residential", ltv: 80 },
  { value: "Commercial", label: "Commercial", ltv: 75 },
  { value: "Industrial", label: "Industrial", ltv: 75 },
  { value: "Plot", label: "Plot", ltv: 50 },
];

const employmentTypes = [
  { value: "Salaried", label: "Salaried" },
  { value: "Self-Employed", label: "Self-Employed" },
  { value: "Business Owner", label: "Business Owner" },
];

const vehicleTypes = [
  { value: "New Car", label: "New Car" },
  { value: "Used Car", label: "Used Car" },
  { value: "Two Wheeler", label: "Two Wheeler" },
  { value: "Commercial Vehicle", label: "Commercial Vehicle" },
];

const qualifications = [
  { value: "10th", label: "10th Pass" },
  { value: "12th", label: "12th Pass" },
  { value: "Undergraduate", label: "Undergraduate" },
  { value: "Postgraduate", label: "Postgraduate" },
  { value: "Diploma", label: "Diploma" },
];

const degrees = [
  { value: "B.Tech", label: "B.Tech" },
  { value: "MBA", label: "MBA" },
  { value: "MBBS", label: "MBBS" },
  { value: "B.Sc", label: "B.Sc" },
  { value: "M.Tech", label: "M.Tech" },
  { value: "LLB", label: "LLB" },
  { value: "Others", label: "Others" },
];

const MONTH_TENURE_LOANS = ["personal", "business"];

const BRAND_INTEREST_RATES = {
  home: 6.5,
  lap: 7.5,
  education: 7.5,
  personal: 9.99,
  business: 12.0,
  vehicle: 8.5
};

function isMonthTenure(loanId) {
  return MONTH_TENURE_LOANS.includes(loanId);
}

function getTenureUnit(loanId) {
  return isMonthTenure(loanId) ? "Months" : "Years";
}

const initialFormValues = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  loanType: "",
  loanAmount: "",
  propertyType: "",
  propertyLocation: "",
  propertyValue: "",
  tenure: "",
  interestRate: "",
  employmentType: "",
  qualification: "",
  degree: "",
  institutionName: "",
  websiteUrl: "",
};

export default function EnquiryPopup({ isOpen, onClose, leadSource = "Website - Apply Now", defaultLoanType = "" }) {
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: initialFormValues
  });

  const watchedLoanType = watch("loanType");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedLoanType(defaultLoanType || "");
      reset(initialFormValues);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, reset, defaultLoanType]);

  const getLoanTypeLabel = (type) => {
    switch (type) {
      case "home": return "Home Loan";
      case "education": return "Education Loan";
      case "lap": return "Loan Against Property";
      case "personal": return "Personal Loan";
      case "business": return "Business Loan";
      case "vehicle": return "Vehicle Loan";
      default: return "";
    }
  };

  const calculateEMI = (principal, rate, tenureValue, unit) => {
    const isMonth = unit === 'Months';
    const minTenure = 1;
    const maxTenure = isMonth ? 84 : 30;
    if (!principal || !rate || !tenureValue || tenureValue < minTenure || tenureValue > maxTenure) return 0;
    const monthlyRate = rate / 12 / 100;
    const months = isMonth ? Math.round(tenureValue) : Math.round(tenureValue * 12);
    if (months <= 0 || !isFinite(months)) return 0;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    if (isNaN(emi) || !isFinite(emi)) return 0;
    return Math.round(emi);
  };

  const onSubmit = async (data) => {
    if (!selectedLoanType) {
      toast.error("Please select a loan type", { id: 'enquiry-type-error' });
      return;
    }

    const unit = getTenureUnit(selectedLoanType);
    const isMonth = unit === 'Months';
    const maxTenure = isMonth ? 84 : 30;
    const tenureNum = parseInt(data.tenure) || 0;
    if (tenureNum < 1 || tenureNum > maxTenure) {
      toast.error(`Tenure must be between 1 and ${maxTenure} ${unit.toLowerCase()}`, { id: 'enquiry-tenure-error' });
      return;
    }

    const loanAmountNum = parseFloat(data.loanAmount) || 0;
    if (loanAmountNum < 10000) {
      toast.error("Minimum loan amount is ₹10,000", { id: 'enquiry-amount-error' });
      return;
    }



    if (selectedLoanType === "lap") {
      const selectedProp = propertyTypesLAP.find(p => p.value === data.propertyType);
      const ltvPercent = selectedProp?.ltv || 80;
      const propertyVal = parseFloat(data.propertyValue) || 0;
      const maxLoan = Math.round(propertyVal * ltvPercent / 100);
      if (loanAmountNum > maxLoan) {
        toast.error(`Max loan at ${ltvPercent}% LTV is ₹${maxLoan.toLocaleString()}`, { id: 'enquiry-ltv-error' });
        return;
      }
    }

    const interestRate = BRAND_INTEREST_RATES[selectedLoanType] || 8.5;

    const emi = calculateEMI(
      loanAmountNum,
      interestRate,
      tenureNum,
      unit
    );

    // Honeypot check — silently reject bots client-side
    if (data.websiteUrl) {
      setSubmitted(true);
      toast.success("Thank you! Your enquiry has been submitted. Our executive will contact you within 24 hours.", { id: 'enquiry-success' });
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        city: data.city,
        loanType: getLoanTypeLabel(selectedLoanType),
        loanAmount: parseInt(data.loanAmount) || 0,
        interestRate: interestRate,
        tenure: parseInt(data.tenure) || 0,
        tenureUnit: unit,
        emi: emi,
        propertyType: data.propertyType,
        propertyLocation: data.propertyLocation,
        propertyValue: parseInt(data.propertyValue) || 0,
        employmentType: data.employmentType,
        qualification: data.qualification,
        degree: data.degree,
        institutionName: data.institutionName,
        businessVintage: data.businessVintage ? parseInt(data.businessVintage) : undefined,
        vehicleType: data.vehicleType,
        downPayment: data.downPayment ? parseInt(data.downPayment) : 0,
        leadSource: leadSource,
        websiteUrl: data.websiteUrl
      };

      const result = await api.post('/enquiry', payload);

      if (result.data.success) {
        setSubmitted(true);
        toast.success("Thank you! Your enquiry has been submitted. Our executive will contact you within 24 hours.", { id: 'enquiry-success' });
        setTimeout(() => {
          setSubmitted(false);
          reset();
          onClose();
        }, 2000);
      } else {
        toast.error(result.data.message || "Something went wrong. Please try again.", { id: 'enquiry-error' });
      }
    } catch (error) {
      console.error('Enquiry error:', error);
      toast.error("Something went wrong. Please try again.", { id: 'enquiry-error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedLoanType("");
    reset();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.5)',
          }}
          className="flex items-center justify-center p-4 animate-fade-in"
          onClick={handleClose}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Loan enquiry form"
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative' }}
            className="w-[92%] max-w-[420px] md:w-full md:max-w-2xl max-h-[82vh] md:max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl my-4 md:my-8 animate-scale-in"
          >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-gold-cream hover:bg-gold-bright flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-gold-dark" />
        </button>

        <div className="p-5 md:p-8">
          <div className="text-center mb-5 md:mb-8">
            <h1 className="text-xl md:text-3xl font-bold text-gold-dark">
              Apply for Loan
            </h1>
            <p className="text-gold-placeholder mt-2 text-xs md:text-sm">Fill in your details and we&apos;ll get back to you</p>
          </div>

          {submitted ? (
            <div className="text-center py-8 animate-scale-in">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-gold-cream border-2 border-gold-bright flex items-center justify-center">
                <span className="text-3xl md:text-4xl text-gold-primary">✓</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gold-dark mb-2">Thank You!</h3>
              <p className="text-gold-placeholder text-sm">Our executive will contact you within 24 hours</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              <input type="text" {...register("websiteUrl")} className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                    Full Name <span className="text-gold-border">*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register("fullName", { required: "Full name is required" })}
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 pr-10 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark placeholder-gold-placeholder focus:outline-none focus:border-gold-border focus:ring-2 focus:ring-gold-border/20"
                    />
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-border" />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                    Mobile Number <span className="text-gold-border">*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register("phone", { 
                        required: "Mobile number is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Please enter a valid 10-digit mobile number"
                        }
                      })}
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="w-full px-4 py-3 pr-10 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark placeholder-gold-placeholder focus:outline-none focus:border-gold-border focus:ring-2 focus:ring-gold-border/20"
                    />
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-border" />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                    Email <span className="text-gold-border">*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Please enter a valid email address" }
                      })}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 pr-10 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark placeholder-gold-placeholder focus:outline-none focus:border-gold-border focus:ring-2 focus:ring-gold-border/20"
                    />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-border" />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                    City
                  </label>
                  <div className="relative">
                    <input
                      {...register("city")}
                      type="text"
                      placeholder="Enter your city"
                      className="w-full px-4 py-3 pr-10 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark placeholder-gold-placeholder focus:outline-none focus:border-gold-border focus:ring-2 focus:ring-gold-border/20"
                    />
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-border" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                  Select Loan Type <span className="text-gold-border">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {loanTypes.map((loan) => (
                    <button
                      key={loan.id}
                      type="button"
                      onClick={() => setSelectedLoanType(loan.id)}
                      className={`p-2 md:p-3 rounded-xl border-2 transition-all ${
                        selectedLoanType === loan.id 
                          ? 'border-gold-bright bg-gold-cream shadow-lg' 
                          : 'border-gold-bright/50 hover:border-gold-bright'
                      }`}
                    >
                      <loan.icon className={`w-5 h-5 md:w-6 md:h-6 mx-auto mb-0.5 md:mb-1 ${selectedLoanType === loan.id ? 'text-gold-border' : 'text-gray-400'}`} />
                      <div className="text-[10px] md:text-xs font-semibold text-gold-dark">{loan.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedLoanType && (
                <div className="space-y-4 border-t border-gold-bright/30 pt-4 animate-fade-in-up">
                    <h3 className="text-lg font-semibold text-gold-dark flex items-center gap-2">
                      <Calculator className="w-5 h-5 shrink-0" />
                      {loanTypes.find(l => l.id === selectedLoanType)?.label} Details
                    </h3>

                    {selectedLoanType !== "lap" && (
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                            Loan Amount (₹) <span className="text-gold-border">*</span>
                          </label>
                          <input
                            {...register("loanAmount", { 
                              required: "Loan amount is required",
                              min: { value: 10000, message: "Minimum ₹10,000" },
                              valueAsNumber: true
                            })}
                            type="number"
                            inputMode="numeric"
                            min="10000"
                            placeholder="Enter loan amount (min ₹10,000)"
                            className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark placeholder-gold-placeholder focus:outline-none focus:border-gold-border"
                          />
                          {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount.message}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                            Tenure ({getTenureUnit(selectedLoanType)}) <span className="text-gold-border">*</span>
                          </label>
                          <input
                            {...register("tenure", { 
                              required: "Tenure is required",
                              min: { value: 1, message: "Minimum 1" + (isMonthTenure(selectedLoanType) ? " month" : " year") },
                              max: { value: isMonthTenure(selectedLoanType) ? 84 : 30, message: "Maximum " + (isMonthTenure(selectedLoanType) ? "84 months" : "30 years") },
                              valueAsNumber: true
                            })}
                            type="number"
                            inputMode="numeric"
                            min="1"
                            max={isMonthTenure(selectedLoanType) ? 84 : 30}
                            placeholder={isMonthTenure(selectedLoanType) ? "Enter tenure (1-84 months)" : "Enter tenure (1-30 years)"}
                            className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark placeholder-gold-placeholder focus:outline-none focus:border-gold-border"
                          />
                          {errors.tenure && <p className="text-red-500 text-xs mt-1">{errors.tenure.message}</p>}
                        </div>
                      </div>
                    )}

                    {selectedLoanType === "home" && (
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                            Property Type
                          </label>
                          <select
                            {...register("propertyType")}
                            className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark focus:outline-none focus:border-gold-border"
                          >
                            <option value="">Select</option>
                            {propertyTypesHome.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                            Property Location
                          </label>
                          <input
                            {...register("propertyLocation")}
                            type="text"
                            placeholder="Enter location"
                            className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark placeholder-gold-placeholder focus:outline-none focus:border-gold-border"
                          />
                        </div>
                      <div>
                          <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                            Employment Type
                          </label>
                          <select
                            {...register("employmentType")}
                            className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark focus:outline-none focus:border-gold-border"
                          >
                            <option value="">Select</option>
                            {employmentTypes.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {selectedLoanType === "education" && (
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                            Current Qualification
                          </label>
                          <select
                            {...register("qualification")}
                            className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark focus:outline-none focus:border-gold-border"
                          >
                            <option value="">Select</option>
                            {qualifications.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                            Degree to Pursue
                          </label>
                          <select
                            {...register("degree")}
                            className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark focus:outline-none focus:border-gold-border"
                          >
                            <option value="">Select</option>
                            {degrees.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                            University Name
                          </label>
                          <input
                            {...register("institutionName")}
                            type="text"
                            placeholder="Enter university"
                            className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark placeholder-gold-placeholder focus:outline-none focus:border-gold-border"
                          />
                        </div>
                      </div>
                    )}

                    {selectedLoanType === "lap" && (
                      <>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                              Property Value (&#x20B9;)
                            </label>
                            <input
                              {...register("propertyValue")}
                              type="number"
                              placeholder="Enter property value (e.g., 10000000)"
                              className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark placeholder-gold-placeholder focus:outline-none focus:border-gold-border"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                              Property Type
                            </label>
                            <select
                              {...register("propertyType")}
                              className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark focus:outline-none focus:border-gold-border"
                            >
                              <option value="">Select</option>
                              {propertyTypesLAP.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label} ({opt.ltv}% LTV)</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {(() => {
                          const selProp = propertyTypesLAP.find(p => p.value === watch("propertyType"));
                          const ltvPct = selProp?.ltv || 0;
                          const pVal = parseFloat(watch("propertyValue")) || 0;
                          const maxAmt = Math.round(pVal * ltvPct / 100);
                          return watch("propertyType") && pVal > 0 ? (
                            <div className="p-3 bg-gold-primary/5 border border-gold-primary/20 rounded-lg">
                              <p className="text-sm text-gray-600">
                                <span className="font-semibold text-gold-primary">{ltvPct}% LTV</span> &mdash; Max Fundable: <span className="font-semibold">&#x20B9;{maxAmt.toLocaleString()}</span>
                              </p>
                            </div>
                          ) : null;
                        })()}
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                              Loan Amount (&#x20B9;) <span className="text-gold-border">*</span>
                            </label>
                            <input
                              {...register("loanAmount", {
                                required: "Loan amount is required",
                                min: { value: 10000, message: "Minimum &#x20B9;10,000" },
                                valueAsNumber: true
                              })}
                              type="number"
                              inputMode="numeric"
                              min="10000"
                              placeholder="Enter loan amount (max based on LTV)"
                              className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark placeholder-gold-placeholder focus:outline-none focus:border-gold-border"
                            />
                            {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount.message}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                              Employment Type
                            </label>
                            <select
                              {...register("employmentType")}
                              className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark focus:outline-none focus:border-gold-border"
                            >
                              <option value="">Select</option>
                              {employmentTypes.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                              Tenure (Years) <span className="text-gold-border">*</span>
                            </label>
                            <input
                              {...register("tenure", {
                                required: "Tenure is required",
                                min: { value: 1, message: "Minimum 1 year" },
                                max: { value: 30, message: "Maximum 30 years" },
                                valueAsNumber: true
                              })}
                              type="number"
                              inputMode="numeric"
                              min="1"
                              max="30"
                              placeholder="Enter tenure (1-30 years)"
                              className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark placeholder-gold-placeholder focus:outline-none focus:border-gold-border"
                            />
                            {errors.tenure && <p className="text-red-500 text-xs mt-1">{errors.tenure.message}</p>}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 italic">
                          * LTV can change based on property location, bank policies, and your CIBIL score.
                        </div>
                      </>
                    )}

                    {selectedLoanType === "personal" && (
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-[#7a5c00] mb-1.5">
                            Employment Type
                          </label>
                          <select
                            {...register("employmentType")}
                            className="w-full px-4 py-3 bg-[#fffdf0] border border-[#ddc84a] rounded-lg text-[#7a5c00] focus:outline-none focus:border-[#c9920a]"
                          >
                            <option value="">Select</option>
                            {employmentTypes.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {selectedLoanType === "business" && (
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                            Business Vintage (Years)
                          </label>
                          <input
                            {...register("businessVintage")}
                            type="number"
                            inputMode="numeric"
                            min="0"
                            max="50"
                            placeholder="Enter business vintage"
                            className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark placeholder-gold-placeholder focus:outline-none focus:border-gold-border"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                            Employment Type
                          </label>
                          <select
                            {...register("employmentType")}
                            className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark focus:outline-none focus:border-gold-border"
                          >
                            <option value="">Select</option>
                            {employmentTypes.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {selectedLoanType === "vehicle" && (
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                            Vehicle Type
                          </label>
                          <select
                            {...register("vehicleType")}
                            className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark focus:outline-none focus:border-gold-border"
                          >
                            <option value="">Select</option>
                            {vehicleTypes.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gold-dark mb-1.5">
                            Down Payment (₹)
                          </label>
                          <input
                            {...register("downPayment")}
                            type="number"
                            inputMode="numeric"
                            min="0"
                            placeholder="Enter down payment amount"
                            className="w-full px-4 py-3 bg-gold-cream border border-gold-bright rounded-lg text-gold-dark placeholder-gold-placeholder focus:outline-none focus:border-gold-border"
                          />
                        </div>
                      </div>
                    )}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !selectedLoanType}
                className="w-full py-3 md:py-4 px-6 bg-gold-primary text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all text-sm md:text-base"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Enquiry
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
          </div>
          </div>
        </div>
      )}
    </>
  );
}