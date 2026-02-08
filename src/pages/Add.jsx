import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

//to call backend api-used to add product
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Add = ({token}) => {
  //creating a state variables
  const[image1,setImage1] = useState(false);
  const[image2,setImage2] = useState(false);
  const[image3,setImage3] = useState(false);
  const[image4,setImage4] = useState(false);

  const[name,setName] = useState("");
  const[description,setDescription] = useState("");
  const[price,setPrice] = useState("");
  const[category,setCategory] = useState("Men");
  const[subCategory,setSubCategory] = useState("TopWear");
  const[bestseller,setBestseller] = useState(false);
  const[sizes,setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
     e.preventDefault();
     try {
      const formData = new FormData();
      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("category",category);
      formData.append("subCategory",subCategory);
      formData.append("bestseller",bestseller);
      formData.append("sizes",JSON.stringify(sizes));

      image1 && formData.append("image1",image1);
      image2 && formData.append("image2",image2);
      image3 && formData.append("image3",image3);
      image4 && formData.append("image4",image4);
      
      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers: {token: token,},});

      //console.log(response); //product is added from admin panel 
      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setPrice([]);
      } else {
        toast.error(response.data.message);
      }

     } catch (error) {
      console.log(error);
      toast.error(error.message);
     }
  }
  return (
    <form onSubmit={onSubmitHandler} className="add-body">
      <div className="add-content">
        <p>Upload Image</p>
        <div className="add-wrap">
          <label htmlFor="image1">
            <img src={!image1? assets.upload_area:URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img src={!image2? assets.upload_area:URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img src={!image3? assets.upload_area:URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img src={!image4? assets.upload_area:URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>
      <div className="form-group">
        <p>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className="form-input" type="text" placeholder="Enter Name" required />
      </div>

      <div className="form-group">
        <p>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className="form-textarea" placeholder="Enter Description" required />
      </div>

      <div className="form-group">
        <p>Product Category</p>
        <select onChange={(e)=> setCategory(e.target.value)}  className="form-select">
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div className="form-group">
        <p>Product SubCategory</p>
        <select onChange={(e)=> setSubCategory(e.target.value)} className="form-select">
          <option value="TopWear">TopWear</option>
          <option value="BottomWear">BottomWear</option>
          <option value="WinterWear">WinterWear</option>
        </select>
      </div>

      <div className="form-group">
        <p>Product Price</p>
        <input onChange={(e)=> setPrice(e.target.value)} value={price} className="form-input" type="number" placeholder="25" />
      </div>

      <div className="form-group">
        <p>Product Sizes</p>
        <div className="size-box">
          <span  className={sizes.includes("S") ? "active" : ""} onClick={()=>setSizes(prev=>prev.includes("S")?
                    prev.filter(item => item !== "S"):[...prev,"S"])}>S</span>
          <span  className={sizes.includes("M") ? "active" : ""} onClick={()=> setSizes(prev=>prev.includes("M")?
                    prev.filter(item => item !== "M"):[...prev,"M"])}>M</span>
          <span  className={sizes.includes("L") ? "active" : ""} onClick={() => setSizes(prev=>prev.includes("L")?
                    prev.filter(item => item !== "L" ):[...prev,"L"])}>L</span>
          <span  className={sizes.includes("XL") ? "active" : ""} onClick={() => setSizes(prev=>prev.includes("XL")?
                    prev.filter(item => item !== "XL" ):[...prev,"XL"])}>XL</span>
          <span  className={sizes.includes("XXL") ? "active" : ""} onClick={() => setSizes(prev=>prev.includes("XXL")?
                    prev.filter(item => item !== "XXL" ):[...prev,"XXL"])}>XXL</span>
        </div>
      </div>

      <div className="form-checkbox">
        <input type="checkbox" id="bestseller" onChange={()=>setBestseller(prev => !prev)} checked={bestseller} />
        <label htmlFor="bestseller">Add To BestSeller</label>
      </div>

      <button className="submit-btn" type="submit">ADD Product</button>

    </form>
  );
};

export default Add;
