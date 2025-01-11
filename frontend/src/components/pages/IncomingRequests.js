import { Check, X } from "lucide-react";
import { useState } from "react";

const IncomingRequests = () => {
  // Sample data
  const requests = [
    {
      id: 1,
      requestDate: "2025-01-10",
      requestorCompanyName: "EcoTech Solutions",
      carbonUnitPrice: 45.5,
      carbonQuantity: 1000,
      requestReason: "Offset Q1 emissions",
      requestType: "Buy",
    },
    {
      id: 2,
      requestDate: "2025-01-11",
      requestorCompanyName: "Green Energy Corp",
      carbonUnitPrice: 42.75,
      carbonQuantity: 2500,
      requestReason: "Annual carbon neutrality goal",
      requestType: "Sell",
    },
    {
      id: 3,
      requestDate: "2025-01-11",
      requestorCompanyName: "Green Energy Corp",
      carbonUnitPrice: 42.75,
      carbonQuantity: 2500,
      requestReason: "Annual carbon neutrality goal",
      requestType: "Sell",
    },
  ];

  const [selectedIds, setSelectedIds] = useState([]);

  const handleAccept = (id) => {
    // Add your accept logic here
    console.log("Accepting request:", id);
  };

  const handleReject = (id) => {
    // Add your reject logic here
    console.log("Rejecting request:", id);
  };

  const handleSelect = (id) => {
    // Removes the id if already in the array, else add
    if (selectedIds.includes(id)) {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter((e) => e !== id)
      );
    } else {
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
    }
  };

  const handleApproveSelected = () => {
    // Add your accept logic here
  };

  const handleRejectSelected = () => {
    // Add your reject logic here
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Incoming Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th />
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Request Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Company Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Carbon Price (SGD/Tonnes)
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Carbon Quantity
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Request Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="checked:bg-blue-600 checked:border-transparent"
                    onChange={() => handleSelect(request.id)}
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {new Date(request.requestDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {request.requestorCompanyName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {request.carbonUnitPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {request.carbonQuantity.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {request.requestReason}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      request.requestType === "Buy"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {request.requestType}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    {/* Accept request button */}
                    <button
                      onClick={() => handleAccept(request.id)}
                      className="p-1 rounded-full text-green-600 hover:bg-green-100"
                      title="Accept"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    {/* Reject request button */}
                    <button
                      onClick={() => handleReject(request.id)}
                      className="p-1 rounded-full text-red-600 hover:bg-red-100"
                      title="Reject"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex space-x-3 py-3">
          <button
            onClick={() => handleApproveSelected()}
            className="p-1 hover:bg-green-100"
            title="AcceptSelected"
          >
            <div className="flex items-center space-x-2">
              <Check className="text-green-600 h-5 w-5" />
              Approve selected
            </div>
          </button>
          <button
            onClick={() => handleRejectSelected()}
            className="p-1 hover:bg-red-100"
            title="RejectSelected"
          >
            <div className="flex items-center space-x-2">
              <Check className="text-red-600 h-5 w-5" />
              Reject selected
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingRequests;
