export interface DeductionRates {
  tax: number;
  retirement: number;
  insurance: number;
}

export interface SalaryResult {
  gross: number;
  tax: number;
  retirement: number;
  insurance: number;
  totalDeductions: number;
  net: number;
}

export interface Employee {
  id: string;
  fullName: string;
  grossSalary: number;
  deductionRates: DeductionRates;
  results: SalaryResult;
}

const defaultDeductionRates: DeductionRates = {
  tax: 10,
  retirement: 10,
  insurance: 5,
};

export function calculateSalary(
  grossSalary: number,
  rates: DeductionRates = defaultDeductionRates
): SalaryResult {
  const tax = (grossSalary * rates.tax) / 100;
  const retirement = (grossSalary * rates.retirement) / 100;
  const insurance = (grossSalary * rates.insurance) / 100;
  const totalDeductions = tax + retirement + insurance;
  const net = grossSalary - totalDeductions;

  return {
    gross: grossSalary,
    tax,
    retirement,
    insurance,
    totalDeductions,
    net,
  };
}

export function getDefaultDeductionRates(): DeductionRates {
  return { ...defaultDeductionRates };
}

export function generateEmployeeId(): string {
  return Math.random().toString(36).substring(2, 10);
}