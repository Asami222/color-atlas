"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description?: string;

  children?: ReactNode;

  footer?: ReactNode;
};

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: DialogProps) {
  return (
    <RadixDialog.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      <RadixDialog.Portal>

        <RadixDialog.Overlay
          className="fixed inset-0 bg-black/20"
        />

        <RadixDialog.Content
          className="
            fixed
            left-1/2
            top-1/2
            w-[90vw]
            h-62
            max-w-md
            -translate-x-1/2
            -translate-y-1/2
            rounded-default
            bg-white
            px-4
            py-6
            shadow-xl
            flex
            flex-col
            justify-center
          "
        >
          <RadixDialog.Title
            className="text-xl font-bold text-center"
          >
            {title}
          </RadixDialog.Title>

          {description && (
            <RadixDialog.Description
              className="mt-2 text-sm text-center"
            >
              {description}
            </RadixDialog.Description>
          )}

          {children && (<div className="mt-6">{children}</div>)}

          {footer && (
            <div className="mt-6 flex justify-around">
              {footer}
            </div>
          )}
        </RadixDialog.Content>

      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}