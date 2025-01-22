import { AnyData } from "@/types/typings";

export const isEmpty = (data: AnyData): boolean => {
   if (!data) return true;
   if (Array.isArray(data)) return data.length === 0;
   if (typeof data === "object") return Object.keys(data).length === 0;
   return false;
};
