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
  const [companyName, setCompanyName] = useState("Example Company");

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
    setCompanyName("Example Company"); // Example: Fetch the company name dynamically here
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      <div className="w-full md:w-1/4">
        <BalanceOverview balances={balances} companyName={companyName} /> {/* Pass companyName instead of username */}
      </div>
      <div className="w-full md:w-3/4">
        <OutstandingRequests requests={requests} />
      </div>
    </div>
  );
};

export default LandingPage;
