export interface TaskType {
  id: string;
  title: string;
  state: string;
}

interface TaskProps {
  task: TaskType;
  onArchiveTask: (state: string, id: string) => void;
  onTogglePinTask: (state: string, id: string) => void;
  onEditTitle: (title: string, id: string) => void;
}
export default function Task({
  task: { id, title, state },
  onArchiveTask,
  onTogglePinTask,
  onEditTitle,
}: TaskProps) {
  return (
    <div
      className={`list-item ${state}`}
      role="listitem"
      aria-label={`task-${id}`}
    >
      <label
        htmlFor="checked"
        aria-label={`archiveTask-${id}`}
        className="checkbox"
      >
        <input
          type="checkbox"
          disabled={true}
          name="checked"
          id={`archiveTask-${id}`}
          checked={state === "TASK_ARCHIVED"}
        />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask("ARCHIVE_TASK", id)}
          role="button"
          aria-label={`archiveButton-${id}`}
        />
      </label>

      <label htmlFor="title" aria-label={title} className="title">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Input title"
          style={{ textOverflow: "ellipsis" }}
          onChange={(e) => onEditTitle(e.target.value, id)}
        />
      </label>

      {state !== "TASK_ARCHIVED" && (
        <button
          className="pin-button"
          onClick={() => onTogglePinTask(state, id)}
          id={`pinTask-${id}`}
          aria-label={state === "TASK_PINNED" ? "unpin" : "pin"}
          key={`pinTask-${id}`}
        >
          <span className={`icon-bell`} />
        </button>
      )}
    </div>
  );
}
