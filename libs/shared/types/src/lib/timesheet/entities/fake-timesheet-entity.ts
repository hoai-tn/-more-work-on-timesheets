import { fakeProject } from "../../project/entities/fake.project";
import { TimesheetEntryEntity } from "../../timesheet/entities/timesheet-entry.entity";
import { ProjectAndTaskPhase } from "../../types";
import { v4 as UUIDv4 } from "uuid";
import { fakeArchitect } from "../../architect/entities/fake.architect";

export const fakeTimesheetEntity = (
  project = fakeProject("Project1"),
  architect = fakeArchitect()
): TimesheetEntryEntity => {
  return {
    id: UUIDv4(),
    date: new Date(),
    billable_hours: 1,
    billable_minutes: 0,
    non_billable_hours: 0,
    non_billable_minutes: 0,
    notes: "ddddFake notes",
    phase: ProjectAndTaskPhase.DESIGN,
    project: project,
    createdAt: new Date(),
    updatedAt: new Date(),
    architect: architect,
  };
};
