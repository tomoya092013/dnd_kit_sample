export type Task = {
  startTime: number;
  endTime: number;
  title: string;
  bg: string;
  overlapCount?: number;
  paddingCount?: number;
};

export type Item = { id: number; task: Task | null };
