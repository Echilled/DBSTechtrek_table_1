import React from "react";

const BalanceOverview = ({ balances }) => {
  return (
    <div>
      <h2>Company Outstanding Balances</h2>
      <ul>
        <li>Carbon Credits: {balances.carbonBalance}</li>
        <li>Cash Balance: {balances.cashBalance}</li>
      </ul>
    </div>
  );
};

export default BalanceOverview;
