import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Input } from "../Input"
import { Field } from "./Field"

const meta: Meta<typeof Field> = {
  title: "Components/UI/Field",
  component: Field,
  tags: ["autodocs"],
  args: {
    label: "Display name",
    htmlFor: "display-name",
    required: true,
  },
  argTypes: {
    label: { control: "text" },
    htmlFor: { control: "text" },
    required: { control: "boolean" },
    error: { control: "text" },
    children: { control: false },
  },
}

export default meta

type Story = StoryObj<typeof Field>

export const Default: Story = {
  args: {
    children: <Input id="display-name" placeholder="Enter your name" />,
  },
}

export const WithError: Story = {
  args: {
    error: "This field is required.",
    children: <Input id="email" type="email" placeholder="name@example.com" />,
  },
}
