import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ShapeButton } from "./ShapeButton"

const meta: Meta<typeof ShapeButton> = {
  title: "Components/UI/ShapeButton",
  component: ShapeButton,
  tags: ["autodocs"],
  argTypes: {
    selectedShape: {
      control: { type: "radio" },
      options: ["grid", "chips", "column"],
    },
    onShapeChange: { action: "clicked" },
  },
}

export default meta

type Story = StoryObj<typeof ShapeButton>

export const Default: Story = {
  args: {
    selectedShape: "grid",
  },
}

export const Chips: Story = {
  args: {
    selectedShape: "chips",
  },
}

export const Column: Story = {
  args: {
    selectedShape: "column",
  },
}

export const Selected: Story = {
  args: {
    selectedShape: "grid",
  },
}

export const AllShapes: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <ShapeButton {...args} selectedShape="grid" />
      <ShapeButton {...args} selectedShape="chips" />
      <ShapeButton {...args} selectedShape="column" />
    </div>
  ),
}
