'use client';
import styles from "./history.module.css";
import TaskComponent from "../components/taskComponent";
import { Category, Task } from "@prisma/client";
import { useEffect, useState } from "react";

interface HistoryState {
  tasks: Array<Task>
}

export default function showOrderView() {
const [state, setState] = useState<HistoryState>({
    tasks: []
  });

  useEffect(() => {
    async function fetchData() {
      const req = await fetch("api/task", {
        method: "GET",
        headers: {"Content-Type" : "application/json"}
      })
      const res = await req.json();

      const finishedTasks: Array<Task> = []

      for (let index = 0; index < res.res.length; index++) {
        const task = res.res[index];
        if (task.finished) {
          finishedTasks.push(task)
        }
      }
      setState({ tasks: finishedTasks })
    }

    fetchData();
  }, [])


  return (
    <>
      <div className={styles.body}>
        <div className={styles.historyContainer}>
          <div className={styles.content}>
            {state.tasks.map((task) => (
              <TaskComponent category={task.category} description={task.description} finished={true}></TaskComponent>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
