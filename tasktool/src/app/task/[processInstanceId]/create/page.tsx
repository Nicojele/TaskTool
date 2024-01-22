'use client'

import { useFormState } from 'react-dom';
import { NavigationParams } from './navigation-params';
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import { getUserTask } from "@/app/utils/process-controlling.tsx";
import { navigateHome } from "@/app/utils/navigation";
import { createAccount, finishUserTaskAndNavigateToUrl } from "./server-action";
import { LoadingApp } from "@/app/components/LoadingApp";
import { UserTaskInstance } from "@5minds/processcube_engine_sdk";

const initialState = {
  descryption: '',
  category: undefined,
};

export default function CreateTaskForm(params: NavigationParams) {
  const [currentTask, setCurrentTask] = useState(null);
  const [pageIsLoading, setPageLoading] = useState(true);
  // const [state, formAction] = useFormState(submit, initialState);

  const flowNodeId = "selectTaskData";

  const processInstanceId = params.params.processInstanceId;
  let test: UserTaskInstance;

  console.log("test");


  useEffect(() => {
    getUserTask(processInstanceId, flowNodeId).then((data) => {
      console.log(data);
      test = data;
      // setCurrentTask(data);
      if (data) setPageLoading(false);
    });
  }, []);

  const userTaskAlreadyFinished = currentTask === 'finished' || currentTask === 'terminated';
  if (userTaskAlreadyFinished) {
    navigateHome();
  }

  function submit(prevState: any, formData: FormData) {
    const response = createAccount(prevState, formData).then((response) => {
      if (response.type != 'error') {
        finishUserTaskAndNavigateToUrl(
          formData,
          test,
          processInstanceId,
          flowNodeId,
          response.accountId,
          response.claims,
        );
      } else {
        return response;
      }
    });

    return response;
  }

  if (pageIsLoading || userTaskAlreadyFinished) return <LoadingApp />;

  return (
    <form>
      <div>
        <p>Please enter a description</p>
        <input type='text'></input>
        <p>Select a category</p>
        <select className={styles.dropdown}>
          <option className={styles.dropdownItem} value="Wichitg & Dringend">Wichtig und Dringend</option>
          <option className={styles.dropdownItem} value="Wichitg">Wichtig</option>
          <option className={styles.dropdownItem} value="Dringend">Dringend</option>
          <option className={styles.dropdownItem} value="Nicht Wichitg & Nicht Dringend">Nicht Wichitg & Nicht Dringend</option>
        </select>
        <button className={styles.createTaskButton}>create</button>
      </div>
    </form>
  )
}
