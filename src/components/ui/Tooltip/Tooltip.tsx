import * as TooltipPrimitive from "@radix-ui/react-tooltip";

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
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={8}
            className="
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