'use server'

import { Category } from "@prisma/client";
import prisma from "../../../lib/prisma";

export default async function createTask(formData: FormData) {
  const data: FormDataEntryValue[] = [];
  let category: Category = Category.Dringend;
  
  formData.forEach(entry => {
    switch (entry) {
      case 'Dringend':
        category = Category.Dringend;
        break;
      case 'Unwichtig':
        category = Category.Unwichtig;
        break;
      case 'Wichtig':
        category = Category.Wichtig;
        break;
      case 'WichtigDringend':
        category = Category.WichtigDringend
      default:
        break;
    }

    data.push(entry);
  })

  await prisma.task.create(
    {
      data: {
        category: category,
        createtAt: new Date(),
        description: data[1].toString(),
        finished: false,
        finishedAt: undefined,
      }
     }
  )
}
