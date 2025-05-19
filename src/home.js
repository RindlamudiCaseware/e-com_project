import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Myhome = () => {
    const [allproduct, setproduct] = useState([]);
    const [order, setorder] = useState("asc");
    const [keyword, setkeyword] = useState("");
    const PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(0);

    const getproduct = () => {
        fetch("http://localhost:1234/productapi")
            .then(response => response.json())
            .then(pr => {
                const sortedProducts = [...pr];
                if (order === "asc") {
                    sortedProducts.sort((a, b) => a.price - b.price);
                } else {
                    sortedProducts.sort((a, b) => b.price - a.price);
                }
                setproduct(sortedProducts);
            })
            .catch(error => console.error("Error fetching products:", error));
    };

    useEffect(() => {
        getproduct();
    }, [order]);

    const addtocart = (prname) => {
        const url = "http://localhost:1234/cartapi";

        fetch(url)
            .then(response => response.json())
            .then(cartItems => {
                const existingProduct = cartItems.find(item => item.id === prname.id);

                if (existingProduct) {
                    toast.warning(`${prname.pname} is already in your cart.`);
                } else {
                    const newProduct = { ...prname, qty: 1 };

                    const postdata = {
                        headers: { "Content-Type": "application/json" },
                        method: "POST",
                        body: JSON.stringify(newProduct),
                    };

                    fetch(url, postdata)
                        .then(response => response.json())
                        .then(info => {
                            toast.success(`${info.pname} added to your cart.`);
                        })
                        .catch(error => console.error("Error adding to cart:", error));
                }
            })
            .catch(error => console.error("Error fetching cart:", error));
    };

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    return (
        <div className="container mt-4 home-screen">
            <ToastContainer />
            <div className="row mb-5">
                <div className="col-xl-3 col-sm-4 col-md-4">
                    <select
                        className="form-select"
                        value={order}
                        onChange={(e) => setorder(e.target.value)}
                    >
                        <option value="asc"> Price Low to High </option>
                        <option value="desc"> Price High to Low </option>
                    </select>
                </div>
                <div className="col-xl-5 col-sm-4 col-sm-4"></div>
                <div className="col-xl-4 col-sm-4 col-sm-4">
                    <div className="position-relative">
                        <input
                            type="text"
                            className="form-control search-bar ps-4 pe-5"
                            placeholder="Search"
                            onChange={(obj) => setkeyword(obj.target.value)}
                        />
                        <i className="fas fa-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                    </div>
                </div>
            </div>

            <div className="row">
                {allproduct.slice(offset, offset + PER_PAGE).map((prname, index) => {
                    if (
                        prname.pname.toLowerCase().includes(keyword.toLowerCase()) ||
                        prname.price.toString().includes(keyword) ||
                        prname.category.toLowerCase().includes(keyword.toLowerCase())
                    ) {
                        return (
                            <div key={index} className="product col-xl-3 col-md-6 mb-4">
                                <div>
                                    <h3 className="mt-3 text-center product-head">
                                        <b>{prname.pname}</b>
                                    </h3>
                                    <div className="text-center">
                                        <img
                                            src={prname.photo}
                                            alt={prname.pname}
                                            height="160px"
                                            width="160px"
                                        />
                                    </div>
                                    <p className="mt-2"><b>Rs. {prname.price}/-</b></p>
                                    <p>{prname.category}</p>
                                    <p>{prname.details}</p>
                                    <p className="text-center">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => addtocart(prname)}
                                        >
                                            <i className="fa fa-shopping-cart"></i> Add to Cart
                                        </button>
                                    </p>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
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
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
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
    );
};

export default Myhome;
