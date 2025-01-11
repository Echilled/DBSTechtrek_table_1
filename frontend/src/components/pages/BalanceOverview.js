import React from "react";

const BalanceOverview = ({ balances, companyName }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "16px" }}>
        Company Outstanding Balances
      </h2>
      <p style={{ fontSize: "1.125rem", marginBottom: "16px" }}>Hello, {companyName}!</p>
      <ul style={{ paddingLeft: "24px", listStyleType: "disc" }}>
        <li>Carbon Credits: {balances.carbonBalance}</li>
        <li>Cash Balance: {balances.cashBalance}</li>
      </ul>
      <button
        style={{
          marginTop: "16px",
          backgroundColor: "#3b82f6", // blue-500
          color: "white",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        View Details
      </button>
    </div>
  );
};

export default BalanceOverview;
