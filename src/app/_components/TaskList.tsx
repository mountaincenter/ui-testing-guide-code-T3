import Task, { type TaskType } from "./Task";

interface TaskListProps {
  loading?: boolean;
  tasks: TaskType[];
  onTogglePinTask: (state: string, id: string) => void;
  onArchiveTask: (state: string, id: string) => void;
  onEditTitle: (title: string, id: string) => void;
}

export default function TaskList({
  loading = false,
  tasks,
  onTogglePinTask,
  onArchiveTask,
  onEditTitle,
}: TaskListProps) {
  const events = {
    onTogglePinTask,
    onArchiveTask,
    onEditTitle,
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );
  if (loading) {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }
  const tasksInOrder = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];

  return (
    <div
      className="list-items"
      data-testid="success"
      key={"success"}
      role="list"
      aria-label="tasks"
    >
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}
