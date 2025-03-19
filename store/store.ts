import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

export type MessageData = {
  uses: number;
  message?: string;
  file?: string;
  fileType?: string;
  fileName?: string;
};

export const messages: Record<string, MessageData> = {};

export async function loadKeysFromFile(filePath: string): Promise<Set<string>> {
  const data = await Deno.readTextFile(filePath);
  return new Set(
    data.split("\n").map((line) => line.trim()).filter((line) => line),
  );
}

const keysFilePath = join(Deno.cwd(), "store", "keys.txt");
export const keys = await loadKeysFromFile(keysFilePath);
