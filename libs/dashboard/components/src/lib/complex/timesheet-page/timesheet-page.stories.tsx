import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimesheetsPage } from "./timesheet-page";

export default {
  component: TimesheetsPage,
} as ComponentMeta<typeof TimesheetsPage>;

const Template: ComponentStory<typeof TimesheetsPage> = (args) => {
  const [testInputField, setTestInputField] = useState<string>(null);

  return (
    <div>
      <TimesheetsPage
        onChangeTimesheetEntries={(e) => setTestInputField(e)}
      />
      <textarea
        id="timesheets-page-test-data"
        style={{ width: "100%", height: 104, marginTop: 10 }}
        value={testInputField}
        onChange={(e) => setTestInputField(e.target.toString())}
      ></textarea>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
