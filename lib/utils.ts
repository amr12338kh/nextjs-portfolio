import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatCamelCase(text: string): string {
  // Add space before capital letters
  return text
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}

export const areArraysEqual = (arr1: any[], arr2: any[]) => {
  if (arr1.length !== arr2.length) return false;

  if (arr1.length === 0 && arr2.length === 0) return true;

  // For skills array (assuming they're strings or objects with an id)
  if (typeof arr1[0] === "string") {
    return (
      arr1.every((item) => arr2.includes(item)) &&
      arr2.every((item) => arr1.includes(item))
    );
  }

  // For sections array (comparing title and content)
  return arr1.every((item, index) => {
    const item2 = arr2[index];
    return (
      item.text === item2?.text &&
      item.subText === item2?.subText &&
      item.image === item2?.image
    );
  });
};
