import React from "react";

const DeleteRequestButton = ({ requestId, deleteRequest }) => {
  return (
    <button
      onClick={() => deleteRequest(requestId)}
      style={{
        backgroundColor: "#ef4444", // red-500
        color: "white",
        padding: "8px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#dc2626")} // hover effect
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#ef4444")}
    >
      Delete
    </button>
  );
};

export default DeleteRequestButton;
