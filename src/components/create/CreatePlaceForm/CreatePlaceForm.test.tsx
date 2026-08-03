import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { pushMock } = vi.hoisted(() => ({ pushMock: vi.fn() }));
const { createPlaceMock } = vi.hoisted(() => ({ createPlaceMock: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("./action", () => ({
  createPlace: createPlaceMock,
}));

import { CreatePlaceForm } from "./CreatePlaceForm";

function renderForm(props: Partial<React.ComponentProps<typeof CreatePlaceForm>> = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const onOpenChange = vi.fn();
  const onCreated = vi.fn();

  render(
    <QueryClientProvider client={queryClient}>
      <CreatePlaceForm
        open
        onOpenChange={onOpenChange}
        onCreated={onCreated}
        {...props}
      />
    </QueryClientProvider>,
  );

  return {
    onOpenChange,
    onCreated,
    queryClient,
  };
}

describe("CreatePlaceForm", () => {
  beforeEach(() => {
    createPlaceMock.mockReset();
    pushMock.mockReset();
    sessionStorage.clear();
  });

  it("Dialog と Input が表示される", () => {
    renderForm();

    expect(screen.getByText("新しい場所")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("富士市")).toBeInTheDocument();
  });

  it("空の入力ではバリデーションエラーが表示される", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(await screen.findByText("場所またはカテゴリーを入力してください")).toBeInTheDocument();
  });

  it("有効な入力で createPlace が呼ばれ、QueryClient の invalidateQueries が実行される", async () => {
    const user = userEvent.setup();
    const { onOpenChange, onCreated, queryClient } = renderForm();
    createPlaceMock.mockResolvedValue({
      success: true,
      place: { id: "place-1", name: "富士市" },
    });

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const input = screen.getByPlaceholderText("富士市");
    await user.type(input, "富士市");

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "追加" })).toBeEnabled();
    });

    await user.click(screen.getByRole("button", { name: "追加" }));

    await waitFor(() => {
      expect(createPlaceMock).toHaveBeenCalled();
    });
    expect(createPlaceMock.mock.calls[0][0]).toBe("富士市");

    await waitFor(() => {
      expect(onCreated).toHaveBeenCalledWith({
        id: "place-1",
        name: "富士市",
      });
    });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["places"] });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("サーバーエラー時にエラー文言を表示する", async () => {
    const user = userEvent.setup();
    renderForm();
    createPlaceMock.mockResolvedValue({
      success: false,
      message: "その場所は既に登録されています",
    });

    await user.type(screen.getByPlaceholderText("富士市"), "富士市");
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(await screen.findByText("その場所は既に登録されています")).toBeInTheDocument();
  });

  it("ログインが必要な場合は LoginRequiredDialog を開く", async () => {
    const user = userEvent.setup();
    renderForm();
    createPlaceMock.mockResolvedValue({
      success: false,
      message: "ログインが必要です",
    });

    await user.type(screen.getByPlaceholderText("富士市"), "富士市");
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(await screen.findByText("ログインが必要です")).toBeInTheDocument();
  });

  it("ログインボタンで router.push と sessionStorage の保存が行われる", async () => {
    const user = userEvent.setup();
    renderForm();
    createPlaceMock.mockResolvedValue({
      success: false,
      message: "ログインが必要です",
    });

    await user.type(screen.getByPlaceholderText("富士市"), "富士市");
    await user.click(screen.getByRole("button", { name: "追加" }));

    await user.click(await screen.findByRole("button", { name: "ログイン" }));

    expect(pushMock).toHaveBeenCalledWith("/auth/login?callbackUrl=/create");
    expect(sessionStorage.getItem("pending-place")).toBe("富士市");
  });

  it("sessionStorage の内容が入力欄に復元される", async () => {
    sessionStorage.setItem("pending-place", "静岡県");

    renderForm();

    await waitFor(() => {
      expect(screen.getByDisplayValue("静岡県")).toBeInTheDocument();
    });
    expect(sessionStorage.getItem("pending-place")).toBeNull();
  });

  it("送信中はボタンが disabled / loading になる", async () => {
    const user = userEvent.setup();
    renderForm();
    createPlaceMock.mockReturnValue(new Promise(() => {}));

    await user.type(screen.getByPlaceholderText("富士市"), "富士市");
    await user.click(screen.getByRole("button", { name: "追加" }));

    const button = await screen.findByRole("button", { name: "送信中..." });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("送信中...");
  });
});
