import { useState , useEffect } from "react";
import ReactPaginate from "react-paginate";

const Myorder = () =>{
    
    let[allorder , setorders] = useState([]);

    const getorder = () =>{
        let url = "http://localhost:1234/orderapi";
        fetch(url)
        .then(response => response.json())
        .then(orderarray =>{
            setorders(orderarray.reverse());
        })
    }
    
    useEffect(() =>{
        getorder();
    },[])

    const PER_PAGE = 1; //displays 5 items/records per page
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allorder.length / PER_PAGE);



    return(
        <div className="container mt-5"> 
            <div className="row"> 
                <div className="col-xl-4">
                    <div className="mt-2 text-center">
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
                <div className="col-xl-4"> 
                    <h3 className="text-center mb-4"> Recent Order : {allorder.length} </h3>
                </div>
                <div className="col-xl-4">
                </div> 
            </div> 
            {
                allorder.slice(offset, offset + PER_PAGE).map((order , index) =>{
                    return(
                        <div className="row mb-4 shadow-lg rounded p-4" key={index}>
                            <div className="col-xl-3">
                                <h5 className="text-primary"> Order by : {order.fullname} </h5>
                                <p> {order.mobile} </p>
                                <p> {order.email} </p>
                                <p className="text-danger"> Delivery Address : {order.address} </p>
                            </div>
                            <div className="col-xl-9">
                                <h4 className="text-info"> Order ID : {order.id} </h4>
                            <table className="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th> Product Name </th>
                                    <th> Price </th>
                                    <th> Iamge </th>
                                    <th> Category </th>
                                    <th> Quantity </th>
                                    <th> Total Price </th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        order.itemlist.map((product , index) =>{
                                            
                                            return(
                                                <tr key={index}>
                                                    <td> {product.pname}</td>
                                                    <td> {product.price}</td>
                                                    <td> <img src = {product.photo} height="70px" width="70px" /> </td>                                         
                                                    <td> {product.category}</td>
                                                    <td>{product.qty}</td>
                                                    <td> {product.price * product.qty}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            
                            </div>
                            
                        </div>
                        
                    )
                })
            }
        </div>
    )
}

export default Myorder;