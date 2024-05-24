import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "./pages/home/home";
const Register = lazy(() => import("./pages/register/register"));
const Login = lazy(() => import("./pages/login/login"));
const Clinics = lazy(() => import("./pages/clinics/clinics"));
const NotFound = lazy(() => import("./pages/notFound/notFound"));
const Services = lazy(() => import("./pages/services/services"));
const AddClinic = lazy(() => import("./pages/AddClinic/AddClinic"));
const ServicesSkeleton = lazy(() =>
  import("./pages/services/servicesSkeleton")
);
const ProtectedRoute = lazy(() => import("./components/protectedRoute"));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={Home} />
        <Route
          path="/register"
          element={
            <Suspense fallback={<div>Loading signUp..</div>}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading login..</div>}>
              <Login />
            </Suspense>
          }
        />
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
        <Route
          path="/clinics"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div>Loading clinics..</div>}>
                <Clinics />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/addClinic"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div>Loading add clinic..</div>}>
                <AddClinic />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading notFound..</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
