import { twMerge } from "tailwind-merge";
import { clsx,  type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const downloadCSV = (numbers: number[]) => {
  const csvContent = "data:text/csv;charset=utf-8," + numbers.join(",");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "random_numbers.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const copyToClipboard = (numbers: number[]) => {
  const copyText = numbers.join(", ");
  navigator.clipboard.writeText(copyText);
};