import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export const TaskList = ({ tasks, handleDelete }) => {
  const td = tasks.map((task) => {
    return (
      <div key={task.id} className="task">
        <input type="checkbox" />
        <p className="task-text">{task.text}</p>
        <FontAwesomeIcon
          className="remove-btn"
          onClick={() => handleDelete(task.id)}
          icon={faTrash}
        />
      </div>
    );
  });

  return (
    <div className="task-list">
      <div className="container">
        <h2 className="task-list-title">Task List</h2>
        {td}
      </div>
    </div>
  );
};
