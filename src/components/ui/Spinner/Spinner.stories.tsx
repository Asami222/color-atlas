import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/UI/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "number" },
      description: "Spinner diameter in pixels",
      defaultValue: 24,
    },
    color: {
      control: { type: "radio" },
      options: ["var(--color-primary)", "black", "white"],
      description: "Spinner border color",
      defaultValue: "var(--color-primary)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 24,
    color: "var(--color-primary)",
  },
};

export const Black: Story = {
  args: {
    size: 24,
    color: "black",
  },
};

export const White: Story = {
  args: {
    size: 24,
    color: "white",
  },
  /* 背景が白い場合の見え方を確認するためのStory
  render: (args) => (
    <div className="bg-black p-4 inline-flex rounded-md">
      <Spinner {...args} />
    </div>
  ),
  */
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Spinner {...args} size={16} />
      <Spinner {...args} size={24} />
      <Spinner {...args} size={32} />
      <Spinner {...args} size={40} />
    </div>
  ),
  args: {
    color: "var(--color-primary)",
  },
};
