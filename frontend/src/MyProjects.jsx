import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyProjects() {

  const email =
    localStorage.getItem("userEmail");

  const [projects, setProjects] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [requiredSkills, setRequiredSkills] =
    useState("");

  const [message, setMessage] =
    useState("");


  const loadProjects = async () => {

    if (!email) {

      setMessage(
        "Please login first."
      );

      return;

    }


    try {

      const response = await fetch(
        `http://localhost:8080/api/projects?email=${encodeURIComponent(email)}`
      );

      const data =
        await response.json();

      setProjects(data);

    } catch (error) {

      setMessage(
        "Cannot connect to server."
      );

    }

  };


  useEffect(() => {

    loadProjects();

  }, []);


  const createProject = async () => {

    if (!title.trim()) {

      setMessage(
        "Enter project title."
      );

      return;

    }


    try {

      const response = await fetch(
        "http://localhost:8080/api/projects",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            title: title,

            description: description,

            requiredSkills: requiredSkills,

            ownerEmail: email

          })
        }
      );


      if (response.ok) {

        setMessage(
          "Project created successfully!"
        );

        setTitle("");

        setDescription("");

        setRequiredSkills("");

        loadProjects();

      } else {

        const error =
          await response.text();

        setMessage(error);

      }

    } catch (error) {

      setMessage(
        "Cannot connect to server."
      );

    }

  };


  const deleteProject = async (id) => {

    try {

      const response = await fetch(
        `http://localhost:8080/api/projects?id=${id}&email=${encodeURIComponent(email)}`,
        {
          method: "DELETE"
        }
      );


      if (response.ok) {

        setMessage(
          "Project deleted successfully!"
        );

        loadProjects();

      } else {

        setMessage(
          "Unable to delete project."
        );

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
            📁
          </div>

          <div>

            <p className="small-heading">
              MY PROJECTS
            </p>

            <h1>
              My Projects
            </h1>

            <p>
              Create and manage your college projects.
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
            Create New Project
          </h2>


          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Project title"
          />


          <br />
          <br />


          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Project description"
            rows="5"
          />


          <br />
          <br />


          <input
            type="text"
            value={requiredSkills}
            onChange={(e) =>
              setRequiredSkills(
                e.target.value
              )
            }
            placeholder="Required skills: Java, React, MySQL"
          />


          <br />
          <br />


          <button
            className="profile-button"
            onClick={createProject}
          >
            Create Project
          </button>

        </div>


        <div className="profile-card">

          <h2>
            My Project List
          </h2>


          {projects.length === 0 ? (

            <p className="interest-text">
              No projects created yet.
            </p>

          ) : (

            projects.map((project) => (

              <div
                key={project.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "15px"
                }}
              >

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>

                <p>
                  Required Skills:{" "}
                  {project.requiredSkills ||
                    "Not specified"}
                </p>


                <button
                  className="profile-button"
                  onClick={() =>
                    deleteProject(
                      project.id
                    )
                  }
                >
                  Delete Project
                </button>

              </div>

            ))

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

export default MyProjects;

