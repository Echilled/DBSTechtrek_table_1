import React, { useEffect, useState } from "react";
import BalanceOverview from "./BalanceOverview";
import OutstandingRequests from "./OutstandingRequests";

const LandingPage = () => {
  const [balances, setBalances] = useState({ carbonBalance: 1000, cashBalance: 5000 });
  const [requests, setRequests] = useState([
    {
      requestDate: "2025-01-10",
      companyName: "ABC Corp",
      carbonUnitPrice: 20,
      carbonQuantity: 200,
      requestReason: "Sustainability initiative",
      requestType: "Buy"
    },
    {
      requestDate: "2025-01-05",
      companyName: "XYZ Ltd",
      carbonUnitPrice: 18,
      carbonQuantity: 150,
      requestReason: "Compliance with regulations",
      requestType: "Sell"
    },
    {
      requestDate: "2025-01-08",
      companyName: "GreenTech",
      carbonUnitPrice: 22,
      carbonQuantity: 300,
      requestReason: "Corporate social responsibility",
      requestType: "Buy"
    }
  ]);
  const [username, setUsername] = useState("JohnDoe123"); 

  useEffect(() => {
    setBalances({ carbonBalance: 1000, cashBalance: 5000 });
    setRequests([
      {
        requestDate: "2025-01-10",
        companyName: "ABC Corp",
        carbonUnitPrice: 20,
        carbonQuantity: 200,
        requestReason: "Sustainability initiative",
        requestType: "Buy"
      },
      {
        requestDate: "2025-01-05",
        companyName: "XYZ Ltd",
        carbonUnitPrice: 18,
        carbonQuantity: 150,
        requestReason: "Compliance with regulations",
        requestType: "Sell"
      },
      {
        requestDate: "2025-01-08",
        companyName: "GreenTech",
        carbonUnitPrice: 22,
        carbonQuantity: 300,
        requestReason: "Corporate social responsibility",
        requestType: "Buy"
      }
    ]);
    setUsername("JohnDoe123"); 
  }, []);

  // Container inline styles
  const containerStyle = {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    padding: '20px',
    gap: '20px'
  };

  return (
    <div style={containerStyle}>
      <BalanceOverview balances={balances} username={username} />
      <OutstandingRequests requests={requests} />
    </div>
  );
};

export default LandingPage;
