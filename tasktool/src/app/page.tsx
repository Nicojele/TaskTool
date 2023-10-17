import Image from 'next/image'
import styles from './page.module.css'
import { toUnicode } from 'punycode'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
          {/* <div>
            <input type="beschreibung" name="task"></input>
          </div> */}
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
            <input className={styles.button} type="beschreibung" name="task"></input>
          </div>
          {/* <div>
            <button>✘</button>
          </div> */}
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
            <button className={styles.button}>✓</button>
          </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
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
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
          wichtig & nicht dringend
          </h2>
            <div>
              <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
            </div>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
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
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
          nicht wichtig & nicht dringend
          </h2>
            <div>
              <p>Instantly deploy your Next.js site to a shareable URL with Vercel.</p>
            </div>
        </a>
      </div>
    </main>
  )
}
