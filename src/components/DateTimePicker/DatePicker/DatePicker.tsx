"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar } from "../Calendar/Calendar";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
};

export function DatePicker({
  value,
  onChange,
  disabled = false,
  placeholder = "日付を選択",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date);
    setOpen(false);
  };

  return (
    <Popover.Root
      open={open}
      onOpenChange={setOpen}
    >
      <Popover.Trigger asChild>
        <Button
          type="button"
          size="Small"
          variant="Outline"
          disabled={disabled}
          className="w-full h-11"
        >
          <div className="w-full flex items-center justify-between">
          <span >
            {value
              ? format(value, "yyyy/MM/dd", {
                  locale: ja,
                })
              : placeholder}
          </span>

          <Icon name="calendar_month" />
          </div>
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          className="
            rounded-default
            border
            border-[#dcdcdc]
            bg-white
            p-2
            shadow-lg
          "
        >
          <Calendar
            value={value}
            onChange={handleSelect}
          />

          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}