import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TimePicker } from "./TimePicker";

const meta = {
  title: "Components/DateTimePicker/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 23, step: 1 },
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    value: 14,
    disabled: false,
  },
} satisfies Meta<typeof TimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | undefined>(args.value);

    return (
      <div className="p-4">
        <TimePicker
          {...args}
          value={value}
          onChange={(hour) => {
            setValue(hour);
          }}
        />
      </div>
    );
  },
  args: {
    value: 9,
  },
};
