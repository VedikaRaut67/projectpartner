import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import "./App.css";

import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import FindTeammates from "./FindTeammates";
import MyProjects from "./MyProjects";
import MyTeams from "./MyTeams";


function Home() {
  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <Link to="/" className="logo">
          Project <span>Partner</span>
        </Link>

        <div className="nav-links">

          <Link to="/">Home</Link>

          <Link to="/login">
            Login
          </Link>

          <Link
            to="/register"
            className="nav-register"
          >
            Register
          </Link>

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            🎓 MADE FOR COLLEGE STUDENTS
          </div>

          <p className="small-heading">
            FIND • CONNECT • BUILD
          </p>

          <h1>
            Find the right
            <br />
            <span>Project Partner.</span>
          </h1>

          <p className="hero-description">
            Stop searching for teammates randomly.
            Find students based on their skills,
            interests, branch and project goals.
          </p>

          <div className="hero-buttons">

            <Link
              to="/register"
              className="primary-button"
            >
              Get Started →
            </Link>

            <Link
              to="/login"
              className="secondary-button"
            >
              Login
            </Link>

          </div>

          <div className="hero-trust">

            <div>
              <strong>🎯</strong>
              <span>Skill Based</span>
            </div>

            <div>
              <strong>🤝</strong>
              <span>Team Building</span>
            </div>

            <div>
              <strong>🚀</strong>
              <span>Project Ready</span>
            </div>

          </div>

        </div>


        {/* ================= HERO CARD ================= */}

        <div className="hero-visual">

          <div className="floating-card card-one">
            <span>💻</span>
            <div>
              <strong>Java Developer</strong>
              <small>Available for projects</small>
            </div>
          </div>

          <div className="main-team-card">

            <div className="team-icon">
              👥
            </div>

            <p className="card-label">
              BUILD YOUR TEAM
            </p>

            <h2>
              Your perfect
              <br />
              team is waiting.
            </h2>

            <p>
              Connect with students who
              complement your skills.
            </p>

            <div className="skill-row">

              <span>Java</span>
              <span>React</span>
              <span>MySQL</span>

            </div>

          </div>

          <div className="floating-card card-two">

            <span>✨</span>

            <div>
              <strong>Smart Matching</strong>
              <small>Based on your skills</small>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="features-section">

        <div className="section-heading">

          <p className="small-heading">
            WHY PROJECT PARTNER?
          </p>

          <h2>
            Everything you need to
            <span> build better teams.</span>
          </h2>

          <p>
            Find teammates, create projects and
            build your college project team in one place.
          </p>

        </div>


        <div className="features">

          <div className="feature-card">

            <div className="feature-icon">
              🔍
            </div>

            <h3>
              Find Teammates
            </h3>

            <p>
              Search students based on skills,
              branch, college and interests.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📁
            </div>

            <h3>
              Manage Projects
            </h3>

            <p>
              Create and manage your college
              projects from one dashboard.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🤝
            </div>

            <h3>
              Build Your Team
            </h3>

            <p>
              Send requests, accept teammates
              and build your project team.
            </p>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="how-section">

        <div className="section-heading">

          <p className="small-heading">
            HOW IT WORKS
          </p>

          <h2>
            Build your team in
            <span> 3 simple steps.</span>
          </h2>

        </div>


        <div className="steps">

          <div className="step">

            <div className="step-number">
              01
            </div>

            <h3>
              Create your profile
            </h3>

            <p>
              Add your branch, skills and
              project interests.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              02
            </div>

            <h3>
              Find teammates
            </h3>

            <p>
              Search students who have
              the skills you need.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              03
            </div>

            <h3>
              Build your team
            </h3>

            <p>
              Send requests and start
              working together.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="cta-section">

        <div>

          <p className="small-heading">
            READY TO START?
          </p>

          <h2>
            Your next project
            <br />
            needs the right team.
          </h2>

          <p>
            Create your profile and find
            your project partners today.
          </p>

        </div>

        <Link
          to="/register"
          className="cta-button"
        >
          Create Your Profile →
        </Link>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-logo">
          Project <span>Partner</span>
        </div>

        <p>
          Find teammates. Build projects.
          Create something amazing.
        </p>

        <div className="footer-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

        </div>

        <div className="footer-bottom">
          © 2026 Project Partner. Built for college students.
        </div>

      </footer>

    </div>
  );
}


function Logout() {

  const navigate = useNavigate();

  React.useEffect(() => {

    localStorage.removeItem("userEmail");

    navigate("/");

  }, [navigate]);

  return null;
}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/find-teammates"
          element={<FindTeammates />}
        />

        <Route
          path="/projects"
          element={<MyProjects />}
        />

        <Route
          path="/teams"
          element={<MyTeams />}
        />

        <Route
          path="/logout"
          element={<Logout />}
        />

      </Routes>

    </BrowserRouter>

  );
}


export default App;

