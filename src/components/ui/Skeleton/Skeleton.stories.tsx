import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["text", "circle"],
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    variant: "text",
    size: "md",
    className: "w-48",
  },
};

export const Circle: Story = {
  args: {
    variant: "circle",
    size: "lg",
    className: "w-12",
  },
};

export const Paragraph: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="w-full" />
      <Skeleton className="w-5/6" />
      <Skeleton className="w-4/6" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Skeleton {...args} size="sm" className="w-40" />
      <Skeleton {...args} size="md" className="w-48" />
      <Skeleton {...args} size="lg" className="w-56" />
    </div>
  ),
  args: {
    variant: "text",
  },
};
