import { useState , useEffect } from "react";
import Myprofile from "./profile";
import Mycategory from "./category";


const Mydashboard = () =>{
    let[categoryname , setcategoryname] = useState([]); 

    const getcategory = () =>{
        fetch("http://localhost:1234/category")
        .then(response => response.json())
        .then(cname =>{
            setcategoryname(cname);
        })
    }

    let[allproduct , setproduct] = useState([]); 

    const getproduct = () =>{
        fetch("http://localhost:1234/productapi")
        .then(response => response.json())
        .then(productarray =>{
            setproduct(productarray);
        })
    }

    let[allorder , setorder] = useState([]); 

    const getorder = () =>{
        fetch("http://localhost:1234/orderapi")
        .then(response => response.json())
        .then(orderarray =>{
            setorder(orderarray);
        })
    }

    useEffect(() =>{
        getcategory();
        getproduct();
        getorder();
    },[])



    return(
        <div className="container">
            <div className="row">
                <div className="col-xl-12 text-center mt-3">
                    <h1 className="text-primary"> My Dashboard </h1>
                </div>
            </div>

            <div className="row mt-5 ">
                <div className="col-xl-3 text-center">
                    <h3 className="text-dark"> {allproduct.length} - Product in Stock </h3>
                </div>
                <div className="col-xl-3 text-center">
                    <h3 className="text-dark"> {allorder.length} - Order Received </h3>
                </div>
                <div className="col-xl-3 text-center">
                    <h3 className="text-dark"> {categoryname.length} - Product Category </h3>
                </div>
            </div>
        </div>
    )
}

export default Mydashboard;