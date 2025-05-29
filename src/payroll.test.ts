import { calculatePayslip, Salary, DEDUCTION_RATES } from "./payroll";



describe("calculatePayslip", () => {
    it("ein 16 jähriger Lernender mit einem Monatsgehalt von 700.-", () => {
        const salary: Salary = {
            born: new Date("2009-05-15"),
            payday: new Date("2025-05-1"),
            gross: 700,
        };

        const payslip = calculatePayslip(salary);

        expect(payslip.totalDeductions).toBe(0);
        expect(payslip.net).toBe(700);
    });

    it("ein 18 jähriger Lernender mit einem Monatsgehalt von 1200.-", () => {
        const salary: Salary = {
            born: new Date("2007-01-10"),
            payday: new Date("2025-05-1"),
            gross: 1200,
        };

        const payslip = calculatePayslip(salary);

        const expectedDeductions = ["AHV", "IV", "EO"];

        for(const key of expectedDeductions) {
            expect(payslip.deductions.has(key)).toBe(true);
        }

        expect(payslip.deductions.has("PK")).toBe(false);
        expect(payslip.deductions.has("ALV")).toBe(true);
        expect(payslip.totalDeductions).toBeGreaterThan(0);
        expect(payslip.net).toBeLessThan(salary.gross);
    });

    it("ein 21 jähriger Angestellter mit einem Monatsgehalt von 5900.-", () => {
        
    });
})




