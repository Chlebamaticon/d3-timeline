export interface Data {
  timestamp: string;
  count: number;
}

export interface ParsedData {
  timestamp: Date | null;
  count: number;
}