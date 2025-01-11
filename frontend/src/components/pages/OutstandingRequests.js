import React from "react";

const OutstandingRequests = ({ requests }) => {
  return (
    <div>
      <h2>Outstanding Requests</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Request Date</th>
            <th>Company Name</th>
            <th>Carbon Price (SGD/Tonnes)</th>
            <th>Carbon Quantity</th>
            <th>Requesting Reason</th>
            <th>Request Type (Buy/Sell)</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.requestDate}</td>
              <td>{request.companyName}</td>
              <td>{request.carbonUnitPrice}</td>
              <td>{request.carbonQuantity}</td>
              <td>{request.requestReason}</td>
              <td>{request.requestType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutstandingRequests;
