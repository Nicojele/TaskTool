import { Category } from "@prisma/client";

export interface updateTaskRequest {
  id: number,
  description: string,
  createdAt: Date,
  finishedAt?: Date | null,
  finished: boolean,
  category: Category
}
