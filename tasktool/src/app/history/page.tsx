'use client';

import Link from "next/link";
import styles from "../page.module.css";

export default function showOrderView(): JSX.Element {

  return (
    <>
       <div className={styles.description}>
          <div>
            <button className={styles.button}>open</button>
          </div>
          <div>
            <button className={styles.button}><Link href="./history">closed</Link></button>
          </div>
      </div>
      <div className={styles.historyContainer}>
        <div className={styles.hirstory}>

        </div>
      </div>
    </>
  )
}
