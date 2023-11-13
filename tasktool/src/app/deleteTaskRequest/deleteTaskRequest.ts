import { Category } from "@prisma/client";

export interface deleteTaskRequest {
  id: number,
  description: string,
  createdAt: Date,
  finishedAt?: Date | undefined,
  finished: boolean,
  category: Category
}
