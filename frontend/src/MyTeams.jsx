import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyTeams() {

  const [received, setReceived] =
    useState([]);

  const [sent, setSent] =
    useState([]);

  const [accepted, setAccepted] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const email =
    localStorage.getItem("userEmail");


  const loadRequests = async () => {

    if (!email) {

      setMessage(
        "Please login first."
      );

      return;

    }


    try {

      const receivedResponse =
        await fetch(
          `http://localhost:8080/api/team-requests/received?email=${encodeURIComponent(email)}`
        );


      const sentResponse =
        await fetch(
          `http://localhost:8080/api/team-requests/sent?email=${encodeURIComponent(email)}`
        );


      const acceptedResponse =
        await fetch(
          `http://localhost:8080/api/team-requests/accepted/details?email=${encodeURIComponent(email)}`
        );


      const receivedData =
        await receivedResponse.json();


      const sentData =
        await sentResponse.json();


      const acceptedData =
        await acceptedResponse.json();


      setReceived(receivedData);

      setSent(sentData);

      setAccepted(acceptedData);

    } catch (error) {

      setMessage(
        "Cannot connect to server."
      );

    }

  };


  useEffect(() => {

    loadRequests();

  }, []);


  const updateRequest =
    async (id, status) => {

      try {

        const response =
          await fetch(
            `http://localhost:8080/api/team-requests/status?id=${id}&status=${status}`,
            {
              method: "PUT"
            }
          );


        if (response.ok) {

          setMessage(
            status === "ACCEPTED"
              ? "Team request accepted!"
              : "Team request rejected!"
          );

          loadRequests();

        } else {

          setMessage(
            "Unable to update request."
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
            👥
          </div>

          <div>

            <p className="small-heading">
              MY TEAMS
            </p>

            <h1>
              My Project Teams
            </h1>

            <p>
              Manage your team requests and team members.
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


        {/* ACCEPTED TEAM MEMBERS */}

        <div className="profile-card">

          <h2>
            My Accepted Teams
          </h2>


          {accepted.length === 0 ? (

            <p className="interest-text">
              No accepted team members yet.
            </p>

          ) : (

            accepted.map((member) => (

              <div
                key={member.requestId}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "15px"
                }}
              >

                <h3>
                  👤 {member.name}
                </h3>

                <p>
                  📧 Email: {member.email}
                </p>

                <p>
                  🎓 College: {member.college}
                </p>

                <p>
                  💻 Branch: {member.branch}
                </p>

                <p>
                  📚 Year: {member.year}
                </p>

                <p>
                  🛠️ Skills:{" "}
                  {member.skills ||
                    "Not added"}
                </p>

                <p>
                  📁 Project:{" "}
                  {member.projectTitle}
                </p>

                <p>
                  Status:{" "}
                  <strong>
                    ACCEPTED
                  </strong>
                </p>

              </div>

            ))

          )}

        </div>


        {/* RECEIVED REQUESTS */}

        <div className="profile-card">

          <h2>
            Received Requests
          </h2>


          {received.length === 0 ? (

            <p className="interest-text">
              No team requests received.
            </p>

          ) : (

            received.map((request) => (

              <div
                key={request.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "15px"
                }}
              >

                <h3>
                  Team Request
                </h3>

                <p>
                  From:{" "}
                  {request.senderEmail}
                </p>

                <p>
                  Project:{" "}
                  {request.projectTitle}
                </p>

                <p>
                  Status:{" "}
                  <strong>
                    {request.status}
                  </strong>
                </p>


                {request.status ===
                  "PENDING" && (

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "15px"
                    }}
                  >

                    <button
                      className="profile-button"
                      onClick={() =>
                        updateRequest(
                          request.id,
                          "ACCEPTED"
                        )
                      }
                    >
                      Accept
                    </button>


                    <button
                      className="profile-back-button"
                      onClick={() =>
                        updateRequest(
                          request.id,
                          "REJECTED"
                        )
                      }
                    >
                      Reject
                    </button>

                  </div>

                )}

              </div>

            ))

          )}

        </div>


        {/* SENT REQUESTS */}

        <div className="profile-card">

          <h2>
            Sent Requests
          </h2>


          {sent.length === 0 ? (

            <p className="interest-text">
              No team requests sent.
            </p>

          ) : (

            sent.map((request) => (

              <div
                key={request.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "15px"
                }}
              >

                <h3>
                  Team Request
                </h3>

                <p>
                  To:{" "}
                  {request.receiverEmail}
                </p>

                <p>
                  Project:{" "}
                  {request.projectTitle}
                </p>

                <p>
                  Status:{" "}
                  <strong>
                    {request.status}
                  </strong>
                </p>

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

export default MyTeams;

