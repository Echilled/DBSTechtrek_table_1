import React, { useState } from "react";

const EditRequestForm = ({ request, editRequest, setEditing }) => {
  const [updatedRequest, setUpdatedRequest] = useState(request);

  const handleChange = (e) => {
    setUpdatedRequest({
      ...updatedRequest,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editRequest(updatedRequest);
    setEditing(false); // Close the form
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          width: "400px",
        }}
      >
        <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "16px" }}>Edit Request</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="companyName" style={{ display: "block", fontSize: "0.875rem", color: "#4b5563" }}>
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={updatedRequest.companyName}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "0.875rem",
                color: "#4b5563",
                outline: "none",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#3b82f6", // blue-500
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              style={{
                backgroundColor: "#9ca3af", // gray-500
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRequestForm;
