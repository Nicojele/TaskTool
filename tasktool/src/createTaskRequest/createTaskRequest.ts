import { Category } from "@prisma/client";

export interface createTaskRequest {
  description: string,
  createdAt: Date,
  finishedAt: Date,
  finsihed: boolean,
  category: Category
}
