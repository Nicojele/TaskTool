import { Category } from "@prisma/client";
import styles  from "./components.module.css";

type taskComponentProps = {
  description: string
  category: Category
}

export default function TaskComponent(props: taskComponentProps) {
  return (
    <>  
      <div className={styles.ComponentBody}>
        <div className={styles.TextConatiner}>
          <text className={styles.DescriptionText}>
            {props.description}
          </text>
          <text className={styles.CategoryText}>
            {props.category}
          </text>
        </div>
        <div className={styles.OptionButtonContainer}>
          <button className={styles.FinishedButton}>
            finished
          </button>
          <button className={styles.Cancelbutton}>
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}
