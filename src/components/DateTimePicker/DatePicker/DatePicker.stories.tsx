import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DatePicker } from "./DatePicker";

const meta = {
  title: "Components/DateTimePicker/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: false,
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
  args: {
    value: new Date(2026, 6, 15),
    disabled: false,
    placeholder: "日付を選択",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutSelection: Story = {
  args: {
    value: undefined,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(args.value);

    return (
      <div className="w-80 max-w-full p-4">
        <DatePicker
          {...args}
          value={value}
          onChange={(date) => {
            setValue(date);
          }}
        />
      </div>
    );
  },
  args: {
    value: new Date(2026, 6, 20),
  },
};
