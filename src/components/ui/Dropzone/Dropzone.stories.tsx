import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Dropzone } from "./Dropzone"

const meta: Meta<typeof Dropzone> = {
	title: "Components/UI/Dropzone",
	component: Dropzone,
	tags: ["autodocs"],
	argTypes: {
		error: { control: "boolean" },
		disabled: { control: "boolean" },
		className: { control: "text" },
		onChange: { action: "onChange" },
	},
}

export default meta

type Story = StoryObj<typeof Dropzone>

export const Default: Story = {
	args: {},
}

export const Error: Story = {
	args: {
		error: true,
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
}

export const WithClassName: Story = {
	args: {
		className: "w-64 h-40",
	},
}

