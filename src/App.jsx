import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./components/contexts/authContext";
import { InvestmentProvider } from "./components/contexts/investmentContext";
import { ToastContainer } from "react-toastify";
import routes from "./routeConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <InvestmentProvider>
          <Layout>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
              <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
          </Layout>
          <ToastContainer newestOnTop={true} theme="dark" />
        </InvestmentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
