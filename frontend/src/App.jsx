import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home/Home";

import AuthLayout from "./layouts/AuthLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import CandidatesPage from "./pages/Dashboard/CandidatesPage";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/auth/pages/Login";
import Register from "./pages/auth/pages/Register";
import ForgotPassword from "./pages/auth/pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
            <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/candidates"
          element={
            <ProtectedRoute>
              <CandidatesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;