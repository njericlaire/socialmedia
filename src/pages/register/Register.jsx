import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();  // Prevents the form from refreshing the page or appending data to the URL
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      setErr(null);  // Clear any previous errors if the request is successful
    } catch (err) {
      console.error("Registration error:", err);
      setErr(err.response?.data?.message || "Something went wrong!");
    }
  };

  console.log(err);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Grow Biz</h1>
          <p>
          At Grow Biz, we empower entrepreneurs and small business owners to take their ventures to new heights.<br>
          </br> Whether you're just starting or looking to scale, our platform provides the tools, resources, and community support you need to succeed. <br>
          </br>Join us today to access expert insights, business strategies, and a network of like-minded individuals who are all driven by the same goal
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {err && <span className="error">{err}</span>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
