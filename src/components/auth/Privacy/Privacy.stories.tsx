import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Privacy } from "./Privacy"

const meta: Meta<typeof Privacy> = {
  title: "Components/Auth/privacy",
  component: Privacy,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Privacy>

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-4xl p-6">
      <Privacy  />
    </div>
  ),
}
