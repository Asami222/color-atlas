import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Error } from "./Error";

const meta: Meta<typeof Error> = {
  title: "Components/Layout/Error",
  component: Error,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Error>;

export const Default: Story = {
  args: {
    isLoading: false,
    onClick: () => {},
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    onClick: () => {},
  },
};
