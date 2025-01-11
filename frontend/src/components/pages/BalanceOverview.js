import React from "react";

const BalanceOverview = ({ balances, companyName }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Company Outstanding Balances</h2>
      <p className="text-lg mb-4">Hello, {companyName}!</p> {/* Display company name */}
      <ul className="list-disc pl-6">
        <li>Carbon Credits: {balances.carbonBalance}</li>
        <li>Cash Balance: {balances.cashBalance}</li>
      </ul>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        View Details
      </button>
    </div>
  );
};

export default BalanceOverview;
