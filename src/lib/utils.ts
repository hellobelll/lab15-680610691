export { cn } from "cn";

export function getCurrentTimeInput(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}
export function buildEnrolledAt(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const now = new Date();
  now.setHours(hours || 0, minutes || 0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:00`;
}

export function formatEnrolledAt(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}