'use client'

import { Category, Task } from "@prisma/client";
import styles from "./components.module.css";
import createTask from "./createTask";

export default function CreateTaskForm() {
  return (
    <form action={createTask}>
      <input className={styles.textField} id='description' type="beschreibung" name="task" required title='Test Fehlermeldung'></input>
      <label>Dringlichkeit:</label>
      <select name="Dringlichkeit" id="dringlichkeit" required>
        <option value={undefined}></option>
        <option value={Category.WichtigDringend}>Wichtig & dringend</option>
        <option value={Category.Wichtig}>Wichtig & nicht dringend</option>
        <option value={Category.Dringend}>Dringend & nicht wichtig</option>
        <option value={Category.Unwichtig}>nicht dringend & nicht wichtig</option>
      </select>
      <input className={styles.button} type="submit" onClick={() => location.reload()}/>
    </form>
  )
}
