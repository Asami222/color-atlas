import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SignupForm } from "./SignupForm"

const meta: Meta<typeof SignupForm> = {
  title: "Components/Auth/SignupForm",
  component: SignupForm,
  tags: ["autodocs"],
  argTypes: {
    loadingMethod: {
      control: { type: "radio" },
      options: [null, "credential", "google"],
    },
    submitError: { control: "text" },
    onSignup: { table: { disable: true } },
    onGoogleLogin: { table: { disable: true } },
  },
}

export default meta

type Story = StoryObj<typeof SignupForm>

export const Default: Story = {
  args: {
    onSignup: (data) => console.log("onSignup", data),
    onGoogleLogin: () => console.log("onGoogleLogin"),
    loadingMethod: null,
  },
  render: (args) => (
    <div className="max-w-md w-full">
      <SignupForm {...args} />
    </div>
  ),
}

export const LoadingCredential: Story = {
  args: {
    ...Default.args,
    loadingMethod: "credential",
  },
}

export const LoadingGoogle: Story = {
  args: {
    ...Default.args,
    loadingMethod: "google",
  },
}

export const SubmitError: Story = {
  args: {
    ...Default.args,
    submitError: "サインアップに失敗しました。メールアドレスとパスワードを確認してください。",
  },
}
