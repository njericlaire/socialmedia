import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      await login(inputs);
      navigate("/")
      setErr(null); // Clear any previous errors on successful login
    } catch (err) {
      setErr(err.response?.data?.message || "Something went wrong!");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome to Grow Biz.</h1>
          <p>
          Are you an African entrepreneur looking to take your small or medium-sized enterprise (SME) to new heights?<br>
          </br> Look no further! <br> 
          </br>Our vibrant online community is the perfect place to unlock your business's full potential.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && <span className="error">{err}</span>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
