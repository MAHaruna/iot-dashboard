import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SimpleDashboard from "./containers/SimpleDashboard";
import Login from "./containers/Login";
import Home from "./containers/Home";   // 👈 import Home
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />   {/* 👈 Home page */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/simple"
          element={
            <ProtectedRoute>
              <SimpleDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
