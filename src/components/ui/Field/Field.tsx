import { Label } from "../Label";

type FieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

export function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: FieldProps) {
  return (
    <div className="space-y-1">
      <Label
        htmlFor={htmlFor}
        required={required}
      >
        {label}
      </Label>

      {children}

      {error && (
        <p className="text-sm text-text-error">
          {error}
        </p>
      )}
    </div>
  );
}