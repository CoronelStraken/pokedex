import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('/pokebola.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px 40px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <h1 className="mb-4">Welcome to PokeApp</h1>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/grid")}
        >
          START
        </button>
      </div>
    </div>
  );
}

export default Landing;
