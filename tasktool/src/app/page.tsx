'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { toUnicode } from 'punycode'
import TaskComponent from './components/taskComponent'
import { Category } from '@prisma/client'
import { createTaskRequest } from './createTaskRequest/createTaskRequest'
import { useState } from 'react'
import Link from 'next/link'

interface TaskToolState {
  category: Category | undefined
}

type TaskToolProps = {
  category: Category
}

export default function Home(props: TaskToolProps) {
  const [state, setState] = useState<TaskToolState>({
    category: undefined,
  });

  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <div>
            <button className={styles.button}>open</button>
          </div>
          <div>
            <button className={styles.button}><Link href="./history">closed</Link></button>
          </div>
          {/* <div>
            <button className={styles.button}>Filter</button>      Wird später benötigt!!!
          </div> */}
      </div>
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
              <a href="#" onClick={() => setState({ category: Category.WichtigDringend })}>wichtig & dringend</a>
              <a href="#" onClick={() => setState({ category: Category.Wichtig })}>wichtig & nicht dringend</a>
              <a href="#" onClick={() => setState({ category: Category.Dringend })}>nicht wichtig & dringend</a>
              <a href="#" onClick={() => setState({ category: Category.Unwichtig })}>nicht wichtig & nicht dringend</a>
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
            <div>
              <p>Find in-depth information about Next.js features and API.</p>
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
            <div>
              <TaskComponent category={Category.WichtigDringend} description='Show Component'></TaskComponent>
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
            <div>
              <p>Explore the Next.js 13 playground.</p>
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
            <div>
              <p>Instantly deploy your Next.js site to a shareable URL with Vercel. </p>
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
}

/* Zeichen zum kopieren:

✘
✓

*/
