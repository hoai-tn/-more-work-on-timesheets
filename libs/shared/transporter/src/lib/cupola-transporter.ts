import { AxiosInstance, AxiosResponse } from "axios";
import {
  ProjectEntity,
  ClientEntity,
  TimesheetEntryEntity,
} from "@cupola/types";
import { APIRoutes } from "./routes";

export interface Transporter {
  cupola: CupolaTransporter;
}

export interface CupolaTransporter {
  http: AxiosInstance;
  host: string;
  apiRoutes: APIRoutes;

  project: {
    getAll: (filter?: Partial<ProjectEntity>) => Promise<AxiosResponse>;
  };
  client: {
    getAll: () => Promise<AxiosResponse>;
  };
  timesheet: {
    get: (
      startDate: Date,
      endDate: Date
    ) => Promise<AxiosResponse<TimesheetEntryEntity[]>>;
    post: (payload: {
      date: Date;
      phaseName: string;
      billable_hours: number;
      billable_minutes: number;
      non_billable_hours: number;
      non_billable_minutes: number;
      notes: string;
      projectId: string;
    }) => Promise<AxiosResponse<Partial<TimesheetEntryEntity>>>;
  };
}
