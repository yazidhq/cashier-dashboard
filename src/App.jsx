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
import ProfilePage from "./pages/ProfilePage";
import { ProductsProvider } from "./context/ProductsContext";
import { ReportsProvider } from "./context/ReportsContext";
import { OrderProvider } from "./context/OrderContext";
import { ProfileProvider } from "./context/ProfileContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <GetUserProvider>
        <ProfileProvider>
          <ProductsProvider>
            <OrderProvider>
              <ReportsProvider>
                <Router>
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
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <ProfilePage />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </Router>
              </ReportsProvider>
            </OrderProvider>
          </ProductsProvider>
        </ProfileProvider>
      </GetUserProvider>
    </AuthProvider>
  );
}

AOS.init();
export default App;
