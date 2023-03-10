import { TypeRow } from "./../../../constants/interfaces";
import { Dayjs } from "dayjs";
import { v4 as UUIDv4 } from "uuid";

import {
  ITimeEntry,
  ITimesheet,
  IWeeklyHours,
  IWeeklyTimeEntry,
} from "../../../constants/interfaces";
import {
  ClientEntity,
  ProjectEntity,
  TimesheetEntryEntity,
} from "@cupola/types";
import { DatesByDay, days } from "./timesheet-page";
import { DateTime } from "luxon";

export const renderRow = (row: {
  id: string;
  phaseName: string;
  hoursByDay: { [index: string]: ITimeEntry };
  totalHours: number;
  type: TypeRow;
  project?: ProjectEntity | null;
  clientName?: string;
  billableName?: string;
  client?: ClientEntity | null;
}) => {
  const {
    id,
    phaseName,
    hoursByDay,
    totalHours,
    type,
    project,
    billableName,
    client,
  } = row;
  let hierarchy;
  let phase = "";
  switch (type) {
    case TypeRow.Client:
      phase = client?.name || "";
      hierarchy = [client?.name];
      break;
    case TypeRow.Project:
      phase = phaseName;
      hierarchy = [client?.name, project?.name];
      break;
    case TypeRow.Billable:
    case TypeRow.NoneBillable:
      phase = billableName || "";
      hierarchy = [client?.name, project?.name, phaseName, billableName];
      break;
    case TypeRow.Total:
      phase = phaseName;
      hierarchy = [phaseName];
      break;
    default:
      phase = phaseName;
      hierarchy = [client?.name, project?.name, phaseName];
  }
  return {
    id,
    hierarchy,
    PhaseName: phase,
    Monday: hoursByDay["Monday"],
    Tuesday: hoursByDay["Tuesday"],
    Wednesday: hoursByDay["Wednesday"],
    Thursday: hoursByDay["Thursday"],
    Friday: hoursByDay["Friday"],
    Saturday: hoursByDay["Saturday"],
    Sunday: hoursByDay["Sunday"],
    TotalHours: totalHours,
    Type: type,
    Project: project,
    Client: client,
    IsDisable: false,
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

export const handleUpdateTimesheetForEditEntry = (
  timesheets,
  dayOfWeek,
  row,
  newHours,
  sumHours
) => {
  const phaseByHierarchy = row?.hierarchy[2] || "";
  return timesheets.map((timesheet: ITimesheet) => {
    const entry = {
      ...(timesheet[dayOfWeek as keyof ITimesheet] as ITimeEntry),
    };
    // Update total hours and hours for matching Project, phase or client phase
    if (
      timesheet.PhaseName === row.Project?.name ||
      timesheet.Type === TypeRow.Total ||
      (timesheet.Type === TypeRow.Client &&
        timesheet.Client?.name === row.Client?.name)
    ) {
      return {
        ...timesheet,
        [dayOfWeek]: { ...entry, hours: entry.hours + sumHours },
        TotalHours: timesheet.TotalHours + sumHours,
      };
    }
    // Update total hours and hours for matching id
    if (timesheet.id === row.id) {
      return {
        ...timesheet,
        [dayOfWeek]: {
          ...entry,
          hours: newHours,
        },
        TotalHours: row.TotalHours + sumHours,
      };
    }
    // update parent phase of entry edit commit
    if (
      timesheet.Project?.id === row.Project?.id &&
      timesheet.PhaseName === phaseByHierarchy
    ) {
      return {
        ...timesheet,
        [dayOfWeek]: {
          ...entry,
          hours:
            (timesheet[dayOfWeek as keyof ITimesheet] as ITimeEntry).hours +
            sumHours,
        },
        TotalHours: timesheet.TotalHours + sumHours,
      };
    }
    return timesheet;
  });
};

export const handleDataToRenderClient = (formatDataForGridData, client) => {
  const totalHoursByProject: { [index: string]: ITimeEntry } = {};
  let totalAllOfProject = 0;
  days.forEach((day, index) => {
    let totalHours = 0;
    formatDataForGridData.forEach((item) => {
      if (item.Project?.clientId === client.id && item.Type === TypeRow.Project)
        totalHours += Number(
          // total hours by project
          (item[day as keyof ITimesheet] as ITimeEntry).hours
        );
    });
    totalHoursByProject[day] = {
      date: "",
      hours: totalHours,
      minutes: 0,
      notes: "",
    };
    totalAllOfProject += totalHours;
  });
  return renderRow({
    id: UUIDv4(),
    phaseName: "Total # Hours",
    hoursByDay: totalHoursByProject,
    totalHours: totalAllOfProject,
    type: TypeRow.Client,
    client,
  });
};

export const handleDataToRenderTotalRow = (formatDataForGridData) => {
  const totalHoursByClient: { [index: string]: ITimeEntry } = {};
  let totalAllOfClients = 0;
  days.forEach((day, index) => {
    let totalHours = 0;
    formatDataForGridData.forEach((item) => {
      if (item.Type === TypeRow.Client) {
        totalHours += Number(
          // total hours by project
          (item[day as keyof ITimesheet] as ITimeEntry).hours
        );
      }
    });
    totalHoursByClient[day] = {
      date: "",
      hours: totalHours,
      minutes: 0,
      notes: "",
    };
    totalAllOfClients += totalHours;
  });

  return renderRow({
    id: UUIDv4(),
    phaseName: "Total # Hours",
    hoursByDay: totalHoursByClient,
    totalHours: totalAllOfClients,
    type: TypeRow.Total,
  });
};

export const handlePhaseAndChildOfPhaseToRender = (
  timeEntryByPhase,
  client,
  project,
  phase,
  type: TypeRow
) => {
  const hoursByDay: { [index: string]: ITimeEntry } = {};

  timeEntryByPhase.forEach((item: TimesheetEntryEntity) => {
    hoursByDay[DateTime.fromISO(item.date.toString()).weekdayLong] = {
      date: item.date.toString(),
      notes: item.notes,
      hours: calculateHoursByTypeRow(item, type),
      minutes: 0,
    };
  });
  return renderRow({
    id: UUIDv4(),
    phaseName: phase,
    billableName: type === TypeRow.Billable ? "Billable" : "Non-billable",
    hoursByDay,
    totalHours: totalHours(hoursByDay),
    type,
    project,
    clientName: client.name,
    client,
  });
};
const calculateHoursByTypeRow = (row, type) => {
  switch (type) {
    case TypeRow.Billable:
      return row.billable_hours + row.billable_minutes / 60;
    case TypeRow.NoneBillable:
      return row.non_billable_hours + row.non_billable_minutes / 60;
    case TypeRow.Phase:
      return (
        row.billable_hours +
        row.billable_minutes / 60 +
        (row.non_billable_hours + row.non_billable_minutes / 60)
      );
  }
};
