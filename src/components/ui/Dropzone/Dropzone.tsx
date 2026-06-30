import { useDropzone } from "react-dropzone";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Icon } from "../Icon";

const dropzoneVariants = cva(
  [
    "flex items-center justify-center",
    "aspect-[4/3] w-full max-w-md",
    "rounded-default",
    "border-2 border-dashed",
    "transition-colors",
    "bg-background-secondary",
  ],
  {
    variants: {
      state: {
        default: "border-disabled",
        dragActive: "border-border-default",
        error: "border-border-error",
        disabled:
          "cursor-not-allowed border-disabled bg-background-disabled opacity-60",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

export type DropzoneProps = {
  onChange?: (file: File | null) => void;
  error?: boolean;
  disabled?: boolean;
  className?: string;
};

export function Dropzone({
  onChange,
  error,
  disabled,
  className,
}: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled,
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop: (files) => {
      onChange?.(files[0] ?? null);
    },
  });

  const state =
    disabled
      ? "disabled"
      : error
        ? "error"
        : isDragActive
          ? "dragActive"
          : "default";

  return (
    <div
      {...getRootProps()}
      className={clsx(
        dropzoneVariants({ state }),
        className
      )}
    >
      <input {...getInputProps()} />
      <Icon name="image_arrow_up" size="xxl" color="upload"/>
    </div>
  );
}