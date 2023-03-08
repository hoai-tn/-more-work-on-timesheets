import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { EntityMeta } from "../../common/entity-meta";
import { ProjectAndTaskPhase } from "../../types";
import { ProjectEntity } from "../../project/entities/project.entity";
import { ArchitectEntity } from "../../architect/entities/architect.entity";

@Entity("timesheet_entry")
@Unique(["date", "phase", "project"])
export class TimesheetEntryEntity extends EntityMeta {
  @Column("date", { nullable: false })
  date!: Date;

  @Column("int", { default: 0 })
  billable_hours!: number;

  @Column("int", { default: 0 })
  billable_minutes!: number;
  
  @Column("int", { default: 0 })
  non_billable_hours!: number;

  @Column("int", { default: 0 })
  non_billable_minutes!: number;

  @Column("text", { default: "" })
  notes!: string;

  @Column("text", { nullable: false })
  phase!: ProjectAndTaskPhase;

  @ManyToOne(
    "ProjectEntity",
    (project: ProjectEntity) => project.timesheetEntries
  )
  project!: ProjectEntity;

  @ManyToOne(
    "ArchitectEntity",
    (architectEntity: ArchitectEntity) => architectEntity.id,
    { nullable: false }
  )
  architect!: ArchitectEntity;
}
