import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GlobalNavigationClient } from "./GlobalNavigationClient";

const meta: Meta<typeof GlobalNavigationClient> = {
  title: "Components/Layout/GlobalNavigation",
  component: GlobalNavigationClient,
  tags: ["autodocs"],
  argTypes: {
    onLogout: { action: "onLogout" },
  },
};

export default meta;

type Story = StoryObj<typeof GlobalNavigationClient>;

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
      <GlobalNavigationClient {...(args)} />
    </div>
  ),
  args: {
    isAuthenticated: true,
  },
};
