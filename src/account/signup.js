
import { ToastContainer , toast} from "react-toastify";
import { useState } from "react";
import { Link, useResolvedPath } from "react-router-dom";


const Register = () =>{

    let[newuser , setuser] = useState({});
    // let[allerror , seterror] = useState({nameerror:"",mobileerror:"" , emailerror : "",passworderror:""});

    let[nameerror,setNameError] = useState("");
    let[mobileerror,setMobileError] = useState("");
    let[emailerror,seteamilerror] = useState("");
    let[passworderror,setpassworderror] = useState("");
    let[photoerror,setphotoerror] = useState("");

    const pickvalue = (obj) =>{
        newuser[obj.target.name] = obj.target.value;
        setuser(newuser); //value get updated in useState
    }

    const save = (frmobj)=>{
        frmobj.preventDefault();

        let formstatus = true;

        if(!newuser.fname || newuser.fname ==="" ){
            setNameError( "Invalid name");
            formstatus =false;
        }else{
            setNameError("");
        }

        //mobile validation
        var mpattern = /^[0]?[6789]\d{9}$/;

        if ( ! mpattern.test(newuser.mobile) ){
            setMobileError(  "Invalid number");
            formstatus =false;
        }else{
            setMobileError("");
        }

        // email validation
        var epattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if ( ! epattern.test(newuser.email) ){
            seteamilerror(  "Invalid email");
            formstatus =false;
        }else{
            seteamilerror("");
        }

        if ( ! newuser.photo ){
            setphotoerror(  "Enter Profile photo url");
            formstatus =false;
        }else{
            setphotoerror("");
        }
        

        // password validation

        if(!newuser.password|| newuser.password === "" || newuser.password.length <6){
            setpassworderror("Invalid Password");
            formstatus =false;
        }else{
            setpassworderror("");
        }
        
        // alert(formstatus);
        if(formstatus == true){
            let url = "http://localhost:1234/account";
            let postdata = {
                header : {"content-type" : "application/json"},
                method: "post",
                body:JSON.stringify(newuser)
            }

            fetch(url , postdata)
            .then(response => response.json())
            .then(info =>{
                toast("Account Created...")
                frmobj.target.reset();
            })
        }
    }


    return(
        <div className="container background-signup">
            <ToastContainer/>
            <div className="row">
                <div className="col-xl-4"></div>
                <div className="col-xl-4 mt-3 ">
                    <form onSubmit={save}>
                        <div className="card border-0 mb-3 shadow-lg">
                            <div className="card-header"> <i className="fa fa-user-plus text-danger"> </i> Register 
                            <Link className="float-end text-decoration-none" to="/login" > <i className="fa fa-lock"></i> Login </Link>
                            </div>
                            <div className="card-body">
                            
                                <div className="mb-3">
                                    <p>Full Name </p>
                                    <input type="text" className="form-control" name="fname" onChange={pickvalue} />
                                    <small className="text-danger"> {nameerror} </small>
                                </div>

                                <div className="mb-3">
                                    <p>Mobile No. </p>
                                    <input type="number" className="form-control" name="mobile"  onChange={pickvalue} />
                                    <small className="text-danger"> {mobileerror} </small>
                                </div>

                                <div className="mb-3">
                                    <p>E-mail ID </p>
                                    <input type="text" className="form-control" name="email"  onChange={pickvalue} />
                                    <small className="text-danger"> {emailerror} </small>
                                </div>

                                <div className="mb-3">
                                    <p>Password </p>
                                    <input type="password" className="form-control" name="password"  onChange={pickvalue} />
                                    <small className="text-danger"> {passworderror} </small>
                                </div>

                                <div className="mb-3">
                                    <p> Profile Photo URL </p>
                                    <input type="text" className="form-control" name="photo"  onChange={pickvalue} />
                                    <small className="text-danger"> {photoerror} </small>
                                </div>

                            </div>
                            <div className="card-footer text-center">
                                <button className="btn btn-danger" > Submit <i className="fa fa-arrow-right"></i> </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-xl-4"></div>
            </div>
        </div>
    )
}

export default Register;