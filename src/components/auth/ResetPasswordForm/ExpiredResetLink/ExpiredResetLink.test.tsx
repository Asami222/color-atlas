import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ExpiredResetLink } from "./ExpiredResetLink";

describe("ExpiredResetLink", () => {
  it("フォームが表示される", () => {
    const onForgot = vi.fn();
    const onBack = vi.fn();

    render(
      <ExpiredResetLink onForgotPassword={onForgot} onBackToLogin={onBack} />
    );

    expect(
      screen.getByText(/再設定リンクの有効期限が切れています/)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "再設定メールを送信" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "ログインへ戻る" })
    ).toBeInTheDocument();
  });

  it("ボタンをクリックするとハンドラが呼ばれる", async () => {
    const user = userEvent.setup();
    const onForgot = vi.fn();
    const onBack = vi.fn();

    render(
      <ExpiredResetLink onForgotPassword={onForgot} onBackToLogin={onBack} />
    );

    await user.click(screen.getByRole("button", { name: "再設定メールを送信" }));
    await user.click(screen.getByRole("button", { name: "ログインへ戻る" }));

    expect(onForgot).toHaveBeenCalledOnce();
    expect(onBack).toHaveBeenCalledOnce();
  });

  it("loadingMethodによりloadingとdisabledが反映される", () => {
    const onForgot = vi.fn();
    const onBack = vi.fn();

    render(
      <ExpiredResetLink onForgotPassword={onForgot} onBackToLogin={onBack} loadingMethod="forgot" />
    );

    expect(
      screen.getByRole("button", { name: "再設定メールを送信" })
    ).toBeDisabled();

    expect(screen.getByText("送信中です...")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "ログインへ戻る" })
    ).toBeDisabled();
  });

  it("props disabled=true ならボタンが無効", () => {
    const onForgot = vi.fn();
    const onBack = vi.fn();

    render(
      <ExpiredResetLink onForgotPassword={onForgot} onBackToLogin={onBack} disabled />
    );

    expect(
      screen.getByRole("button", { name: "再設定メールを送信" })
    ).toBeDisabled();

    expect(
      screen.getByRole("button", { name: "ログインへ戻る" })
    ).toBeDisabled();
  });
});
