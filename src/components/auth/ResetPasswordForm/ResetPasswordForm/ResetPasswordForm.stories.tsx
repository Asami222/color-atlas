import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ResetPasswordForm } from "./ResetPasswordForm"

const meta: Meta<typeof ResetPasswordForm> = {
  title: "Components/Auth/ResetPasswordForm",
  component: ResetPasswordForm,
  tags: ["autodocs"],
  argTypes: {
    submitError: { control: "text" },
    onClick: { table: { disable: true } },
  },
}

export default meta

type Story = StoryObj<typeof ResetPasswordForm>

export const Default: Story = {
  args: {
    onClick: (password, confirmPassword) =>
      console.log("onClick", { password, confirmPassword }),
    isLoading: false,
    submitError: "",
  },
  render: (args) => (
    <div className="max-w-md w-full">
      <ResetPasswordForm {...args} />
    </div>
  ),
}

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
}

export const SubmitError: Story = {
  args: {
    ...Default.args,
    submitError: "パスワードのリセットに失敗しました。再度お試しください。",
  },
}
