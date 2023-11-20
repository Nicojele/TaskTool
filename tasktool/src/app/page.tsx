'use client'

import styles from './page.module.css'
import { Category, Task } from '@prisma/client'
import { createTaskRequest } from './createTaskRequest/createTaskRequest'
import { useEffect, useState } from 'react'
import TaskComponent from './components/taskComponent'
import { Button, Icon } from '@blueprintjs/core'

interface TaskToolState {
  category: Category | undefined
  tasks: Task[]
  buttonText: string
  createInput: boolean
}

export default function Home() {
  const [state, setState] = useState<TaskToolState>({
    category: undefined,
    tasks: [],
    buttonText: "Dringlichkeit",
    createInput: true
  });

  useEffect(() => {
    async function fetchData() {
      const req = await fetch("api/task", {
        method: "GET",
        headers: {"Content-Type" : "application/json"}
      })
      const res = await req.json()

      const input = (document.getElementById("description") as HTMLInputElement);
      input.addEventListener("input", function () {
        const regex = /[^a-zA-Z0-9\s]/;
        setState({ buttonText: state.buttonText, category: state.category, createInput: regex.test(input.value), tasks: res.res })
      });
      
      setState({ category: state.category, tasks: res.res, buttonText: "Dringlichkeit", createInput: state.createInput })
    }

    fetchData();
  }, [])

  function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (category: Category, buttonText: string) => {
      setState({ category: category, buttonText: buttonText, tasks: state.tasks, createInput: state.createInput })
      setIsOpen(false);
    };

    return (
      <div>
        <button className={styles.dropbtn} onClick={toggleDropdown}>{state.buttonText}</button>
          {isOpen && (
            <div className={styles.dropdownContent}>
              <a onClick={() => handleItemClick(Category.WichtigDringend, "Wichtig & dringend")}>wichtig & dringend</a>
              <a onClick={() => handleItemClick(Category.Wichtig,"Wichtig & nicht dringend")}>wichtig & nicht dringend</a>
              <a onClick={() => handleItemClick(Category.Dringend, "Dringend & nicht wichtig")}>nicht wichtig & dringend</a>
              <a onClick={() => handleItemClick(Category.Unwichtig, "nicht dringend & nicht wichtig")}>nicht wichtig & nicht dringend</a>
            </div>
          )}
        </div>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <div>
            <input className={styles.textField} id='description' type="beschreibung" name="task"></input>
          </div>
          {/* <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Projekt</button>
            <div className={styles.dropdownContent}>
              <a href="#">Projekt 1</a>
              <a href="#">Projekt 2</a>                   Wird später benötigt!!!
              <a href="#">Projekt 3</a>
            </div>
          </div> */}
          <div className={styles.dropdown}>
            <Dropdown></Dropdown>
          </div>
          <div>
          <Button className={styles.createTaskButton} onClick={async () => { if (state.category !== undefined) { createTask(state.category) } }} disabled={state.createInput} rightIcon="tick"></Button>
        </div>
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
              task.category == Category.WichtigDringend ? (
                <TaskComponent task={task} key={task.id}></TaskComponent>
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
              task.category == Category.Wichtig ? (
                <TaskComponent task={task} key={task.id}></TaskComponent>
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
              task.category == Category.Dringend ? (
                <TaskComponent task={task} key={task.id}></TaskComponent>
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
              task.category == Category.Unwichtig ? (
                <TaskComponent task={task} key={task.id}></TaskComponent>
              ) : null
            ))}
          </div>
        </div>
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
