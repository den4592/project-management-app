import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { useState } from "react";
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

export const TaskList = ({ tasks, handleDelete }) => {
  const [taskText, setTaskText] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openUpdateModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeUpdateModal() {
    setIsOpen(false);
  }

  const handleEdit = (id, txt) => {
    setTaskText(txt);
  };

  const td = tasks.map((task) => {
    return (
      <div key={task.id} className="task">
        <input type="checkbox" />
        <p className="task-text">{task.text}</p>
        <div className="icons">
          <FontAwesomeIcon
            className="edit-btn icon-btn"
            onClick={() => {
              handleEdit(task.id, task.text);
              openUpdateModal();
            }}
            icon={faPenToSquare}
          />
          <FontAwesomeIcon
            className="remove-btn icon-btn"
            onClick={() => handleDelete(task.id)}
            icon={faTrash}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="task-list">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeUpdateModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeUpdateModal} className="close-btn">
          close
        </button>
        <form>
          <label>Task:</label>
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button className="update-btn">Update</button>
        </form>
      </Modal>
      <div className="container">
        <div className="task-container">
          <h2 className="task-list-title">Task List</h2>
        </div>
        {td}
      </div>
    </div>
  );
};
