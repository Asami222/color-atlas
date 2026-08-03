import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SignupForm } from "./SignupForm";
import { logRoles } from "@testing-library/dom";

describe("SignupForm", () => {
  it("フォームが表示される", () => {
    const { container } = render(<SignupForm />);

    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();
    expect(container.querySelector("#password")).toBeInTheDocument();
    expect(container.querySelector("#confirmPassword")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "作成" })
    ).toBeInTheDocument();
  });

  it("有効な入力でサインアップできる", async () => {
    const user = userEvent.setup();
    const onSignup = vi.fn();

    render(<SignupForm onSignup={onSignup} />);
    
    screen.debug();
    logRoles(document.body);

    await user.type(screen.getByLabelText(/メールアドレス/i), "test@example.com");
    await user.type(screen.getByTestId('password-input'), "password123!");
    await user.type(screen.getByTestId('confirm-input'), "password123!");
    await user.click(screen.getByRole("checkbox", {name: /利用規約/,}));

    const button = screen.getByRole("button", { name: "作成" });

    await waitFor(() => {
      expect(button).toBeEnabled();
    });

    await user.click(button);

    expect(onSignup).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "test@example.com",
        password: "password123!",
        confirmPassword: "password123!",
        check: true,
      })
    );
  });

  it("不正な入力では送信できない", async () => {
    const user = userEvent.setup();
    const onSignup = vi.fn();

    render(<SignupForm onSignup={onSignup} />);

    await user.type(screen.getByLabelText(/メールアドレス/i), "abc");
    await user.type(screen.getByTestId('password-input'), "pass");
    await user.type(screen.getByTestId('confirm-input'), "different");

    expect(screen.getByRole("button", { name: "作成" })).toBeDisabled();
    expect(onSignup).not.toHaveBeenCalled();
  });

  it("Googleログインが呼ばれる", async () => {
    const user = userEvent.setup();
    const onGoogleLogin = vi.fn();

    render(<SignupForm onGoogleLogin={onGoogleLogin} />);

    await user.click(screen.getByRole("button", { name: /Googleで続ける/i }));

    expect(onGoogleLogin).toHaveBeenCalledOnce();
  });

  it("submitErrorを表示する", () => {
    render(<SignupForm submitError="登録に失敗しました" />);

    expect(screen.getByTestId("login-error")).toHaveTextContent("登録に失敗しました");
  });

  it("credential loading中はボタンがdisabledになる", () => {
    render(<SignupForm loadingMethod="credential" />);

    expect(screen.getByRole("button", { name: "作成中..." })).toBeDisabled();
    expect(screen.getByText("作成中...")).toBeInTheDocument();
  });
});
