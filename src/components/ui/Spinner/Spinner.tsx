export type SpinnerProps = {
  size?: number;
  color?: string;
};

export const Spinner = ({ size = 16, color = "var(--color-third)" }: SpinnerProps) => (
  <div className={`animate-spin rounded-full border-2`}
    style={{ width: `${size}px`, height: `${size}px`, borderColor: color, borderTopColor: "transparent" }}
   />
);