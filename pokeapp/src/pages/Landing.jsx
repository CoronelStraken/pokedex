import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h1 className="mb-4">Welcome to PokeApp</h1>
      <button
        className="btn btn-primary btn-lg"
        onClick={() => navigate("/grid")}
      >
        START
      </button>
    </div>
  );
}

export default Landing;
