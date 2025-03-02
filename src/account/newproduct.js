import { useState , useEffect } from "react";
import swal from "sweetalert";

const Newproduct = () =>{

    let[categoryname , setcategoryname] = useState([]); 

    const getcategory = () =>{
        fetch("http://localhost:1234/category")
        .then(response => response.json())
        .then(cname =>{
            setcategoryname(cname);
        })
    }


    useEffect(() =>{
        getcategory();
    },[])

    let[pinfo, setinfo] = useState({});
    const pickvalue = (obj) =>{
        pinfo[obj.target.name] = obj.target.value;
        setinfo(pinfo);
    }

    const save = (frmobj) =>{
        frmobj.preventDefault();

        let formstatus = true;

        if( !pinfo.pname || pinfo.pname =="" ){
            formstatus = false;
        }

        if( !pinfo.price || pinfo.price =="" ){
            formstatus = false;
        }

        if( !pinfo.photo || pinfo.photo =="" ){
            formstatus = false;
        }

        if( !pinfo.category || pinfo.category =="" ){
            formstatus = false;
        }

        if( !pinfo.details || pinfo.details =="" ){
            formstatus = false;
        }

        if(formstatus === false){
            swal("Invalid Input" , "Please Enter Product Details" , "error")
        }else{
            let url = "http://localhost:1234/productapi";

            let postdata = {
                headers : {"content-Type" : "application/json"},
                method : "post",
                body : JSON.stringify(pinfo)
            }

            fetch(url , postdata)
            .then(response => response.json())
            .then(info =>{
                swal("Product Added " , "New Product Saved Successfully" , "success");
                frmobj.target.reset();
            })
        }

        
    }

    return(
        <section className="container mt-4">
           
                <form className="row" onSubmit={save} >
                    <div className="col-xl-12 mb-4">
                        <h1 className="text-center"> Enter Product Details  </h1>
                        <p className="text-danger"><i>*All fields are mandatory</i> </p>
                    </div>
                    <div className="col-xl-4 mb-3">
                        <p> Product Name </p>
                        <input type="text" className="form-control" name="pname" onChange={pickvalue} />
                    </div>
                    <div className="col-xl-4 mb-3">
                        <p> Product Price </p>
                        <input type="text" className="form-control"  name="price" onChange={pickvalue} />
                    </div>
                    <div className="col-xl-4 mb-3">
                        <p> Product Photo URL </p>
                        <input type="text" className="form-control"  name="photo" onChange={pickvalue} />
                    </div>
                    <div className="col-xl-3 mb-3">
                        <p> Product Category </p>
                        <select className="form-select"  name="category" onChange={pickvalue} >
                            <option> Choose </option>
                            {
                                categoryname.map((cat , index) =>{
                                    return(
                                        <option key={index}> {cat.catname} </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="col-xl-6 mb-3">
                        <p> Product Details </p>
                        <textarea className="form-control"  name="details" onChange={pickvalue} ></textarea>
                    </div>
                    <div className="col-xl-3 mb-3 pt-5">
                        <button className="btn btn-primary me-2" type="submit" > Save </button>
                        <button className="btn btn-warning" type="reset"> Reset </button>
                    </div>
                </form>
            
        </section>
    )
}

export default Newproduct;