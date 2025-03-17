export type MessageData = {
  uses: number;
  message: string;
};

export const messages: Map<string, MessageData> = new Map();

export const keys = new Set<string>([
  "apple",
  "orange",
  "banana",
  "grape",
  "kiwi",
]);
