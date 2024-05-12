import TaskList from "./_components/TaskList";
import { useTasks } from "./useTasks";

interface InboxScreenProps {
  error?: boolean;
}

export default function InboxScreen({ error = false }: InboxScreenProps) {
  const [tasks, dispatch] = useTasks();

  const archiveTask = (archive: string, id: string) => {
    dispatch({
      type: archive === "ARCHIVE_TASK" ? "ARCHIVE_TASK" : "INBOX_TASK",
      id,
    });
  };

  const togglePinTask = (state: string, id: string) => {
    dispatch({ type: state === "TASK_PINNED" ? "INBOX_TASK" : "PIN_TASK", id });
  };

  const editTitle = (title: string, id: string) => {
    dispatch({ type: "EDIT_TITLE", id, title });
  };

  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <p className="title-message">Oh no!</p>
          <p className="subtitle-message">Something went wrong</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">Taskbox</h1>
      </nav>
      <TaskList
        tasks={tasks}
        onArchiveTask={archiveTask}
        onTogglePinTask={togglePinTask}
        onEditTitle={editTitle}
      />
    </div>
  );
}
