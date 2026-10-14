import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FindTeammates() {

  const [teammates, setTeammates] = useState([]);
  const [skill, setSkill] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [message, setMessage] = useState("");

  const findTeammates = async () => {

    try {

      let url =
        "http://localhost:8080/api/teammates";

      if (skill.trim()) {

        url +=
          "?skill=" +
          encodeURIComponent(skill);

      }

      const response = await fetch(url);

      const data = await response.json();

      setTeammates(data);

    } catch (error) {

      setMessage("Cannot connect to server.");

    }

  };


  useEffect(() => {

    findTeammates();

  }, []);


  const sendRequest = async (email) => {

    const sender =
      localStorage.getItem("userEmail");


    if (!sender) {

      setMessage("Please login first.");

      return;

    }


    if (!projectTitle.trim()) {

      setMessage(
        "Enter project title first."
      );

      return;

    }


    try {

      const response = await fetch(
        "http://localhost:8080/api/team-requests",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            senderEmail: sender,

            receiverEmail: email,

            projectTitle: projectTitle,

            status: "PENDING"

          })
        }
      );


      if (response.ok) {

        setMessage(
          "Team request sent successfully!"
        );

      } else {

        setMessage("Request failed.");

      }

    } catch (error) {

      setMessage(
        "Cannot connect to server."
      );

    }

  };


  return (

    <div className="profile-page">

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


      <div className="profile-container">

        <div className="profile-header">

          <div className="profile-avatar">
            👥
          </div>

          <div>

            <p className="small-heading">
              FIND TEAMMATES
            </p>

            <h1>
              Find Your Project Partner
            </h1>

            <p>
              Search students based on their skills.
            </p>

          </div>

        </div>


        <div className="profile-card">

          <h2>
            Project Title
          </h2>

          <input
            type="text"
            value={projectTitle}
            onChange={(e) =>
              setProjectTitle(e.target.value)
            }
            placeholder="Enter project title"
          />

        </div>


        <div className="profile-card">

          <h2>
            Search by Skill
          </h2>

          <input
            type="text"
            value={skill}
            onChange={(e) =>
              setSkill(e.target.value)
            }
            placeholder="Example: Java"
          />

          <br />
          <br />

          <button
            className="profile-button"
            onClick={findTeammates}
          >
            Find Partners
          </button>

        </div>


        {message && (

          <div className="profile-card">

            <p>
              {message}
            </p>

          </div>

        )}


        <div className="profile-card">

          <h2>
            Available Teammates
          </h2>


          {teammates.map((teammate) => (

            <div
              key={teammate.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "15px"
              }}
            >

              <h3>
                {teammate.name}
              </h3>

              <p>
                Email: {teammate.email}
              </p>

              <p>
                College: {teammate.college}
              </p>

              <p>
                Branch: {teammate.branch}
              </p>

              <p>
                Year: {teammate.year}
              </p>

              <p>
                Skills:{" "}
                {teammate.skills ||
                  "Not added"}
              </p>


              <button
                className="profile-button"
                onClick={() =>
                  sendRequest(
                    teammate.email
                  )
                }
              >
                Send Team Request
              </button>

            </div>

          ))}


          {teammates.length === 0 && (

            <p>
              No teammates found.
            </p>

          )}

        </div>


        <div className="profile-actions">

          <Link
            to="/dashboard"
            className="profile-back-button"
          >
            Back to Dashboard
          </Link>

        </div>

      </div>

    </div>

  );
}

export default FindTeammates;

