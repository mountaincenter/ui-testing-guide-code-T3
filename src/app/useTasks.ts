import { useReducer, useEffect } from "react";
import type { TaskType } from "./_components/Task";

interface TasksResponse {
  tasks: TaskType[];
}

type Action =
  | { type: "UPDATE_TASKS"; tasks: TaskType[] }
  | {
      type: "ARCHIVE_TASK" | "PIN_TASK" | "INBOX_TASK" | "DELETE_TASK";
      id: string;
    }
  | { type: "EDIT_TITLE"; id: string; title: string };

function getTasks(options: RequestInit): Promise<TasksResponse> {
  return fetch("/tasks", options).then(
    (res) => res.json() as Promise<TasksResponse>,
  );
}

function updateTask(
  tasks: TaskType[],
  id: string,
  updatedTask: Partial<TaskType>,
) {
  return tasks.map((task) =>
    task.id === id ? { ...task, ...updatedTask } : task,
  );
}
function deleteTask(tasks: TaskType[], id: string) {
  return tasks.filter((task) => task.id !== id);
}

export const reducer = (tasks: TaskType[], action: Action) => {
  switch (action.type) {
    case "UPDATE_TASKS":
      return action.tasks;
    case "ARCHIVE_TASK":
      return updateTask(tasks, action.id, { state: "TASK_ARCHIVED" });
    case "PIN_TASK":
      return updateTask(tasks, action.id, { state: "TASK_PINNED" });
    case "INBOX_TASK":
      return updateTask(tasks, action.id, { state: "TASK_INBOX" });
    case "DELETE_TASK":
      return deleteTask(tasks, action.id);
    case "EDIT_TITLE":
      return updateTask(tasks, action.id, { title: action.title });
    default:
      return tasks;
  }
};

export function useTasks(): [TaskType[], React.Dispatch<Action>] {
  const [tasks, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getTasks({ signal })
      .then(({ tasks }) => {
        dispatch({ type: "UPDATE_TASKS", tasks });
      })
      .catch((error) => {
        if (!abortController.signal.aborted) {
          console.log(error);
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return [tasks, dispatch];
}
