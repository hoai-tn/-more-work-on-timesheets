import { fakeClient, FeeTemplate, ProjectEntity } from "./../../../index";
import { v4 as UUIDv4 } from "uuid";

export const fakeProject = (name: string): ProjectEntity => {
  const project = new ProjectEntity();
  project.id = UUIDv4();
  project.clientId = UUIDv4();
  project.name = name;
  project.derivedFeeTemplate = {
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
  };
  project.contractType = {
    TotalContractAmount: {
      unit: "USD",
      value: 10000000,
    },
  };

  return project;
};
