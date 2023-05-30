import React, { useContext, useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { adddata } from "./context/ContextProvider";
import { updatedata } from './context/ContextProvider';
import { deldata } from "./context/ContextProvider";


const Home = () => {

    const [getuserdata,setUserdata] = useState([]);
    console.log(getuserdata);

    const {udata, setUdata} = useContext(adddata);
    const {updata, setUPdata} = useContext(updatedata);
    const {dltdata, setDLTdata}= useContext(deldata);

    const getdata = async(e)=>{
  
        const res = await fetch("/getdata",{
          method: "GET",
          headers:{
            "content-type": "application/json"
          }
        });
  
        const data = await res.json();
        console.log(data);
  
        if (res.status === 422 || !data){
          console.log("error")
        }else{
         setUserdata(data);
          console.log("get data");
        }
      }
      useEffect(()=>{
        getdata();
      },[])

      const deleteuser = async (id)=>{
          const res2 = await fetch(`/deleteuser/${id}`,{
            method: "DELETE",
            headers:{
              "content-type": "application/json"
            }
          });
          const deletedata = await res2.json();
          console.log(deletedata);

          if(res2.status===422 || !deletedata){
            console.log("Error");
          }else{
            console.log("User deleted successfully");
            setDLTdata(deletedata);
            getdata();
          }
      }

      return (
        <>
        {
        udata ?
        <>
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{udata.name}</strong>  Added Successfully
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        </> : ""
        }
        {
        updata ?
        <>
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{updata.name}</strong>  Updated Successfully
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        </> : ""
        }
        {
        dltdata ?
        <>
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>{dltdata.name}</strong> User Deleted Successfully
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        </> : ""
        }

<div className='mt-5'>
    <div className='container'>
        <div className="add_btn mt-2 mb-2">
            <NavLink to="/register" className="btn btn-primary">Add Data</NavLink>
        </div>

        <table className="table">
            <thead>
                <tr className="table-dark">
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Job</th>
                    <th scope="col">Number</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {
                    getuserdata.map((element,id)=>{
                        return(
                            <>
                            <tr>
                    <th scope="row">{id + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.work}</td>
                    <td>{element.mobile}</td>
                    <td className='d-flex justify-content-between'>
                    <NavLink to={`view/${element._id}`}> <button className='btn btn-success'><i className="fa-solid fa-eye"></i></button></NavLink>
                    <NavLink to = {`edit/${element._id}`}><button className='btn btn-primary'><i className="fa-solid fa-pen"></i></button></NavLink> 
                        <button className='btn btn-danger' onClick={()=> deleteuser(element._id)}><i className="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
                            </>
                        )
                    })
                }
            </tbody>
        </table>

    </div>
</div>
</>
)
}

export default Home


