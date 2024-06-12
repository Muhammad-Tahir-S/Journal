"use server";
import { revalidatePath } from "next/cache";

export async function revalidatePathAction(
  originalPath: string,
  type?: "layout" | "page" | undefined,
) {
  revalidatePath(originalPath, type);
}
