import React from "react";
import { assets } from "../assets/assets";

const Add = () => {
  return (
    <form className="add-body">
      <div className="add-content">
        <p>Upload Image</p>
        <div className="add-wrap">
          <label htmlFor="image1">
            <img src={assets.upload_area} alt="" />
            <input type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img src={assets.upload_area} alt="" />
            <input type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img src={assets.upload_area} alt="" />
            <input type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img src={assets.upload_area} alt="" />
            <input type="file" id="image4" hidden />
          </label>
        </div>
      </div>
      <div className="form-group">
        <p>Product Name</p>
        <input className="form-input" type="text" placeholder="Enter Name" required />
      </div>

      <div className="form-group">
        <p>Product Description</p>
        <textarea className="form-textarea" placeholder="Enter Description" required />
      </div>

      <div className="form-group">
        <p>Product Category</p>
        <select className="form-select">
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div className="form-group">
        <p>Product SubCategory</p>
        <select className="form-select">
          <option value="TopWear">TopWear</option>
          <option value="BottomWear">BottomWear</option>
          <option value="WinterWear">WinterWear</option>
        </select>
      </div>

      <div className="form-group">
        <p>Product Price</p>
        <input className="form-input" type="number" placeholder="25" />
      </div>

      <div className="form-group">
        <p>Product Sizes</p>
        <div className="size-box">
          <span>S</span>
          <span>M</span>
          <span>L</span>
          <span>XL</span>
          <span>XXL</span>
        </div>
      </div>

      <div className="form-checkbox">
        <input type="checkbox" id="bestseller" />
        <label htmlFor="bestseller">Add To BestSeller</label>
      </div>

      <button className="submit-btn" type="submit">ADD Product</button>

    </form>
  );
};

export default Add;
