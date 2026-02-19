import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Cases from "./pages/Cases";
import CreateCase from "./pages/CreateCase";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>

        {/* Default route */}
        <Route
          path="/"
          element={token ? <Navigate to="/cases" /> : <Navigate to="/login" />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={token ? <Navigate to="/cases" /> : <Login />}
        />

        {/* Cases (protected) */}
        <Route
          path="/cases"
          element={
            <ProtectedRoute>
              <Cases />
            </ProtectedRoute>
          }
        />

        {/* Create Case (only for officers) */}
        <Route
          path="/create-case"
          element={
            <ProtectedRoute>
              {role === "CASE" ? <CreateCase /> : <Navigate to="/cases" />}
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

