import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toCapitalCase(str: string) {
  return str
    .split(" ")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatDate(dateString: string) {
  const parts = new Date(dateString).toDateString().split(" ");
  return `${parts[0]}, ${parts[1]} ${parts[2]}, ${parts[3]}`;
}
