import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Checkbox } from "./Checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Components/UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    onChange: { action: "onChange" },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: "Checkbox label",
    checked: false,
  },
}

export const Checked: Story = {
  args: {
    label: "Checked checkbox",
    checked: true,
  },
}

export const Error: Story = {
  args: {
    label: "Checkbox with error",
    error: true,
  },
}

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
}
