import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Calendar } from "./Calendar";

const meta = {
  title: "Components/DateTimePicker/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: false,
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(args.value);

    return <Calendar {...args} value={value} onChange={setValue} />;
  },
  args: {
    value: new Date(2026, 6, 15),
  },
};

export const WithoutSelection: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(undefined);

    return <Calendar {...args} value={value} onChange={setValue} />;
  },
};
