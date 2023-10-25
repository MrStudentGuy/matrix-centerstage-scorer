import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ConvertToBool(val: string | undefined) {
  if (val === undefined) return false;
  if (val === "true" || val === "1") return true;
  if (val === "false" || val === "0") return false;
  return false;
}
