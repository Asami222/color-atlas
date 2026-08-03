import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { pushMock, toastErrorMock, toastSuccessMock, useAtomValueMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  toastErrorMock: vi.fn(),
  toastSuccessMock: vi.fn(),
  useAtomValueMock: vi.fn(),
}));
const { createColorAtlasMock } = vi.hoisted(() => ({
  createColorAtlasMock: vi.fn(),
}));

type MockProps = {
  children?: ReactNode;
  [key: string]: unknown;
};

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock("sonner", () => ({
  toast: {
    error: toastErrorMock,
    success: toastSuccessMock,
  },
}));

vi.mock("./action", () => ({
  createColorAtlas: createColorAtlasMock,
}));

vi.mock("jotai", async (importOriginal) => {
  const actual = await importOriginal<typeof import("jotai")>();

  return {
    ...actual,
    useAtomValue: useAtomValueMock,
  };
});

vi.mock("@/components/Create/hooks/usePlaces", () => ({
  usePlaces: () => ({
    data: [{ id: "place-1", name: "富士市" }],
  }),
}));

vi.mock("@/components/ui/Dropdown", () => ({
  Dropdown: ({ label, helperText, options, value, onChange, placeholder }: MockProps & { label?: string; helperText?: string; options?: Array<{ value: string; label: string }>; value?: string; onChange?: (value: string) => void; placeholder?: string }) => (
    <div>
      <label>{label}</label>
      <select aria-label={label} value={value ?? ""} onChange={(event) => onChange?.(event.target.value)}>
        <option value="">{placeholder}</option>
        {(options ?? []).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && <p>{helperText}</p>}
    </div>
  ),
}));

vi.mock("@/components/ui/Switch", () => ({
  SwitchButton: ({ checked, onCheckedChange }: MockProps & { checked?: boolean; onCheckedChange?: (checked: boolean) => void }) => (
    <button type="button" aria-pressed={checked} onClick={() => onCheckedChange?.(!checked)}>
      switch
    </button>
  ),
}));

vi.mock("@/components/ui/Textarea/Textarea", () => ({
  Textarea: (props: MockProps) => <textarea {...props} />,
}));

vi.mock("@/components/DateTimePicker", () => ({
  DateTimePicker: ({ value, onChange }: MockProps & { value?: Date; onChange?: (value: Date) => void }) => (
    <input
      aria-label="date"
      value={value?.toISOString?.() ?? ""}
      onChange={(event) => onChange?.(new Date(event.target.value))}
    />
  ),
}));

vi.mock("@/components/ui/IconLabel", () => ({
  IconLabel: ({ label, htmlFor, helperText }: MockProps & { label?: string; htmlFor?: string; helperText?: string }) => (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      {helperText && <p>{helperText}</p>}
    </div>
  ),
}));

vi.mock("@/components/ui/Button", () => ({
  Button: ({ children, type, ...props }: MockProps & { type?: "button" | "submit" | "reset" }) => (
    <button type={type ?? "button"} {...props}>
      {children}
    </button>
  ),
}));

vi.mock("@/components/Create/CreatePlaceForm", () => ({
  CreatePlaceForm: ({ open }: MockProps & { open?: boolean }) => (open ? <div>create place form</div> : null),
}));

vi.mock("@/components/ShapeStyle", () => ({
  DynamicColorGrid: () => <div data-testid="shape-preview" />,
  DynamicHorizontalStripe: () => <div data-testid="shape-preview" />,
  DynamicRadial: () => <div data-testid="shape-preview" />,
  DynamicColorTriangle: () => <div data-testid="shape-preview" />,
  DynamicColorChip: () => <div data-testid="shape-preview" />,
}));

import { CreatePaletteForm } from "./CreatePaletteForm";

function renderForm() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <CreatePaletteForm />
    </QueryClientProvider>,
  );
}

describe("CreatePaletteForm", () => {
  beforeEach(() => {
    createColorAtlasMock.mockReset();
    pushMock.mockReset();
    toastErrorMock.mockReset();
    toastSuccessMock.mockReset();
    useAtomValueMock.mockReset();
    useAtomValueMock.mockReturnValue({
      shape: "grid",
      colors: [{ color: "#123456", ratio: 1 }],
    });
  });

  it("フォームが表示される", () => {
    renderForm();

    expect(screen.getByText("色彩")).toBeInTheDocument();
    expect(screen.getByText("場所")).toBeInTheDocument();
    expect(screen.getByText("メモ")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "作成" })).toBeInTheDocument();
  });

  it("ShapeComponent・Dropdown・Switch・Textarea・作成ボタンが表示される", () => {
    renderForm();

    expect(screen.getByTestId("shape-preview")).toBeInTheDocument();
    expect(screen.getByLabelText("場所")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "switch" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("メモを記入できます")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "作成" })).toBeInTheDocument();
  });

  it("「+ 新しい場所」を押すと CreatePlaceForm が表示される", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole("button", { name: "+ 新しい場所" }));

    expect(screen.getByText("create place form")).toBeInTheDocument();
  });

  it("Switch を ON/OFF すると DateTimePicker が表示・非表示になる", async () => {
    const user = userEvent.setup();
    renderForm();

    expect(screen.queryByLabelText("date")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "switch" }));
    expect(screen.getByLabelText("date")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "switch" }));
    expect(screen.queryByLabelText("date")).not.toBeInTheDocument();
  });

  it("Dropdown を変更すると placeId が更新される", async () => {
    const user = userEvent.setup();
    createColorAtlasMock.mockResolvedValue({ success: true });

    renderForm();

    //await user.selectOptions(screen.getByLabelText("場所"), "place-1");
    const select = screen.getByLabelText("場所") as HTMLSelectElement;
    await user.selectOptions(select, "place-1");
    //console.log(select.value);
    //screen.debug();
    await user.type(screen.getByPlaceholderText("メモを記入できます"), "メモ内容");
    const button = screen.getByRole("button", { name: "作成" });
    expect(button).toBeEnabled();
    await user.click(button);
    
    await waitFor(() => {
      expect(createColorAtlasMock).toHaveBeenCalled();
    });

    //console.log(createColorAtlasMock.mock.calls);

    expect(createColorAtlasMock.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        placeId: "place-1",
        memo: "メモ内容",
      }),
    );
  });

  it("作成ボタンで mutation が呼ばれる", async () => {
    const user = userEvent.setup();
    createColorAtlasMock.mockResolvedValue({ success: true });

    renderForm();

    await user.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(createColorAtlasMock).toHaveBeenCalled();
    });
  });

  it("色がない場合は送信しない", async () => {
    const user = userEvent.setup();
    useAtomValueMock.mockReturnValue({ shape: "grid", colors: [] });

    renderForm();

    await user.click(screen.getByRole("button", { name: "作成" }));

    expect(createColorAtlasMock).not.toHaveBeenCalled();
    expect(toastErrorMock).toHaveBeenCalledWith("ホームへ戻りカラーを作成し直してください");
  });

  it("有効な入力で作成できる", async () => {
    const user = userEvent.setup();
    createColorAtlasMock.mockResolvedValue({ success: true });

    renderForm();

    await user.type(screen.getByPlaceholderText("メモを記入できます"), "メモ内容");
    await user.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(createColorAtlasMock).toHaveBeenCalled();
    });

    expect(createColorAtlasMock.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        memo: "メモ内容",
        shape: "grid",
        colors: [{ color: "#123456", ratio: 1 }],
        isDateEnabled: false,
      }),
    );
    expect(toastSuccessMock).toHaveBeenCalledWith("カラーを保存しました");
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("ログインエラーなら /login へ遷移する", async () => {
    const user = userEvent.setup();
    createColorAtlasMock.mockResolvedValue({ success: false, message: "ログインが必要です" });

    renderForm();

    await user.click(screen.getByRole("button", { name: "作成" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/login?callbackUrl=/create");
    });
  });
});
