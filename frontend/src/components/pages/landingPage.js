import React, { useEffect, useState } from "react";
import BalanceOverview from "./BalanceOverview";
import OutstandingRequests from "./OutstandingRequests";

const LandingPage = () => {
  const [balances, setBalances] = useState({ carbonBalance: 0, cashBalance: 0 });
  const [requests, setRequests] = useState([]);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    // Use fake data instead of API calls for testing purposes

    // Fake balance data
    setBalances({
      carbonBalance: 1000, // Example carbon balance
      cashBalance: 5000,   // Example cash balance
    });

    // Fake company name
    setCompanyName("Example Company");

    // Fake requests data
    setRequests([
      {
        id: 1,
        requestDate: "2024-01-10",
        companyName: "TechTrek 2025 Pte Ltd",
        carbonUnitPrice: 20,
        carbonQuantity: 200,
        requestReason: "Sustainability initiative",
        requestType: "Buy",
      },
      {
        id: 2,
        requestDate: "2024-01-05",
        companyName: "Senger LLC",
        carbonUnitPrice: 18,
        carbonQuantity: 150,
        requestReason: "Compliance with regulations",
        requestType: "Sell",
      },
      {
        id: 3,
        requestDate: "2024-01-08",
        companyName: "Mills Inc",
        carbonUnitPrice: 22,
        carbonQuantity: 300,
        requestReason: "Corporate social responsibility",
        requestType: "Buy",
      },
    ]);
  }, []);

  // Add a new request (for testing, we add fake data)
  const handleAddRequest = (newRequest) => {
    const fakeNewRequest = {
      id: Date.now(), // Generate a unique ID based on timestamp
      requestDate: "2025-01-12",
      companyName: "Gutmann - Langosh",
      carbonUnitPrice: 25,
      carbonQuantity: 500,
      requestReason: "New sustainability project",
      requestType: "Buy",
    };
    setRequests((prevRequests) => [...prevRequests, fakeNewRequest]);
  };

  // Delete a request (for testing, remove by id)
  const handleDeleteRequest = (requestId) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== requestId)
    );
  };

  // Edit a request (for testing, we'll modify one request)
  const handleEditRequest = (requestId, updatedRequest) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, ...updatedRequest } : request
      )
    );
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
