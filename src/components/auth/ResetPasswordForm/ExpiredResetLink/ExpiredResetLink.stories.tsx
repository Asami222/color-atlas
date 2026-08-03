import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExpiredResetLink } from "./ExpiredResetLink";

const meta: Meta<typeof ExpiredResetLink> = {
  title: "Components/Auth/ExpiredReset",
  component: ExpiredResetLink,
  tags: ["autodocs"],
  argTypes: {
    onLogin: { table: { disable: true } },
    onForgotPassword: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof ExpiredResetLink>;

export const Default: Story = {
  args: {
    onLogin: () => console.log("onGoogleLogin"),
    onForgotPassword: () => console.log("onGoogleLogin"),
  },
  render: (args) => (
    <div className="max-w-md w-full">
      <ExpiredResetLink {...args}/>
    </div>
  ),
};
