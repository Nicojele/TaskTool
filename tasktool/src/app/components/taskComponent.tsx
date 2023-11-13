import { Category } from "@prisma/client";
import styles from "./components.module.css";
import { Button } from '@blueprintjs/core';

type taskComponentProps = {
  description: string
  category: Category
  finished: boolean
}

export default function TaskComponent(props: taskComponentProps) {
  if (props.finished == true) {
    return (
      <>
        <div className={styles.componentBody}>
          <div className={styles.textContainer}>
            <div className={styles.descryptionTextContainer}>
            <text className={styles.descriptionText}>
              {props.description}
            </text>
            </div>
            <div className={styles.categoryTextConatiner}>
            <text className={styles.categoryText}>
              {getCategory(props.category)}
            </text>
            </div>
          </div>
          <div className={styles.optionButtonContainer}>
            <Button className={styles.cancelButton} icon="cross" />
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
            <text className={styles.descriptionText}>
              {props.description}
            </text>
            </div>
            <div className={styles.categoryTextConatiner}>
            <text className={styles.categoryText}>
              {getCategory(props.category)}
            </text>
            </div>
          </div>
          <div className={styles.optionButtonContainer}>
            <Button className={styles.finishedButton} icon="tick"/>
            <Button className={styles.cancelButton} icon="cross" />
          </div>
        </div>
      </>
    )
  }
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
