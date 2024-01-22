'use client'

import styles from "./components.module.css";
import { startTaskProcess } from "./startsprocess";

export default function StartProcessForm() {
  return (
    <form action={startTaskProcess}>
      <input className={styles.button} type="submit" value=" Create Task"/>
    </form>
  )
}
