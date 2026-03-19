/**
 * Tailwind class-name merge utility.
 * Combines clsx (conditional classes) with tailwind-merge
 * (deduplicates conflicting Tailwind classes).
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
