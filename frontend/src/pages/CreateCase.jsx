import { useState } from "react";

function CreateCase({ onCreated }) {
  const [formData, setFormData] = useState({
    ps_limit: "",
    crime_number: "",
    section_of_law: "",
    date_of_occurrence: "",
    date_of_registration: "",
    complainant_name: "",
    accused_details: "",
    gist_of_case: "",
    current_stage: "",
    action_to_be_taken: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("access");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/cases/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Backend error:", errData);
        throw new Error(JSON.stringify(errData));
      }

      setSuccess("Case created successfully ✅");

      // reset form
      setFormData({
        ps_limit: "",
        crime_number: "",
        section_of_law: "",
        date_of_occurrence: "",
        date_of_registration: "",
        complainant_name: "",
        accused_details: "",
        gist_of_case: "",
        current_stage: "",
        action_to_be_taken: "",
      });

      // tell parent to refresh cases
      if (onCreated) onCreated();

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h3>Create New Case</h3>

      <form onSubmit={handleSubmit}>
        <input name="ps_limit" placeholder="PS Limit" value={formData.ps_limit} onChange={handleChange} required /><br /><br />
        <input name="crime_number" placeholder="Crime Number" value={formData.crime_number} onChange={handleChange} required /><br /><br />
        <input name="section_of_law" placeholder="Section of Law" value={formData.section_of_law} onChange={handleChange} required /><br /><br />

        <label>Date of Occurrence</label><br />
        <input type="date" name="date_of_occurrence" value={formData.date_of_occurrence} onChange={handleChange} required /><br /><br />

        <label>Date of Registration</label><br />
        <input type="date" name="date_of_registration" value={formData.date_of_registration} onChange={handleChange} required /><br /><br />

        <input name="complainant_name" placeholder="Complainant Name" value={formData.complainant_name} onChange={handleChange} required /><br /><br />
        <input name="accused_details" placeholder="Accused Details" value={formData.accused_details} onChange={handleChange} required /><br /><br />
        <input name="gist_of_case" placeholder="Gist of Case" value={formData.gist_of_case} onChange={handleChange} required /><br /><br />
        <input name="current_stage" placeholder="Current Stage" value={formData.current_stage} onChange={handleChange} required /><br /><br />
        <input name="action_to_be_taken" placeholder="Action to be Taken" value={formData.action_to_be_taken} onChange={handleChange} required /><br /><br />

        <button type="submit">Create Case</button>
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CreateCase;
