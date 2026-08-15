import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { IconLabel } from "./IconLabel"

const meta: Meta<typeof IconLabel> = {
  title: "Components/UI/IconLabel",
  component: IconLabel,
  tags: ["autodocs"],
  args: {
    label: "Palette",
    iconName: "palette",
  },
  argTypes: {
    label: { control: "text" },
    iconName: {
      control: { type: "select" },
      options: ["palette", "calendar_clock", "landscape_2", "edit_note"],
    },
    helperText: { control: "text" },
    htmlFor: { control: "text" },
  },
}

export default meta

type Story = StoryObj<typeof IconLabel>

export const Default: Story = {}

export const WithHelperText: Story = {
  args: {
    label: "Schedule",
    iconName: "calendar_clock",
    helperText: "Choose the date and time for your palette.",
    htmlFor: "schedule",
  },
}
