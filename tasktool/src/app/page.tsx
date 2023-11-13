'use client'

import styles from './page.module.css'
import { Category, Task } from '@prisma/client'
import { createTaskRequest } from './createTaskRequest/createTaskRequest'
import { useEffect, useState } from 'react'
import TaskComponent from './components/taskComponent'

interface TaskToolState {
  category: Category | undefined
  tasks: Task[]
}

type TaskToolProps = {
  category: Category
}

export default function Home(props: TaskToolProps) {
  const [state, setState] = useState<TaskToolState>({
    category: undefined,
    tasks: []
  });

  useEffect(() => {
    async function fetchData() {
      const req = await fetch("api/task", {
        method: "GET",
        headers: {"Content-Type" : "application/json"}
      })
      const res = await req.json()

      setState({ category: state.category, tasks: res.res })
    }

    fetchData();
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <div>
            <input className={styles.textField} id='description' type="beschreibung" name="task"></input>
          </div>
          <div className={styles.dropdown}>
            {/* <button className={styles.dropbtn}>Projekt</button>
            <div className={styles.dropdownContent}>
              <a href="#">Projekt 1</a>
              <a href="#">Projekt 2</a>                   Wird später benötigt!!!
              <a href="#">Projekt 3</a>
            </div> */}
          </div>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Dringlichkeit</button>
            <div className={styles.dropdownContent}>
              <a href="#" onClick={() => setState({ category: Category.WichtigDringend, tasks: state.tasks })}>wichtig & dringend</a>
              <a href="#" onClick={() => setState({ category: Category.Wichtig, tasks: state.tasks })}>wichtig & nicht dringend</a>
              <a href="#" onClick={() => setState({ category: Category.Dringend, tasks: state.tasks })}>nicht wichtig & dringend</a>
              <a href="#" onClick={() => setState({ category: Category.Unwichtig, tasks: state.tasks })}>nicht wichtig & nicht dringend</a>
            </div>
          </div>
          <div>
            <button className={styles.button} onClick={async () => { if (state.category !== undefined) { createTask(state.category) }}}>✓</button>
          </div>
      </div>

      <div className={styles.grid}>
        <a
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
          wichtig & dringend
          </h2>
          <div className={styles.taskContainer}>
            {state.tasks.map((task) => (
              task.category == Category.WichtigDringend ? (
                <TaskComponent task={task} key={task.id}></TaskComponent>
              ) : null
            ))}
          </div>
        </a>

        <a
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
          wichtig & nicht dringend
          </h2>
            <div className={styles.taskContainer}>
            {state.tasks.map((task) => (
              task.category == Category.Wichtig ? (
                <TaskComponent task={task} key={task.id}></TaskComponent>
              ) : null
            ))}
          </div>
        </a>

        <a
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
          nicht wichtig & dringend
          </h2>
            <div className={styles.taskContainer}>
            {state.tasks.map((task) => (
              task.category == Category.Dringend ? (
                <TaskComponent task={task} key={task.id}></TaskComponent>
              ) : null
            ))}
          </div>
        </a>

        <a
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
          nicht wichtig & nicht dringend
          </h2>
            <div className={styles.taskContainer}>
            {state.tasks.map((task) => (
              task.category == Category.Unwichtig ? (
                <TaskComponent task={task} key={task.id}></TaskComponent>
              ) : null
            ))}
          </div>
        </a>
      </div>
    </main>
  )
}

async function createTask(category: Category) {
  const description = (document.getElementById("description") as HTMLInputElement).value

  const data: createTaskRequest = { category: category, createdAt: new Date(), description: description, finished: false, finishedAt: undefined, };
  
  (document.getElementById("description") as HTMLInputElement).value = "";

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
  
  location.reload();
}

/* Zeichen zum kopieren:

✘
✓

*/
