import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { useState } from "react";

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

export const TaskList = ({ tasks, handleDelete }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openUpdateModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeUpdateModal() {
    setIsOpen(false);
  }

  const handleEdit = () => {};
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
        <button onClick={closeUpdateModal}>close</button>
        <form>
          <label>Task:</label>
          <input type="text" />
          <button>Update</button>
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
