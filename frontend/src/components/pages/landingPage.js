import React, { useEffect, useState } from "react";
import axios from "axios";
import BalanceOverview from "./BalanceOverview";
import OutstandingRequests from "./OutstandingRequests";

const LandingPage = () => {
  const [balances, setBalances] = useState({ carbonBalance: 0, cashBalance: 0 });
  const [requests, setRequests] = useState([]);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    // Fetch balances
    axios
      .get("/api/balances")
      .then((response) => {
        setBalances(response.data);
      })
      .catch((error) => console.error("Error fetching balances:", error));

    // Fetch outstanding requests
    axios
      .get("/api/requests")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => console.error("Error fetching requests:", error));

    // Fetch company name
    axios
      .get("/api/companyName")
      .then((response) => {
        setCompanyName(response.data.companyName);
      })
      .catch((error) => console.error("Error fetching company name:", error));
  }, []);

  // Add a new request
  const handleAddRequest = (newRequest) => {
    axios
      .post("/api/requests", newRequest)
      .then((response) => {
        setRequests((prevRequests) => [...prevRequests, response.data]);
      })
      .catch((error) => console.error("Error adding request:", error));
  };

  // Delete a request
  const handleDeleteRequest = (requestId) => {
    axios
      .delete(`/api/requests/${requestId}`)
      .then(() => {
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== requestId)
        );
      })
      .catch((error) => console.error("Error deleting request:", error));
  };

  // Edit a request
  const handleEditRequest = (requestId, updatedRequest) => {
    axios
      .put(`/api/requests/${requestId}`, updatedRequest)
      .then((response) => {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId ? response.data : request
          )
        );
      })
      .catch((error) => console.error("Error editing request:", error));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        padding: "24px",
        height: "100vh", // Make sure the page takes full height
      }}
    >
      <div style={{ flex: "1 1 25%" }}>
        <BalanceOverview balances={balances} companyName={companyName} />
      </div>
      <div style={{ flex: "1 1 75%" }}>
        <OutstandingRequests
          requests={requests}
          onAddRequest={handleAddRequest}
          onDeleteRequest={handleDeleteRequest}
          onEditRequest={handleEditRequest}
        />
      </div>
    </div>
  );
};

export default LandingPage;
