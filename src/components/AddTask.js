import { useState, useEffect } from "react";
import { TaskList } from "./TaskList";
import { v4 as uuidv4 } from "uuid";
import api from "./api/tasks";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const AddTask = () => {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openAddModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

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
          <button onClick={closeAddModal}>close</button>
          <form onSubmit={handleSubmit}>
            <label>Task:</label>
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
            <button>Add</button>
          </form>
        </Modal>
      </div>
      <TaskList tasks={tasks} handleDelete={handleDelete} />
    </div>
  );
};
