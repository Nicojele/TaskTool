import { Category } from "@prisma/client";
import styles  from "./components.module.css";

type taskComponentProps = {
  description: string
  category: Category
}

export default function TaskComponent(props: taskComponentProps) {
  return (
    <>  
      <div className={styles.componentBody}>
        <div className={styles.textContainer}>
          <text className={styles.descriptionText}>
            {props.description}
          </text>
          <text className={styles.categoryText}>
            {props.category}
          </text>
        </div>
        <div className={styles.optionButtonContainer}>
          <button className={styles.finishedButton}>
            finished
          </button>
          <button className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}
