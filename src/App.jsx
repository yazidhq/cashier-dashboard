import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import ReportsPage from "./pages/ReportsPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AOS from "aos";
import "aos/dist/aos.css";
import { GetUserProvider } from "./context/GetUserContext";
import { ProductsProvider } from "./context/ProductsContext";
import { ReportsProvider } from "./context/ReportsContext";
import { OrderProvider } from "./context/OrderContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <GetUserProvider>
          <ProductsProvider>
            <OrderProvider>
              <ReportsProvider>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <ProtectedRoute>
                        <ProductsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute>
                        <ReportsPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </ReportsProvider>
            </OrderProvider>
          </ProductsProvider>
        </GetUserProvider>
      </AuthProvider>
    </Router>
  );
}

AOS.init();
export default App;
