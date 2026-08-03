// LoginForm.test.tsx

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("フォームが表示される", () => {
    render(<LoginForm />);

    expect(
      screen.getByLabelText(/メールアドレス/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/パスワード/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "ログイン" })
    ).toBeInTheDocument();
  });

  it("入力後にログインできる", async () => {
    const user = userEvent.setup();

    const onLogin = vi.fn();

    render(<LoginForm onLogin={onLogin} />);

    await user.type(
      screen.getByLabelText(/メールアドレス/i),
      "test@example.com"
    );
    
    await user.type(
      screen.getByLabelText(/パスワード/i),
      "password123!"
    );

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "ログイン" })
      ).toBeEnabled()
    );
   
    await user.click(
      screen.getByRole("button", { name: "ログイン" })
    );
   

    expect(onLogin).toHaveBeenCalledWith(
      "test@example.com",
      "password123!"
    );

  });

  it("不正なメールアドレスでは送信できない", async () => {
    const user = userEvent.setup();

    const onLogin = vi.fn();

    render(<LoginForm onLogin={onLogin} />);

    await user.type(
      screen.getByLabelText(/メールアドレス/i),
      "abc"
    );

    await user.type(
      screen.getByLabelText(/パスワード/i),
      "password123!"
    );

    expect(
      screen.getByRole("button", { name: "ログイン" })
    ).toBeDisabled();

    expect(onLogin).not.toHaveBeenCalled();
  });

  it("Googleログインが呼ばれる", async () => {
    const user = userEvent.setup();

    const onGoogleLogin = vi.fn();

    render(
      <LoginForm onGoogleLogin={onGoogleLogin} />
    );

    await user.click(
      screen.getByRole("button", {
        name: /Googleで続ける/,
      })
    );

    expect(onGoogleLogin).toHaveBeenCalledOnce();
  });

  it("ゲストログインが呼ばれる", async () => {
    const user = userEvent.setup();

    const onGuestLogin = vi.fn();

    render(
      <LoginForm onGuestLogin={onGuestLogin} />
    );

    await user.click(
      screen.getByRole("button", {
        name: /ゲスト/i,
      })
    );

    expect(onGuestLogin).toHaveBeenCalledOnce();
  });

  it("submitErrorを表示する", () => {
    render(
      <LoginForm submitError="ログインに失敗しました" />
    );

    expect(
      screen.getByTestId("login-error")
    ).toHaveTextContent("ログインに失敗しました");
  });

  it("credential loading中はログインボタンがloadingになる", () => {
    render(<LoginForm loadingMethod="credential" />);

    const button = screen.getByRole("button", {
      name: "ログイン",
    });

    expect(button).toBeDisabled();
    expect(screen.getByText("送信中...")).toBeInTheDocument();
  });

  it("google loading中は全ボタンがdisabledになる", () => {
    render(
      <LoginForm loadingMethod="google" />
    );

    expect(
      screen.getByRole("button", {
        name: /処理中です.../,
      })
    ).toBeDisabled();

    expect(
      screen.getByRole("button", {
        name: "ログイン",
      })
    ).toBeDisabled();
  });
});