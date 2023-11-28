'use client';
import styles from "./history.module.css";
import TaskComponent from "../components/taskComponent";
import { Category, Task } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "@blueprintjs/core";

interface HistoryState {
  tasks: Array<Task>
  isFiltered: boolean
  filteredTasks: Array<Task>
}

export default function ShowOrderView() {
  const [state, setState] = useState<HistoryState>({
    tasks: [],
    isFiltered: false,
    filteredTasks: []
  });

  useEffect(() => {
    async function fetchData() {
      const req = await fetch("api/task", {
        method: "GET",
        headers: {"Content-Type" : "application/json"}
      })
      const res = await req.json();

      const finishedTasks: Array<Task> = []

      for (let index = 0; index < res.res.length; index++) {
        const task = res.res[index];
        if (task.finished) {
          finishedTasks.push(task)
        }
      }
      setState({ tasks: finishedTasks, filteredTasks: [], isFiltered: false })
    }

    fetchData();
  }, [])

  function Dropdown() {
    return (
      <main className={styles.main}>
        <div className={styles.bar}>
          <div>
            <Button icon="filter" className={styles.dropbtn}></Button>
          </div>
          <div className={styles.dropdown}>
            <div className={styles.dropdownContent}>
              <a href="#" onClick={() => setState({ filteredTasks: [], isFiltered: false, tasks: state.tasks })}>Ohne Filter</a>
              <a href="#" onClick={() => filterTasks(Category.WichtigDringend)}>wichtig & dringend</a>
              <a href="#" onClick={() => filterTasks(Category.Wichtig)}>wichtig & nicht dringend</a>
              <a href="#" onClick={() => filterTasks(Category.Dringend)}>nicht wichtig & dringend</a>
              <a href="#" onClick={() => filterTasks(Category.Unwichtig)}>nicht wichtig & nicht dringend</a>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // function Dropdown() {
  //   const [isOpen, setIsOpen] = useState(false);

  //   const toggleDropdown = () => {
  //       setIsOpen(!isOpen);
  //   };

  //   const handleItemClick = (category: Category, buttonText: string) => {
  //     setState({ category: category, buttonText: buttonText, tasks: state.tasks, createInput: state.createInput })
  //     setIsOpen(false);
  //   };

  //   return (
  //     <div>
  //       <button className={styles.dropbtn} onClick={toggleDropdown}>{state.buttonText}</button>
  //         {isOpen && (
  //           <div className={styles.dropdownContent}>
  //             <a onClick={() => handleItemClick(Category.WichtigDringend, "Wichtig & dringend")}>wichtig & dringend</a>
  //             <a onClick={() => handleItemClick(Category.Wichtig,"Wichtig & nicht dringend")}>wichtig & nicht dringend</a>
  //             <a onClick={() => handleItemClick(Category.Dringend, "Dringend & nicht wichtig")}>nicht wichtig & dringend</a>
  //             <a onClick={() => handleItemClick(Category.Unwichtig, "nicht dringend & nicht wichtig")}>nicht wichtig & nicht dringend</a>
  //           </div>
  //         )}
  //       </div>
  //   );
  // }

  function filterTasks(category: Category) {
    const filteredTasks: Array<Task> = [];
    for (let index = 0; index < state.tasks.length; index++) {
      const task = state.tasks[index];
      if (task.category == category) {
        filteredTasks.push(task);
      }
    }

    setState({ filteredTasks: filteredTasks, isFiltered: true, tasks: state.tasks })
  }

  if (state.isFiltered == false) {
    return (
      <>
        <div className={styles.body}>
          <Dropdown/>
          <div className={styles.historyContainer}>
            <div className={styles.content}>
              {state.tasks.map((task) => (
                <TaskComponent task={task} key={task.id}></TaskComponent>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (state.isFiltered == true) {
    return (
      <>
        <div className={styles.body}>
          <Dropdown/>
          <div className={styles.historyContainer}>
            <div className={styles.content}>
              {state.filteredTasks.map((task) => (
                <TaskComponent task={task} key={task.id}></TaskComponent>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
