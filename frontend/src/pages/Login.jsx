import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {

  const navigate = useNavigate();

  return (

    <div className="container">

      <form className="form">

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
        />

        <input
          type="password"
          placeholder="Enter Password"
        />

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          Login
        </button>

      </form>

    </div>
  );
}