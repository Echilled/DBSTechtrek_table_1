import React, { useState } from "react";
import EditRequestForm from "./EditRequestForm";
import DeleteRequestButton from "./DeleteRequestButton";

const OutstandingRequests = ({ requests, onEditRequest, onDeleteRequest }) => {
  const [editing, setEditing] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleEdit = (request) => {
    setSelectedRequest(request);
    setEditing(true);
  };

  const handleDelete = (requestId) => {
    onDeleteRequest(requestId);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        overflowX: "auto",
      }}
    >
      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "16px" }}>
        Outstanding Requests
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "8px", backgroundColor: "#f3f4f6" }}>Request Date</th>
            <th style={{ padding: "8px", backgroundColor: "#f3f4f6" }}>Company Name</th>
            <th style={{ padding: "8px", backgroundColor: "#f3f4f6" }}>Carbon Price (SGD/Tonnes)</th>
            <th style={{ padding: "8px", backgroundColor: "#f3f4f6" }}>Carbon Quantity</th>
            <th style={{ padding: "8px", backgroundColor: "#f3f4f6" }}>Requesting Reason</th>
            <th style={{ padding: "8px", backgroundColor: "#f3f4f6" }}>Request Type</th>
            <th style={{ padding: "8px", backgroundColor: "#f3f4f6" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} style={{ cursor: "pointer", "&:hover": { backgroundColor: "#f3f4f6" } }}>
              <td style={{ padding: "8px" }}>{request.requestDate}</td>
              <td style={{ padding: "8px" }}>{request.companyName}</td>
              <td style={{ padding: "8px" }}>{request.carbonUnitPrice}</td>
              <td style={{ padding: "8px" }}>{request.carbonQuantity}</td>
              <td style={{ padding: "8px" }}>{request.requestReason}</td>
              <td style={{ padding: "8px" }}>{request.requestType}</td>
              <td style={{ padding: "8px" }}>
                <button
                  onClick={() => handleEdit(request)}
                  style={{
                    backgroundColor: "#3b82f6", // blue-500
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
                >
                  Edit
                </button>
                <DeleteRequestButton requestId={request.id} deleteRequest={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && selectedRequest && (
        <EditRequestForm
          request={selectedRequest}
          editRequest={onEditRequest}
          setEditing={setEditing}
        />
      )}
    </div>
  );
};

export default OutstandingRequests;
