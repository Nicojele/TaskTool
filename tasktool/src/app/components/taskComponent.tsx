'use client'

import { Category, Task } from "@prisma/client";
import styles from "./components.module.css";
import { deleteTaskRequest } from "../deleteTaskRequest/deleteTaskRequest";
import { NextResponse } from "next/server";

type taskComponentProps = {
  task: Task
}

export default function TaskComponent(props: taskComponentProps) {
  return (
    <>
      <div className={styles.componentBody}>
        <div className={styles.textContainer}>
          <p className={styles.descriptionText}>
            {props.task.description}
          </p>
          <p className={styles.categoryText}>
            {getCategory(props.task.category)}
          </p>
        </div>
        <div className={styles.optionButtonContainer}>
          <button className={styles.finishedButton}>
            finished
          </button>
          <button className={styles.cancelButton} onClick={async () => closeTask(props.task)}>
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

function getCategory(category: Category): string {
  let res = ''
  if (category === Category.WichtigDringend) {
    res = "Wichtig & Dringend";
  }
  if (category === Category.Wichtig) {
    res = "Wichtig & nicht Dringend";
  }
  if (category === Category.Dringend) {
    res = "nicht Wichtig & Dringend";
  }
  if (category === Category.Unwichtig) {
    res = "Nicht Wichtig & nicht Dringend"
  }

  return res;
}

async function closeTask(taskToClose: Task) {

  const data: deleteTaskRequest = {id: taskToClose.id, category: taskToClose.category, createdAt: taskToClose.createtAt, description: taskToClose.description, finished: true, finishedAt: new Date(),};

  const res = await fetch("/api/task", {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  })
  location.reload();

  return NextResponse.json({ res })
}
