import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExpiredResetLink } from "./ExpiredResetLink";

const meta: Meta<typeof ExpiredResetLink> = {
  title: "Components/Auth/ExpiredReset",
  component: ExpiredResetLink,
  tags: ["autodocs"],
  argTypes: {
    onForgotPassword: { table: { disable: true } },
    onBackToLogin: { table: { disable: true } },
    loadingMethod: {
      control: { type: "radio" },
      options: [null, "forgot", "login"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ExpiredResetLink>;

export const Default: Story = {
  args: {
    loadingMethod: null,
    disabled: false,
    onForgotPassword: () => console.log("onForgotPassword"),
    onBackToLogin: () => console.log("onBackToLogin"),
  },
  render: (args) => (
    <div className="max-w-md w-full">
      <ExpiredResetLink {...args} />
    </div>
  ),
};

export const LoadingForgot: Story = {
  args: {
    ...Default.args,
    loadingMethod: "forgot",
  },
};

export const LoadingLogin: Story = {
  args: {
    ...Default.args,
    loadingMethod: "login",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
