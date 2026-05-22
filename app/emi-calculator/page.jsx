"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Home, Building2, GraduationCap, Calculator, User, Briefcase, Car } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import EMISubmitPopup from "@/components/forms/EMISubmitPopup";

const STORAGE_KEYS = {
  POPUP_CLOSED_AT: 'emi_popup_closed_at',
  LEAD_SUBMITTED: 'emi_lead_submitted'
};

const loanTypes = [
  { id: "home", label: "Home Loan", icon: Home },
  { id: "lap", label: "Loan Against Property", icon: Building2 },
  { id: "education", label: "Education Loan", icon: GraduationCap },
  { id: "personal", label: "Personal Loan", icon: User },
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

const vehicleTypes = [
  { value: "New Car", label: "New Car" },
  { value: "Used Car", label: "Used Car" },
  { value: "Two Wheeler", label: "Two Wheeler" },
  { value: "Commercial Vehicle", label: "Commercial Vehicle" },
];

const isLeadSubmitted = () => typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEYS.LEAD_SUBMITTED) === 'true';

const shouldShowPopup = () => {
  if (typeof window === 'undefined') return false;
  if (isLeadSubmitted()) return false;
  const closedAt = localStorage.getItem(STORAGE_KEYS.POPUP_CLOSED_AT);
  if (!closedAt) return true;
  const tenMinutes = 10 * 60 * 1000;
  return Date.now() - parseInt(closedAt) > tenMinutes;
};

const setPopupClosed = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.POPUP_CLOSED_AT, Date.now().toString());
  }
};

const setLeadSubmitted = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.LEAD_SUBMITTED, 'true');
  }
};

export default function EMICalculatorPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [emiResult, setEmiResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const { register, handleSubmit, watch, reset, formState: { isSubmitting } } = useForm();

  const formValues = watch();

  const calculateEMI = (data) => {
    const loanAmount = parseFloat(data.loanAmount) || 0;
    const downPayment = parseFloat(data.downPayment) || 0;
    const interestRate = parseFloat(data.interestRate) || 0;
    const tenureYears = parseFloat(data.tenure) || 0;

    if (loanAmount <= 0 || tenureYears <= 0) {
      toast.error("Please enter valid loan amount and tenure");
      return;
    }

    if (interestRate < 0) {
      toast.error("Interest rate cannot be negative");
      return;
    }

    if (activeTab === "lap") {
      const selectedProp = propertyTypesLAP.find(p => p.value === data.propertyType);
      const ltvPercent = selectedProp?.ltv || 80;
      const propertyVal = parseFloat(data.propertyValue) || 0;
      const maxLoan = Math.round(propertyVal * ltvPercent / 100);
      if (loanAmount > maxLoan) {
        toast.error(`Max loan amount at ${ltvPercent}% LTV is ₹${maxLoan.toLocaleString()}`);
        return;
      }
    }

    const principal = loanAmount - downPayment;
    if (principal <= 0) {
      toast.error("Loan amount must be greater than down payment");
      return;
    }

    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = tenureYears * 12;

    let emi;
    if (monthlyRate === 0) {
      emi = principal / tenureMonths;
    } else {
      emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
            (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    }
    
    if (isNaN(emi) || !isFinite(emi)) {
      toast.error("Invalid calculation. Please check your inputs.");
      return;
    }

    const totalAmount = Math.round(emi * tenureMonths);
    const totalInterest = totalAmount - principal;

    setEmiResult({
      emi: Math.round(emi),
      totalAmount: totalAmount,
      totalInterest: totalInterest,
      tenure: tenureYears,
      principal,
    });

    setHasCalculated(true);

    if (shouldShowPopup()) {
      setTimeout(() => {
        setShowPopup(true);
      }, 1000);
    }
  };

  const handleReset = () => {
    reset();
    setEmiResult(null);
    setHasCalculated(false);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupClosed();
  };

  const handleLeadSubmitted = () => {
    setLeadSubmitted();
    setShowPopup(false);
  };

  const renderForm = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <Input label="Loan Amount" name="loanAmount" type="number" register={register} placeholder="Enter loan amount (e.g., 2500000)" required />
            <Input label="Property Type" name="propertyType" type="select" register={register} options={propertyTypesHome} />
            <Input label="Property Location" name="propertyLocation" type="text" register={register} placeholder="Enter property location" />
            <Input label="Employment Type" name="employmentType" type="select" register={register} options={employmentTypes} />
            <Input label="Interest Rate (% p.a.)" name="interestRate" type="number" step="0.1" register={register} placeholder="Enter interest rate (e.g., 7.5)" required />
            <Input label="Tenure (Years)" name="tenure" type="number" register={register} placeholder="Enter tenure in years (e.g., 20)" required />
          </>
        );
      case "lap": {
        const selectedProp = propertyTypesLAP.find(p => p.value === formValues.propertyType);
        const ltvPercent = selectedProp?.ltv || 80;
        const propertyVal = parseFloat(formValues.propertyValue) || 0;
        const maxLoanAmt = Math.round(propertyVal * ltvPercent / 100);
        return (
          <>
            <Input label="Property Value" name="propertyValue" type="number" register={register} placeholder="Enter property value (e.g., 10000000)" required />
            <Input label="Property Type" name="propertyType" type="select" register={register} options={propertyTypesLAP} />
            {formValues.propertyType && (
              <div className="col-span-2 md:col-span-1 p-3 bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-[#C9A84C]">{ltvPercent}% LTV</span> — Max Fundable: <span className="font-semibold">₹{maxLoanAmt.toLocaleString()}</span>
                </p>
              </div>
            )}
            <Input label="Loan Amount" name="loanAmount" type="number" register={register} placeholder="Enter loan amount (max based on LTV)" required />
            <Input label="Employment Type" name="employmentType" type="select" register={register} options={employmentTypes} />
            <Input label="Interest Rate (% p.a.)" name="interestRate" type="number" step="0.1" register={register} placeholder="Enter interest rate" required />
            <Input label="Tenure (Years)" name="tenure" type="number" register={register} placeholder="Enter tenure in years" required />
            <div className="col-span-2 text-xs text-gray-400 italic">
              * LTV can change based on property location, bank policies, and your CIBIL score. We cannot commit to exact LTV before seeing property details.
            </div>
          </>
        );
      }
      case "education":
        return (
          <>
            <Input label="Loan Amount" name="loanAmount" type="number" register={register} placeholder="Enter loan amount" required />
            <Input label="Current Qualification" name="qualification" type="select" register={register} options={qualifications} />
            <Input label="Degree to Pursue" name="degree" type="select" register={register} options={degrees} />
            <Input label="University Name" name="institutionName" type="text" register={register} placeholder="Enter university name" />
            <Input label="Interest Rate (% p.a.)" name="interestRate" type="number" step="0.1" register={register} placeholder="Enter interest rate" required />
            <Input label="Tenure (Years)" name="tenure" type="number" register={register} placeholder="Enter tenure in years" required />
          </>
        );
      case "personal":
        return (
          <>
            <Input label="Loan Amount" name="loanAmount" type="number" register={register} placeholder="Enter loan amount (e.g., 500000)" required />
            <Input label="Employment Type" name="employmentType" type="select" register={register} options={employmentTypes} />
            <Input label="Interest Rate (% p.a.)" name="interestRate" type="number" step="0.1" register={register} placeholder="Enter interest rate (e.g., 10.5)" required />
            <Input label="Tenure (Years)" name="tenure" type="number" register={register} placeholder="Enter tenure in years (e.g., 5)" required />
          </>
        );
      case "business":
        return (
          <>
            <Input label="Loan Amount" name="loanAmount" type="number" register={register} placeholder="Enter loan amount (e.g., 1000000)" required />
            <Input label="Business Vintage (Years)" name="businessVintage" type="number" register={register} placeholder="Business vintage in years" />
            <Input label="Employment Type" name="employmentType" type="select" register={register} options={employmentTypes} />
            <Input label="Interest Rate (% p.a.)" name="interestRate" type="number" step="0.1" register={register} placeholder="Enter interest rate (e.g., 12.0)" required />
            <Input label="Tenure (Years)" name="tenure" type="number" register={register} placeholder="Enter tenure in years (e.g., 5)" required />
          </>
        );
      case "vehicle":
        return (
          <>
            <Input label="Loan Amount" name="loanAmount" type="number" register={register} placeholder="Enter loan amount (e.g., 800000)" required />
            <Input label="Vehicle Type" name="vehicleType" type="select" register={register} options={vehicleTypes} />
            <Input label="Down Payment" name="downPayment" type="number" register={register} placeholder="Enter down payment amount" />
            <Input label="Interest Rate (% p.a.)" name="interestRate" type="number" step="0.1" register={register} placeholder="Enter interest rate (e.g., 8.5)" required />
            <Input label="Tenure (Years)" name="tenure" type="number" register={register} placeholder="Enter tenure in years (e.g., 7)" required />
          </>
        );
      default:
        return null;
    }
  };

  const getLoanTypeLabel = () => {
    return loanTypes.find((t) => t.id === activeTab)?.label || "Loan";
  };

  const loanInfoCards = [
    { title: "Home Loan", rate: "6.50%", tenure: "30 Years", max: "₹15 Crore" },
    { title: "Loan Against Property", rate: "7.50%", tenure: "15 Years", max: "₹30 Crore" },
    { title: "Education Loan", rate: "7.50%", tenure: "15 Years", max: "₹1.5 Crore" },
    { title: "Personal Loan", rate: "9.99%", tenure: "5 Years", max: "₹1 Crore" },
    { title: "Business Loan", rate: "12.00%", tenure: "7 Years", max: "₹5 Crore" },
    { title: "Vehicle Loan", rate: "8.50%", tenure: "7 Years", max: "₹1 Crore" },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-white to-[#F5F3EE]">
        <style>{`
          @media (max-width: 767px) {
            .loan-type-grid {
              display: grid !important;
              grid-template-columns: 1fr 1fr !important;
              gap: 8px !important;
            }
            .loan-type-grid > button {
              width: 100% !important;
            }
            form > .grid:first-child {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
            form > .grid:first-child > [class*="col-span-2"] {
              grid-column: span 1 !important;
            }
            form input,
            form select {
              width: 100% !important;
              max-width: 100% !important;
              box-sizing: border-box !important;
            }
            form label {
              font-size: 13px !important;
            }
            .flex.gap-4.mt-8 {
              gap: 12px !important;
            }
          }
        `}</style>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#C9A84C] font-medium">EMI Calculator</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
                Calculate Your <span className="text-[#C9A84C]">EMI</span>
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Use our easy-to-use EMI calculator to plan your loan repayment.
                Select your loan type and enter the details to get instant results.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <GlassCard className="p-8">
                <div className="loan-type-grid flex flex-wrap gap-3 mb-8 justify-center">
                  {loanTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setActiveTab(type.id);
                        setEmiResult(null);
                        reset();
                      }}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all text-sm font-medium ${
                        activeTab === type.id
                          ? "bg-[#C9A84C] text-white"
                          : "bg-[#F5F3EE] text-gray-700 border border-[#C9A84C]/20 hover:border-[#C9A84C]"
                      }`}
                    >
                      <type.icon className="w-4 h-4" />
                      {type.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit(calculateEMI)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderForm()}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button type="submit" variant="primary" className="flex-1 flex items-center justify-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Calculate EMI
                    </Button>
                    <Button type="button" variant="outline" onClick={handleReset}>
                      Reset
                    </Button>
                  </div>
                </form>

                {emiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-gradient-to-r from-[#C9A84C]/10 to-[#F5F3EE] rounded-xl border border-[#C9A84C]/20"
                  >
                    <div className="text-center mb-6">
                      <p className="text-gray-500 mb-2">Your Monthly EMI</p>
                      <p className="text-5xl font-bold text-[#C9A84C]">
                        ₹{emiResult.emi.toLocaleString()}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#C9A84C]/20">
                      <div className="text-center">
                        <p className="text-gray-500 text-xs mb-1">Principal</p>
                        <p className="text-gray-800 font-semibold">₹{emiResult.principal.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500 text-xs mb-1">Total Interest</p>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-[#c9920a] font-semibold filter blur-[6px] select-none">
                            ₹{emiResult.totalInterest.toLocaleString()}
                          </span>
                          <svg className="w-3 h-3 text-[#c9920a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <button onClick={() => setShowPopup(true)} className="text-[10px] text-[#c9920a] hover:underline mt-1">
                          Submit enquiry to unlock
                        </button>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500 text-xs mb-1">Total Payable</p>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-gray-800 font-semibold filter blur-[6px] select-none">
                            ₹{emiResult.totalAmount.toLocaleString()}
                          </span>
                          <svg className="w-3 h-3 text-[#c9920a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <button onClick={() => setShowPopup(true)} className="text-[10px] text-[#c9920a] hover:underline mt-1">
                          Submit enquiry to unlock
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-center mt-4 text-sm">
                      Tenure: <span className="text-[#C9A84C] font-semibold">{emiResult.tenure} Years</span>
                    </p>
                  </motion.div>
                )}
              </GlassCard>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loanInfoCards.map((info, index) => (
                <GlassCard key={index} delay={index * 0.1} className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{info.title}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Interest Rate:</span>
                      <span className="text-[#C9A84C]">{info.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Max Tenure:</span>
                      <span className="text-gray-800">{info.tenure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Max Amount:</span>
                      <span className="text-gray-800">{info.max}</span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <EMISubmitPopup
        isOpen={showPopup}
        onClose={handlePopupClose}
        loanData={{
          loanType: getLoanTypeLabel(),
          loanAmount: emiResult?.principal || 0,
          emi: emiResult?.emi || 0,
          tenure: emiResult?.tenure || 0,
          interestRate: formValues?.interestRate || 8.5,
          totalInterest: emiResult?.totalInterest || 0,
          totalAmount: emiResult?.totalAmount || 0,
          downPayment: formValues?.downPayment || 0,
          propertyType: formValues?.propertyType || '',
          propertyValue: formValues?.propertyValue || 0,
          propertyLocation: formValues?.propertyLocation || '',
          employmentType: formValues?.employmentType || '',
          qualification: formValues?.qualification || '',
          degree: formValues?.degree || '',
          institutionName: formValues?.institutionName || '',
          businessVintage: formValues?.businessVintage || 0,
          businessVintageMonths: (parseFloat(formValues?.businessVintage) || 0) * 12,
          vehicleType: formValues?.vehicleType || 'new',
        }}
        onLeadSubmitted={handleLeadSubmitted}
      />
    </>
  );
}
