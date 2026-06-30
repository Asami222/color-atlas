import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GlobalNavigation } from "./GlobalNavigation";

const meta: Meta<typeof GlobalNavigation> = {
  title: "Components/Layout/GlobalNavigation",
  component: GlobalNavigation,
  tags: ["autodocs"],
  argTypes: {
    onLogout: { action: "onLogout" },
  },
};

export default meta;

type Story = StoryObj<typeof GlobalNavigation>;

export const Authenticated: Story = {
  args: {
    isAuthenticated: true,
  },
};

export const Unauthenticated: Story = {
  args: {
    isAuthenticated: false,
  },
};

export const MobilePreview: Story = {
  render: (args) => (
    <div style={{ width: 375 }}>
      <GlobalNavigation {...(args)} />
    </div>
  ),
  args: {
    isAuthenticated: true,
  },
};
