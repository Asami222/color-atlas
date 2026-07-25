import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ResetPasswordForm } from "./ResetPasswordForm";

describe("ResetPasswordForm", () => {
  it("フォームが表示される", () => {
    render(<ResetPasswordForm />);

    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/確認用パスワード/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "新パスワード作成" })
    ).toBeInTheDocument();
  });

  it("有効な入力で送信できる", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ResetPasswordForm onClick={onClick} />);

    await user.type(screen.getByLabelText(/パスワード/i), "Password1!");
    await user.type(screen.getByLabelText(/確認用パスワード/i), "Password1!");

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "新パスワード作成" })
      ).toBeEnabled();
    });

    await user.click(screen.getByRole("button", { name: "新パスワード作成" }));

    expect(onClick).toHaveBeenCalledWith("Password1!", "Password1!");
  });

  it("無効な入力では送信できない", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ResetPasswordForm onClick={onClick} />);

    await user.type(screen.getByLabelText(/パスワード/i), "Password1");
    await user.type(screen.getByLabelText(/確認用パスワード/i), "Password1");

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "新パスワード作成" })
      ).toBeEnabled();
    });

    await user.click(screen.getByRole("button", { name: "新パスワード作成" }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("確認用パスワードが一致しない場合は送信できない", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ResetPasswordForm onClick={onClick} />);

    await user.type(screen.getByLabelText(/パスワード/i), "Password1!");
    await user.type(screen.getByLabelText(/確認用パスワード/i), "Password2!");

    expect(
      screen.getByRole("button", { name: "新パスワード作成" })
    ).toBeDisabled();

    expect(onClick).not.toHaveBeenCalled();
  });

  it("submitErrorを表示する", () => {
    render(
      <ResetPasswordForm submitError="パスワードの更新に失敗しました" />
    );

    expect(screen.getByTestId("reset-password-error")).toHaveTextContent(
      "パスワードの更新に失敗しました"
    );
  });

  it("loading中はボタンがdisabledになり、ローディングテキストが表示される", () => {
    render(<ResetPasswordForm isLoading />);

    const button = screen.getByRole("button", { name: "新パスワード作成" });

    expect(button).toBeDisabled();
    expect(screen.getByText("作成中...")).toBeInTheDocument();
  });
});
