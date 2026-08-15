export function formatCaptureDate(date: string | Date | null) {
  if (!date) return "";

  return new Date(date).toLocaleString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    //minute: "2-digit",
  });
}