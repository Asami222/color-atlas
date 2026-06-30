import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LoginForm } from "./LoginForm"

const meta: Meta<typeof LoginForm> = {
  title: "Components/Auth/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  argTypes: {
    loadingMethod: {
      control: { type: "radio" },
      options: [null, "credential", "google", "guest"],
    },
    submitError: { control: "text" },
    onLogin: { table: { disable: true } },
    onGuestLogin: { table: { disable: true } },
    onGoogleLogin: { table: { disable: true } },
  },
}

export default meta

type Story = StoryObj<typeof LoginForm>

export const Default: Story = {
  args: {
    onLogin: (email, password) => console.log("onLogin", { email, password }),
    onGuestLogin: () => console.log("onGuestLogin"),
    onGoogleLogin: () => console.log("onGoogleLogin"),
    loadingMethod: null,
  },
  render: (args) => (
    <div className="max-w-md w-full">
      <LoginForm {...args} />
    </div>
  ),
}

export const LoadingCredential: Story = {
  args: {
    ...Default.args,
    loadingMethod: "credential",
  },
}

export const SubmitError: Story = {
  args: {
    ...Default.args,
    submitError: "メールアドレスまたはパスワードが正しくありません。",
  },
}
