/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { useCallback, useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonProps,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DateRangeIcon from "@mui/icons-material/DateRange";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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
  useGridApiContext,
  gridFilteredDescendantCountLookupSelector,
  useGridSelector,
} from "@mui/x-data-grid-pro";
import AddIcon from "@mui/icons-material/Add";

import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { DateTime } from "luxon";
import {
  ClientEntity,
  ProjectEntity,
  TimesheetEntryEntity,
} from "@cupola/types";
import CupolaThemeProvider from "../../cupola-theme-provider/cupola-theme-provider";
import { projectIsActiveWithPhases } from "../../pages/all-projects-page/all-projects-page";
import { Dayjs } from "dayjs";
import { filterTimesheet, shouldDisableDate } from "./timesheet-page.functions";

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
  const [clients, setClients] = useState<ClientEntity[]>([]);
  const [timesheets, setTimesheets] = useState<ITimesheet[]>([]);
  const [columns, setColumns] = useState<GridColumns>([]);
  const [selectWeekOf, setSelectWeekOf] = useState<DateTime>(
    DateTime.local().setLocale("en-US").startOf("week")
  );
  const [openNoteDialog, setOpenNoteDialog] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

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

  useEffect(() => {
    (async () => {
      const response = await apiTransport.cupola.client.getAll();

      await setClients(response.data);
    })();
  }, [apiTransport.cupola.client, setClients]);
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
        return row ? (
          <LightTooltip title={row?.notes} arrow placement="top-start">
            <Typography>{row.hours} hours</Typography>
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
          return <Typography>{params?.value || 0} hours</Typography>;
        },
        sortable: false,
        editable: false,
      },
      {
        field: "addNotes",
        flex: 1,
        headerAlign: "right",
        renderHeader: () => (
          <AddIcon
            onClick={() => setOpenNoteDialog((preState) => !preState)}
            sx={{ color: "#6e6767", cursor: "pointer", marginRight: "20px" }}
          />
        ),
        hideSortIcons: true,
        hide: true,
        filterable: false,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
      },
    ]);
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
      clients.forEach((client: ClientEntity) => {
        // Loop through each projects from API transport
        projects.forEach((project, indexProject) => {
          if (client.id === project.clientId) {
            //get time entries by project id
            const timeEntries = data.filter(
              (e: TimesheetEntryEntity) => e.project.id === project.id
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
                .map(
                  (e: TimesheetEntryEntity) =>
                    e.billable_hours +
                    e.billable_minutes / 60 +
                    (e.non_billable_hours + e.non_billable_minutes / 60)
                ) // total hours and minutes
                .reduce((a: number, b: number) => a + b, 0); // total hours by phase
              totalHoursByDay[days[dayIndex]] = {
                date: "",
                hours: reduceHours,
                minutes: 0,
                notes: "",
              };
            });
            formatDataForGridData.push(
              renderRow({
                id: rowID,
                phaseName: project.name,
                hoursByDay: totalHoursByDay,
                totalHours: totalHours(totalHoursByDay),
                type: TypeRow.Project,
                project,
                clientName: client.name,
              })
            );

            rowID++;

            //2. Handle `phases` and Add phase row to `formatDataForGridData`
            phases?.forEach((phase) => {
              const phaseByDay: { [index: string]: ITimeEntry } = {};
              const billableByDay: { [index: string]: ITimeEntry } = {};
              const noneBillableByDay: { [index: string]: ITimeEntry } = {};

              const timeEntryByPhase = timeEntries.filter(
                (timeEntry: TimesheetEntryEntity) => timeEntry.phase === phase
              );

              timeEntryByPhase.forEach((item: TimesheetEntryEntity) => {
                phaseByDay[DateTime.fromISO(item.date.toString()).weekdayLong] =
                  {
                    date: item.date.toString(),
                    notes: item.notes,
                    hours:
                      item.billable_hours +
                      item.billable_minutes / 60 +
                      (item.non_billable_hours +
                        item.non_billable_minutes / 60),
                    minutes: 0,
                  };
              });
              // render phase
              formatDataForGridData.push(
                renderRow({
                  id: rowID,
                  phaseName: phase as string,
                  hoursByDay: phaseByDay,
                  totalHours: totalHours(phaseByDay),
                  type: TypeRow.Phase,
                  project,
                  clientName: client.name,
                })
              );
              rowID++;
              // handle to render billable
              timeEntryByPhase.forEach((item: TimesheetEntryEntity) => {
                billableByDay[
                  DateTime.fromISO(item.date.toString()).weekdayLong
                ] = {
                  date: item.date.toString(),
                  notes: item.notes,
                  hours: item.billable_hours + item.billable_minutes / 60,
                  minutes: 0,
                };
              });

              formatDataForGridData.push(
                renderRow({
                  id: rowID,
                  phaseName: phase,
                  billableName: "Billable",
                  hoursByDay: billableByDay,
                  totalHours: totalHours(billableByDay),
                  type: TypeRow.Billable,
                  project,
                  clientName: client.name,
                })
              );
              rowID++;
              // handle to render Non-billable
              timeEntryByPhase.forEach((item: TimesheetEntryEntity) => {
                noneBillableByDay[
                  DateTime.fromISO(item.date.toString()).weekdayLong
                ] = {
                  date: item.date.toString(),
                  notes: item.notes,
                  hours:
                    item.non_billable_hours + item.non_billable_minutes / 60,
                  minutes: 0,
                };
              });
              formatDataForGridData.push(
                renderRow({
                  id: rowID,
                  phaseName: phase,
                  billableName: "Non-billable",
                  hoursByDay: noneBillableByDay,
                  totalHours: totalHours(noneBillableByDay),
                  type: TypeRow.NoneBillable,
                  project,
                  clientName: client.name,
                })
              );
              rowID++;
            });
          }
        });
        //3. Total Client worked hours
        const totalHoursByProject: { [index: string]: ITimeEntry } = {};
        let totalAllOfProject = 0;
        days.forEach((day, index) => {
          let totalHours = 0;
          formatDataForGridData.forEach((item) => {
            if (
              item.Project?.clientId === client.id &&
              item.Type === TypeRow.Project
            )
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
          renderRow({
            id: rowID,
            phaseName: "Total # Hours",
            hoursByDay: totalHoursByProject,
            totalHours: totalAllOfProject,
            type: TypeRow.Client,
            clientName: client.name,
          })
        );
        rowID++;
      });
      //4. total clients hours
      const totalHoursByClient: { [index: string]: ITimeEntry } = {};
      let totalAllOfClients = 0;
      days.forEach((day, index) => {
        let totalHours = 0;
        formatDataForGridData.forEach((item) => {
          if (item.Type === TypeRow.Client) {
            totalHours += Number(
              // total hours by project
              (item[day as keyof ITimesheet] as ITimeEntry).hours
            );
          }
        });
        totalHoursByClient[day] = {
          date: "",
          hours: totalHours,
          minutes: 0,
          notes: "",
        };
        totalAllOfClients += totalHours;
      });

      formatDataForGridData.push(
        renderRow({
          id: rowID,
          phaseName: "Total # Hours",
          hoursByDay: totalHoursByClient,
          totalHours: totalAllOfClients,
          type: TypeRow.Total,
        })
      );
      rowID++;
      setTimesheets(formatDataForGridData);
    };
    handleTimesheets().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectWeekOf, projects]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText === "") {
        setTimesheets((prevState) =>
          prevState.map((e) => ({ ...e, IsDisable: false }))
        );
      } else {
        const searchPattern = new RegExp(searchText, "gi");
        setTimesheets((prevState) =>
          prevState.map((e) =>
            searchPattern.test(e.PhaseName) ||
            searchPattern.test(e.Project?.name || "")
              ? { ...e, IsDisable: false }
              : { ...e, IsDisable: true }
          )
        );
      }
    }, 100);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const handleCellEditCommit = useCallback(
    async ({ id, field, value }: GridCellEditCommitParams) => {
      if (typeof value !== "object") {
        //Parses the input value into a number and assigns it to newHours.
        const newHours = Number(value) || 0;
        // Find row with matching id in timesheets
        const row = timesheets.find((e) => e.id === id);

        if (row && row.Project) {
          const phaseByHierarchy = row?.hierarchy[2] || "";
          const clientByHierarchy = row?.hierarchy[0] || "";
          const entryDate = datesByDay[field];
          const hoursWorked = Math.trunc(newHours);
          const timeEntry = (row[field as keyof ITimesheet] as ITimeEntry) || {
            date: entryDate,
            hours: 0,
            minutes: 0,
            notes: "",
          };
          // Calculate difference between new and old hours
          const sumHours = newHours - timeEntry.hours;

          timeEntry.hours = hoursWorked;
          timeEntry.minutes =
            hoursWorked > 0 ? 60 * (newHours - hoursWorked) : 0;

          //Saves the updated data to the API

          // if type is `Billable`, get `Non-billable`
          const findDiffRow = timesheets.find(
            (timesheet) =>
              timesheet.hierarchy[1] === row.hierarchy[1] && // condition project name
              timesheet.hierarchy[2] === row.hierarchy[2] && /// condition phase
              timesheet.PhaseName ===
                (row.Type === TypeRow.Billable ? "Non-billable" : "Billable")
          );
          if (findDiffRow) {
            const diffEntry = findDiffRow[
              field as keyof ITimesheet
            ] as ITimeEntry;
            await apiTransport.cupola.timesheet.post({
              date: entryDate.toJSDate(),
              phaseName: phaseByHierarchy,
              billable_hours:
                row.Type === TypeRow.Billable
                  ? timeEntry.hours
                  : diffEntry?.hours || 0,
              billable_minutes:
                row.Type === TypeRow.Billable
                  ? timeEntry.minutes
                  : diffEntry?.minutes || 0,
              non_billable_hours:
                row.Type === TypeRow.NoneBillable
                  ? timeEntry.hours
                  : diffEntry?.hours || 0,
              non_billable_minutes:
                row.Type === TypeRow.NoneBillable
                  ? timeEntry.minutes
                  : diffEntry?.minutes || 0,
              notes: timeEntry.notes,
              projectId: findDiffRow?.PhaseName,
            });
          }
          // Update timesheets with new data
          setTimesheets(
            timesheets.map((item) => {
              const entry = {
                ...(item[field as keyof ITimesheet] as ITimeEntry),
              };
              if (
                item.PhaseName === row.Project?.name ||
                item.Type === TypeRow.Total ||
                (item.Type === TypeRow.Client &&
                  item.hierarchy[0] === clientByHierarchy)
              ) {
                return {
                  ...item,
                  [field]: { ...entry, hours: entry.hours + sumHours },
                  TotalHours: item.TotalHours + sumHours,
                };
              }
              // Update total hours and hours for matching id
              if (item.id === id) {
                return {
                  ...item,
                  [field]: {
                    ...entry,
                    hours: newHours,
                  },
                  TotalHours: row.TotalHours + sumHours,
                };
              }
              // update parent phase of phase edit commit
              if (
                item.Project?.id === row.Project?.id &&
                item.PhaseName === phaseByHierarchy
              ) {
                return {
                  ...item,
                  [field]: {
                    ...entry,
                    hours:
                      (item[field as keyof ITimesheet] as ITimeEntry).hours +
                      sumHours,
                  },
                  TotalHours: item.TotalHours + sumHours,
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
    return (
      ((Object.keys(totalHoursByDay).length &&
        Object.values(totalHoursByDay)
          .map((timeEntry) => Number(timeEntry["hours"]))
          .reduce((a, b) => a + b, 0)) as number) || 0
    );
  };
  const renderRow = (row: {
    id: number;
    phaseName: string;
    hoursByDay: { [index: string]: ITimeEntry };
    totalHours: number;
    type: TypeRow;
    project?: ProjectEntity | null;
    clientName?: string;
    billableName?: string;
  }) => {
    const {
      id,
      phaseName,
      hoursByDay,
      totalHours,
      type,
      project,
      clientName,
      billableName,
    } = row;
    let hierarchy;
    let phase = "";
    switch (type) {
      case TypeRow.Client:
        phase = clientName || "";
        hierarchy = [clientName];
        break;
      case TypeRow.Project:
        phase = phaseName;
        hierarchy = [clientName, project?.name];
        break;
      case TypeRow.Billable:
      case TypeRow.NoneBillable:
        phase = billableName || "";
        hierarchy = [clientName, project?.name, phaseName, billableName];
        break;
      case TypeRow.Total:
        phase = phaseName;
        hierarchy = [phaseName];
        break;
      default:
        phase = phaseName;
        hierarchy = [clientName, project?.name, phaseName];
    }
    return {
      id,
      hierarchy,
      PhaseName: phase,
      Monday: hoursByDay["Monday"],
      Tuesday: hoursByDay["Tuesday"],
      Wednesday: hoursByDay["Wednesday"],
      Thursday: hoursByDay["Thursday"],
      Friday: hoursByDay["Friday"],
      Saturday: hoursByDay["Saturday"],
      Sunday: hoursByDay["Sunday"],
      TotalHours: totalHours,
      Type: type,
      Project: project,
      IsDisable: false,
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
    timesheets
      .filter((e) => e.Type === TypeRow.Client)
      .map((e) => e.TotalHours)
      .reduce((a: number, b: number) => a + b, 0);

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
        console.log({ findTimesheet });
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
            if (row.PhaseName === phase && row.Project?.id === project) {
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
                  shouldDisableDate={shouldDisableDate}
                  data-testid={"select-week-picker"}
                />
              </LocalizationProvider>
            </CupolaThemeProvider>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                marginLeft: 20,
              }}
            >
              <TextField
                id="search-field"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                fullWidth
                variant="standard"
                margin="normal"
                InputProps={{
                  disableUnderline: true,
                  style: { color: "black", backgroundColor: "white" },
                  placeholder: "Search",
                }}
                InputLabelProps={{ shrink: false }}
              />
            </Box>
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
                rows={filterTimesheet(timesheets)}
                columns={columns}
                treeData
                getTreeDataPath={getTreeDataPath}
                disableColumnMenu={false}
                disableVirtualization
                hideFooter
                autoHeight
                onCellEditCommit={handleCellEditCommit}
                isCellEditable={(params: GridCellParams) =>
                  params.row.Type === TypeRow.Billable ||
                  params.row.Type === TypeRow.NoneBillable
                }
                getRowClassName={(params) => {
                  if (
                    params.row.Type === TypeRow.Project ||
                    params.row.Type === TypeRow.Client
                  )
                    return "super-app total-cell";
                  return "";
                }}
                componentsProps={{
                  cell: {
                    tabIndex: 0,
                  },
                }}
                groupingColDef={groupingColDef}
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
                      background: "#dcdcdc",
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
const groupingColDef: DataGridProProps["groupingColDef"] = {
  headerName: "Group",
  renderCell: (params) => {
    return <CustomGridTreeDataGroupingCell {...params} />;
  },
};

function CustomGridTreeDataGroupingCell(props: GridRenderCellParams) {
  const { id, field, rowNode, value } = props;
  const apiRef = useGridApiContext();
  const filteredDescendantCountLookup = useGridSelector(
    apiRef,
    gridFilteredDescendantCountLookupSelector
  );
  const filteredDescendantCount =
    filteredDescendantCountLookup[rowNode.id] ?? 0;

  const handleClick = (event: { stopPropagation: () => void }) => {
    apiRef.current.setRowChildrenExpansion(id, !rowNode.childrenExpanded);
    apiRef.current.setCellFocus(id, field);
    event.stopPropagation();
  };
  return (
    <Box sx={{ ml: rowNode.depth * 4, width: "100%" }}>
      <div
        tabIndex={-1}
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {filteredDescendantCount > 0 && rowNode.childrenExpanded ? (
          <IconButton onClick={handleClick}>
            <KeyboardArrowDownIcon />
          </IconButton>
        ) : rowNode.childrenExpanded === undefined ? (
          ""
        ) : (
          <IconButton onClick={handleClick}>
            <KeyboardArrowRightIcon />
          </IconButton>
        )}
        <span>{value}</span>
      </div>
    </Box>
  );
}
