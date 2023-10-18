'use client';

import { Category } from "@prisma/client";
import { createTaskRequest } from "../createTaskRequest/createTaskRequest";

export default function test(): JSX.Element {

  return (
    <>
      <button onClick={async () => logTasks()}>Log Tasks</button>
    </>
  )
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
