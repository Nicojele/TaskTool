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
            {/* {state.tasks.map((task) => (
              <TaskComponent task={task} key={task.id}></TaskComponent>
              ))} */}
            <TaskComponent task={{ category: Category.Dringend, createtAt: new Date(), description: "Ich mache tests", finished: true, finishedAt: new Date(), id: 1 }}></TaskComponent>
            <TaskComponent task={{ category: Category.Dringend, createtAt: new Date(), description: "tests2", finished: true, finishedAt: new Date(), id: 1 }}></TaskComponent>
            <TaskComponent task={{ category: Category.Dringend, createtAt: new Date(), description: "Ich mache test beschreibungen die wieder viel zu lang werden um das Verhalten der Task beobachten zu können damit alle Leute die dieses Tool nutrzen wollen damit zu frieden sind.", finished: true, finishedAt: new Date(), id: 1}}></TaskComponent>
            <TaskComponent task={{ category: Category.Dringend, createtAt: new Date(), description: "Das wird eine etwas kürzere Task Um alle längen mal gesehen zu haben sonst wäre das ja unvollständig", finished: true, finishedAt: new Date(), id: 1}}></TaskComponent>
            <TaskComponent task={{ category: Category.Dringend, createtAt: new Date(), description: "1", finished: true, finishedAt: new Date(), id: 1}}></TaskComponent>

          </div>
        </div>
      </div>
    </>
  );
}
