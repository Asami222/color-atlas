import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Separator } from "./Separator"

const meta: Meta<typeof Separator> = {
  title: "Components/UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
  },
}

export default meta

type Story = StoryObj<typeof Separator>

export const Default: Story = {
  args: {},
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto" }}>
      <Separator {...args} />
    </div>
  ),
}

export const WithLabel: Story = {
  args: {
    children: "または",
  },
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto" }}>
      <Separator {...args} />
    </div>
  ),
}
