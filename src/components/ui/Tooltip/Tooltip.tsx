"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useState } from "react";

export type TooltipProps = {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  children: React.ReactNode;
};

export function Tooltip({
  content,
  side,
  children,
}: TooltipProps) {

  const [open, setOpen] = useState(false);

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger
         asChild
         onPointerDown={(e) => {
            if (e.pointerType === "touch") {
              e.preventDefault();
              setOpen((prev) => !prev);
            }
          }}
        >
          {children}
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={8}
            className="
              z-50
              max-w-70
              rounded-md
              bg-neutral-950
              px-3
              py-2
              text-sm
              text-white
            "
          >
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}