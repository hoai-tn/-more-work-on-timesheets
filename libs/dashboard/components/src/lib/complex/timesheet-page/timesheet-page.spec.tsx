import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TimesheetsPage } from "./timesheet-page";
import { AxiosResponse } from "axios";

import {
  ClientEntity,
  fakeArchitect,
  fakeClient,
  fakeProject,
  ProjectAndTaskPhase,
  ProjectEntity,
  TimesheetEntryEntity,
} from "@cupola/types";

const architect = fakeArchitect();
const project1 = fakeProject("Project1");
project1.id = "553f8fab-ec03-47ef-9000-9ac05cd1a689";
project1.clientId = "1";

const project2 = fakeProject("Project2");
project2.id = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";
project2.clientId = "1";

const client = fakeClient();
client.id = "1";

jest.mock("@cupola/transporter", () => {
  return {
    initMockTransport: () => ({
      cupola: {
        timesheet: {
          get: (startDate: string, endDate: string) => {
            return new Promise<AxiosResponse>((resolve) =>
              resolve({
                data: [
                  {
                    date: "2022-12-19",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Overhead",
                    project: project1,
                  },
                  {
                    date: "2022-12-20",
                    hours: 0,
                    minutes: 30,
                    notes: "",
                    phase: "Overhead",
                    project: project1,
                  },
                  {
                    date: "2022-12-21",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Overhead",
                    project: project1,
                  },
                  {
                    date: "2022-12-22",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Overhead",
                    project: project1,
                  },
                  {
                    date: "2022-12-23",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Overhead",
                    project: project1,
                  },
                  {
                    date: "2022-12-24",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Overhead",
                    project: project1,
                  },
                  {
                    date: "2022-12-25",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Overhead",
                    project: project1,
                  },
                  {
                    date: "2022-12-19",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Pre Design",
                    project: project1,
                  },
                  {
                    date: "2022-12-20",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Pre Design",
                    project: project1,
                  },
                  {
                    date: "2022-12-21",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Pre Design",
                    project: project1,
                  },
                  {
                    date: "2022-12-22",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Pre Design",
                    project: project1,
                  },
                  {
                    date: "2022-12-23",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Pre Design",
                    project: project1,
                  },
                  {
                    date: "2022-12-24",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Pre Design",
                    project: project1,
                  },
                  {
                    date: "2022-12-25",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Pre Design",
                    project: project1,
                  },
                  {
                    date: "2022-12-19",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Schematic Design",
                    project: project1,
                  },
                  {
                    date: "2022-12-20",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Schematic Design",
                    project: project1,
                  },
                  {
                    date: "2022-12-21",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Schematic Design",
                    project: project1,
                  },
                  {
                    date: "2022-12-22",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Schematic Design",
                    project: project1,
                  },
                  {
                    date: "2022-12-23",
                    hours: 2,
                    minutes: 0,
                    notes: "",
                    phase: "Schematic Design",
                    project: project1,
                  },
                  {
                    date: "2022-12-24",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Schematic Design",
                    project: project1,
                  },
                  {
                    date: "2022-12-25",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Schematic Design",
                    project: project1,
                  },
                  {
                    date: "2022-12-19",
                    hours: 0,
                    minutes: 30,
                    notes: "",
                    phase: "Add a Phase",
                    project: project1,
                  },
                  {
                    date: "2022-12-20",
                    hours: 0,
                    minutes: 30,
                    notes: "",
                    phase: "Add a Phase",
                    project: project1,
                  },
                  {
                    date: "2022-12-21",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Add a Phase",
                    project: project1,
                  },
                  {
                    date: "2022-12-22",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Add a Phase",
                    project: project1,
                  },
                  {
                    date: "2022-12-23",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Add a Phase",
                    project: project1,
                  },
                  {
                    date: "2022-12-24",
                    hours: 0,
                    minutes: 30,
                    notes: "",
                    phase: "Add a Phase",
                    project: project1,
                  },
                  {
                    date: "2022-12-25",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Add a Phase",
                    project: project1,
                  },
                  {
                    date: "2022-12-19",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Overhead",
                    project: project2,
                  },
                  {
                    date: "2022-12-20",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Overhead",
                    project: project2,
                  },
                  {
                    date: "2022-12-21",
                    hours: 0,
                    minutes: 30,
                    notes: "",
                    phase: "Overhead",
                    project: project2,
                  },
                  {
                    date: "2022-12-22",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Overhead",
                    project: project2,
                  },
                  {
                    date: "2022-12-23",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Overhead",
                    project: project2,
                  },
                  {
                    date: "2022-12-24",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Overhead",
                    project: project2,
                  },
                  {
                    date: "2022-12-25",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Overhead",
                    project: project2,
                  },
                  {
                    date: "2022-12-19",
                    hours: 0,
                    minutes: 30,
                    notes: "",
                    phase: "Pre Design",
                    project: project2,
                  },
                  {
                    date: "2022-12-20",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Pre Design",
                    project: project2,
                  },
                  {
                    date: "2022-12-21",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Pre Design",
                    project: project2,
                  },
                  {
                    date: "2022-12-22",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Pre Design",
                    project: project2,
                  },
                  {
                    date: "2022-12-23",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Pre Design",
                    project: project2,
                  },
                  {
                    date: "2022-12-24",
                    hours: 0,
                    minutes: 30,
                    notes: "",
                    phase: "Pre Design",
                    project: project2,
                  },
                  {
                    date: "2022-12-25",
                    hours: 0,
                    minutes: 0,
                    notes: "",
                    phase: "Pre Design",
                    project: project2,
                  },
                  {
                    date: "2022-12-19",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Schematic Design",
                    project: project2,
                  },
                  {
                    date: "2022-12-20",
                    hours: 0,
                    minutes: 30,
                    notes: "",
                    phase: "Schematic Design",
                    project: project2,
                  },
                  {
                    date: "2022-12-21",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Schematic Design",
                    project: project2,
                  },
                  {
                    date: "2022-12-22",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Schematic Design",
                    project: project2,
                  },
                  {
                    date: "2022-12-23",
                    hours: 1,
                    minutes: 0,
                    notes: "",
                    phase: "Schematic Design",
                    project: project2,
                  },
                  {
                    date: "2022-12-24",
                    hours: 2,
                    minutes: 0,
                    notes: "",
                    phase: "Schematic Design",
                    project: project2,
                  },
                  {
                    date: "2022-12-25",
                    hours: 2,
                    minutes: 0,
                    notes: "",
                    phase: "Schematic Design",
                    project: project2,
                  },
                ],
                status: 200,
                statusText: "OK",
                headers: {
                  ContentLocation: `/timesheet}`,
                },
                config: {},
              })
            );
          },
          post: (
            date: Date,
            hours: number,
            minutes: number,
            projectId: string,
            notes: string,
            phase: string
          ): Promise<Partial<TimesheetEntryEntity>> => {
            const project = fakeProject("Project1");
            console.log({ projectId });

            project.id = projectId;
            return new Promise((resolve) =>
              resolve({
                date: date,
                hours: hours,
                minutes: minutes,
                notes: notes,
                phase: phase as unknown as ProjectAndTaskPhase,
                project: project,
              })
            );
          },
        },
        project: {
          getAll: (filter?: Partial<ProjectEntity>): Promise<AxiosResponse> => {
            project1.clientId = client.id;
            project2.clientId = client.id;
            return new Promise<AxiosResponse>((resolve) =>
              resolve({
                data: [project1, project2],
                status: 201,
                statusText: "OK",
                headers: {
                  ContentLocation: `/timesheet`,
                },
                config: {},
              })
            );
          },
        },
        client: {
          getAll: (filter?: Partial<ClientEntity>): Promise<AxiosResponse> => {
            return new Promise<AxiosResponse>((resolve) =>
              resolve({
                data: [client],
                status: 201,
                statusText: "OK",
                headers: {
                  ContentLocation: `/clients`,
                },
                config: {},
              })
            );
          },
        },
      },
    }),
  };
});
describe("Timesheets Page", () => {
  const updateTimesheetMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", async () => {
    const { baseElement } = render(
      <TimesheetsPage
        onChangeTimesheetEntries={(e: string) => {
          console.log(e);

          updateTimesheetMock(e);
        }}
      />
    );

    expect(baseElement).toBeTruthy();

    await waitFor(() => {
      //before update
      expect(screen.getByTestId("total-hours-worked")?.textContent).toEqual(
        "31"
      );
      expect(screen.getByTestId("utilization-rate")?.textContent).toEqual(
        "77.50"
      );
      expect(updateTimesheetMock).toBeCalledTimes(1);
      expect(updateTimesheetMock).toBeCalledWith(
        `[{"id":1,"hierarchy":["Client","Project1"],"PhaseName":"Project1","Monday":{"date":"","hours":2.5,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":1,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":1,"minutes":0,"notes":""},"Thursday":{"date":"","hours":3,"minutes":0,"notes":""},"Friday":{"date":"","hours":4,"minutes":0,"notes":""},"Saturday":{"date":"","hours":0.5,"minutes":0,"notes":""},"Sunday":{"date":"","hours":3,"minutes":0,"notes":""},"TotalHours":15,"Type":0,"PhaseOfProject":"","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":2,"hierarchy":["Client","Project1","Overhead"],"PhaseName":"Overhead","Monday":{"date":"2022-12-19","notes":"","hours":0,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0.5,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":1,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":1,"minutes":0},"TotalHours":3.5,"Type":1,"PhaseOfProject":"Project1","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":3,"hierarchy":["Client","Project1","Pre Design"],"PhaseName":"Pre Design","Monday":{"date":"2022-12-19","notes":"","hours":1,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":1,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":0,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":1,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":0,"minutes":0},"TotalHours":3,"Type":1,"PhaseOfProject":"Project1","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":4,"hierarchy":["Client","Project1","Schematic Design"],"PhaseName":"Schematic Design","Monday":{"date":"2022-12-19","notes":"","hours":1,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":2,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":1,"minutes":0},"TotalHours":5,"Type":1,"PhaseOfProject":"Project1","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":5,"hierarchy":["Client","Project1","Add a Phase"],"PhaseName":"Add a Phase","Monday":{"date":"2022-12-19","notes":"","hours":0.5,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0.5,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":0,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0.5,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":1,"minutes":0},"TotalHours":3.5,"Type":1,"PhaseOfProject":"Project1","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":6,"hierarchy":["Client","Project2"],"PhaseName":"Project2","Monday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":2.5,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Thursday":{"date":"","hours":3,"minutes":0,"notes":""},"Friday":{"date":"","hours":2,"minutes":0,"notes":""},"Saturday":{"date":"","hours":2.5,"minutes":0,"notes":""},"Sunday":{"date":"","hours":3,"minutes":0,"notes":""},"TotalHours":16,"Type":0,"PhaseOfProject":"","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":7,"hierarchy":["Client","Project2","Overhead"],"PhaseName":"Overhead","Monday":{"date":"2022-12-19","notes":"","hours":0,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":1,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0.5,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":0,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":1,"minutes":0},"TotalHours":3.5,"Type":1,"PhaseOfProject":"Project2","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":8,"hierarchy":["Client","Project2","Pre Design"],"PhaseName":"Pre Design","Monday":{"date":"2022-12-19","notes":"","hours":0.5,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":1,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":1,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0.5,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":0,"minutes":0},"TotalHours":4,"Type":1,"PhaseOfProject":"Project2","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":9,"hierarchy":["Client","Project2","Schematic Design"],"PhaseName":"Schematic Design","Monday":{"date":"2022-12-19","notes":"","hours":1,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0.5,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":1,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":1,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":2,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":2,"minutes":0},"TotalHours":8.5,"Type":1,"PhaseOfProject":"Project2","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":10,"hierarchy":["Client","Project2","Add a Phase"],"PhaseName":"Add a Phase","TotalHours":0,"Type":1,"PhaseOfProject":"Project2","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":11,"hierarchy":["Client","Total # Hours"],"PhaseName":"Total # Hours","Monday":{"date":"","hours":4,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":3.5,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":2.5,"minutes":0,"notes":""},"Thursday":{"date":"","hours":6,"minutes":0,"notes":""},"Friday":{"date":"","hours":6,"minutes":0,"notes":""},"Saturday":{"date":"","hours":3,"minutes":0,"notes":""},"Sunday":{"date":"","hours":6,"minutes":0,"notes":""},"TotalHours":31,"Type":2,"PhaseOfProject":"","Project":null,"IsDisable":false}]`
      );
    });
  });

  it("should update timesheet", async () => {
    const { baseElement } = render(
      <TimesheetsPage
        onChangeTimesheetEntries={(e: string) => updateTimesheetMock(e)}
      />
    );
    await waitFor(async () => {
      const explainClient = baseElement.querySelector(
        '[data-testid="KeyboardArrowRightIcon"]'
      );
      const explainProject = baseElement.querySelector(
        '[data-id="1"] [data-testid="KeyboardArrowRightIcon"]'
      );
      explainClient && fireEvent.click(explainClient);
      explainProject && fireEvent.click(explainProject);
      // updating
      const getTabItem = baseElement.querySelector(
        '[data-id="2"] > [data-field="Monday"]'
      );

      getTabItem && fireEvent.dblClick(getTabItem);
      const getEntry = baseElement.querySelector(
        '[data-id="2"] > [data-field="Monday"] input'
      );
      getEntry &&
        fireEvent.change(getEntry, {
          target: { value: "5" },
        });
      // getEntry && fireEvent.keyDown(getEntry, { key: "Enter", charCode: 13 });
      // after update
      expect(updateTimesheetMock).toBeCalled();
      expect(screen.getByTestId("total-hours-worked")?.textContent).toEqual(
        "36"
      );
      expect(screen.getByTestId("utilization-rate")?.textContent).toEqual(
        "90.00"
      );
      expect(updateTimesheetMock.mock.calls[1][0]).toBe(
        `[{"id":1,"hierarchy":["Client","Project1"],"PhaseName":"Project1","Monday":{"date":"","hours":7.5,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":1,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":1,"minutes":0,"notes":""},"Thursday":{"date":"","hours":3,"minutes":0,"notes":""},"Friday":{"date":"","hours":4,"minutes":0,"notes":""},"Saturday":{"date":"","hours":0.5,"minutes":0,"notes":""},"Sunday":{"date":"","hours":3,"minutes":0,"notes":""},"TotalHours":20,"Type":0,"PhaseOfProject":"","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":2,"hierarchy":["Client","Project1","Overhead"],"PhaseName":"Overhead","Monday":{"date":"2022-12-19","notes":"","hours":5,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0.5,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":1,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":1,"minutes":0},"TotalHours":8.5,"Type":1,"PhaseOfProject":"Project1","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":3,"hierarchy":["Client","Project1","Pre Design"],"PhaseName":"Pre Design","Monday":{"date":"2022-12-19","notes":"","hours":1,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":1,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":0,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":1,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":0,"minutes":0},"TotalHours":3,"Type":1,"PhaseOfProject":"Project1","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":4,"hierarchy":["Client","Project1","Schematic Design"],"PhaseName":"Schematic Design","Monday":{"date":"2022-12-19","notes":"","hours":1,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":2,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":1,"minutes":0},"TotalHours":5,"Type":1,"PhaseOfProject":"Project1","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":5,"hierarchy":["Client","Project1","Add a Phase"],"PhaseName":"Add a Phase","Monday":{"date":"2022-12-19","notes":"","hours":0.5,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0.5,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":0,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0.5,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":1,"minutes":0},"TotalHours":3.5,"Type":1,"PhaseOfProject":"Project1","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":6,"hierarchy":["Client","Project2"],"PhaseName":"Project2","Monday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":2.5,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Thursday":{"date":"","hours":3,"minutes":0,"notes":""},"Friday":{"date":"","hours":2,"minutes":0,"notes":""},"Saturday":{"date":"","hours":2.5,"minutes":0,"notes":""},"Sunday":{"date":"","hours":3,"minutes":0,"notes":""},"TotalHours":16,"Type":0,"PhaseOfProject":"","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":7,"hierarchy":["Client","Project2","Overhead"],"PhaseName":"Overhead","Monday":{"date":"2022-12-19","notes":"","hours":0,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":1,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0.5,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":0,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":1,"minutes":0},"TotalHours":3.5,"Type":1,"PhaseOfProject":"Project2","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":8,"hierarchy":["Client","Project2","Pre Design"],"PhaseName":"Pre Design","Monday":{"date":"2022-12-19","notes":"","hours":0.5,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":1,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":1,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0.5,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":0,"minutes":0},"TotalHours":4,"Type":1,"PhaseOfProject":"Project2","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":9,"hierarchy":["Client","Project2","Schematic Design"],"PhaseName":"Schematic Design","Monday":{"date":"2022-12-19","notes":"","hours":1,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0.5,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":1,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":1,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":2,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":2,"minutes":0},"TotalHours":8.5,"Type":1,"PhaseOfProject":"Project2","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":10,"hierarchy":["Client","Project2","Add a Phase"],"PhaseName":"Add a Phase","TotalHours":0,"Type":1,"PhaseOfProject":"Project2","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":11,"hierarchy":["Client","Total # Hours"],"PhaseName":"Total # Hours","Monday":{"date":"","hours":9,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":3.5,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":2.5,"minutes":0,"notes":""},"Thursday":{"date":"","hours":6,"minutes":0,"notes":""},"Friday":{"date":"","hours":6,"minutes":0,"notes":""},"Saturday":{"date":"","hours":3,"minutes":0,"notes":""},"Sunday":{"date":"","hours":6,"minutes":0,"notes":""},"TotalHours":36,"Type":2,"PhaseOfProject":"","Project":null,"IsDisable":false}]`
      );
    });
  });

  it("should submit note dialog", async () => {
    const { baseElement } = render(
      <TimesheetsPage
        onChangeTimesheetEntries={(e: string) => {
          updateTimesheetMock(e);
        }}
      />
    );
    // Open `Add a note` dialog
    fireEvent.click(screen.getByTestId("AddIcon"));

    // Select the project input field
    const selectProject = screen
      .getByTestId("select-project")
      .querySelector("input");
    // Select the phase input field
    const selectPhase = screen
      .getByTestId("select-phase")
      .querySelector("input");
    // Select the note input field
    const note = screen.getByTestId("note-input").querySelector("input");

    // input date
    fireEvent.click(screen.getByTestId("date-notes-text-field"));
    fireEvent.click(screen.getByTestId("PenIcon"));

    const date = baseElement.querySelector(
      ".MuiCalendarOrClockPicker-root input"
    );

    date &&
      fireEvent.change(date, {
        target: { value: "12/19/2022" },
      });

    fireEvent.click(screen.getByText("OK"));
    // select project
    selectProject &&
      fireEvent.change(selectProject, {
        target: { value: "Project1" },
      });
    console.log({ selectProject });

    const chooseProject = baseElement.querySelector(
      '.MuiAutocomplete-popper li[data-option-index="0"]'
    );
    console.log({ chooseProject });

    chooseProject && fireEvent.click(chooseProject);

    // select phase
    selectPhase &&
      fireEvent.change(selectPhase, {
        target: { value: "Overhead" },
      });
    const choosePhase = baseElement.querySelector(
      '.MuiAutocomplete-popper li[data-option-index="0"]'
    );
    choosePhase && fireEvent.click(choosePhase);
    console.log({ choosePhase });

    // input note
    note &&
      fireEvent.change(note, {
        target: { value: "adding notes test" },
      });
    const submitBtn = baseElement.querySelector(
      "[role='dialog'] [type='submit']"
    );
    // submit
    submitBtn && fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(updateTimesheetMock).toBeCalled();
      expect(updateTimesheetMock.mock.calls[1][0]).toBe(
        `[{"id":1,"hierarchy":["Client","Project1"],"PhaseName":"Project1","Monday":{"date":"","hours":2.5,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":1,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":1,"minutes":0,"notes":""},"Thursday":{"date":"","hours":3,"minutes":0,"notes":""},"Friday":{"date":"","hours":4,"minutes":0,"notes":""},"Saturday":{"date":"","hours":0.5,"minutes":0,"notes":""},"Sunday":{"date":"","hours":3,"minutes":0,"notes":""},"TotalHours":15,"Type":0,"PhaseOfProject":"","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":2,"hierarchy":["Client","Project1","Overhead"],"PhaseName":"Overhead","Monday":{"date":"2022-12-19","notes":"","hours":0,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0.5,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":1,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":1,"minutes":0},"TotalHours":3.5,"Type":1,"PhaseOfProject":"Project1","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":3,"hierarchy":["Client","Project1","Pre Design"],"PhaseName":"Pre Design","Monday":{"date":"2022-12-19","notes":"","hours":1,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":1,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":0,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":1,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":0,"minutes":0},"TotalHours":3,"Type":1,"PhaseOfProject":"Project1","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":4,"hierarchy":["Client","Project1","Schematic Design"],"PhaseName":"Schematic Design","Monday":{"date":"2022-12-19","notes":"","hours":1,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":2,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":1,"minutes":0},"TotalHours":5,"Type":1,"PhaseOfProject":"Project1","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":5,"hierarchy":["Client","Project1","Add a Phase"],"PhaseName":"Add a Phase","Monday":{"date":"2022-12-19","notes":"","hours":0.5,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0.5,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":0,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0.5,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":1,"minutes":0},"TotalHours":3.5,"Type":1,"PhaseOfProject":"Project1","Project":{"id":"553f8fab-ec03-47ef-9000-9ac05cd1a689","clientId":"1","name":"Project1","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":6,"hierarchy":["Client","Project2"],"PhaseName":"Project2","Monday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":2.5,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":1.5,"minutes":0,"notes":""},"Thursday":{"date":"","hours":3,"minutes":0,"notes":""},"Friday":{"date":"","hours":2,"minutes":0,"notes":""},"Saturday":{"date":"","hours":2.5,"minutes":0,"notes":""},"Sunday":{"date":"","hours":3,"minutes":0,"notes":""},"TotalHours":16,"Type":0,"PhaseOfProject":"","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":7,"hierarchy":["Client","Project2","Overhead"],"PhaseName":"Overhead","Monday":{"date":"2022-12-19","notes":"","hours":0,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":1,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0.5,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":0,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":1,"minutes":0},"TotalHours":3.5,"Type":1,"PhaseOfProject":"Project2","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":8,"hierarchy":["Client","Project2","Pre Design"],"PhaseName":"Pre Design","Monday":{"date":"2022-12-19","notes":"","hours":0.5,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":1,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":0,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":1,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":0.5,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":0,"minutes":0},"TotalHours":4,"Type":1,"PhaseOfProject":"Project2","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":9,"hierarchy":["Client","Project2","Schematic Design"],"PhaseName":"Schematic Design","Monday":{"date":"2022-12-19","notes":"","hours":1,"minutes":0},"Tuesday":{"date":"2022-12-20","notes":"","hours":0.5,"minutes":0},"Wednesday":{"date":"2022-12-21","notes":"","hours":1,"minutes":0},"Thursday":{"date":"2022-12-22","notes":"","hours":1,"minutes":0},"Friday":{"date":"2022-12-23","notes":"","hours":1,"minutes":0},"Saturday":{"date":"2022-12-24","notes":"","hours":2,"minutes":0},"Sunday":{"date":"2022-12-25","notes":"","hours":2,"minutes":0},"TotalHours":8.5,"Type":1,"PhaseOfProject":"Project2","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":10,"hierarchy":["Client","Project2","Add a Phase"],"PhaseName":"Add a Phase","TotalHours":0,"Type":1,"PhaseOfProject":"Project2","Project":{"id":"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d","clientId":"1","name":"Project2","derivedFeeTemplate":{"totalProjectTimeAmount":5000,"templates":[{"phase":"Overhead","numberOfHoursNotToExceed":200,"fixedFeePercentage":10,"_fixedFeeAmount":500,"consultantFeePercentage":20,"_consultantFeeAmount":1000,"projectTimePercentage":70,"_projectTimeAmount":3500,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Pre Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Schematic Design","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false},{"phase":"Add a Phase","numberOfHoursNotToExceed":100,"fixedFeePercentage":15,"_fixedFeeAmount":750,"consultantFeePercentage":25,"_consultantFeeAmount":1250,"projectTimePercentage":60,"_projectTimeAmount":3000,"_startDate":"2022-01-01","_endDate":"2022-12-31","_isDirty":false}],"type":"Fixed"},"contractType":{"TotalContractAmount":{"unit":"USD","value":10000000}}},"IsDisable":false},{"id":11,"hierarchy":["Client","Total # Hours"],"PhaseName":"Total # Hours","Monday":{"date":"","hours":4,"minutes":0,"notes":""},"Tuesday":{"date":"","hours":3.5,"minutes":0,"notes":""},"Wednesday":{"date":"","hours":2.5,"minutes":0,"notes":""},"Thursday":{"date":"","hours":6,"minutes":0,"notes":""},"Friday":{"date":"","hours":6,"minutes":0,"notes":""},"Saturday":{"date":"","hours":3,"minutes":0,"notes":""},"Sunday":{"date":"","hours":6,"minutes":0,"notes":""},"TotalHours":31,"Type":2,"PhaseOfProject":"","Project":null,"IsDisable":false}]`
      );
    });
  });
});
