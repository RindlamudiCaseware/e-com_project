import { useState , useEffect } from "react";
import ReactPaginate from "react-paginate";
import Products from "./account/product";
import { toast ,ToastContainer} from "react-toastify";

const Myhome = () =>{

    let[allproduct , setproduct] = useState([]); 

    let[order , setorder] = useState("asc")

    const getproduct = () =>{
        fetch("http://localhost:1234/productapi")
        .then(response => response.json())
        .then(pr =>{
            if(order == "asc"){
                pr.sort((a,b)=>{return a.price - b.price })
                setproduct(pr);
                setorder("desc");
            }else{
                pr.sort((a,b)=>{return b.price - a.price })
                setproduct(pr);
                setorder("asc");
            }
            
        })
    }

    useEffect(() =>{
        getproduct();
    },[])


    const addtocart = (prname) =>{

        prname["qty"] = 1; //to add new property in existing object
        
        let url = "http://localhost:1234/cartapi";

        let postdata = {
            headers : {"contant-type" : "application/json"},
            method : "post",
            body : JSON.stringify(prname)
        }

        fetch(url , postdata)
        .then(response => response.json())
        .then(info =>{
            toast(info.pname + "  Added in your cart...")
        })


        // fetch("http://localhost:1234/cartapi/" + prname.id)
        // .then(response => response.json())
        // .then(pro =>{
            
        //     if(pro.id){
        //         alert(prname.pname + " Already in your cart...");
        //     }else{
        //         prname["qty"] = 1; //to add new property in existing object
        
        //         let url = "http://localhost:1234/cartapi";

        //         let postdata = {
        //             headers : {"contant-type" : "application/json"},
        //             method : "post",
        //             body : JSON.stringify(prname)
        //         }

        //         fetch(url , postdata)
        //         .then(response => response.json())
        //         .then(info =>{
        //             alert(info.pname + "  Added in your cart...")
        //         })
        //     }
        // })

        
    }


    // const delproduct = (id) =>{
    //     let url = "http://localhost:1234/productapi/" + id ;
    //     let postdata = {method : "delete"}
    //     fetch(url , postdata)
    //     .then(response => response.json())
    //     .then(deleted =>{
    //         getproduct();
    //     })
    // }

    let[keyword , setkeyword] = useState("");


    const PER_PAGE = 4; //displays 5 items/records per page
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    

    return(
        <div className="container mt-4 home-screen">
            <ToastContainer/>
            <div className="row mb-5">
                <div className="col-xl-3 col-sm-4 col-md-4">
                    <select className="form-select" onChange={getproduct}>
                        <option> Price Low to High </option>
                        <option> Price High to Low </option>
                    </select>
                </div>
                <div className="col-xl-5 col-sm-4 col-sm-4"></div>
                <div className="col-xl-4 col-sm-4 col-sm-4">
                <div className="position-relative">
                    <input
                        type="text"
                        className="form-control search-bar ps-4 pe-5" // Added padding for icon space
                        placeholder="Search"
                        onChange={(obj) => setkeyword(obj.target.value)}
                    />
                    <i
                        className="fas fa-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                    ></i>
                    </div>
                </div>
            
                    
                               
            </div>     
                
                    <div className="row">
                        {
                            allproduct.slice(offset, offset + PER_PAGE).map((prname , index) =>{
                                if(prname.pname.toLowerCase().match(keyword.toLowerCase()) ||
                                    prname.price.toString().match(keyword.toString()) ||
                                    prname.category.toLowerCase().match(keyword.toLowerCase())
                                )
                                return(
                                    <div key={index} className=" product col-xl-3 col-md-6 mb-4">
                                        <div> 
                                            <h3 className=" mt-3 text-center product-head"> <b>{prname.pname}</b></h3>                                           
                                            <div className="text-center"> <img src = {prname.photo} height="160px" width="160px" /> </div>
                                            <p className="mt-2"> <b> Rs. {prname.price}/- </b></p>
                                            <p> {prname.category}</p>
                                            <p> {prname.details}</p>
                                            <p className="text-center"> <button className="btn btn-danger" onClick={obj=>addtocart(prname)} ><i className="fa fa-shopping-cart"></i> Add to Cart </button> </p>                                   
                                        </div>                                   
                                    </div>
                                )
                            })
                        }
                    </div>
                
                <div className="mt-4 text-center">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination  justify-content-center"}
                        pageClassName={"page-item "}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active primary"}
                    />
                </div>
            </div>
                
          
        
    )
}

export default Myhome;