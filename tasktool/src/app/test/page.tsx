'use client';

import { Category } from "@prisma/client";
import { createTaskRequest } from "../createTaskRequest/createTaskRequest";

export default function test(): JSX.Element {

  return (
    <>
      <button onClick={async () => createTask()}>Create Task</button>
      <button onClick={async () => logTasks()}>Log Tasks</button>
    </>
  )
}

async function createTask() {
  const data: createTaskRequest = { category: Category.Dringend, createdAt: new Date(), description: 'Its a test to see if i am able to create a Task with a button press', finished: false, finishedAt: new Date() }
  
  await fetch("api/task", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  })
    .then(async response => {

      return response.json();
    })
      .catch(error => {
        console.error(error);
      })
}

async function logTasks() {
  const res = await fetch("api/task", {
    method: "GET",
    headers: {'Content-Type': 'application/json'},
  })
   .then(async response => {

        return response.json();
   })
    .catch(error => {
      console.error(error);
    })
  
  console.log(await res);
}
