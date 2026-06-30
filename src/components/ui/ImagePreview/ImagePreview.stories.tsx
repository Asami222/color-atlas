import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ImagePreview } from "./ImagePreview"

const meta: Meta<typeof ImagePreview> = {
  title: "Components/UI/ImagePreview",
  component: ImagePreview,
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    sizes: { control: "text" },
    className: { control: "text" },
    onRemove: { action: "onRemove" },
  },
}

export default meta

type Story = StoryObj<typeof ImagePreview>

export const Default: Story = {
  args: {
    src: "/storybook/sample1.jpg",
    alt: "Sample image",
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    className: "h-[284px] w-[368px]",
  },
}

export const WithRemoveHandler: Story = {
  args: {
    src: "/storybook/sample2.webp",
    alt: "Sample image",
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    className: "h-[284px] w-[368px]",
    onRemove: () => console.log("Removed image"),
  },
}
