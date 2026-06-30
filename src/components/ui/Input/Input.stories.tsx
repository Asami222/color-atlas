import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Input } from "./Input"

const meta: Meta<typeof Input> = {
  title: "Components/UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: { type: "radio" },
      options: ["default", "error"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    defaultValue: { control: "text" },
    type: {
      control: { type: "radio" },
      options: ["text", "email", "password", "search", "tel"],
    },
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: "Enter text",
    status: "default",
    type: "text",
  },
}

export const Error: Story = {
  args: {
    placeholder: "Error state",
    status: "error",
    type: "text",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
    type: "text",
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: "Hello world",
    type: "text",
  },
}

export const Password: Story = {
  args: {
    placeholder: "Enter password",
    type: "password",
  },
}
