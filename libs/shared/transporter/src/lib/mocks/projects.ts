import { ProjectEntity } from "@cupola/types";
import { AxiosResponse } from "axios";
export const getAllProjects = async (
  filter?: Partial<ProjectEntity>
): Promise<AxiosResponse> => {
  return new Promise<AxiosResponse>((resolve) =>
    resolve({
      data: [
        {
          id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
          name: "Project1",
          clientId: "1",
          derivedFeeTemplate: {
            totalProjectTimeAmount: 5000,
            templates: [
              {
                phase: "Overhead",
                numberOfHoursNotToExceed: 200,
                fixedFeePercentage: 10,
                _fixedFeeAmount: 500,
                consultantFeePercentage: 20,
                _consultantFeeAmount: 1000,
                projectTimePercentage: 70,
                _projectTimeAmount: 3500,
                _startDate: "2022-01-01",
                _endDate: "2022-12-31",
                _isDirty: false,
              },
              {
                phase: "Pre Design",
                numberOfHoursNotToExceed: 100,
                fixedFeePercentage: 15,
                _fixedFeeAmount: 750,
                consultantFeePercentage: 25,
                _consultantFeeAmount: 1250,
                projectTimePercentage: 60,
                _projectTimeAmount: 3000,
                _startDate: "2022-01-01",
                _endDate: "2022-12-31",
                _isDirty: false,
              },
              {
                phase: "Schematic Design",
                numberOfHoursNotToExceed: 100,
                fixedFeePercentage: 15,
                _fixedFeeAmount: 750,
                consultantFeePercentage: 25,
                _consultantFeeAmount: 1250,
                projectTimePercentage: 60,
                _projectTimeAmount: 3000,
                _startDate: "2022-01-01",
                _endDate: "2022-12-31",
                _isDirty: false,
              },
              {
                phase: "Add a Phase",
                numberOfHoursNotToExceed: 100,
                fixedFeePercentage: 15,
                _fixedFeeAmount: 750,
                consultantFeePercentage: 25,
                _consultantFeeAmount: 1250,
                projectTimePercentage: 60,
                _projectTimeAmount: 3000,
                _startDate: "2022-01-01",
                _endDate: "2022-12-31",
                _isDirty: false,
              },
            ],
            type: "Fixed",
          },
        },
        {
          id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          name: "Project2",
          clientId: "1",
          derivedFeeTemplate: {
            totalProjectTimeAmount: 5000,
            templates: [
              {
                phase: "Overhead",
                numberOfHoursNotToExceed: 200,
                fixedFeePercentage: 10,
                _fixedFeeAmount: 500,
                consultantFeePercentage: 20,
                _consultantFeeAmount: 1000,
                projectTimePercentage: 70,
                _projectTimeAmount: 3500,
                _startDate: "2022-01-01",
                _endDate: "2022-12-31",
                _isDirty: false,
              },
              {
                phase: "Pre Design",
                numberOfHoursNotToExceed: 100,
                fixedFeePercentage: 15,
                _fixedFeeAmount: 750,
                consultantFeePercentage: 25,
                _consultantFeeAmount: 1250,
                projectTimePercentage: 60,
                _projectTimeAmount: 3000,
                _startDate: "2022-01-01",
                _endDate: "2022-12-31",
                _isDirty: false,
              },
            ],
            type: "Fixed",
          },
        },
        {
          id: "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
          name: "Project3",
          clientId: "2",
          derivedFeeTemplate: {
            totalProjectTimeAmount: 5000,
            templates: [
              {
                phase: "Overhead",
                numberOfHoursNotToExceed: 200,
                fixedFeePercentage: 10,
                _fixedFeeAmount: 500,
                consultantFeePercentage: 20,
                _consultantFeeAmount: 1000,
                projectTimePercentage: 70,
                _projectTimeAmount: 3500,
                _startDate: "2022-01-01",
                _endDate: "2022-12-31",
                _isDirty: false,
              },
              
            ],
            type: "Fixed",
          },
        },
      ],
      status: 201,
      statusText: "OK",
      headers: {
        ContentLocation: `/timesheet`,
      },
      config: {},
    })
  );
};
