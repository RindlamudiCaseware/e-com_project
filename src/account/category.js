import { useState , useEffect } from "react";
import { ToastContainer ,toast } from "react-toastify";


const Mycategory = () =>{
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

    let[newcat , setnewcat] = useState("");
    const save = () =>{
        let url = "http://localhost:1234/category";
        let mymethod = "post"

        if(catid != ""){
            url = "http://localhost:1234/category/" + catid;
            mymethod = "put";
            getcategory();
            toast("Category Edited Successfully...");
        }

        let getcat = {
            "catname" : newcat
        }

        let postdata = {
            headers : {"content-Type" : "application/json"},
            method : mymethod,
            body : JSON.stringify(getcat)
        }

        fetch(url,postdata)
        .then(response => response.json())
        .then(newcategory =>{
            getcategory();
            toast("Category Added Successfully...");
            setnewcat("")
        })
    }

    const delcategory = (id) =>{
        let url = "http://localhost:1234/category/" + id;
        let postdata = {method : "delete"}

        fetch(url , postdata)
        .then(response => response.json())
        .then(delcategory =>{
            getcategory();  
            toast("Category Deleted Successfully...");
        })
    }

    let[catid , setcatid] = useState("");
    const editcategory = (cname) =>{
        setcatid(cname.id)
        setnewcat(cname.catname);
    }

    return(
        <div className="container mt-5">
            <ToastContainer/>
            <div className="row">
                <div className="col-xl-4"></div>
                <div className="col-xl-4">
                    <h3 className="text-center mb-4"> Add New Category </h3>
                    <form onSubmit={save}>
                    <p> Enter Category Name </p>

                    <input type="text" className="form-control" onChange={obj=>setnewcat(obj.target.value)} value={newcat} />

                    <div className="text-center mt-3">
                        <button className="btn btn-success"> Save </button>
                    </div>

                    </form>
                    <div className="p-3bg-light mt-4">
                    <h4 className="text-center mt-5 mb-5"> Available Category : {categoryname.length} </h4>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr className="text-center">
                                    <th> ID </th>
                                    <th> Category Name </th>
                                    <th colSpan={2}> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                categoryname.map((cname , index) =>{
                                    return(
                                        <tr key={index}>
                                            <td> {index + 1} </td>
                                            <td> {cname.catname} </td>
                                            <td> <button className="btn btn-warning btn-sm" onClick={obj=>editcategory(cname)}> <i className="fa fa-edit"></i> </button> </td>
                                            <td> <button className="btn btn-danger btn-sm" onClick={obj=>delcategory(cname.id)}> <i className="fa fa-trash"></i> </button> </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-xl-4"></div>
            </div>
        </div>
    )
}

export default Mycategory;