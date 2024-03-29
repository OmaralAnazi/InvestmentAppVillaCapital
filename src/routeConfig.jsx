import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import AccountPage from "./components/pages/AccountPage";
import ExplorePage from "./components/pages/ExplorePage";
import HandleInvestPage from "./components/pages/HandleInvestPage";
import InvestmentsPage from "./components/pages/InvestmentsPage";

export default [
  { path: "/", element: <HomePage />, showInNav: true, navTitle: "Home", authRequired: false },
  { path: "/login", element: <LoginPage />, showInNav: true, navTitle: "Login", authRequired: false, hideWhenAuth: true },
  { path: "/register", element: <RegisterPage />, showInNav: true, navTitle: "Register", authRequired: false, hideWhenAuth: true },
  { path: "/account", element: <AccountPage />, showInNav: true, navTitle: "Account", authRequired: true },
  { path: "/explore", element: <ExplorePage />, showInNav: true, navTitle: "Explore", authRequired: true },
  { path: "/investments", element: <InvestmentsPage />, showInNav: true, navTitle: "Investments", authRequired: true },
  { path: "/handleInvest", element: <HandleInvestPage />, showInNav: false },
];
