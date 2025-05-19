
import { ToastContainer , toast} from "react-toastify";
import { useState } from "react";
import { Link, resolvePath } from "react-router-dom";


const MyLogin = () =>{

    let[userinfo , setinfo] = useState({})

    const pickvalue = (obj) =>{
        userinfo[obj.target.name] = obj.target.value;
        setinfo(userinfo); //value get updated in useState
    }

    const logincheck = (frmobj) =>{
        toast("Please Wait Checking...");
        let loginstatus = false;
        frmobj.preventDefault();

        let url = "http://localhost:1234/account";
        fetch(url)
        .then(response => response.json())
        .then(alluser =>{
            alluser.map((user , index) =>{
                if(user.email == userinfo.email && user.password == userinfo.password){
                    toast("Login Success.. Redirectig...");
                    loginstatus = true;
                    localStorage.setItem("id" , user.id);
                    localStorage.setItem("name" , user.fname);
                    window.location.reload(); // reload the current page
                } 
            })

            if(loginstatus == false){
                toast("Login Fail. Invalid or not exixts...")
            }
        })
    }

    return(
        <div className="container background-login">
            <ToastContainer></ToastContainer>
            <div className="row">
                <div className="col-xl-4"></div>
                <div className="col-xl-4  me-3 mt-5">
                    <form onSubmit={logincheck}>
                    <div className="card border-0 shadow-lg">
                        <div className="card-header border-0"> <i className="fa fa-lock text-danger"> </i> Login 
                        <Link className="float-end text-decoration-none" to="/signup" > <i className="fa fa-user-plus"></i> Register </Link>
                        </div>
                        <div className="card-body border-0">
                            <div className="mb-4">
                                <p>E-mail ID </p>
                                <input type="text" className="form-control" name="email" onChange={pickvalue} />
                            </div>
                            <div className="mb-4">
                                <p>Password </p>
                                <input type="password" className="form-control" name="password" onChange={pickvalue} />
                            </div>
                        </div>
                        <div className="card-footer border-0 text-center">
                           <button className="btn btn-danger"> Login <i className="fa fa-arrow-right"></i> </button>
                        </div>
                    </div>
                    </form>
                </div>
                <div className="col-xl-4"></div>
            </div>
        </div>
    )
}

export default MyLogin;