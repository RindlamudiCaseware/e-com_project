import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import MyLogin from "./account/login";
import Register from "./account/signup";
import Myhome from "./home";
import Mycart from "./mycart";

function App() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNavbar = () => setIsNavCollapsed(true);

  return (
    <HashRouter>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand">
            <i className="fa fa-shopping-bag"></i> React e-commerce
          </a>
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`} id="mynavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/" onClick={closeNavbar}>
                  <i className="fa fa-home"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/cart" onClick={closeNavbar}>
                  <i className="fa fa-shopping-cart"></i> My Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/login" onClick={closeNavbar}>
                  <i className="fa fa-lock"></i> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/signup" onClick={closeNavbar}>
                  <i className="fa fa-user-plus"></i> Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route exact path="/" element={<Myhome />} />
        <Route exact path="/cart" element={<Mycart />} />
        <Route exact path="/login" element={<MyLogin />} />
        <Route exact path="/signup" element={<Register />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
