import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Tooltip } from "./Tooltip"
import { Button } from "../Button/Button"

const meta: Meta<typeof Tooltip> = {
  title: "Components/UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: { type: "radio" },
      options: ["top", "right", "bottom", "left"],
    },
    content: { control: "text" },
  },
}

export default meta

type Story = StoryObj<typeof Tooltip>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any) => (
  <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
    <Tooltip content={args.content} side={args.side}>
      <Button>Hover me</Button>
    </Tooltip>
  </div>
)

export const Default: Story = {
  args: {
    content: "Tooltip content",
    side: "top",
  },
  render: Template,
}

export const Right: Story = {
  args: {
    content: "Tooltip on the right",
    side: "right",
  },
  render: Template,
}

export const Bottom: Story = {
  args: {
    content: "Tooltip at bottom",
    side: "bottom",
  },
  render: Template,
}

export const Playground: Story = {
  args: {
    content: "Playground tooltip",
    side: "top",
  },
  render: Template,
}
