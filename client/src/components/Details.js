import React, { useEffect, useState } from 'react';
import { useParams,useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

  const Details = () => {
    
    const [getuserdata,setUserdata] = useState([]);
    console.log(getuserdata);
    
  const { id } = useParams();
  console.log(id);

const histry = useHistory();

  const getdata = async()=>{
  
  const res = await fetch(`/getuser/${id}`,{
  method: "GET",
  headers:{
  "content-type": "application/json"
  }
  });
  
  const data = await res.json();
  console.log(data);
  
  if (res.status === 422 || !data){
  console.log("error")
  }
  else{
  setUserdata(data);
  console.log("get data");
  }}
  
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
      histry.push("/")
    }
}



  return (
    <div className="container mt-3">
       <div className="add_btn">
           <NavLink to ={`/edit/${getuserdata._id}`}><button className='btn btn-primary mx-2'><i class="fa-solid fa-pen"></i></button> </NavLink> 
            <button className='btn btn-danger' onClick={()=> deleteuser(getuserdata._id)}><i class="fa-solid fa-trash"></i></button>
            </div>
      <div className="row">
        <div className="left_view col-lg-6 col-md-6 col-12">
          <img src="/profile.png" style={{ width: 50 }} alt="profile" />
          <h3 className="mt-3">Name: <span>{getuserdata.name} </span></h3>
          <h3 className="mt-3">Age: <span>{getuserdata.age}</span></h3>
          <p className="mt-3"><img src='/mail.png' style={{ width:25}} alt=""/> Email: <span>{getuserdata.email}</span></p>
          <p className="mt-3"> <img src='/work.png' style={{ width:25}} alt=""/> Occupation: <span>{getuserdata.work}</span></p>
        </div>

        <div className="right_view col-lg-6 col-md-6 col-12">
            
          <p className="mt-5"><img src='/mobile.png' style={{ width:30}} alt=""/>Mobile: <span>+91 {getuserdata.mobile}</span></p>

          <p className="mt-3"><img src='/location.png' style={{ width:30}} alt=""/>Location: <span>{getuserdata.add}</span></p>

          <p className="mt-3"><img src='/notes.png' style={{ width:30}} alt=""/> Description: <span>{getuserdata.desc}</span></p>
        </div>
      </div>
      

    </div>
  );
  };

export default Details;
