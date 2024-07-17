import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

export default function EditProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { projectID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/projects/${projectID}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
      })
      .catch((err) => console.error(err));
  }, [projectID]);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(`${API_URL}/projects/${projectID}`, { title, description })
      .then((response) => {
        if (response.status === 200) {
          navigate(-1);
        } else {
          console.log(response);
        }
      })
      .catch((err) => console.error(err));
  }

  function handleDelete() {
    axios.delete(`${API_URL}/projects/${projectID}`).then(() => {
      navigate("/projects");
    });
  }

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

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
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>
      <button onClick={() => navigate(-1)}>back</button>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}
