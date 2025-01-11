import React from "react";

const OutstandingRequests = ({ requests }) => {
  // Request card inline styles
  const requestCardStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    overflowX: 'auto'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const tableCellStyle = {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd'
  };

  const headerCellStyle = {
    backgroundColor: '#f4f4f4',
    fontSize: '16px'
  };

  const rowHoverStyle = {
    backgroundColor: '#f9f9f9'
  };

  return (
    <div className="card requests-card" style={requestCardStyle}>
      <h2>Outstanding Requests</h2>
      <table className="requests-table" style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Request Date</th>
            <th style={headerCellStyle}>Company Name</th>
            <th style={headerCellStyle}>Carbon Price (SGD/Tonnes)</th>
            <th style={headerCellStyle}>Carbon Quantity</th>
            <th style={headerCellStyle}>Requesting Reason</th>
            <th style={headerCellStyle}>Request Type (Buy/Sell)</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index} style={rowHoverStyle}>
              <td style={tableCellStyle}>{request.requestDate}</td>
              <td style={tableCellStyle}>{request.companyName}</td>
              <td style={tableCellStyle}>{request.carbonUnitPrice}</td>
              <td style={tableCellStyle}>{request.carbonQuantity}</td>
              <td style={tableCellStyle}>{request.requestReason}</td>
              <td style={tableCellStyle}>{request.requestType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutstandingRequests;
