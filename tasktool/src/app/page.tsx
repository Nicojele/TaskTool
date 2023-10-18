'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { toUnicode } from 'punycode'
import TaskComponent from './components/taskComponent'
import { Category } from '@prisma/client'
import { createTaskRequest } from './createTaskRequest/createTaskRequest'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <div>
            <button className={styles.button}>open</button>
          </div>
          <div>
            <button className={styles.button}>closed</button>
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
              <a href="#">wichtig & dringend</a>
              <a href="#">wichtig & nicht dringend</a>
              <a href="#">nicht wichtig & dringend</a>
              <a href="#">nicht wichtig & nicht dringend</a>
            </div>
          </div>
          <div>
            <button className={styles.button} onClick={async () => createTask()}>✓</button>
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

async function createTask() {

  const description = (document.getElementById("description") as HTMLInputElement).value

  console.log(description)

  const data: createTaskRequest = { category: Category.Dringend, createdAt: new Date(), description: description, finished: false, finishedAt: undefined, }
  
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
  
  const res = await fetch("api/task", {
    method: "GET",
    headers: {'Content-Type': 'application/json'},
  })
   .then(async response => {

        return response.json();
   })
    .catch(error => {
      console.error(error);
    })
  
  console.log(await res);
}

/* Zeichen zum kopieren:

✘
✓

*/
