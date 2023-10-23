import { Task } from "@prisma/client";
import styles from "./history.module.css";
import { useEffect, useState } from "react";
import TaskComponent from "../components/taskComponent";
import prisma from "../../../lib/prisma";

export default async function showOrderView(): Promise<JSX.Element> {

  const tasks = await prisma.task.findMany();
  const finishedTasks: Array<Task> = [];
  for (let index = 0; index < tasks.length; index++) {
    const task = tasks[index];
    if (task.finished) {
      finishedTasks.push(task);
    }  
  }
  console.log(finishedTasks)

  return (
    <>
      <div className={styles.body}>
        <div className={styles.historyContainer}>
          <div className={styles.content}>
            {finishedTasks.map((task) => (
              <TaskComponent task={task}></TaskComponent>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
