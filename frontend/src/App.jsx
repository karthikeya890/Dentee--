import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "./pages/home/home";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
const Services = lazy(() => import("./pages/services/services"));
import ServicesSkeleton from "./pages/services/servicesSkeleton";
import ProtectedRoute from "./components/protectedRoute";
import NotFound from "./pages/notFound/notFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Suspense fallback={<ServicesSkeleton />}>
                <Services />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Suspense fallback={<ServicesSkeleton />}>
                <Services />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
