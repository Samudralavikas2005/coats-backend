import { useEffect, useState } from "react";
import CreateCase from "./CreateCase";

function Cases() {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState("");
  const role = localStorage.getItem("role");

  // Logout function (JWT logout = delete tokens)
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.reload();
  };

  // Fetch cases (reusable)
  const fetchCases = () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setError("Not logged in");
      return;
    }

    fetch("http://127.0.0.1:8000/api/cases/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or token expired");
        }
        return res.json();
      })
      .then((data) => {
        setCases(data);
        setError("");
      })
      .catch((err) => setError(err.message));
  };

  // Load cases on page load
  useEffect(() => {
    fetchCases();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Logout
      </button>

      {/* Create Case Form */}
      {role === "CASE" && <CreateCase onCreated={fetchCases} />}


      <h2>My Cases</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {cases.length === 0 && !error && <p>No cases found.</p>}

      <ul>
        {cases.map((c) => (
          <li key={c.id} style={{ marginBottom: "10px" }}>
            <b>Crime No:</b> {c.crime_number} <br />
            <b>Section:</b> {c.section_of_law} <br />
            <b>Stage:</b> {c.current_stage}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cases;
