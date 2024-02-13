'use client'

import { NavigationParams } from './navigation-params';
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import { finishUserTaskAndNavigateToUrl } from "./server-action";
import { UserTaskInstance } from "@5minds/processcube_engine_sdk";
import { navigateHome } from 'src/app/utils/navigation';
import { getUserTask } from 'src/app/utils/process-controlling.tsx';

export default function CreateTaskForm(params: NavigationParams) {
  const [currentTask, setCurrentTask] = useState<UserTaskInstance | null>(null);
  const [pageIsLoading, setPageLoading] = useState(false);

  const flowNodeId = "createTask";

  const processInstanceId = params.params.processInstanceId;

  useEffect(() => {
    getUserTask(processInstanceId, flowNodeId).then((data) => {
      setCurrentTask(data);
      if (data) setPageLoading(true);
    });
  }, []);

   const userTaskAlreadyFinished = currentTask?.state === 'finished' || currentTask?.state === 'terminated';
  if (userTaskAlreadyFinished) {
    navigateHome();
  }

  async function submit(formData: FormData) {
    const description = formData.get('description').toString();
    const category = formData.get('category').toString();
    const finishTask = finishUserTaskAndNavigateToUrl(
      currentTask,
      processInstanceId,
      flowNodeId,
      description,
      category,
    );

    return finishTask;
  }

  if (pageIsLoading || userTaskAlreadyFinished)  return (
    <main className={styles.main}>
      <form action={submit} className={styles.createTaskForm}>
        <div className={styles.createTaskContainer}>
          <h1 className={styles.DescriptionHeader}>Please enter a description</h1>
          <input type='text' className={styles.descriptionInput} id={"descriptionInput"} name='description'></input>
          <h1 className={styles.categoryheader}>Select a category</h1>
          <select className={styles.dropdown} id={"categoryInput"} name='category'>
            <option></option>
            <option className={styles.dropdownItem} value="Wichtig & Dringend">Wichtig und Dringend</option>
            <option className={styles.dropdownItem} value="Wichtig">Wichtig</option>
            <option className={styles.dropdownItem} value="Dringend">Dringend</option>
            <option className={styles.dropdownItem} value="Nicht Wichtig & Nicht Dringend">Nicht Wichitg & Nicht Dringend</option>
          </select>
          <div className={styles.buttonContainer}>
            <button className={styles.submitdataButton}>Create Task</button>
          </div>
        </div>
      </form>
    </main>
  )
}
