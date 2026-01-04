import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MasterUser from "./pages/MasterUser";
import UserSelect from "./pages/UserSelect";
import VehicleDashboard from "./pages/VehicleDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/master-user"
          element={
            <ProtectedRoute>
              <MasterUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/select-user"
          element={
            <ProtectedRoute>
              <UserSelect />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicle/:userId"
          element={
            <ProtectedRoute>
              <VehicleDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
