"use client";

import { DatePicker } from "./DatePicker/DatePicker";
import { TimePicker } from "./TimePicker/TimePicker";

export type DateTimePickerProps = {
  value?: Date;
  hasTime: boolean;
  onChange?: (value: Date | undefined) => void;
  onHasTimeChange?: (hasTime: boolean) => void;
  disabled?: boolean;
};

export function DateTimePicker({
  value,
  hasTime,
  onChange,
  onHasTimeChange,
  disabled,
}: DateTimePickerProps) {
  const handleDateChange = (date: Date | undefined) => {
    if (!date) {
      onChange?.(undefined);
      return;
    }

    const next = new Date(date);

    if (value && hasTime) {
      next.setHours(
        value.getHours(),
        value.getMinutes(),
        0,
        0
      );
    } else {
      next.setHours(0, 0, 0, 0);
    }

    onChange?.(next);
  };

  const handleHourChange = (hour: number | undefined) => {
    if (!value) return;

    const next = new Date(value);

    if (hour === undefined) {
      // 日付のみ
      next.setHours(0, 0, 0, 0);

      onChange?.(next);
      onHasTimeChange?.(false);
      return;
    }

    // 時刻あり
    next.setHours(hour, 0, 0, 0);

    onChange?.(next);
    onHasTimeChange?.(true);
  };

  return (
    <div className="mt-3 flex items-center gap-3">
      <DatePicker
        value={value}
        onChange={handleDateChange}
        disabled={disabled}
      />

      <TimePicker
        value={hasTime ? value?.getHours() : undefined}
        onChange={handleHourChange}
        disabled={disabled}
      />
    </div>
  );
}