import { CupolaTransporter } from "./cupola-transporter";
import { AxiosInstance, AxiosResponse } from "axios";

import {
  ProjectEntity,
  TimesheetEntryEntity,
} from "@cupola/types";
import { APIRoutes } from "./routes";

export class CupolaAPITransport implements CupolaTransporter {
  host: string;
  constructor(
    readonly getHost: () => string,
    readonly http: AxiosInstance,
    readonly apiRoutes: APIRoutes
  ) {
    this.host = getHost();
  }

  project = {
    getAll: async (filter?: Partial<ProjectEntity>): Promise<AxiosResponse> => {
      return this.http.get(`${this.host}/${this.apiRoutes.projects.getAll}`, {
        params: filter,
      });
    }
  };
  client = {
    getAll: async (filter?: Partial<ClientTypes>): Promise<AxiosResponse> => {
      return this.http.get(`${this.host}/${this.apiRoutes.clients.getAll}`, {
        params: filter,
      });
    }
  };
  timesheet = {
    get: (
      startDate: Date,
      endDate: Date
    ): Promise<AxiosResponse<TimesheetEntryEntity[]>> => {
      return this.http.get(`${this.host}/${this.apiRoutes.timesheet.get}`, {
        params: {
          startDate: startDate.toISOString().replace(/T.*/, ""),
          endDate: endDate.toISOString().replace(/T.*/, ""),
        },
      });
    },
    post: (
      date: Date,
      hours: number,
      minutes: number,
      projectId: string,
      notes: string,
      phase: string
    ): Promise<AxiosResponse<Partial<TimesheetEntryEntity>>> => {
      return this.http.post(`${this.host}/${this.apiRoutes.timesheet.post}`, {
        date: date,
        hours: hours,
        minutes: minutes,
        notes: notes,
        phase: phase,
        projectId: projectId,
      });
    },
  };
}
