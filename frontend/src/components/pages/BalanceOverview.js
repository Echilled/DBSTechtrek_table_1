import React from "react";

const BalanceOverview = ({ balances, username }) => {
  // Profile card inline styles
  const profileCardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  };

  const buttonStyle = {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px'
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3'
  };

  return (
    <div className="card profile" style={profileCardStyle}>
      <h2>Company Outstanding Balances</h2>
      <p>Hello, {username}!</p>
      <ul>
        <li>Carbon Credits: {balances.carbonBalance}</li>
        <li>Cash Balance: {balances.cashBalance}</li>
      </ul>
      <button style={buttonStyle} onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}>
        View Details
      </button>
    </div>
  );
};

export default BalanceOverview;
