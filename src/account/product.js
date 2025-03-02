import { useState , useEffect } from "react";
import ReactPaginate from "react-paginate";

const Products = () =>{

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

    const delproduct = (id) =>{
        let url = "http://localhost:1234/productapi/" + id ;
        let postdata = {method : "delete"}
        fetch(url , postdata)
        .then(response => response.json())
        .then(deleted =>{
            getproduct();
        })
    }

    let[keyword , setkeyword] = useState("");


    const PER_PAGE = 5; //displays 5 items/records per page
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    return(
        <div className="container mt-4">
            <div className="row">
                    <h3 className="text-center col-xl-3"> Product List </h3>
                    <div className="col-xl-3">
                        <select className="form-select col-xl-4" onChange={getproduct}>
                            <option> Price Low to High </option>
                            <option> Price High to Low </option>
                        </select>
                    </div>
                    <div className=" col-xl-4">
                        <input type="text" className="form-control" placeholder="Search" onChange={obj=>setkeyword(obj.target.value)} />
                    </div>            
                
            <div className="row">   
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th> Sl no.</th>
                        <th> Product ID </th>
                        <th> Product Name </th>
                        <th> Product Cost </th>
                        <th> Product Category </th>
                        <th> Product Details </th>
                        <th> Product Photo </th>
                        <th> Action </th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            allproduct.slice(offset, offset + PER_PAGE).map((prname , index) =>{
                                if(prname.pname.toLowerCase().match(keyword.toLowerCase()) ||
                                    prname.price.toString().match(keyword.toString()) ||
                                    prname.category.toLowerCase().match(keyword.toLowerCase())
                                )
                                return(
                                    <tr key={index}>
                                        <td> {index + 1}</td>
                                        <td> {prname.id}</td>
                                        <td> {prname.pname}</td>
                                        <td> {prname.price}</td>
                                        <td>{prname.category}</td>
                                        <td> {prname.details}</td>
                                        <td className="text-center"> <img src = {prname.photo} height="70px" width="70px" /> </td>                                     
                                        <td className="text-center"> <button className="btn btn-danger" onClick={obj=>delproduct(prname.id)}> Delete </button> </td>
                                   
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>      
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
                </div>
            </div>
        
    )
}

export default Products;