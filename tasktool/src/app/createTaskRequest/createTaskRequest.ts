import { Category } from "@prisma/client";

export interface createTaskRequest {
  description: string,
  createdAt: Date,
  finishedAt?: Date,
  finished: boolean,
  category: Category
}
