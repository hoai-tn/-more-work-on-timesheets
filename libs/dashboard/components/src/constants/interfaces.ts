import { DateTime } from "luxon";
import { ProjectEntity } from "@cupola/types";

declare module "react" {}

export interface IUserUpdateForm {
  email: string | null;
  currPw: string | null;
  newPw: string | null;
  newPwConfirm: string | null;
}

export interface IInternalTeam {
  id: string;
  name: string;
  roleId: string;
  email: string;
  phoneNumber: string;
  weeklyTargetHours: number;
  vacationDayAllowance: number;
  sickDayAllowance: number;
  billingRate: number;
  salaryRate: number;
}

export const BlankTeamMember: IInternalTeam = {
  id: "",
  name: "",
  roleId: "",
  email: "",
  phoneNumber: "",
  weeklyTargetHours: 0,
  vacationDayAllowance: 0,
  sickDayAllowance: 0,
  billingRate: 0,
  salaryRate: 0,
};

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    nexttab?: string;
    pretab?: string;
  }
}

export interface IUserUpdateForm {
  email: string | null;
  currPw: string | null;
  newPw: string | null;
  newPwConfirm: string | null;
}
// timesheet page interfaces
export interface ITaskWeek {
  fieldName: string;
  hoursOfTaskWeek: Array<ITimeEntry>;
  startTabIndex: number;
  onChangeHoursOfTaskWeeks: (hoursOfTaskWeek: Array<ITimeEntry>) => void;
  isEditableEntries: boolean;
}
export interface ITimesheetsPage {
  onChangeTimesheetEntries: (item: string) => void;
}
export interface ITimesheets {
  [index: string]: {
    [index: string]: ITimeEntry[];
  };
}

export interface ITimeEntry {
  date: DateTime | string;
  hours: number;
  minutes: number;
  notes: string;
}

export interface IWeeklyTimeEntry {
  [index: string]: ITimeEntry;
}

export interface IWeeklyHours {
  entries: IWeeklyTimeEntry;
  totalHours: number;
}

export interface ITimesheetHoursWorkedProp {
  startDate: string;
  endDate: string;
  totalHoursWorked: number;
  hoursAvailable: number;
  onChangeHoursWorked?: (hoursWorked: {
    startDate: string;
    endDate: string;
    totalHoursWorked: number;
    hoursAvailable: number;
    utilizationRate: number;
  }) => void | undefined;
}

export interface ITimesheetNoteForm {
  date: string;
  project: string;
  phase: string;
  notes: string;
}

export interface ITimsheetNoteDialog {
  startDate: string;
  title: string;
  isOpen: boolean;
  onSubmitForm: (timeEntry: ITimesheetNoteForm) => void;
  onClose?: () => void;

  projects?: ProjectEntity[];
}

export enum TypeRow {
  Project,
  Phase,
  Total,
}

export interface ITimesheet {
  id: number;
  PhaseName: string;
  TotalHours: number;
  Monday: ITimeEntry;
  Tuesday: ITimeEntry;
  Wednesday: ITimeEntry;
  Thursday: ITimeEntry;
  Friday: ITimeEntry;
  Saturday: ITimeEntry;
  Sunday: ITimeEntry;
  Type: TypeRow;
  PhaseOfProject: string;
  Project?: ProjectEntity;
  IsDisable: boolean;
}
