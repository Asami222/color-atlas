import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ForgotPasswordForm } from "./ForgotPasswordForm"

const meta: Meta<typeof ForgotPasswordForm> = {
  title: "Components/Auth/ForgotPasswordForm",
  component: ForgotPasswordForm,
  tags: ["autodocs"],
  argTypes: {
    onClick: { table: { disable: true } },
    submitError: { control: "text" },
    isLoading: { control: "boolean" },
    sent: { control: "boolean" },
  },
}

export default meta

type Story = StoryObj<typeof ForgotPasswordForm>

export const Default: Story = {
  args: {
    sent: false,
    isLoading: false,
    submitError: undefined,
    onClick: (email: string) => console.log("onClick", { email }),
  },
  render: (args) => (
    <div className="max-w-md w-full">
      <ForgotPasswordForm {...args} />
    </div>
  ),
}

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
}

export const Sent: Story = {
  args: {
    ...Default.args,
    sent: true,
  },
}

export const SubmitError: Story = {
  args: {
    ...Default.args,
    submitError: "送信に失敗しました。メールアドレスを確認してください。",
  },
}
