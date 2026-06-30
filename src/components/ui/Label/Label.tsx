import clsx from "clsx";

export type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
};

export function Label({
  htmlFor,
  children,
  required = false,
  className,
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        "block text-[15px] font-medium text-text-base",
        className
      )}
    >
      {children}
      {required && (
        <span className="ml-1 text-text-error">*</span>
      )}
    </label>
  );
}