import { differenceInDays, format, parse, addDays, isToday as isTodayFns } from 'date-fns';
import { START_DATE, TOTAL_DAYS } from '../constants/xp';

const startDate = parse(START_DATE, 'yyyy-MM-dd', new Date());

export function getCurrentDay(): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const diff = differenceInDays(today, start) + 1;
  return Math.max(1, Math.min(diff, TOTAL_DAYS));
}

export function getWeekNumber(dayNumber: number): number {
  return Math.ceil(dayNumber / 7);
}

export function getDayDate(dayNumber: number): string {
  const date = addDays(startDate, dayNumber - 1);
  return format(date, 'dd MMM yyyy');
}

export function getDayDateShort(dayNumber: number): string {
  const date = addDays(startDate, dayNumber - 1);
  return format(date, 'dd MMM');
}

export function isDayToday(dayNumber: number): boolean {
  const date = addDays(startDate, dayNumber - 1);
  return isTodayFns(date);
}

export function getFormattedToday(): string {
  return format(new Date(), 'EEEE, dd MMM yyyy');
}

export function getDaysRemaining(): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = parse('2026-07-21', 'yyyy-MM-dd', new Date());
  end.setHours(0, 0, 0, 0);
  const diff = differenceInDays(end, today);
  return Math.max(0, diff);
}

export function getPhaseForDay(dayNumber: number): string {
  if (dayNumber <= 21) return 'Foundation Building';
  if (dayNumber <= 35) return 'Core Building';
  if (dayNumber <= 42) return 'Completion & Advanced';
  return 'Mock Test Intensive';
}
