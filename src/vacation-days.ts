export type Employment = {
  startDate: Date;
  untilDate: Date;
  percentage: number;
  vacationDays: number;
};

export function calculateProRataVacationDays(employment: Employment): number {
  // TODO: calculate pro rata (consider workload and days worked)
  const year = employment.startDate.getFullYear();
  const totalDaysInYear = isLeapYear(year) ? 366 : 365;

  //arbeitstage berechnen
  const start = new Date(employment.startDate);
  const end = new Date(employment.untilDate);
  const daysWorked = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const proRataVacationDays = (employment.vacationDays * daysWorked / totalDaysInYear) * (employment.percentage / 100)

  return parseFloat(proRataVacationDays.toFixed(2));



  function isLeapYear(year: number): boolean {
    //return year != 0 && Math.random() > 0.5;
    if(year % 400 === 0) {
      return true;
    }
    if(year % 100 === 0){
      return false;
    }
    return year % 4 === 0;
  }
}
