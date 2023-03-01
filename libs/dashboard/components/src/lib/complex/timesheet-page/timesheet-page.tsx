/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { useCallback, useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { TimesheetHoursWorked } from "../timesheet-hours-worked/timesheet-hours-worked";
import { TimesheetNoteDialog } from "../timesheet-note-dialog/timesheet-note-dialog";

import {
  ITimeEntry,
  ITimesheet,
  ITimesheetNoteForm,
  ITimesheetsPage,
  TypeRow,
} from "../../../constants/interfaces";

import TabPanel from "../tabbed-display/tabbed-display";

import {
  initMockTransport,
  initTransport,
  Transporter,
} from "@cupola/transporter";
import { useGlobalAppContext } from "../context/context";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  DataGridPro,
  GridColumns,
  GridFilterModel,
  GridLinkOperator,
  GridRowsProp,
  DataGridProProps,
  GridValueGetterParams,
  GridRenderCellParams,
  GridCellEditCommitParams,
  GridCellParams,
} from "@mui/x-data-grid-pro";

import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { DateTime } from "luxon";
import { ProjectEntity, TimesheetEntryEntity } from "@cupola/types";
import CupolaThemeProvider from "../../cupola-theme-provider/cupola-theme-provider";
import { projectIsActiveWithPhases } from "../../pages/all-projects-page/all-projects-page";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: 10,
  },
}));

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export class DatesByDay {
  [key: string]: DateTime;

  Monday!: DateTime;
  Tuesday!: DateTime;
  Wednesday!: DateTime;
  Thursday!: DateTime;
  Friday!: DateTime;
  Saturday!: DateTime;
  Sunday!: DateTime;
}

const getDayName = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-us", {
    weekday: "long",
  });
};
const getTreeDataPath: DataGridProProps["getTreeDataPath"] = (row) =>
  row.hierarchy;
export const TimesheetsPage = ({
  onChangeTimesheetEntries,
}: ITimesheetsPage) => {
  const state = useGlobalAppContext();
  const [apiTransport] = useState<Transporter>(
    // initTransport(() => state.apiHost || "")
    initMockTransport()
  );

  const [projects, setProjects] = useState<ProjectEntity[]>([]);
  const [timesheets, setTimesheets] = useState<ITimesheet[]>([]);
  const [columns, setColumns] = useState<GridColumns>([]);
  const [selectWeekOf, setSelectWeekOf] = useState<DateTime>(
    DateTime.local().setLocale("en-US").startOf("week")
  );
  const [openNoteDialog, setOpenNoteDialog] = useState<boolean>(false);

  const datesByDay = new DatesByDay();

  days.forEach((day, indexDay) => {
    datesByDay[day as keyof DatesByDay] = DateTime.fromISO(
      selectWeekOf.toString()
    ).plus({ days: indexDay });
  });

  useEffect(() => {
    (async () => {
      const response = await apiTransport.cupola.project.getAll();
      await setProjects(response.data.filter(projectIsActiveWithPhases));
    })();
  }, [apiTransport.cupola.project, setProjects]);

  // set columns
  useEffect(() => {
    const generalTaskWeek: GridColumns = days.map((day, indexDay) => ({
      field: day,
      headerName: `${day} (${datesByDay[days[indexDay]].toFormat("MM/dd")})`,
      type: "number",
      editable: true,
      headerAlign: "left",
      align: "left",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.value?.hours || 0}`;
      },
      renderCell: (params: GridRenderCellParams) => {
        const row = params.row[params.field];
        return row?.date || row?.hours ? (
          <LightTooltip title={row?.notes} arrow placement="top-start">
            <Typography>{row?.hours || 0} hours</Typography>
          </LightTooltip>
        ) : (
          ""
        );
      },
    }));
    setColumns([
      ...generalTaskWeek,
      {
        field: "TotalHours",
        headerName: "Total",
        renderCell: (params: GridRenderCellParams) => {
          return params.value ? (
            <Typography>{params.value} hours</Typography>
          ) : (
            ""
          );
        },
        sortable: false,
        editable: false,
      },
      {
        field: "addNotes",
        flex: 1,
        renderHeader: () => "",
        // <AddIcon
        //   onClick={() => setOpenNoteDialog((preState) => !preState)}
        //   sx={{ color: "#6e6767", cursor: "pointer", marginLeft: "71px" }}
        // />
        hideSortIcons: true,
        hide: true,
        filterable: false,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
      },
    ]);
    console.log(columns);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectWeekOf]);

  useEffect(() => {
    // fetch timesheet from api
    const handleTimesheets = async () => {
      const startDate = DateTime.fromISO(selectWeekOf.toISO()).toFormat(
        "yyyy-MM-dd"
      );
      const endDate = DateTime.fromISO(selectWeekOf.toISO())
        .plus({ days: 6 })
        .toFormat("yyyy-MM-dd");

      // fetch timesheets from API transport
      const { data }: { data: TimesheetEntryEntity[] } =
        await apiTransport.cupola.timesheet.get(
          new Date(startDate),
          new Date(endDate)
        );
      const formatDataForGridData: ITimesheet[] = [];

      let rowID = 1;
      // Loop through each projects from API transport
      projects.forEach((project, indexProject) => {
        //get time entries by project id
        const timeEntries = data.filter(
          (e: TimesheetEntryEntity) => e.project.projectId === project.projectId
        );
        // get phases by project
        const phases = project.derivedFeeTemplate?.templates.map(
          (e) => e.phase
        );

        // 1. Handle total hours by project to `formatDataForGridData`
        const totalHoursByDay: { [index: string]: ITimeEntry } = {};
        days.forEach((day, dayIndex) => {
          // get timeEntries by day
          const timeEntriesByDay = timeEntries.filter(
            (entry: TimesheetEntryEntity) =>
              DateTime.fromISO(entry.date.toString()).weekdayLong === day
          );
          const reduceHours = timeEntriesByDay
            .map((e: TimesheetEntryEntity) => e.hours + e.minutes / 60) // total hours and minutes
            .reduce((a: number, b: number) => a + b, 0); // total hours by phase
          totalHoursByDay[days[dayIndex]] = {
            date: "",
            hours: reduceHours,
            minutes: 0,
            notes: "",
          };
        });
        formatDataForGridData.push(
          renderRow(
            rowID,
            project.name,
            totalHoursByDay,
            totalHours(totalHoursByDay),
            TypeRow.Project,
            "",
            project
          )
        );

        rowID++;

        //2. Handle `phases` and Add phase row to `formatDataForGridData`
        phases?.forEach((phase) => {
          const phaseByDay: { [index: string]: ITimeEntry } = {};
          const timeEntryByPhase = timeEntries.filter(
            (timeEntry: TimesheetEntryEntity) => timeEntry.phase === phase
          );

          timeEntryByPhase.forEach((item: TimesheetEntryEntity) => {
            phaseByDay[DateTime.fromISO(item.date.toString()).weekdayLong] = {
              date: item.date.toString(),
              notes: item.notes,
              hours: item.hours + item.minutes / 60,
              minutes: 0,
            };
          });
          formatDataForGridData.push(
            renderRow(
              rowID,
              phase as string,
              phaseByDay,
              totalHours(phaseByDay),
              TypeRow.Phase,
              project.name,
              project
            )
          );
          rowID++;
        });
      });

      //3. Total Projects work hours

      const totalHoursByProject: { [index: string]: ITimeEntry } = {};
      let totalAllOfProject = 0;
      days.forEach((day, index) => {
        let totalHours = 0;
        formatDataForGridData.forEach((item) => {
          if (item.Type === TypeRow.Project)
            totalHours += Number(
              // total hours by project
              (item[day as keyof ITimesheet] as ITimeEntry).hours
            );
        });
        totalHoursByProject[day] = {
          date: "",
          hours: totalHours,
          minutes: 0,
          notes: "",
        };
        totalAllOfProject += totalHours;
      });

      formatDataForGridData.push(
        renderRow(
          rowID,
          "Total # Hours",
          totalHoursByProject,
          totalAllOfProject,
          TypeRow.Total,
          ""
        )
      );

      setTimesheets(formatDataForGridData);
    };
    handleTimesheets().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectWeekOf, projects]);

  const handleCellEditCommit = useCallback(
    async ({ id, field, value }: GridCellEditCommitParams) => {
      if (typeof value !== "object") {
        //Parses the input value into a number and assigns it to newHours.
        const newHours = Number(value) || 0;
        // Find row with matching id in timesheets
        const row = timesheets.find((e) => e.id === id);

        if (row && row.Project) {
          const entryDate = datesByDay[field];
          const hoursWorked = Math.trunc(newHours);
          const timeEntry = (row[field as keyof ITimesheet] as ITimeEntry) || {
            date: entryDate,
            hours: 0,
            minutes: 0,
            notes: "",
          };

          const sumHours =
            hoursWorked < timeEntry.hours
              ? hoursWorked - timeEntry.hours
              : timeEntry.hours + hoursWorked;

          timeEntry.hours = hoursWorked;
          timeEntry.minutes =
            hoursWorked > 0 ? 60 * (newHours - hoursWorked) : 0;

          //Saves the updated data to the API
          await apiTransport.cupola.timesheet.post(
            entryDate.toJSDate(),
            hoursWorked,
            timeEntry.minutes,
            row.Project.id,
            timeEntry.notes,
            row.PhaseName
          );

          // Update timesheets with new data
          setTimesheets(
            timesheets.map((item) => {
              const entry = {
                ...(item[field as keyof ITimesheet] as ITimeEntry),
              };

              // Update total hours and hours for matching phase or "Total # Hours"
              if (
                item.PhaseName === row.PhaseOfProject ||
                item.PhaseName === "Total # Hours"
              ) {
                return {
                  ...item,
                  [field]: { ...entry, hours: entry.hours + newHours },
                  TotalHours: item.TotalHours + sumHours,
                };
              }

              // Update total hours and hours for matching id
              if (item.id === id) {
                return {
                  ...item,
                  [field]: { ...entry, hours: sumHours },
                  TotalHours: row.TotalHours + sumHours,
                };
              }

              return item;
            })
          );
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timesheets]
  );

  const totalHours = (totalHoursByDay: { [index: string]: ITimeEntry }) => {
    return (Object.keys(totalHoursByDay).length &&
      Object.values(totalHoursByDay)
        .map((timeEntry) => Number(timeEntry["hours"]))
        .reduce((a, b) => a + b, 0)) as number;
  };
  const renderRow = (
    id: number,
    PhaseName: string,
    hoursByDay: { [index: string]: ITimeEntry },
    TotalHours: number,
    Type: TypeRow,
    PhaseOfProject: string = "",
    Project?: ProjectEntity
  ) => {
    return {
      id,
      hierarchy:
        Type === TypeRow.Total
          ? ["Client", PhaseName]
          : Type === TypeRow.Project
          ? ["Client", Project?.name]
          : ["Client", Project?.name || "", PhaseName],
      PhaseName,
      Monday: hoursByDay["Monday"],
      Tuesday: hoursByDay["Tuesday"],
      Wednesday: hoursByDay["Wednesday"],
      Thursday: hoursByDay["Thursday"],
      Friday: hoursByDay["Friday"],
      Saturday: hoursByDay["Saturday"],
      Sunday: hoursByDay["Sunday"],
      TotalHours,
      Type,
      PhaseOfProject,
      Project,
    } as ITimesheet;
  };
  // update onChangeData to testing
  useEffect(() => {
    timesheets.length > 1 &&
      onChangeTimesheetEntries(JSON.stringify(timesheets));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timesheets]);

  //  total of hours for the projects
  const totalHourWorked =
    timesheets.length &&
    timesheets.find((e) => e.Type === TypeRow.Total)?.TotalHours;

  const handleSubmitNote = async ({
    date,
    project,
    phase,
    notes,
  }: ITimesheetNoteForm) => {
    // console.log(date.toString(), project, notes, phase);
    try {
      const dayName = getDayName(date.toString());
      const findTimesheet = timesheets.find((e) => {
        return (
          e.PhaseName.toLowerCase() === phase.toLowerCase() &&
          e.Project?.id === project
        );
      });

      if (findTimesheet) {
        const entryByDay = findTimesheet[
          dayName as keyof ITimesheet
        ] as ITimeEntry;

        // update notes API
        const response: { data: Partial<TimesheetEntryEntity> } =
          await apiTransport.cupola.timesheet.post(
            new Date(String(entryByDay.date)),
            entryByDay.hours,
            entryByDay.minutes,
            project,
            notes,
            phase
          );

        // update timesheets state from update notes api
        setTimesheets((prevState) => {
          return prevState.map((row) => {
            if (row.PhaseName === phase && row.PhaseOfProject === project) {
              return {
                ...row,
                [dayName]: {
                  date: DateTime.fromJSDate(
                    new Date(String(response.data.date))
                  ).toFormat("yyyy-MM-dd"),
                  hours: response.data.hours,
                  minutes: response.data.minutes,
                  notes: response.data.notes,
                },
              };
            }
            return row;
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
    setOpenNoteDialog(() => false);
  };
  return (
    <Box style={{ fontSize: 18 }}>
      <TabPanel
        tabLabels={[
          "TIMESHEETS",
          "EXPENSES",
          "VACATION / SICK DAYS",
          "CONSULTANTS",
        ]}
      >
        <>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              background: "#f5e7d6",
              height: 52,
              paddingLeft: "15px",
              paddingRight: "32px",
            }}
          >
            <CupolaThemeProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Week"
                  value={selectWeekOf}
                  onChange={(value) => {
                    if (value) {
                      const convertDate = new Date(value.toString());
                      setSelectWeekOf(
                        DateTime.fromISO(convertDate.toISOString()).startOf(
                          "week"
                        )
                      );
                    }
                  }}
                  components={{
                    OpenPickerIcon: () => (
                      <DateRangeIcon
                        sx={{
                          color: "#6e6767",
                        }}
                      />
                    ),
                  }}
                  OpenPickerButtonProps={{ style: { marginBottom: "10px" } }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      data-testid={`select-week-text-field`}
                      variant="standard"
                      required={true}
                      margin="normal"
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      sx={(theme: {
                        palette: { text: { primary: string } };
                      }) => ({
                        label: {
                          color: theme.palette.text.primary,
                          marginTop: 1,
                          marginLeft: "38px",
                        },
                        padding: 0,
                        width: 130,
                        margin: 0,
                      })}
                    />
                  )}
                  InputAdornmentProps={{ position: "start" }}
                  data-testid={"select-week-picker"}
                />
              </LocalizationProvider>
            </CupolaThemeProvider>
          </Box>
          <Accordion
            defaultExpanded
            sx={{
              boxShadow: 0,
              "&.Mui-expanded": {
                margin: 0,
              },
              margin: 0,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#6e6767" }} />}
              aria-controls="panel-account-settings-content"
              sx={{
                background: "#eecdb1e8",
                "&.Mui-expanded": { minHeight: 52, margin: 0 },
                height: 52,
                paddingRight: "32px",
              }}
            >
              <AccessTimeIcon
                sx={{
                  color: "#6e6767",
                  marginRight: "32px",
                  marginLeft: "-6px",
                }}
              />
              <Typography>Timesheets</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: "0px" }}>
              <TimesheetHoursWorked
                startDate={DateTime.fromISO(selectWeekOf.toISO()).toFormat(
                  "yyyy-MM-dd"
                )}
                endDate={DateTime.fromISO(selectWeekOf.toISO())
                  .plus({ days: 6 })
                  .toFormat("yyyy-MM-dd")}
                totalHoursWorked={totalHourWorked || 0}
                hoursAvailable={40}
              />
              <DataGridPro
                rows={timesheets}
                columns={columns}
                disableColumnMenu={false}
                disableVirtualization
                treeData
                getTreeDataPath={getTreeDataPath}
                hideFooter
                autoHeight
                onCellEditCommit={handleCellEditCommit}
                isCellEditable={(params: GridCellParams) =>
                  params.row.Type === TypeRow.Phase
                }
                getRowClassName={(params) => {
                  if (
                    params.row.Type === TypeRow.Project ||
                    params.row.Type === TypeRow.Total
                  )
                    return "super-app total-cell";
                  return "";
                }}
                componentsProps={{
                  cell: {
                    tabIndex: 0,
                  },
                }}
                sx={[
                  {
                    "& .super-app-theme--cell": {
                      backgroundColor: "#fffff",
                    },
                    "& .super-app.total-cell": {
                      backgroundColor: "#f7ece2",
                      marginTop: "1px",
                    },
                  },
                  {
                    "& .MuiDataGrid-columnHeaders": {
                      background: "#f7ece2",
                      outline: "none",
                      fontSize: 16,
                      borderBottom: "1px solid #d3d3d3",
                    },
                  },
                  {
                    "& .MuiDataGrid-columnHeader:focus-within": {
                      outline: "none",
                    },
                  },
                  {
                    "& .MuiDataGrid-cell": {
                      border: "none",
                    },
                  },
                  {
                    "& .MuiDataGrid-row.Mui-selected ": {
                      background: "transparent",
                    },
                  },
                  {
                    "& .MuiDataGrid-row.Mui-selected:hover ": {
                      background: "transparent",
                    },
                  },
                  {
                    "& .MuiDataGrid-columnHeader--moving": {
                      background: "transparent",
                    },
                  },
                  {
                    "& .MuiDataGrid-columnHeaderTitleContainer:focus": {
                      outline: "none",
                    },
                  },
                  {
                    "& .MuiDataGrid-iconSeparator": {
                      display: "none",
                    },
                  },
                ]}
              />
            </AccordionDetails>
          </Accordion>
          <TimesheetNoteDialog
            startDate={selectWeekOf.toFormat("yyyy-MM-dd")}
            title="Add a Note"
            isOpen={openNoteDialog}
            onSubmitForm={(timeEntry) => handleSubmitNote(timeEntry)}
            onClose={() => setOpenNoteDialog(false)}
            projects={projects}
          />
        </>
      </TabPanel>
    </Box>
  );
};
