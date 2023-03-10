/* istanbul ignore file */
import {
  Autocomplete,
  Box,
  Button,
  createTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  ThemeProvider,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { FormEvent, useEffect, useState } from "react";

import {
  ITimesheetNoteForm,
  ITimsheetNoteDialog,
} from "../../../constants/interfaces";
import { defaultPalette } from "../../cupola-theme-provider/cupola-theme-provider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DateTime } from "luxon";
import { DerivedProjectFeeTemplate, ProjectEntity } from "@cupola/types";

const theme = createTheme({
  palette: {
    ...defaultPalette,
    text: {
      primary: "#141414",
      secondary: "black",
    },
  },
});
export const TimesheetNoteDialog = ({
  startDate,
  title,
  isOpen,
  onSubmitForm,
  onClose,
  projects,
}: ITimsheetNoteDialog) => {
  const [noteForm, setNoteForm] = useState<ITimesheetNoteForm>({
    date: startDate,
    project: "",
    phase: "",
    notes: "",
  });

  const [projectPhasesMap, setProjectPhasesMap] =
    useState<Map<string, DerivedProjectFeeTemplate[]>>();

  const [projectPhases, setProjectPhases] = useState<
    DerivedProjectFeeTemplate[]
  >([]);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      onSubmitForm({
        ...noteForm,
        date: DateTime.fromJSDate(new Date(noteForm.date)).toFormat(
          "yyyy-MM-dd"
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const phases: Map<string, DerivedProjectFeeTemplate[]> = new Map<
        string,
        DerivedProjectFeeTemplate[]
      >();

      projects?.forEach((project: ProjectEntity) => {
        phases.set(
          project.id,
          project.derivedFeeTemplate?.templates || []
        );
      });
      
      await setProjectPhasesMap(phases);
    })();
  }, [projects, setProjectPhasesMap]);

  const handleChangeInput = (name: string, value: string) => {
    setNoteForm({ ...noteForm, [name]: value });
  };
  return (
    <Dialog
      data-testid="note-dialog"
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-container": {
          alignItems: "flex-start",
        },
        "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          width: 360,
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmitForm}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <MobileDatePicker
                inputFormat="MM/dd/yyyy"
                label="Date"
                value={noteForm.date}
                onChange={(value) =>
                  handleChangeInput("date", String(value === null ? "" : value))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    variant="standard"
                    sx={(theme) => ({
                      label: {
                        color: theme.palette.text.primary,
                        marginTop: 1,
                      },
                      width: "100%",
                      height: "54px",
                    })}
                    data-testid={`date-notes-text-field`}
                    required={true}
                  />
                )}
                data-testid={"date-note-picker"}
              />
            </LocalizationProvider>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Autocomplete
              data-testid={"select-project"}
              options={(projects || []).map((project: ProjectEntity) => {
               return ({
                  label: project.name,
                  value: project.id,
                })
              })}
              onChange={async (e, value) => {
                console.log({value});
                
                if (value === null) {
                  return;
                }

                let id;

                if (typeof value === "object") {
                  id = value.value || "";
                } else {
                  id = value;
                }

                handleChangeInput("project", String(id));

                const phases = projectPhasesMap?.get(id) || [];
                // console.log({phases});
                
                await setProjectPhases(phases);
              }}
              sx={{
                margin: "16px 0 8px",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Project"
                  variant="standard"
                  required
                />
              )}
              isOptionEqualToValue={(option, value) => {
                return option.value === value.value;
              }}
            />
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Autocomplete
              data-testid={"select-phase"}
              options={projectPhases.map(
                (template: DerivedProjectFeeTemplate) => {
                  // console.log({template});
                  return template.phase
                }
              )}
              onChange={(e, value) =>
                handleChangeInput("phase", String(value === null ? "" : value))
              }
              sx={{
                margin: "16px 0 8px",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Phase"
                  variant="standard"
                  required
                />
              )}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                value === "" ||
                option === value ||
                value === "null"
              }
            />
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <TextField
              data-testid="note-input"
              label="Write a note"
              onChange={(e) => handleChangeInput("notes", e.target.value)}
              sx={{ marginTop: 5, width: "100%" }}
              required
            />
          </ThemeProvider>
          <Box textAlign="right" marginTop={2}>
            <Button
              type="submit"
              sx={{
                background: "#ec650a",
                color: "black",
                fontWeight: 600,
                marginRight: 1,
                "&:hover": { background: "#ea711f" },
                borderRadius: 2,
                padding: "6px 12px",
              }}
            >
              SAVE
            </Button>
            <Button
              onClick={onClose}
              sx={{
                background: "#302828",
                color: "white",
                fontWeight: 600,
                "&:hover": { background: "#453a3a" },
                borderRadius: 2,
                padding: "6px 12px",
              }}
            >
              CANCEL
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};
