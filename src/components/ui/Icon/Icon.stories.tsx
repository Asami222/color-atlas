import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Icon } from "./Icon"

const meta: Meta<typeof Icon> = {
  title: "Components/UI/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      defaultValue: "home",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg", "xl"],
    },
    filled: { control: "boolean" },
    color: {
      control: { type: "radio" },
      options: ["default", "secondary", "disabled"],
    },
    className: { control: "text" },
  },
}

export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args: {
    name: "home",
    size: "md",
    filled: false,
  },
}

export const Filled: Story = {
  args: {
    name: "favorite",
    size: "md",
    filled: true,
  },
}

export const Large: Story = {
  args: {
    name: "home",
    size: "xl",
    filled: false,
  },
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex items-center gap-6">
      <Icon {...args} name="home" color="default" />
      <Icon {...args} name="home" color="secondary" />
      <Icon {...args} name="home" color="disabled" />
    </div>
  ),
  args: {
    size: "md",
    filled: false,
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Icon {...args} name="home" size="sm" />
      <Icon {...args} name="home" size="md" />
      <Icon {...args} name="home" size="lg" />
      <Icon {...args} name="home" size="xl" />
    </div>
  ),
  args: {
    filled: false,
  },
}
