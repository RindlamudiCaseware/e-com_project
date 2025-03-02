import { useState , useEffect, use } from "react";

const Myprofile = () =>{

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

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-xl-4"></div>                
                <div className="col-xl-4">
                    <h3 className="text-center text-info mb-4" > View My Profile </h3>
                    
                    <table className="table table-bordered">
                        <tbody>
                            <tr><th> Full Name </th><td> {fullname} </td></tr>
                            <tr><th> Mobile No. </th><td> {mobile} </td></tr>
                            <tr><th> Email-Id </th><td> {email} </td></tr>
                            <tr><th> Password </th><td> {password} </td></tr>
                            <tr><th> Profile Photo </th><td> <img src={photo} height="120px" width="100%" /> </td></tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
    )
}

export default Myprofile;