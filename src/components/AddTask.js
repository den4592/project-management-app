import { useState, useEffect } from "react";
import { TaskList } from "./TaskList";
import { v4 as uuidv4 } from "uuid";

export const AddTask = () => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: uuidv4(),
      checked: false,
      text: text,
    };
    setTasks([task, ...tasks]);
    setText("");
  };

  const handleDelete = (id) => {
    const removedTasks = tasks.filter((item) => item.id !== id);
    setTasks(removedTasks);
  };

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("tasks"));
    data.forEach((item) => {
      setTasks(data);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="add-task">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>Task:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button>Add Task</button>
        </form>
      </div>
      <TaskList tasks={tasks} handleDelete={handleDelete} />
    </div>
  );
};
