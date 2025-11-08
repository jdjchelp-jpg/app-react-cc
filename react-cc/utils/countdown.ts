export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export const getCountdownToChristmas = (year: number): CountdownTime => {
  const now = new Date();
  let christmas = new Date(year, 11, 25, 0, 0, 0, 0); // December 25th
  
  // If Christmas has passed this year, move to next year
  if (now > christmas) {
    christmas = new Date(year + 1, 11, 25, 0, 0, 0, 0);
  }
  
  const diff = christmas.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
  }
  
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return { days, hours, minutes, seconds, totalSeconds };
};

export const getYearProgress = (year: number): number => {
  const now = new Date();
  const christmas = new Date(year, 11, 25, 0, 0, 0, 0);
  const yearStart = new Date(year, 0, 1, 0, 0, 0, 0);
  
  const totalDays = (christmas.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24);
  const elapsedDays = (now.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24);
  
  if (elapsedDays < 0) return 0;
  if (elapsedDays > totalDays) return 100;
  
  return Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));
};

export const getDaysRemaining = (year: number): number => {
  const now = new Date();
  const christmas = new Date(year, 11, 25, 0, 0, 0, 0);
  
  if (now > christmas) {
    const nextChristmas = new Date(year + 1, 11, 25, 0, 0, 0, 0);
    return Math.ceil((nextChristmas.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }
  
  return Math.ceil((christmas.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

export const isChristmasDay = (year: number): boolean => {
  const now = new Date();
  const christmas = new Date(year, 11, 25, 0, 0, 0, 0);
  const nextDay = new Date(year, 11, 26, 0, 0, 0, 0);
  
  return now >= christmas && now < nextDay;
};

export const getTreeDecorationProgress = (year: number): number => {
  const now = new Date();
  const christmasEve = new Date(year, 11, 24, 0, 0, 0, 0);
  const christmasDay = new Date(year, 11, 25, 0, 0, 0, 0);
  
  // Before Christmas Eve
  if (now < christmasEve) {
    return 0;
  }
  
  // After Christmas Day
  if (now >= christmasDay) {
    return 100;
  }
  
  // During the 24-hour decoration period
  const totalMs = christmasDay.getTime() - christmasEve.getTime();
  const elapsedMs = now.getTime() - christmasEve.getTime();
  
  return Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
};

export const shouldShowTree = (year: number): boolean => {
  const now = new Date();
  const christmasEve = new Date(year, 11, 24, 0, 0, 0, 0);
  const dayAfterChristmas = new Date(year, 11, 26, 0, 0, 0, 0);
  
  return now >= christmasEve && now < dayAfterChristmas;
};

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export const getTargetYear = (selectedYear: number): number => {
  const now = new Date();
  const christmas = new Date(selectedYear, 11, 25, 0, 0, 0, 0);
  
  // If Christmas has passed, auto-advance to next year
  if (now >= new Date(selectedYear, 11, 26, 0, 0, 0, 0)) {
    return selectedYear + 1;
  }
  
  return selectedYear;
};

