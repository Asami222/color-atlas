import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SignupForm } from "./SignupForm";

describe("SignupForm", () => {
  it("フォームが表示される", () => {
    const { container } = render(<SignupForm />);

    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();
    expect(container.querySelector("#password")).toBeInTheDocument();
    expect(container.querySelector("#confirmPassword")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "新規登録ボタン" })
    ).toBeInTheDocument();
  });

  it("有効な入力でサインアップできる", async () => {
    const user = userEvent.setup();
    const onSignup = vi.fn();

    const { container } = render(<SignupForm onSignup={onSignup} />);

    const passwordInput = container.querySelector("#password") as HTMLInputElement;
    const confirmPasswordInput = container.querySelector("#confirmPassword") as HTMLInputElement;

    await user.type(screen.getByLabelText(/メールアドレス/i), "test@example.com");
    await user.type(passwordInput, "password123!");
    await user.type(confirmPasswordInput, "password123!");
    await user.click(screen.getByRole("checkbox"));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "新規登録ボタン" })).toBeEnabled();
    });

    await user.click(screen.getByRole("button", { name: "新規登録ボタン" }));

    expect(onSignup).toHaveBeenCalledWith(
      "test@example.com",
      "password123!",
      "password123!",
      true
    );
  });

  it("不正な入力では送信できない", async () => {
    const user = userEvent.setup();
    const onSignup = vi.fn();

    const { container } = render(<SignupForm onSignup={onSignup} />);

    const passwordInput = container.querySelector("#password") as HTMLInputElement;
    const confirmPasswordInput = container.querySelector("#confirmPassword") as HTMLInputElement;

    await user.type(screen.getByLabelText(/メールアドレス/i), "abc");
    await user.type(passwordInput, "pass");
    await user.type(confirmPasswordInput, "different");

    expect(screen.getByRole("button", { name: "新規登録ボタン" })).toBeDisabled();
    expect(onSignup).not.toHaveBeenCalled();
  });

  it("Googleログインが呼ばれる", async () => {
    const user = userEvent.setup();
    const onGoogleLogin = vi.fn();

    render(<SignupForm onGoogleLogin={onGoogleLogin} />);

    await user.click(screen.getByRole("button", { name: /グーグルでログイン/i }));

    expect(onGoogleLogin).toHaveBeenCalledOnce();
  });

  it("submitErrorを表示する", () => {
    render(<SignupForm submitError="登録に失敗しました" />);

    expect(screen.getByTestId("login-error")).toHaveTextContent("登録に失敗しました");
  });

  it("credential loading中はボタンがdisabledになる", () => {
    render(<SignupForm loadingMethod="credential" />);

    expect(screen.getByRole("button", { name: "新規登録ボタン" })).toBeDisabled();
    expect(screen.getByText("作成中...")).toBeInTheDocument();
  });
});
