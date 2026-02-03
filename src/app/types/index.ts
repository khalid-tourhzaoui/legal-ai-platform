export type SearchResultsType = {
  question: string;
  answer: string;
  isError?: boolean;
  model?: string;
  tokens_used?: number;
} | null;