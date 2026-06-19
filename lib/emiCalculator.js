export const calculateEMI = (principal, annualRate, months) => {
  if (months <= 0 || principal <= 0) {
    return 0;
  }

  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    return Math.round(principal / months);
  }

  const compoundFactor = Math.pow(1 + monthlyRate, months);

  if (compoundFactor <= 1) {
    return Math.round(principal / months);
  }

  const emi = (principal * monthlyRate * compoundFactor) / (compoundFactor - 1);

  return Math.round(emi);
};

export const calculateLoanDetails = (principal, annualRate, years) => {
  const months = years * 12;
  const emi = calculateEMI(principal, annualRate, months);
  const totalAmount = Math.round(emi * months);
  const totalInterest = totalAmount - principal;

  return {
    monthlyEMI: emi,
    totalAmount,
    totalInterest,
    principal,
    months,
    annualRate,
    years,
  };
};

export const calculateEMIFromValues = (loanAmount, interestRate, tenure, tenureUnit = 'Years', downPayment = 0) => {
  const principal = Math.max(0, Number(loanAmount) - Number(downPayment || 0));

  if (principal <= 0 || tenure <= 0) {
    return null;
  }

  const actualYears = tenureUnit === 'Months' ? tenure / 12 : tenure;
  const result = calculateLoanDetails(principal, Number(interestRate), actualYears);

  return {
    principal: result.principal,
    interestRate: Number(interestRate),
    tenure: Math.round(actualYears * 12),
    tenureUnit: 'Months',
    monthlyEMI: result.monthlyEMI,
    totalAmount: result.totalAmount,
    totalInterest: result.totalInterest,
  };
};

export const MONTH_TENURE_LOANS = ['personal', 'business'];

export const isMonthTenure = (loanId) => {
  return MONTH_TENURE_LOANS.includes(loanId);
};

export const getTenureUnit = (loanId) => {
  return isMonthTenure(loanId) ? 'Months' : 'Years';
};

export const getMaxTenure = (loanId) => {
  const maxTenure = {
    personal: 60,
    business: 84,
    home: 360,
    lap: 180,
    education: 180,
    vehicle: 84,
  };
  return maxTenure[loanId] || 360;
};

export const getMinTenure = () => {
  return 1;
};

export const getLoanAmountLimits = (loanType) => {
  const limits = {
    personal: { min: 10000, max: 100000000 },
    business: { min: 10000, max: 500000000 },
    home: { min: 100000, max: 150000000 },
    lap: { min: 100000, max: 300000000 },
    education: { min: 10000, max: 50000000 },
    vehicle: { min: 10000, max: 50000000 },
  };

  return limits[loanType] || { min: 10000, max: 100000000 };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatINR = (num) => {
  return num?.toLocaleString('en-IN') || '0';
};
