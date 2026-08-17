import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { InputImage } from "./InputImage"

const meta: Meta<typeof InputImage> = {
  title: "Components/UI/InputImage",
  component: InputImage,
  tags: ["autodocs"],
  argTypes: {
    hasError: { control: "boolean" },
    onChange: { action: "onChange" },
  },
}

export default meta

type Story = StoryObj<typeof InputImage>

export const Default: Story = {
  args: {
    hasError: false,
  },
}

export const WithError: Story = {
  args: {
    hasError: true,
  },
}

export const CustomSize: Story = {
  args: {
    hasError: false,
  },
}

export const Small: Story = {
  args: {
    hasError: false,
  },
}
