"use client";

import * as Select from "@radix-ui/react-select";
import { Icon } from "@/components/ui/Icon";

export type TimePickerProps = {
  value?: number;
  onChange?: (hour: number) => void;
  disabled?: boolean;
};

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function TimePicker({
  value,
  onChange,
  disabled = false,
}: TimePickerProps) {
  return (
    <Select.Root
      value={value?.toString()}
      onValueChange={(value) => onChange?.(Number(value))}
      disabled={disabled}
    >
      <Select.Trigger className="flex justify-between items-center w-[120px] h-11 px-4 border border-primary rounded-default cursor-pointer bg-white">
        <Select.Value placeholder="00時" />{/** react-hook-form で、初期値new Date()を設定。そのため現在時刻を表示 */}
        <Select.Icon>
          <Icon name="keyboard_arrow_down" className="ver"/>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="w-[var(--radix-select-trigger-width)] max-h-56 overflow-hidden bg-white border border-solid border-border-disabled rounded-default shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
          position="popper"
        >
          <Select.ScrollUpButton>
            <Icon name="keyboard_arrow_up" />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1">
            {HOURS.map((hour) => (
              <Select.Item
                key={hour}
                value={hour.toString()}
                className="relative h-9 flex items-center px-3 rounded cursor-pointer hover:bg-[#f5f5f5] data-[highlighted]:bg-gray-100 data-[highlighted]:outline-none"
              >
                <Select.ItemText>
                  {hour.toString().padStart(2, "0")}時
                </Select.ItemText>

                <Select.ItemIndicator className="absolute right-2">
                  <Icon name="check_small"/>
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton>
            <Icon name="keyboard_arrow_down" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}