import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ShapeButton } from "./ShapeButton"

const meta: Meta<typeof ShapeButton> = {
  title: "Components/UI/ShapeButton",
  component: ShapeButton,
  tags: ["autodocs"],
  argTypes: {
    shape: {
      control: { type: "radio" },
      options: ["grid", "chips", "column"],
    },
    selected: { control: "boolean" },
    label: { control: "text" },
    onClick: { action: "clicked" },
  },
}

export default meta

type Story = StoryObj<typeof ShapeButton>

export const Default: Story = {
  args: {
    shape: "grid",
    selected: false,
    label: "Grid view",
  },
}

export const Chips: Story = {
  args: {
    shape: "chips",
    selected: false,
    label: "Chips view",
  },
}

export const Column: Story = {
  args: {
    shape: "column",
    selected: false,
    label: "Column view",
  },
}

export const Selected: Story = {
  args: {
    shape: "grid",
    selected: true,
    label: "Selected grid",
  },
}

export const AllShapes: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <ShapeButton {...args} shape="grid" label="Grid view" />
      <ShapeButton {...args} shape="chips" label="Chips view" />
      <ShapeButton {...args} shape="column" label="Column view" />
    </div>
  ),
  args: {
    selected: false,
  },
}
