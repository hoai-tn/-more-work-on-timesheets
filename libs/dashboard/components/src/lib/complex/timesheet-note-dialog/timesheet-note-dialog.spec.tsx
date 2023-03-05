/* istanbul ignore file */
import {
  fakeProject,
} from "@cupola/types";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TimesheetNoteDialog } from "./timesheet-note-dialog";

const project1 = fakeProject("Project1");
const project2 = fakeProject("Project2");

describe("Timesheet note dialog", () => {
  const submitNotesMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const { baseElement } = render(
      <TimesheetNoteDialog
        startDate="12-19-2022"
        title="Add a Note"
        isOpen={true}
        onSubmitForm={(note) => console.log(note)}
        onClose={() => console.log(false)}
        projects={[]}
      />
    );

    expect(baseElement).toBeTruthy();
  });

  it("should submit dialog form when clicking 'SAVE' button", async () => {
    const { baseElement } = render(
      <TimesheetNoteDialog
        startDate="12-19-2022"
        title="Add a Note"
        isOpen={true}
        onSubmitForm={(note) => submitNotesMock(note)}
        onClose={() => console.log(false)}
        projects={[project1, project2]}
      />
    );
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
    // type note date-picker
    fireEvent.click(screen.getByTestId("date-notes-text-field"));
    fireEvent.click(screen.getByTestId("PenIcon"));
    const date = baseElement.querySelector(
      ".MuiCalendarOrClockPicker-root input"
    );
    date &&
      fireEvent.change(date, {
        target: { value: "01/01/2023" },
      });
    fireEvent.click(screen.getByText("OK"));

    selectProject &&
      fireEvent.change(selectProject, {
        target: { value: "Project1" },
      });

    const chooseProject = baseElement.querySelector(
      '.MuiAutocomplete-popper li[data-option-index="0"]'
    );
    chooseProject && fireEvent.click(chooseProject);

    selectPhase &&
      fireEvent.change(selectPhase, {
        target: { value: "Overhead" },
      });

    const choosePhase = baseElement.querySelector(
      '.MuiAutocomplete-popper li[data-option-index="0"]'
    );
    choosePhase && fireEvent.click(choosePhase);

    note &&
      fireEvent.change(note, {
        target: { value: "note test" },
      });

    fireEvent.click(screen.getByText("SAVE"));
    await waitFor(() => {
      expect(submitNotesMock).toBeCalled();
      expect(submitNotesMock).toBeCalledWith(
        expect.objectContaining({
          date: "2023-01-01",
          notes: "note test",
          phase: "Overhead",
          project: project1.id,
        })
      );
    });
  });
});
