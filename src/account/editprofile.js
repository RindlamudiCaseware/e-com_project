import { useState , useEffect, use } from "react";
import { toast , ToastContainer } from "react-toastify";

const Editmyprofile = () =>{

    let[fullname , setname] = useState("");
    let[mobile , setmobileno] = useState("");
    let[email , setemail] = useState("");
    let[password , setpassword] = useState("");
    let[photo , setphoto] = useState("");

    let url = "http://localhost:1234/account/" + localStorage.getItem("id");
    const getprofile = () =>{
        fetch(url)
        .then(response => response.json())
        .then(user =>{
            setname(user.fname);
            setmobileno(user.mobile);
            setemail(user.email);
            setpassword(user.password);
            setphoto(user.photo);
        })
    }

    useEffect(() =>{
        getprofile();
    }, []);

    const updateprofile = () =>{
        let userinfo = {
            "fname" : fullname,
            "mobile" : mobile,
            "email" : email,
            "password" : password,
            "photo" : photo
        }

        let postdata = {
            headers :{"content-type" : "application/json"},
            method : "put",
            body :JSON.stringify(userinfo)
        }

        fetch(url , postdata)
        .then(response => response.json())
        .then(info =>{
            toast("Profile Updated Successfully....");
            getprofile(); // reload the details..
        })
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <ToastContainer></ToastContainer>
                <div className="col-xl-4"></div>
                <div className="col-xl-4 p-3 rounded shadow">
                    <h3 className="text-center text-primary mb-4"> Edit My Profile </h3>

                    <form onSubmit={updateprofile}>
                    <div className="mb-4">
                        <label> Full Name </label>
                        <input type="text" className="form-control" value={fullname} onChange={obj=>setname(obj.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label> Mobile no.  </label>
                        <input type="text" className="form-control"  value={mobile} onChange={obj=>setmobileno(obj.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label> Email-Id </label>
                        <input type="text" className="form-control"  value={email} onChange={obj=>setemail(obj.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label> Password </label>
                        <input type="text" className="form-control"  value={password} onChange={obj=>setpassword(obj.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label> Profile Photo </label>
                        <input type="text" className="form-control"  value={photo} onChange={obj=>setphoto(obj.target.value)} />
                    </div>

                    <div className="text-center">
                        <button className="btn btn-warning"> Update Profile </button>
                    </div>
                    </form>
                                       
                </div>
            </div>
        </div>
    )
}

export default Editmyprofile;