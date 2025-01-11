import { LogOut } from "lucide-react";

const Layout = () => {
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and company name */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">
              Company Name
            </span>
          </div>

          {/* Desktop menu */}
          <div className="md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </a>
            <a href="/requests" className="text-gray-600 hover:text-gray-800">
              Incoming Requests
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Layout;
