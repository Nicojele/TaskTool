'use client'

import styles from "./history.module.css";
import { useEffect, useState } from "react";
import TaskComponent from "../components/taskComponent";
import { Task } from "@prisma/client";

interface TaskToolState {
  tasks: Task[]
}

export default function showOrderView(): JSX.Element {
  const [state, setState] = useState<TaskToolState>({
    tasks: []
  });

  useEffect(() => {
    async function fetchData() {
      const req = await fetch("api/task", {
        method: "GET",
        headers: {"Content-Type" : "application/json"}
      })
      const res = await req.json()

      setState({ tasks: res.res })
    }

    fetchData();
  }, [])

  console.log(state.tasks);

  return (
    <>
      <div className={styles.body}>
        <div className={styles.historyContainer}>
          <div className={styles.content}>
            {state.tasks.map((task) => (
              task.finished ? (
                <TaskComponent task={task}></TaskComponent>
              ) : null
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
