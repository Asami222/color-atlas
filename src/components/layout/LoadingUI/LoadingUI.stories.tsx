import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LoadingUI } from "./LoadingUI";

const meta = {
  title: "Components/Layout/Loading",
  component: LoadingUI,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LoadingUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
