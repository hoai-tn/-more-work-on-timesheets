import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { EntityMeta } from "../../common/entity-meta";
import type { Address } from "../../common/address";
import type { ProjectContractType } from "../../common/project-properties";
import { DateTime } from "luxon";
import type { DerivedFeeTemplate } from "../../types";
import {
  CupolaProjectPriority,
  CupolaProjectType,
  ProjectAndTaskPhase,
  ProjectState,
} from "../../types";
import type { FeeTemplate } from "./fee-template.entity";
import { TimesheetEntryEntity } from "../../timesheet/entities/timesheet-entry.entity";

/**
 * A project represents a work a client's requires an architect to do.
 */
@Entity("project")
export class ProjectEntity extends EntityMeta {
  /**
   * Name of a project.
   */
  @Column()
  name!: string;

  /**
   * This is different from the id field. It's a field used by architects to
   * keep track of how many projects they have.
   */
  @Column()
  projectId!: string;

  @Column()
  clientId!: string;
  /**
   * Project contract is a way of defining how the project will be funded.
   *
   * If contract type is fixed then the project requires a total contract amount (totalContractAmount)
   * if contract type is hourly rate, then the project requires an hourly rate (hourlyRate)
   * If contract type is hybrid, then the project requires both hourly rate (hourlyRate) and contract total amount (totalContractAmount)
   */
  @Column("jsonb")
  contractType!: ProjectContractType;

  /**
   * This is the physical location of project site.
   */
  @Column("jsonb")
  address!: Address;

  /**
   * The date a project starts. Expressed with timezone.
   */
  @Column({ type: "timestamptz" })
  startDate!: DateTime;

  /**
   * The date a project starts. Expressed with timezone.
   */
  @Column({ type: "timestamptz", nullable: true })
  startDateNew?: DateTime;

  /**
   * The date a project ends. Expressed with timezone.
   */
  @Column({ type: "timestamptz" })
  endDate!: DateTime;

  /**
   * The date a project ends. Expressed with timezone.
   */
  @Column({ type: "timestamptz", nullable: true })
  endDateNew?: DateTime;

  /**
   * A project state represents if a project is pending, approved, disapproved or finished.
   */
  @Column("text")
  state!: ProjectState;

  @Column("text")
  phase!: ProjectAndTaskPhase;

  @Column("text", { nullable: true })
  phaseNew?: ProjectAndTaskPhase;

  @Column("text")
  type!: CupolaProjectType;

  @Column("text")
  priority!: CupolaProjectPriority;

  @Column("text", { nullable: true })
  priorityNew?: CupolaProjectPriority;

  @ManyToOne(
    "FeeTemplate",
    (feeTemplate1: FeeTemplate) => feeTemplate1.projects,
    { nullable: true }
  )
  feeTemplate?: FeeTemplate;

  @Column("jsonb", { nullable: true })
  derivedFeeTemplate?: DerivedFeeTemplate;

  @OneToMany(
    "TimesheetEntryEntity",
    (timesheetEntry: TimesheetEntryEntity) => timesheetEntry.project,
    { nullable: false }
  )
  timesheetEntries!: TimesheetEntryEntity[];

  @Column("text", { nullable: true })
  currentPhase?: string;

  /**
   * Changes project state.
   *
   * @param state
   */
  changeState(state: ProjectState) {
    this.state = state;
  }

}
