import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import Terms from "./Terms"

const meta: Meta<typeof Terms> = {
  title: "Components/Auth/Terms",
  component: Terms,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Terms>

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-4xl p-6">
      <Terms  />
    </div>
  ),
}
