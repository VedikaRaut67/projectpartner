import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {

  const email = localStorage.getItem("userEmail");

  const [user, setUser] = useState(null);

  const [editing, setEditing] = useState(false);

  const [message, setMessage] = useState("");

  const loadProfile = async () => {

    if (!email) {
      setMessage("Please login first.");
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8080/api/profile?email=${encodeURIComponent(email)}`
      );

      if (!response.ok) {
        setMessage("Unable to load profile.");
        return;
      }

      const data = await response.json();

      setUser(data);

    } catch (error) {

      setMessage("Cannot connect to server.");

    }
  };


  useEffect(() => {
    loadProfile();
  }, []);


  const handleChange = (field, value) => {

    setUser({
      ...user,
      [field]: value
    });

  };


  const updateProfile = async () => {

    try {

      const response = await fetch(
        `http://localhost:8080/api/profile?email=${encodeURIComponent(email)}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(user)
        }
      );


      if (response.ok) {

        const data = await response.json();

        setUser(data);

        setEditing(false);

        setMessage("Profile updated successfully!");

      } else {

        setMessage("Profile update failed.");

      }

    } catch (error) {

      setMessage("Cannot connect to server.");

    }

  };


  if (!user) {

    return (
      <div className="profile-page">

        <div className="profile-container">

          <div className="profile-card">

            <p>
              {message || "Loading profile..."}
            </p>

          </div>

        </div>

      </div>
    );

  }


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
            👤
          </div>

          <div>

            <p className="small-heading">
              MY PROFILE
            </p>

            <h1>
              {user.name}
            </h1>

            <p>
              {user.email}
            </p>

          </div>

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
            Student Information
          </h2>


          <div className="profile-grid">

            <div className="profile-field">

              <label>
                Name
              </label>

              {editing ? (

                <input
                  value={user.name || ""}
                  onChange={(e) =>
                    handleChange(
                      "name",
                      e.target.value
                    )
                  }
                />

              ) : (

                <div className="profile-value">
                  {user.name}
                </div>

              )}

            </div>


            <div className="profile-field">

              <label>
                Email
              </label>

              <div className="profile-value">
                {user.email}
              </div>

            </div>


            <div className="profile-field">

              <label>
                College
              </label>

              {editing ? (

                <input
                  value={user.college || ""}
                  onChange={(e) =>
                    handleChange(
                      "college",
                      e.target.value
                    )
                  }
                />

              ) : (

                <div className="profile-value">
                  {user.college}
                </div>

              )}

            </div>


            <div className="profile-field">

              <label>
                Branch
              </label>

              {editing ? (

                <input
                  value={user.branch || ""}
                  onChange={(e) =>
                    handleChange(
                      "branch",
                      e.target.value
                    )
                  }
                />

              ) : (

                <div className="profile-value">
                  {user.branch}
                </div>

              )}

            </div>


            <div className="profile-field">

              <label>
                Year
              </label>

              {editing ? (

                <input
                  type="number"
                  value={user.year || ""}
                  onChange={(e) =>
                    handleChange(
                      "year",
                      e.target.value
                    )
                  }
                />

              ) : (

                <div className="profile-value">
                  {user.year}
                </div>

              )}

            </div>


            <div className="profile-field">

              <label>
                Skills
              </label>

              {editing ? (

                <input
                  value={user.skills || ""}
                  onChange={(e) =>
                    handleChange(
                      "skills",
                      e.target.value
                    )
                  }
                  placeholder="Java, React, MySQL"
                />

              ) : (

                <div className="skills-list">

                  {(user.skills || "Not added")
                    .split(",")
                    .map((skill, index) => (

                      <span key={index}>
                        {skill.trim()}
                      </span>

                    ))}

                </div>

              )}

            </div>

          </div>

        </div>


        <div className="profile-card">

          <h2>
            Project Interests
          </h2>

          {editing ? (

            <input
              value={user.projectInterests || ""}
              onChange={(e) =>
                handleChange(
                  "projectInterests",
                  e.target.value
                )
              }
              placeholder="Web development, AI, DBMS"
            />

          ) : (

            <p className="interest-text">
              {user.projectInterests ||
                "No project interests added."}
            </p>

          )}

        </div>


        <div className="profile-actions">

          {editing ? (

            <button
              className="profile-button"
              onClick={updateProfile}
            >
              Save Changes
            </button>

          ) : (

            <button
              className="profile-button"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>

          )}


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

export default Profile;

