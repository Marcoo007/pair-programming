export type Salary = {
  born: Date;
  payday: Date;
  gross: number;
};

export type Deductions = Map<string, number>;

export const DEDUCTION_RATES: Deductions = new Map([
  ["AHV", 8.7],
  ["IV", 1.4],
  ["EO", 0.5],
  ["ALV", 1.1],
  ["NBU", 0.73],
  ["PK", 8.9],
]);

export type Payslip = {
  salary: Salary;
  deductions: Deductions;
  totalDeductions: number;
  net: number;
};

export function calculatePayslip(salary: Salary): Payslip {
  // TODO: implement

  const deductions: Deductions = new Map();
  const ageAtPayday = 0;
  const monthlyGross = salary.gross;
  const yearlyGross = monthlyGross * 12;
  //AHV, IV und EO werden ab dem 1. Januar nach dem 17. Geburtstag abgezogen.

  const janAfter17 = new Date(salary.born.getFullYear() + 18, 0, 1);
  if (salary.payday >= janAfter17) {
    ["AHV", "IV", "EO"].forEach((key) => {
      const rate = DEDUCTION_RATES.get(key)!;
      deductions.set(key, monthlyGross * (rate / 100));
    });
  }

  //ALV und NBU werden ab einem Jahreslohn(!) von 2'500.- abgezogen.

  if (yearlyGross >= 2500) {
    ["ALV", "NBU"].forEach((key) => {
      const rate = DEDUCTION_RATES.get(key)!;
      deductions.set(key, monthlyGross * (rate / 100));
    });
  };


  //Pensionskasse (PK) wird ab einem Jahreslohn von 22'680.- abgezogen.
  if (yearlyGross >= 22680) {
    const rate = DEDUCTION_RATES.get("PK")!;
    deductions.set("PK", monthlyGross * (rate / 100));
  };
  
  let totalDeductions = 0;
  deductions.forEach((value) => {
    totalDeductions += value;
  });

  const result: Payslip = {
    salary: salary,
    deductions: new Map(),
    totalDeductions: 0.0,
    net: salary.gross,
  };
  return result;
}
