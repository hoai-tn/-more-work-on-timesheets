import { getAllProjects } from './mocks/projects';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CupolaTransporter, Transporter } from "./cupola-transporter";
import { APIRoutes, apiRoutes } from "./routes";
import {
  ProjectEntity,
  TimesheetEntryEntity,
} from "@cupola/types";
import { AxiosInstance, AxiosResponse } from "axios";
import { timesheetPost, timesheetsGet } from "./mocks";
import { getAllClients } from './mocks/clients';

export class MockCupolaTransport implements CupolaTransporter {
  timesheet = {
    get: (
      startDate: Date,
      endDate: Date
    ): Promise<AxiosResponse<TimesheetEntryEntity[]>> =>
      timesheetsGet(startDate, endDate),
    post: (
      date: Date,
      hours: number,
      minutes: number,
      projectId: string,
      notes: string,
      phase: string
    ): Promise<AxiosResponse<Partial<TimesheetEntryEntity>>> =>
      timesheetPost(date, hours, minutes, notes, phase, projectId),
  };
  http: AxiosInstance = undefined as unknown as AxiosInstance;
  host: string = undefined as unknown as string;
  apiRoutes: APIRoutes = apiRoutes;

  project = {
    getAll: async (filter?: Partial<ProjectEntity>): Promise<AxiosResponse> => getAllProjects(),
  }
  client = {
    getAll: async (): Promise<AxiosResponse> => getAllClients(),
  }
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
