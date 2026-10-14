import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email.trim(),
            password: password
          })
        }
      );

      const data = await response.text();

      if (response.ok) {
        localStorage.setItem(
          "userEmail",
          email.trim()
        );

        setMessage("Login successful! Redirecting...");

        setTimeout(() => {
          navigate("/dashboard");
        }, 700);

      } else {
        setMessage(
          data || "Invalid email or password."
        );
      }

    } catch (error) {

      setMessage(
        "Cannot connect to server. Please make sure the backend is running."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-page">

      {/* ================= LEFT SIDE ================= */}

      <div className="auth-info">

        <Link to="/" className="auth-logo">
          Project <span>Partner</span>
        </Link>

        <div className="auth-info-content">

          <div className="auth-icon">
            👥
          </div>

          <p className="small-heading">
            WELCOME BACK
          </p>

          <h2>
            Build better teams.
            <br />
            Build better projects.
          </h2>

          <p>
            Connect with students who have
            the skills and interests you need
            for your college project.
          </p>

          <div className="auth-points">

            <div>
              <span>✓</span>
              Find students by skills
            </div>

            <div>
              <span>✓</span>
              Create and manage projects
            </div>

            <div>
              <span>✓</span>
              Build your project team
            </div>

          </div>

        </div>

      </div>


      {/* ================= LOGIN CARD ================= */}

      <div className="auth-form-container">

        <div className="auth-card">

          <div className="mobile-auth-logo">
            Project <span>Partner</span>
          </div>

          <p className="small-heading">
            ACCOUNT LOGIN
          </p>

          <h1>
            Welcome Back 👋
          </h1>

          <p className="auth-subtitle">
            Login to continue to your account.
          </p>


          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label>
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  title={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              {loading
                ? "Logging in..."
                : "Login →"}

            </button>

          </form>


          {/* MESSAGE */}

          {message && (

            <div
              className={
                message.includes("successful")
                  ? "auth-message success"
                  : "auth-message error"
              }
            >
              {message}
            </div>

          )}


          {/* REGISTER */}

          <div className="auth-footer">

            <p>
              Don't have an account?
            </p>

            <Link to="/register">
              Create an account →
            </Link>

          </div>


          <Link
            to="/"
            className="auth-back"
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;

