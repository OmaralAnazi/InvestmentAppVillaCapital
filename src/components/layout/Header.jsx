import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import villaCapitalLogo from "/VillaCapital-logo.png";
import navLinks from "../../routeConfig";
import { useState } from "react";

function Header() {
  const { userLoggedIn } = useAuth();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const location = useLocation();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const navLinkElements = navLinks.map((link) => {
    if (!link.showInNav) return null;
    if (link.authRequired && !userLoggedIn) return null;
    if (link.hideWhenAuth && userLoggedIn) return null;

    const isActive = location.pathname === link.path;
    return (
      <li key={link.path} className={`nav-item `}>
        <Link className={`nav-link ${isActive ? "text-light" : ""}`} to={link.path} onClick={() => setIsNavCollapsed(true)}>
          {link.navTitle}
        </Link>
      </li>
    );
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={villaCapitalLogo} alt="VillaCapital Logo" className="img-fluid me-2" style={{ maxWidth: "30px", height: "auto" }} />
          VillaCapital
        </Link>

        <button
          className={`navbar-toggler ${isNavCollapsed ? "" : "collapsed"}`}
          type="button"
          onClick={handleNavCollapse}
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">{navLinkElements}</ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
