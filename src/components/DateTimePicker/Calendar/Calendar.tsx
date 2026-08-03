"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./Calendar.module.css";

export type CalendarProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
};

export function Calendar({
  value,
  onChange,
  disabled,
}: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      selected={value}
      onSelect={onChange}
      disabled={disabled}
      showOutsideDays
      fixedWeeks
      className={styles.calendar}
    />
  );
}