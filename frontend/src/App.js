import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import LandingPage from "./components/pages/landingPage";
import Login from "./components/pages/loginPage.js"

const AuthPublicGuard = () => {
  const authUser = getCurrentUser();

  return authUser ? (
    <Outlet context={{ isLoggedIn: true }} />
  ) : (
    <Outlet context={{ isLoggedIn: false }} />
  );
};

const AuthPrivateGuard = () => {
  const authUser = getCurrentUser();

  return authUser ? <Outlet /> : <Navigate to={"/login"} replace />;
};

const getCurrentUser = () => {
  return localStorage.getItem("username");
};

function App() {
  return (
    <React.StrictMode>
        <BrowserRouter>

         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route exact path="/login" element={<Login />} />
  

            <Route element={<AuthPublicGuard />}>

            </Route>

            <Route element={<AuthPrivateGuard />}>

            </Route>
          </Routes>
        </BrowserRouter>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
