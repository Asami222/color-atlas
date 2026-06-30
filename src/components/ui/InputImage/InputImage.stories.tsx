import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { InputImage } from "./InputImage"

const meta: Meta<typeof InputImage> = {
  title: "Components/UI/InputImage",
  component: InputImage,
  tags: ["autodocs"],
  argTypes: {
    hasError: { control: "boolean" },
    width: { control: "text" },
    height: { control: "text" },
    onChange: { action: "onChange" },
  },
}

export default meta

type Story = StoryObj<typeof InputImage>

export const Default: Story = {
  args: {
    hasError: false,
    width: "368px",
    height: "284px",
  },
}

export const WithError: Story = {
  args: {
    hasError: true,
    width: "368px",
    height: "284px",
  },
}

export const CustomSize: Story = {
  args: {
    hasError: false,
    width: "500px",
    height: "400px",
  },
}

export const Small: Story = {
  args: {
    hasError: false,
    width: "250px",
    height: "200px",
  },
}
