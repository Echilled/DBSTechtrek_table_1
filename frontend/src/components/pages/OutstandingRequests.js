import React from "react";

const OutstandingRequests = ({ requests }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Outstanding Requests</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 text-sm bg-gray-200">Request Date</th>
            <th className="px-4 py-2 text-sm bg-gray-200">Company Name</th>
            <th className="px-4 py-2 text-sm bg-gray-200">Carbon Price (SGD/Tonnes)</th>
            <th className="px-4 py-2 text-sm bg-gray-200">Carbon Quantity</th>
            <th className="px-4 py-2 text-sm bg-gray-200">Requesting Reason</th>
            <th className="px-4 py-2 text-sm bg-gray-200">Request Type (Buy/Sell)</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 text-sm">{request.requestDate}</td>
              <td className="px-4 py-2 text-sm">{request.companyName}</td>
              <td className="px-4 py-2 text-sm">{request.carbonUnitPrice}</td>
              <td className="px-4 py-2 text-sm">{request.carbonQuantity}</td>
              <td className="px-4 py-2 text-sm">{request.requestReason}</td>
              <td className="px-4 py-2 text-sm">{request.requestType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutstandingRequests;
