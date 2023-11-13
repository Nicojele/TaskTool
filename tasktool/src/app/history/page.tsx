'use client';
import styles from "./history.module.css";
import TaskComponent from "../components/taskComponent";
import { Category } from "@prisma/client";


export default function showOrderView() {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.historyContainer}>
          <div className={styles.content}>
            {/* {finishedTasks.map((task) => (
              <TaskComponent category={task.category} description={task.description} finished={true}></TaskComponent>
              ))} */}
            <TaskComponent category={Category.Dringend} description="amchgsd" finished={true}></TaskComponent>
            <TaskComponent category={Category.Dringend} description="amchgsd" finished={true}></TaskComponent>
            <TaskComponent category={Category.Dringend} description="amchgsd" finished={true}></TaskComponent>
          </div>
        </div>
      </div>
    </>
  );
}
