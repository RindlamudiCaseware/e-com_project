import { HashRouter , Routes , Route , Link } from "react-router-dom";

import Mydashboard from "./dashboard";

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import Myprofile from "./profile";
import Editmyprofile from "./editprofile";
import Mycategory from "./category";
import Newproduct from "./newproduct";
import Products from "./product";
import Myorder from "./order";

const Usermodule = () =>{
    return(
        <HashRouter>

        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
            <a className="navbar-brand"><i className="fa fa-shopping-bag"></i> Seller CRM </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link active" to="/"> Dashboard </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/category"> Category </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/newproduct"> New Product </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/product"> Product List </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/order"> Recent Order </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/profile"> Profile </Link>
                </li>
                
                <li className="nav-item">
                    <Link className="nav-link active" href="javascript:void(0)" to="/editprofile"> Edit Profile </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active"  onClick={logout}>  
                         Welcome : {localStorage.getItem("name")} - <i className="fa fa-power-off"></i> Logout  
                    </Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>

            <Routes>
                <Route exact path="/"    element = {<Mydashboard/>} />
                <Route exact path="/category"    element = {<Mycategory/>} />
                <Route exact path="/newproduct" element = {<Newproduct/>}  />
                <Route exact path="/product" element = {<Products/>}  />
                <Route exact path="/order" element = {<Myorder/>}  />
                <Route exact path="/profile"    element = {<Myprofile/>} />
                <Route exact path="/editprofile" element = {<Editmyprofile/>}  />
            </Routes>

            
        </HashRouter>
    )
}

export default Usermodule;

const logout = () =>{
    localStorage.clear(); // delete everything from localstorage
    window.location.href="#/" // to redirect to main url
    window.location.reload();
}