export type Task = {
  startTime: number;
  endTime: number;
  title: string;
  bg: string;
};

export type Item = { id: number; task: Task | null };
