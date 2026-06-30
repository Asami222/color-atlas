import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Textarea } from "./Textarea"

const meta: Meta<typeof Textarea> = {
  title: "Components/UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: { type: "radio" },
      options: ["default", "focus", "error", "disabled"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    defaultValue: { control: "text" },
  },
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: "Enter text",
    status: "default",
  },
}

export const Error: Story = {
  args: {
    placeholder: "Error state",
    status: "error",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: "Hello world\nThis is a textarea.",
    status: "default",
  },
}
