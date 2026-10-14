import { Link } from "react-router-dom";

function Dashboard() {

  return (
    <div className="dashboard-page">

      <nav className="navbar">

        <div className="logo">
          Project <span>Partner</span>
        </div>

        <div className="nav-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/profile">
            My Profile
          </Link>

          <Link to="/find-teammates">
            Find Teammates
          </Link>

          <Link to="/projects">
            My Projects
          </Link>

          <Link to="/teams">
            My Teams
          </Link>

          <Link to="/logout">
            Logout
          </Link>

        </div>

      </nav>


      <div className="dashboard-container">

        <div className="dashboard-header">

          <p className="small-heading">
            PROJECT PARTNER
          </p>

          <h1>
            Welcome to your Dashboard
          </h1>

          <p>
            Find teammates, manage projects and build
            your perfect college project team.
          </p>

        </div>


        <div className="dashboard-grid">

          <Link
            to="/profile"
            className="dashboard-card"
          >

            <div className="dashboard-icon">
              👤
            </div>

            <h2>
              My Profile
            </h2>

            <p>
              View and update your student profile,
              skills and project interests.
            </p>

          </Link>


          <Link
            to="/find-teammates"
            className="dashboard-card"
          >

            <div className="dashboard-icon">
              🔍
            </div>

            <h2>
              Find Teammates
            </h2>

            <p>
              Search for students based on their
              skills and interests.
            </p>

          </Link>


          <Link
            to="/projects"
            className="dashboard-card"
          >

            <div className="dashboard-icon">
              📁
            </div>

            <h2>
              My Projects
            </h2>

            <p>
              Create, manage and delete your
              college projects.
            </p>

          </Link>


          <Link
            to="/teams"
            className="dashboard-card"
          >

            <div className="dashboard-icon">
              👥
            </div>

            <h2>
              My Teams
            </h2>

            <p>
              Manage received requests, sent requests
              and accepted teammates.
            </p>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;

