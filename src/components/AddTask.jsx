import { useState } from "react";
import axios from "axios";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function AddTask({ projectID, getProjectDetails }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const clearInputFields = () => {
    setDescription("");
    setTitle("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API_URL + "/tasks", { title, description, projectId: +projectID })
      .then((response) => {
        if (response.status === 201) {
          clearInputFields();
          getProjectDetails();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="AddTask">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
