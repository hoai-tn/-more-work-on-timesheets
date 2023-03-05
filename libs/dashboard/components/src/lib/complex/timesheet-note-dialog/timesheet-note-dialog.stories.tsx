import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimesheetNoteDialog } from "./timesheet-note-dialog";
import { Box, Button } from "@mui/material";
import { useState } from "react";
export default {
  component: TimesheetNoteDialog,
} as ComponentMeta<typeof TimesheetNoteDialog>;

const Template: ComponentStory<typeof TimesheetNoteDialog> = (args) => {
  const [testData, setTestData] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box>
      <Button onClick={() => setOpen((preState) => !preState)}>
        Toggle dialog
      </Button>
      <TimesheetNoteDialog
        isOpen={open}
        onSubmitForm={(note) => {
          setTestData(JSON.stringify(note));
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
        {...args}
      />
      <textarea
        id="text-area-test-data"
        style={{ width: "100%", height: 100, marginTop: 10 }}
        value={testData}
      ></textarea>
    </Box>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  startDate: "2022-12-19",
  title: "Add a Note",
  projects: [
    {
      id: "553f8fab-ec03-47ef-9000-9ac05cd1a689",
      name: "Project1",
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
        ],
        type: "Fixed",
      },
    },
  ],
};
