import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ExpiredResetLink } from "./ExpiredResetLink";

describe("ExpiredResetLink", () => {
  it("フォームが表示される", () => {
    const onForgotPassword = vi.fn();
    const onLogin = vi.fn();

    render(<ExpiredResetLink onForgotPassword={onForgotPassword} onLogin={onLogin} />);

    expect(
      screen.getByText(/再設定リンクの有効期限が切れています/)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "再設定ページへ戻る" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "ログインへ戻る" })
    ).toBeInTheDocument();
  });

  it("ボタンをクリックすると対応するハンドラが呼ばれる", async () => {
    const user = userEvent.setup();
    const onForgotPassword = vi.fn();
    const onLogin = vi.fn();

    render(<ExpiredResetLink onForgotPassword={onForgotPassword} onLogin={onLogin} />);

    await user.click(screen.getByRole("button", { name: "再設定ページへ戻る" }));
    await user.click(screen.getByRole("button", { name: "ログインへ戻る" }));

    expect(onForgotPassword).toHaveBeenCalledTimes(1);
    expect(onLogin).toHaveBeenCalledTimes(1);
  });
});
