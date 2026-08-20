"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";

export type HelpPopoverProps = {
  content: string;
  children: React.ReactNode;
};

export function HelpPopover({
  content,
  children,
}: HelpPopoverProps) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        {children}
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          sideOffset={8}
          align="center"
          className="
            z-50
            w-[280px]
            rounded-md
            bg-neutral-950
            px-3
            py-2
            text-sm
            leading-relaxed
            text-white
            shadow-md
          "
        >
          {content}

          <PopoverPrimitive.Arrow
            className="fill-neutral-950"
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}