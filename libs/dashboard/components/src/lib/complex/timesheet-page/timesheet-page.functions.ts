import { Dayjs } from "dayjs";
import {
  ITimeEntry,
  ITimesheet,
  IWeeklyHours,
  IWeeklyTimeEntry,
  TypeRow,
} from "../../../constants/interfaces";
import { ProjectEntity, TimesheetEntryEntity } from "@cupola/types";
import { DatesByDay, days } from "./timesheet-page";
import { DateTime } from "luxon";

export const renderRow = (
  id: number,
  PhaseName: string,
  hoursByDay: IWeeklyTimeEntry,
  TotalHours: number,
  Type: TypeRow,
  PhaseOfProject = "",
  Project?: ProjectEntity
) => {
  return {
    id,
    PhaseName,
    Monday: hoursByDay["Monday"],
    Tuesday: hoursByDay["Tuesday"],
    Wednesday: hoursByDay["Wednesday"],
    Thursday: hoursByDay["Thursday"],
    Friday: hoursByDay["Friday"],
    Saturday: hoursByDay["Saturday"],
    Sunday: hoursByDay["Sunday"],
    TotalHours,
    Type,
    PhaseOfProject,
    Project,
  } as ITimesheet;
};

export const getDayName = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-us", {
    weekday: "long",
  });
};

export const getWeekDates = (isoDate?: string): DatesByDay => {
  const datesByDay = new DatesByDay();
  const startDate = DateTime.fromISO(getWeekBeginning(isoDate).toString());

  days.forEach((day, indexDay) => {
    datesByDay[day as keyof DatesByDay] = startDate.plus({ days: indexDay });
  });

  return datesByDay;
};

export const getWeekBeginning = (isoDate?: string): DateTime => {
  const date = isoDate ? DateTime.fromISO(isoDate) : DateTime.local();

  return date.setLocale("en-US").startOf("week");
};

export const totalHours = (totalHoursByDay: {
  [index: string]: ITimeEntry;
}) => {
  return (Object.keys(totalHoursByDay).length &&
    Object.values(totalHoursByDay)
      .map((timeEntry) => Number(timeEntry["hours"]))
      .reduce((a, b) => a + b, 0)) as number;
};

export const totalHoursPerDay = (
  timeEntries: TimesheetEntryEntity[]
): IWeeklyTimeEntry => {
  const totalHoursByDay: IWeeklyTimeEntry = {};

  days.forEach((day, dayIndex) => {
    // get timeEntries by day
    const timeEntriesByDay = timeEntries.filter(
      (entry: TimesheetEntryEntity) => {
        const dateStr = entry.date.toISOString();
        const weekdayLong = DateTime.fromISO(dateStr).weekdayLong;

        return weekdayLong === day;
      }
    );

    const reduceHours = timeEntriesByDay
      .map((e: TimesheetEntryEntity) => {
        return e.hours + e.minutes / 60;
      }) // total hours and minutes
      .reduce((a: number, b: number) => a + b, 0); // total hours by phase

    totalHoursByDay[days[dayIndex]] = {
      date: "",
      hours: reduceHours,
      minutes: 0,
      notes: "",
    };
  });

  return totalHoursByDay;
};

export const totalHoursByPhase = (
  timeEntries: TimesheetEntryEntity[],
  phase: string
): IWeeklyTimeEntry => {
  const phaseByDay: IWeeklyTimeEntry = {};

  const timeEntryByPhase = timeEntries.filter(
    (entry: TimesheetEntryEntity) => entry.phase === phase
  );

  timeEntryByPhase.forEach((item: TimesheetEntryEntity) => {
    const weekday = DateTime.fromISO(item.date.toISOString()).weekdayLong;
    phaseByDay[weekday] = {
      date: item.date.toString(),
      notes: item.notes,
      hours: calculateHours(item),
      minutes: 0,
    };
  });

  return phaseByDay;
};

export const totalHoursByProject = (timesheets: ITimesheet[]): IWeeklyHours => {
  const weeklyHours: IWeeklyHours = {
    entries: {},
    totalHours: 0,
  };

  days.forEach((day, index) => {
    let totalHours = 0;
    timesheets.forEach((item) => {
      if (item.Type === TypeRow.Project)
        totalHours += Number(
          // total hours by project
          (item[day as keyof ITimesheet] as ITimeEntry).hours
        );
    });

    weeklyHours.entries[day] = {
      date: "",
      hours: totalHours,
      minutes: 0,
      notes: "",
    };

    weeklyHours.totalHours += totalHours;
  });

  return weeklyHours;
};

const calculateHours = (
  hours: number | { hours: number; minutes: number },
  minutes?: number
): number => {
  if (typeof hours === "number") {
    if (minutes !== undefined) {
      hours = hours + minutes / 60;
    }

    return hours;
  }

  return hours.hours + hours.minutes / 60;
};

export const filterTimesheet = (timesheets: ITimesheet[]) =>
  timesheets.filter((e) => !e.IsDisable);
  
export const shouldDisableDate = (date: Dayjs) => {
  // disable all days except Mondays
  return date.day() !== 1;
};
