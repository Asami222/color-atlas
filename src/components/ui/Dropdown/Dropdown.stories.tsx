import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Dropdown } from "./Dropdown"

const meta: Meta<typeof Dropdown> = {
  title: "Components/UI/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    required: { control: "boolean" },
  },
}

export default meta

type Story = StoryObj<typeof Dropdown>

const defaultOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
]

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: "未設定",
  },
  render: (args) => (
    <div style={{ width: "540px", margin: "0 auto" }}>
      <Dropdown {...args} />
    </div>
  ),
}

export const WithLabel: Story = {
  args: {
    label: "場所",
    options: defaultOptions,
    placeholder: "未設定",
  },
  render: (args) => (
    <div style={{ width: "540px", margin: "0 auto" }}>
      <Dropdown {...args} />
    </div>
  ),
}

export const WithLabelRequired: Story = {
  args: {
    label: "Select Item",
    required: true,
    options: defaultOptions,
    placeholder: "未設定",
  },
}

export const WithHelperText: Story = {
  args: {
    label: "Select Item",
    options: defaultOptions,
    placeholder: "Select an option",
    helperText: "Choose one option from the list",
  },
}

export const WithValue: Story = {
  args: {
    label: "場所",
    value: "option2",
    options: defaultOptions,
  },
}

export const Error: Story = {
  args: {
    label: "場所",
    error: true,
    options: defaultOptions,
    placeholder: "Select an option",
    helperText: "場所を選択してください",
  },
}

export const Disabled: Story = {
  args: {
    label: "年月日",
    disabled: true,
    options: defaultOptions,
    placeholder: "Select an option",
  },
}

export const DisabledWithValue: Story = {
  args: {
    label: "時間",
    disabled: true,
    value: "option1",
    options: defaultOptions,
  },
}

export const Loading: Story = {
  args: {
    label: "月日",
    disabled: true,
    placeholder: "読み込み中...",
    options: defaultOptions,
  },
}
