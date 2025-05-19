import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mycart = () => {
    const [cart, setcart] = useState([]);
    const [userinfo, setinfo] = useState({});

    const getitemtocart = () => {
        let url = "http://localhost:1234/cartapi";
        fetch(url)
            .then(response => response.json())
            .then(cartitem => {
                setcart(cartitem);
            })
            .catch(error => console.error("Error fetching cart items:", error));
    };

    useEffect(() => {
        getitemtocart();
    }, []);

    const delproduct = (id) => {
        let url = `http://localhost:1234/cartapi/${id}`;
        let postdata = { method: "DELETE" };

        fetch(url, postdata)
            .then(response => response.json())
            .then(() => {
                getitemtocart();
            })
            .catch(error => console.error("Error deleting product:", error));
    };

    const changeqty = (product, action) => {
        let updatedQty = action === "A" ? product.qty + 1 : product.qty - 1;

        if (updatedQty === 0) {
            delproduct(product.id);
        } else {
            let url = `http://localhost:1234/cartapi/${product.id}`;
            let postdata = {
                headers: { "Content-Type": "application/json" },
                method: "PUT",
                body: JSON.stringify({ ...product, qty: updatedQty }),
            };

            fetch(url, postdata)
                .then(response => response.json())
                .then(() => {
                    getitemtocart();
                })
                .catch(error => console.error("Error updating quantity:", error));
        }
    };

    const pickvalue = (obj) => {
        setinfo({ ...userinfo, [obj.target.name]: obj.target.value });
    };

    const placeorder = (frmobj) => {
        frmobj.preventDefault();

        if (cart.length === 0) {
            toast.warn("Your cart is empty! Add items before placing an order.");
            return;
        }

        let orderDetails = { ...userinfo, itemlist: cart };

        let url = "http://localhost:1234/orderapi";
        let postdata = {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(orderDetails),
        };

        fetch(url, postdata)
            .then(response => response.json())
            .then(() => {
                frmobj.target.reset();
                setinfo({});
                toast.success("We have received your order!");

                // Clear the cart after placing the order
                clearCart();
            })
            .catch(error => console.error("Error placing order:", error));
    };

    const clearCart = () => {
        cart.forEach(item => {
            delproduct(item.id);
        });
    };

    return (
        <div className="container">
            <ToastContainer />
            <div className="row">
                <div className="col-xl-3">
                    <h3 className="mb-4 mt-4">Customer Details</h3>
                    <form onSubmit={placeorder}>
                        <div className="mb-3">
                            <label>Customer Name</label>
                            <input type="text" className="form-control" onChange={pickvalue} name="fullname" required />
                        </div>

                        <div className="mb-3">
                            <label>Mobile No.</label>
                            <input type="number" className="form-control" onChange={pickvalue} name="mobile" required />
                        </div>

                        <div className="mb-3">
                            <label>E-mail</label>
                            <input type="email" className="form-control" onChange={pickvalue} name="email" required />
                        </div>

                        <div className="mb-3">
                            <label>Delivery Address</label>
                            <textarea className="form-control" onChange={pickvalue} name="address" required></textarea>
                        </div>

                        <div className="text-center">
                            <button className="btn btn-danger">Place Order</button>
                        </div>
                    </form>
                </div>
                <div className="col-xl-9">
                    <h3 className="text-center mb-4 mt-4">{cart.length} Item(s) in your Cart</h3>
                    <table className="table table-bordered mt-4">
                        <thead>
                            <tr className="text-center">
                                <th>Product Name</th>
                                <th>Photo</th>
                                <th>Cost</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product, index) => (
                                <tr key={index}>
                                    <td className="text-center">{product.pname}</td>
                                    <td className="text-center">
                                        <img src={product.photo} alt={product.pname} height="100px" width="100px" />
                                    </td>
                                    <td className="text-center">Rs. {product.price}</td>
                                    <td className="text-center">
                                        <button className="btn btn-info btn-sm me-1" onClick={() => changeqty(product, "B")}> - </button>
                                        {product.qty}
                                        <button className="btn btn-warning btn-sm ms-1" onClick={() => changeqty(product, "A")}> + </button>
                                    </td>
                                    <td className="text-center">Rs. {product.price * product.qty}</td>
                                    <td className="text-center">
                                        <button className="btn btn-danger btn-sm" onClick={() => delproduct(product.id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {cart.length > 0 && (
                        <div className="text-center mt-3">
                            <button className="btn btn-secondary" onClick={clearCart}>Clear Cart</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Mycart;
