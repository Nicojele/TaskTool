import { Category, Task } from "@prisma/client";
import styles from "./components.module.css";
import { Button } from '@blueprintjs/core';
import { NextResponse } from "next/server";
import { deleteTaskRequest } from "../deleteTaskRequest/deleteTaskRequest";
import { updateTaskRequest } from "../updateTaskRequest/updateTaskRequest";

type taskComponentProps = {
  task: Task
}

export default function TaskComponent(props: taskComponentProps) {
  if (props.task.finished == true) {
    return (
      <>
        <div className={styles.componentBody}>
          <div className={styles.textContainer}>
            <div className={styles.descryptionTextContainer}>
            <a className={styles.descriptionText}>
              {props.task.description}
            </a>
            </div>
            <div className={styles.categoryTextConatiner}>
            <a className={styles.categoryText}>
              {getCategory(props.task.category)}
            </a>
            </div>
          </div>
          <div className={styles.optionButtonContainer}>
            <Button className={styles.cancelButton}/> {/* onClick={async () => closeTask(props.task)} icon="cross" /> */}
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className={styles.componentBody}>
          <div className={styles.textContainer}>
            <div className={styles.descryptionTextContainer}>
            <div className={styles.descriptionText}>
              {props.task.description}
            </div>
            </div>
            <div className={styles.categoryTextConatiner}>
            <a className={styles.categoryText}>
              {getCategory(props.task.category)}
            </a>
            </div>
          </div>
          <div className={styles.optionButtonContainer}>
            <Button className={styles.finishedButton}/> {/* onClick={async () => finishTask(props.task)} icon="tick"/> */}
            <Button className={styles.cancelButton}/>  {/* onClick={async () => closeTask(props.task)} icon="cross" /> */}
          </div>
        </div>
      </>
    )
  }
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

// async function closeTask(taskToClose: Task) {

//   const data: deleteTaskRequest = {id: taskToClose.id, category: taskToClose.category, createdAt: taskToClose.createtAt, description: taskToClose.description, finished: true, finishedAt: new Date(),};

//   const res = await fetch("/api/task", {
//     method: "DELETE",
//     body: JSON.stringify(data),
//     headers: {'Content-Type': 'application/json'},
//   })
//   location.reload();

//   return NextResponse.json({ res })
// }

// async function finishTask(taskToFinish: Task) {
  
//   const data: updateTaskRequest = { category: taskToFinish.category, createdAt: taskToFinish.createtAt, description: taskToFinish.description, finished: taskToFinish.finished, id: taskToFinish.id, finishedAt: taskToFinish.finishedAt }

//   await fetch("/api/task", { method: "PUT", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

//   location.reload();
// }
