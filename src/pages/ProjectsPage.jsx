import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectsPage() {
  const apiBaseURL =
    "https://project-management-api-4641927fee65.herokuapp.com";

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${apiBaseURL}/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);
  if (isLoading) return "loading...";
  return (
    <div>
      {projects.map((project) => (
        <div className="ProjectCard card" key={project.id}>
          <Link to={`/projects/${project.id}`}>
            <h3>{project.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
