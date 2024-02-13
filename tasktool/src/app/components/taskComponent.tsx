import styles from "./components.module.css";
import { Button } from '@blueprintjs/core';
import { deleteTask, terminateTask } from "./startsprocess";
import { finishUserTaskAndNavigateToUrl } from "../task/[processInstanceId]/create/server-action";
import { getUserTask } from "../utils/process-controlling.tsx";
import { useEffect, useState } from "react";
import { UserTaskInstance } from "@5minds/processcube_engine_sdk";

type taskComponentProps = {
  task: {description: string, category: string, finished: boolean, processInstanzeId: string}
}

export default function TaskComponent(props: taskComponentProps) {
  const [currentTask, setCurrentTask] = useState<UserTaskInstance | null>(null);
  const [pageIsLoading, setPageLoading] = useState(false);
  
  const flowNodeId = "finishTask";

  useEffect(() => {
    getUserTask(props.task.processInstanzeId, flowNodeId).then((data) => {
      setCurrentTask(data);
      if (data) setPageLoading(true);
    });
  }, []);

  if (props.task.finished == false) {
    return (
      <>
        <div className={styles.componentBody}>
          <div className={styles.textContainer}>
            <div className={styles.descryptionTextContainer}>
            <div className={styles.descriptionText}>
              {props.task.description}
            </div>
            </div>
            <div className={styles.categoryTextConatiner}>
            <a className={styles.categoryText}>
              {props.task.category}
            </a>
            </div>
          </div>
          <div className={styles.optionButtonContainer}>
            <Button className={styles.finishedButton} icon="tick" onClick={async () => finishUserTaskAndNavigateToUrl(currentTask, props.task.processInstanzeId, flowNodeId, props.task.description, props.task.description).then(() => location.reload())}/>
            <Button className={styles.cancelButton} icon="cross" onClick={async () => terminateTask(props.task.processInstanzeId).then(() => location.reload())}/>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className={styles.componentBody}>
          <div className={styles.textContainer}>
            <div className={styles.descryptionTextContainer}>
            <a className={styles.descriptionText}>
              {props.task.description}
            </a>
            </div>
            <div className={styles.categoryTextConatiner}>
            <a className={styles.categoryText}>
              {props.task.category}
            </a>
            </div>
          </div>
          <div className={styles.optionButtonContainer}>
            <Button className={styles.cancelButton} icon="cross"  onClick={async () => deleteTask(props.task.processInstanzeId).then(() => location.reload())}/>
          </div>
        </div>
      </>
    )
  }
}
