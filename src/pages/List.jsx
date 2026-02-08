import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

//to call backend api
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const currency = '₹';
const List = ({token}) => {
const[list,setList] = useState([]);

const fetchList =async()=> {
      try {
        const response = await axios.get(backendUrl+"/api/product/list");
        //console.log(response);
        setList(response.data.products);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
}

useEffect(()=> {
    fetchList()
},[])

const removeProduct =async (id) => {
  try {
    const response = await axios.post(backendUrl+"/api/product/remove",{id},{headers:{token}});
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchList();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}

  return (
    <>
      <div className="list-page">
        <p className="list-title">All Products List</p>
        {/*----------List Table Title----------*/}
        <div className="list-table-title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
         {/*----------Product List----------*/} 
         <div className="list-table-body">
          {
            list.map((item,index)=> (
               <div className="list-table-row" key={index}>
                <img className="list-image" src={item.image[0]} alt="" />
                <p className="list-name">{item.name}</p>
                <p className="list-category">{item.category}</p>
                <p className="list-price">{currency}{item.price}</p>
                <p onClick={()=>removeProduct(item._id)} className="list-action">X</p>
               </div>
            ))
          }
         </div>
      </div>
    </>
  )
}

export default List;
