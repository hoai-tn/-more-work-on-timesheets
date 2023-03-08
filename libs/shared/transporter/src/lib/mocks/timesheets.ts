import { AxiosResponse } from "axios";

export const timesheetsGet = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startDate: Date,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endDate: Date
): Promise<AxiosResponse> => {
  return new Promise<AxiosResponse>((resolve) =>
    resolve({
      data: [
        {
          billable_hours: 0,
          billable_minutes: 0,
          date: "2022-12-19",
          non_billable_hours: 0,
          non_billable_minutes: 30,
          notes: "",
          phase: "Overhead",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 0,
          billable_minutes: 0,
          date: "2022-12-20",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 0,
          billable_minutes: 0,
          date: "2022-12-21",
          non_billable_hours: 0,
          non_billable_minutes: 30,
          notes: "",
          phase: "Overhead",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-22",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 0,
          billable_minutes: 30,
          date: "2022-12-23",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-24",
          non_billable_hours: 0,
          non_billable_minutes: 30,
          notes: "",
          phase: "Overhead",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-25",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-19",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Pre Design",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 0,
          billable_minutes: 30,
          date: "2022-12-20",
          non_billable_hours: 0,
          non_billable_minutes: 30,
          notes: "",
          phase: "Pre Design",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-21",
          non_billable_hours: 1,
          non_billable_minutes: 0,
          notes: "",
          phase: "Pre Design",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 0,
          billable_minutes: 0,
          date: "2022-12-22",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Pre Design",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-23",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Pre Design",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-24",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Pre Design",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-25",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Pre Design",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-19",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Schematic Design",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-20",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Schematic Design",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-21",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Schematic Design",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-22",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Schematic Design",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-23",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Schematic Design",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-24",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Schematic Design",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-25",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Schematic Design",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-19",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Add a Phase",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-20",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Add a Phase",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-21",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Add a Phase",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-22",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Add a Phase",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-23",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Add a Phase",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-24",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Add a Phase",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-25",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Add a Phase",
          project: {
            id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-19",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-20",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-21",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-22",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-23",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-24",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-25",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-19",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Pre Design",
          project: {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-20",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Pre Design",
          project: {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-21",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Pre Design",
          project: {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-22",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Pre Design",
          project: {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-23",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Pre Design",
          project: {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-24",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Pre Design",
          project: {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-25",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Pre Design",
          project: {
            id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          },
        },

        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-19",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-20",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-21",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-22",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-23",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-24",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
          },
        },
        {
          billable_hours: 1,
          billable_minutes: 0,
          date: "2022-12-25",
          non_billable_hours: 0,
          non_billable_minutes: 0,
          notes: "",
          phase: "Overhead",
          project: {
            id: "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
          },
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
};

export const timesheetPost = (
  date: Date,
  hours: number,
  minutes: number,
  notes: string,
  phase: string,
  id: string
): Promise<AxiosResponse> => {
  return new Promise<AxiosResponse>((resolve) =>
    resolve({
      data: {
        date,
        hours,
        minutes,
        notes,
        phase,
        id,
      },
      status: 201,
      statusText: "OK",
      headers: {
        ContentLocation: `/timesheet}`,
      },
      config: {},
    })
  );
};
