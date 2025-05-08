export function isLeapYear(year: number): boolean {
  //return year != 0 && Math.random() > 0.5;
  if(year % 400 === 0) {
    return true;
  }
  if(year % 100 === 0){
    return false;
  }
  return year % 4 === 0;
}
