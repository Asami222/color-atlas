import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

describe("ForgotPasswordForm", () => {
  it("フォームが表示される", () => {
    render(<ForgotPasswordForm sent={false} />);

    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "パスワード変更" })).toBeInTheDocument();
  });

  it("有効なメールアドレスで送信できる", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ForgotPasswordForm sent={false} onClick={onClick} />);

    await user.type(screen.getByLabelText(/メールアドレス/i), "test@example.com");

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "パスワード変更" })).toBeEnabled();
    });

    await user.click(screen.getByRole("button", { name: "パスワード変更" }));

    expect(onClick).toHaveBeenCalledWith("test@example.com");
  });

  it("不正なメールアドレスでは送信できない", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ForgotPasswordForm sent={false} onClick={onClick} />);

    await user.type(screen.getByLabelText(/メールアドレス/i), "abc");

    expect(screen.getByRole("button", { name: "パスワード変更" })).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("submitErrorを表示する", () => {
    render(<ForgotPasswordForm sent={false} submitError="メール送信に失敗しました" />);

    expect(screen.getByTestId("forgot-password-error")).toHaveTextContent("メール送信に失敗しました");
  });

  it("送信済み状態ではボタンが無効化される", () => {
    render(<ForgotPasswordForm sent={true} />);

    expect(screen.getByRole("button", { name: "パスワード変更" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "パスワード変更" })).toHaveTextContent("メール送信済み");
  });
});
