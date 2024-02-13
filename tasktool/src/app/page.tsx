'use client'

import styles from './page.module.css'
import { useEffect, useState } from 'react'
import TaskComponent from './components/taskComponent'
import CreateTaskForm from './components/startProcessForm'
import { getProcessInstanzess, startTaskProcess } from './components/startsprocess'

interface TaskToolState {
  tasks: any[]
}

export default function Home() {
  const [state, setState] = useState<TaskToolState>({
    tasks: [],
  });

  useEffect(() => {
    async function fetchData() {
      const instanzess = []
      const processInstanzes = getProcessInstanzess();
      (await processInstanzes).processInstances.forEach((instanz) => {
        if (instanz.state == "running") {
          instanzess.push({
            description: instanz.startToken.payload.description, category: instanz.startToken.payload.category, finished: false, processInstanzeId: instanz.processInstanceId
          })
        }
      });
      setState({tasks: instanzess})
    }
    fetchData();
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.createTaskContainer}>
        <CreateTaskForm />
      </div>
      <div className={styles.grid}>
        <div
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
          wichtig & dringend
          </h2>
          <div className={styles.taskContainer}>
            {state.tasks.map((task) => (
              task.category == "Wichtig & Dringend" ? (
                <TaskComponent task={task} key={task.processInstanzeId}></TaskComponent>
              ) : null
            ))}
          </div>
        </div>

        <div
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
          wichtig & nicht dringend
          </h2>
            <div className={styles.taskContainer}>
            {state.tasks.map((task) => (
              task.category == "Wichtig" ? (
                <TaskComponent task={task} key={task.processInstanzeId}></TaskComponent>
              ) : null
            ))}
          </div>
        </div>

        <div
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
          nicht wichtig & dringend
          </h2>
            <div className={styles.taskContainer}>
            {state.tasks.map((task) => (
              task.category == "Dringend" ? (
                <TaskComponent task={task} key={task.processInstanzeId}></TaskComponent>
              ) : null
            ))}
          </div>
        </div>

        <div
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
          nicht wichtig & nicht dringend
          </h2>
            <div className={styles.taskContainer}>
            {state.tasks.map((task) => (
              task.category == "Nicht Wichtig & Nicht Dringend" ? (
                <TaskComponent task={task} key={task.processInstanzeId}></TaskComponent>
              ) : null
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
