import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">
        <button> Home </button>
      </Link>
      <Link to="/projects">
        <button> Projects </button>
      </Link>
      <Link to="/projects/create">
        <button> Create </button>
      </Link>
    </nav>
  );
}
