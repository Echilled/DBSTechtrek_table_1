import React from "react";
import "./App.css";
import LandingPage from "./components/pages/landingPage";
import Layout from "./components/layout/layout";
import IncomingRequests from "./components/pages/IncomingRequests";

function App() {
  return (
    <div>
      <Layout />
      <IncomingRequests />
    </div>
  );
}

export default App;
