import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["Solid", "Outline", "Text"],
    },
    size: {
      control: { type: "radio" },
      options: ["Small", "Medium"],
    },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    loadingText: { control: "text" },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    variant: "Solid",
    size: "Medium",
    children: "Button",
  },
}

export const Solid: Story = {
  args: {
    variant: "Solid",
    size: "Medium",
    children: "Solid Button",
  },
}

export const Outline: Story = {
  args: {
    variant: "Outline",
    size: "Medium",
    children: "Outline Button",
  },
}

export const Text: Story = {
  args: {
    variant: "Text",
    size: "Medium",
    children: "Text Button",
  },
}

export const Small: Story = {
  args: {
    variant: "Solid",
    size: "Small",
    children: "Small Button",
  },
}

export const Error: Story = {
  args: {
    variant: "Solid",
    size: "Medium",
    error: true,
    children: "Error Button",
  },
}

export const Loading: Story = {
  args: {
    variant: "Solid",
    size: "Medium",
    loading: true,
    loadingText: "Loading...",
  },
}
/*
export const Focused: Story = {
  args: {
    variant: "Solid",
    size: "Medium",
    children: "Focused Button",
  },

  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector("button");
    if (button instanceof HTMLButtonElement) {
      button.focus();
    }
  },
};
*/