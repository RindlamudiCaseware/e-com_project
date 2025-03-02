import { useState , useEffect, act } from "react";
import { ToastContainer , toast } from "react-toastify";


const Mycart = () =>{

    let[cart, setcart] = useState([]);

    const getitemtocart = () =>{
        let url = "http://localhost:1234/cartapi";
        fetch(url)
        .then(response => response.json())
        .then(cartitem =>{
            setcart(cartitem);
        })
    }

    useEffect(() =>{
        getitemtocart();
    },[])

    const delproduct = (id) =>{
        let url = "http://localhost:1234/cartapi/" + id;
        let postdata = {method : "delete"}
        fetch(url , postdata)
        .then(response => response.json())
        .then(cartitem =>{
           getitemtocart();
        })
        
    }


    const changeqty = (product , action) =>{    

        if(action === "A"){
            product["qty"] = product.qty + 1;
        }else{
            product["qty"] = product.qty - 1;
        }
        
        if(product.qty == 0){
            delproduct(product.id);
        }else{
            let url = "http://localhost:1234/cartapi/" + product.id;
            let postdata = {
                headers : {"content-type" : "application/json"},
                method : "put",
                body : JSON.stringify(product)
            }

            fetch(url , postdata)
            .then(response => response.json())
            .then(info =>{
                getitemtocart();
            })
            }
    }

    let[userinfo , setinfo] = useState({});

    const pickvalue = (obj) =>{
        userinfo[obj.target.name] = obj.target.value;
        setinfo(userinfo);
    }


    const placeorder = (frmobj) =>{
        frmobj.preventDefault(); // it will prevent the page reload

        userinfo["itemlist"] = cart;

        

        let url = "http://localhost:1234/orderapi";
        let postdata = {
            headers : {"content-type" : "application/json"},
            method : "post",
            body : JSON.stringify(userinfo)
        }

        fetch(url , postdata)
        .then(response =>response.json())
        .then(info =>{
            frmobj.target.reset();
            setinfo();
            toast("We have received your Order...");
        })

    }

    return(
        <div className="container">
            <ToastContainer/>
            <div className="row">
                <div className="col-xl-3">
                    <h3 className="mb-4 mt-4"> Customer Details </h3>

                    <form onSubmit={placeorder}>
                        <div className="mb-3 ">
                            <label> Customer Name </label>
                            <input type="text" className="form-control" onChange={pickvalue} name="fullname" />
                        </div>

                        <div className="mb-3 ">
                            <label> Mobile no. </label>
                            <input type="number" className="form-control" onChange={pickvalue} name="mobile" />
                        </div>

                        <div className="mb-3 ">
                            <label>E-mail </label>
                            <input type="email" className="form-control" onChange={pickvalue} name="email" />
                        </div>

                        <div className="mb-3 ">
                            <label> Delivety Address </label>
                            <textarea className="form-control" onChange={pickvalue} name="address" ></textarea>
                        </div>

                        <div className="text-center">
                            <button className="btn btn-danger"> Place Order </button>
                        </div>
                    </form>

                </div>
                <div className="col-xl-9">
                <h3 className="text-center mb-4 mt-4"> {cart.length} : Item in your Cart </h3>
                    <table className="table table-bordered mt-4"> 
                        <thead>
                            <tr className="text-center">
                                <th> Product Name </th>
                                <th> Photo </th>
                                <th> Cost </th>
                                <th> Quantity </th>
                                <th> Total </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((product , index) =>{
                                    return(
                                        <tr key={index}>
                                            <td className="text-center"> {product.pname} </td>
                                            <td className="text-center"> <img src = {product.photo} height="100px" width="100px" /> </td>
                                            <td className="text-center"> {product.price} </td>
                                            <td className="text-center"> 
                                                <button className="btn btn-info btn-sm me-1" onClick={obj=>changeqty(product , "B")}> - </button>
                                                 {product.qty} 
                                                <button className="btn btn-warning btn-sm ms-1"  onClick={obj=>changeqty(product , "A")}> + </button> 
                                            </td>
                                            <td className="text-center"> {product.price * product.qty}  </td>
                                            <td className="text-center"> <button className="btn btn-danger btn-sm" onClick={obj=>delproduct(product.id)} > 
                                                <i className="fa fa-trash"></i> </button> 
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Mycart;