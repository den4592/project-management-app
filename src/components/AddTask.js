import { useState, useEffect } from "react";
import { TaskList } from "./TaskList";
import { v4 as uuidv4 } from "uuid";
import api from "./api/tasks";
import Modal from "react-modal";
import axios from "axios";

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
    top: "50%",
    left: "50%",
    display: "flex",
    maxWidth: "20rem",
    minWidth: "20rem",
    height: "10rem",
    padding: "2rem",
    overflow: "visible",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#EFEFF8",
  },
};

const url = "https://myproject-management-app.herokuapp.com/tasks";

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
    axios
      .post(url, task)
      .then((resp) => {
        console.log("post", resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // const response = await api.post(url, task);
    setTasks([...tasks, task]);
    setTaskText("");
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    const removedTasks = tasks.filter((item) => item.id !== id);
    setTasks(removedTasks);
  };

  const retriveTasks = async () => {
    axios
      .get(url)
      .then((resp) => {
        let data = resp.data;
        console.log(data);
        setTasks(data);
        console.log(tasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = async (e, task, txt) => {
    e.preventDefault();
    task.text = txt;
    const response = await api.put(`/tasks/${task.id}`, task);
    const { id } = response.data;
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...response.data } : task;
      })
    );
  };

  useEffect(() => {
    retriveTasks();
  }, []);

  return (
    <div className="add-task">
      <div className="container">
        <button onClick={openAddModal} className="add-btn btn">
          Add Task
        </button>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeAddModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form onSubmit={handleSubmit}>
            <label>Task:</label>
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
            <div className="modal-btn-container">
              <button className="add-btn btn">Add</button>
              <button onClick={closeAddModal} className="close-btn btn">
                Close
              </button>
            </div>
          </form>
        </Modal>
      </div>
      <TaskList
        tasks={tasks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};
