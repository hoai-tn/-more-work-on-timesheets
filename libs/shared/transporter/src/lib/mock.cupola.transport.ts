import { getAllProjects } from "./mocks/projects";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CupolaTransporter, Transporter } from "./cupola-transporter";
import { APIRoutes, apiRoutes } from "./routes";
import { ProjectEntity, TimesheetEntryEntity } from "@cupola/types";
import { AxiosInstance, AxiosResponse } from "axios";
import { timesheetPost, timesheetsGet } from "./mocks";
import { getAllClients } from "./mocks/clients";

export class MockCupolaTransport implements CupolaTransporter {
  timesheet = {
    get: (
      startDate: Date,
      endDate: Date
    ): Promise<AxiosResponse<TimesheetEntryEntity[]>> =>
      timesheetsGet(startDate, endDate),
    post: ({
      date,
      phaseName,
      billable_hours,
      billable_minutes,
      non_billable_hours,
      non_billable_minutes,
      notes,
      projectId,
    }: {
      date: Date;
      phaseName: string;
      billable_hours: number;
      billable_minutes: number;
      non_billable_hours: number;
      non_billable_minutes: number;
      notes: string;
      projectId: string;
    }): Promise<AxiosResponse<Partial<TimesheetEntryEntity>>> =>
      timesheetPost({
        date,
        phaseName,
        billable_hours,
        billable_minutes,
        non_billable_hours,
        non_billable_minutes,
        notes,
        projectId,
      }),
  };
  http: AxiosInstance = undefined as unknown as AxiosInstance;
  host: string = undefined as unknown as string;
  apiRoutes: APIRoutes = apiRoutes;

  project = {
    getAll: async (filter?: Partial<ProjectEntity>): Promise<AxiosResponse> =>
      getAllProjects(),
  };
  client = {
    getAll: async (): Promise<AxiosResponse> => getAllClients(),
  };
  role = {
    getAll: (): Promise<AxiosResponse> => {
      throw new Error("not implemented");
    },
  };
}

export const initMockTransport = (): Transporter => {
  return {
    cupola: new MockCupolaTransport(),
  };
};
