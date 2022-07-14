import { useState, useEffect } from "react";
import { TaskList } from "./TaskList";
import { v4 as uuidv4 } from "uuid";
import api from "./api/tasks";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(123, 123, 123, 0.75)",
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",

    minWidth: "20rem",
    height: "10rem",
    padding: "2rem",
    overflow: "visible",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#EFEFF8",
  },
};

export const AddTask = () => {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openAddModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeAddModal() {
    setIsOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      id: uuidv4(),
      checked: false,
      text: taskText,
    };
    const response = await api.post("/tasks", task);
    setTasks([...tasks, response.data]);
    setTaskText("");
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    const removedTasks = tasks.filter((item) => item.id !== id);
    setTasks(removedTasks);
  };

  const retriveTasks = async () => {
    const response = await api.get("/tasks");
    return response.data;
  };

  useEffect(() => {
    const getAllTasks = async () => {
      const allTasks = await retriveTasks();
      if (allTasks) setTasks(allTasks);
    };

    getAllTasks();
  }, []);

  return (
    <div className="add-task">
      <div className="container">
        <button onClick={openAddModal}>Add Task</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeAddModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={closeAddModal} className="close-btn">
            close
          </button>
          <form onSubmit={handleSubmit}>
            <label>Task:</label>
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
            <button className="add-btn">Add</button>
          </form>
        </Modal>
      </div>
      <TaskList tasks={tasks} handleDelete={handleDelete} />
    </div>
  );
};
