"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Mail, Calculator } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function EMISubmitPopup({ isOpen, onClose, loanData, onLeadSubmitted }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      email: ""
    }
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      reset({ fullName: "", phone: "", email: "" });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, reset]);

  const onSubmit = async (data) => {
    if (!loanData) {
      toast.error("Please calculate EMI first", { id: 'emi-error' });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const loanTypeMap = {
        'Home Loan': 'home-loan',
        'Loan Against Property': 'lap',
        'Education Loan': 'education-loan',
        'Personal Loan': 'personal-loan',
        'Non-Salaried Loan': 'personal-loan',
        'Business Loan': 'business-loan',
        'Vehicle Loan': 'vehicle-loan'
      };
      
      const endpoint = loanTypeMap[loanData.loanType] || 'home-loan';
      
      const payload = {
        fullName: data.fullName,
        mobile: data.phone,
        email: data.email,
        city: data.city || "",
        loanAmount: parseInt(loanData.loanAmount) || 0,
        interestRate: parseFloat(loanData.interestRate) || 8.5,
        tenureYears: parseInt(loanData.tenure) || 0,
        calculatedEMI: parseInt(loanData.emi) || 0,
        totalInterest: parseInt(loanData.totalInterest) || 0,
        totalPayable: parseInt(loanData.totalAmount) || 0,
        downPayment: parseInt(loanData.downPayment) || 0,
        propertyType: loanData.propertyType || '',
        propertyLocation: loanData.propertyLocation || '',
        employmentType: loanData.employmentType || '',
        qualification: loanData.qualification || '',
        degreeType: loanData.degree || '',
        institutionName: loanData.institutionName || '',
        businessVintage: parseInt(loanData.businessVintageMonths) || parseInt(loanData.businessVintage) || 0,
        vehicleType: loanData.vehicleType || 'New Car'
      };

      const response = await fetch(`${API_URL}/emi/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        if (onLeadSubmitted) onLeadSubmitted();
        toast.success("Thank you! Your enquiry has been submitted. Our executive will contact you within 24 hours.", { id: 'emi-success' });
        setTimeout(() => {
          setSubmitted(false);
          reset();
          onClose();
        }, 2000);
      } else if (result.errors) {
        const errorMsg = result.errors.join(', ');
        toast.error(errorMsg, { id: 'emi-error' });
      } else {
        toast.error(result.message || "Something went wrong. Please try again.", { id: 'emi-error' });
      }
    } catch (error) {
      console.error('EMI enquiry error:', error);
      toast.error("Something went wrong. Please try again.", { id: 'emi-error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
          className="flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{ position: 'relative' }}
            className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl my-8"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#fffdf0] hover:bg-[#ddc84a] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-[#7a5c00]" />
            </button>

            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-[#C9A84C]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calculator className="w-7 h-7 text-[#C9A84C]" />
                </div>
                <h1 className="text-xl font-bold text-[#7a5c00]">
                  Get Your Loan Approved
                </h1>
                <p className="text-[#b3a066] mt-1 text-sm">
                  Submit your details and our team will contact you
                </p>
              </div>

              {loanData && (
                <div className="mb-6 p-4 bg-[#fffdf0] rounded-xl border border-[#ddc84a]/30">
                  <div className="text-center">
                    <p className="text-gray-500 text-sm">Loan Details</p>
                    <p className="text-xl font-bold text-[#C9A84C] mt-1">
                      ₹{parseInt(loanData.loanAmount || 0).toLocaleString()}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {loanData.loanType} • {loanData.tenure} Years • ₹{parseInt(loanData.emi || 0).toLocaleString()}/month
                    </p>
                  </div>
                </div>
              )}

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#fffdf0] border-2 border-[#ddc84a] flex items-center justify-center">
                    <span className="text-3xl text-[#C9A84C]">✓</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#7a5c00] mb-2">Thank You!</h3>
                  <p className="text-[#b3a066] text-sm">We'll contact you within 24 hours</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#7a5c00] mb-1.5">
                      Full Name <span className="text-[#c9920a]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        {...register("fullName", { required: "Full name is required" })}
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 pr-10 bg-[#fffdf0] border border-[#ddc84a] rounded-lg text-[#7a5c00] placeholder-[#b3a066] focus:outline-none focus:border-[#c9920a] focus:ring-2 focus:ring-[#c9920a]/20"
                      />
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9920a]" />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#7a5c00] mb-1.5">
                      Mobile Number <span className="text-[#c9920a]">*</span>
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
                        className="w-full px-4 py-3 pr-10 bg-[#fffdf0] border border-[#ddc84a] rounded-lg text-[#7a5c00] placeholder-[#b3a066] focus:outline-none focus:border-[#c9920a] focus:ring-2 focus:ring-[#c9920a]/20"
                      />
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9920a]" />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#7a5c00] mb-1.5">
                      Email <span className="text-[#c9920a]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        {...register("email", { 
                          required: "Email is required",
                          pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Please enter a valid email address" }
                        })}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 pr-10 bg-[#fffdf0] border border-[#ddc84a] rounded-lg text-[#7a5c00] placeholder-[#b3a066] focus:outline-none focus:border-[#c9920a] focus:ring-2 focus:ring-[#c9920a]/20"
                      />
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9920a]" />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#7a5c00] mb-1.5">
                      City
                    </label>
                    <div className="relative">
                      <input
                        {...register("city")}
                        type="text"
                        placeholder="Enter your city"
                        className="w-full px-4 py-3 pr-10 bg-[#fffdf0] border border-[#ddc84a] rounded-lg text-[#7a5c00] placeholder-[#b3a066] focus:outline-none focus:border-[#c9920a] focus:ring-2 focus:ring-[#c9920a]/20"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-gradient-to-r from-[#ddb000] to-[#c98800] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
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
                      "Submit Details"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
