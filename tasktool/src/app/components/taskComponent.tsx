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
            {getCategory(props.category)}
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

function getCategory(category: Category): string {
  let res = ''
  if (category === Category.WichtigDringend) {
    res = "Wichtig & Dringend";
  }
  if (category === Category.Wichtig) {
    res = "Wichtig & nicht Dringend";
  }
  if (category === Category.Dringend) {
    res = "nicht Wichtig & Dringend";
  }
  if (category === Category.Unwichtig) {
    res = "Nicht Wichtig & nicht Dringend"
  }

  return res;
}
