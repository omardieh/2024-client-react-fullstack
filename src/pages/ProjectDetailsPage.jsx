import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";

export default function ProjectDetailsPage() {
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { projectID } = useParams();
  const apiBaseURL =
    "https://project-management-api-4641927fee65.herokuapp.com";

  function getProjectDetails() {
    axios
      .get(`${apiBaseURL}/projects/${projectID}?_embed=tasks`)
      .then((response) => setProject(response.data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }
  useEffect(() => {
    getProjectDetails();
  }, [projectID]);

  if (isLoading) return "loading...";

  return (
    <div className="ProjectDetailsPage">
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <AddTask getProjectDetails={getProjectDetails} projectID={projectID} />
      {project.tasks.map((task) => (
        <li className="TaskCard card" key={task.id}>
          <h3>{task.title}</h3>
          <h4>Description:</h4>
          <p>{task.description}</p>
        </li>
      ))}
      <Link to={`/projects/${projectID}/edit`}>
        <button>edit</button>
      </Link>
    </div>
  );
}
