"use client";

import { DatePicker } from "./DatePicker/DatePicker";
import { TimePicker } from "./TimePicker/TimePicker";

export type DateTimePickerProps = {
  value?: Date;
  onChange?: (value: Date | undefined) => void;
  disabled?: boolean;
};

export function DateTimePicker({
  value,
  onChange,
  disabled,
}: DateTimePickerProps) {
  const handleDateChange = (date: Date | undefined) => {
    if (!date) {
      onChange?.(undefined);
      return;
    }

    const next = new Date(date);

    if (value) {
      next.setHours(value.getHours());
      next.setMinutes(value.getMinutes());
      next.setSeconds(0);
      next.setMilliseconds(0);
    }

    onChange?.(next);
  };

  const handleHourChange = (hour: number) => {
    const next = value ? new Date(value) : new Date();

    next.setHours(hour);
    next.setMinutes(0);
    next.setSeconds(0);
    next.setMilliseconds(0);

    onChange?.(next);
  };

  return (
    <div className="mt-3 flex items-center gap-3">
      <DatePicker
        value={value}
        onChange={handleDateChange}
        disabled={disabled}
      />

      <TimePicker
        value={value?.getHours()}
        onChange={handleHourChange}
        disabled={disabled}
      />
    </div>
  );
}