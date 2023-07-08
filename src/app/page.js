"use client"
import React, { useState, useEffect } from 'react';
import Header from '/components/Header';


export default function Home() {

  const ProductName=('Mango');
  const Price=('100');
  const [ productForm,setProductForm]=useState({})

  const addProduct = async (e) => {
    // e.preventDefault();
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productForm)
      });

      if (response.ok) {
        // Product added successfully
        setAlert("Your Product has been added!")
        setProductForm({})
      } else {
        // Handle error case
        console.log('Error adding product');
      }
    } catch (error) {
      console.log('Error:', error);
    }

  }


 const handleChange=(e)=>{
  setProductForm({...productForm,[e.target.name]:e.target.value})

 }
  return (
    <>
  <div className='container mx-auto'>
    <Header />
            {/* Searching a product  */}
  <div className="container mx-auto">    
  <h1 className=" text-3xl font-bold mt-8 my-2">Search a Product</h1>

  <div className="flex items-center mb-4 my-2">
  <input
    type="text"
    // value={searchQuery}
    // onChange={(e) => setSearchQuery(e.target.value)}
    className="border border-gray-300 px-4 py-2 w-full mr-2"
        placeholder="Search..."
  />

  <select
    // value={selectedOption}
    // onChange={(e) => setSelectedOption(e.target.value)}
    className="border border-gray-300 px-4 py-2"
  >
    <option value="">All</option>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </select>

  <button
    // onClick={handleSearch}
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4"
  >
    Search
  </button>
  </div>
  </div>
      

      <div className="container mx-auto">
      <h1 className=" text-3xl font-bold mb-6">Add a Product</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="productName" className="block mb-2">Product Name</label>
            <input
              type="text"
              name="slug"
              id="productName"
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              onChange={handleChange}
              
              className="border border-gray-300 px-4 py-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 w-full"
            />
          </div>

          <button
            onClick={addProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 my-3"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>


{/* // Display Current Stock  */}

<div className="container mx-auto">
        {/* <h1 className="font-bold mb-6 my-10">Display Current Stock </h1> */}


        <h1 className=" text-3xl font-bold mb-6 my-5">Display Current Stock</h1>

        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">ID</th>
              <th className="py-2 px-4 bg-gray-200">Product Name</th>
              <th className="py-2 px-4 bg-gray-200">Price</th>
              <th className="py-2 px-4 bg-gray-200">Quantity</th>
            </tr>
          </thead>
          {/* <tbody>
            {stockList.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border">{product.id}</td>
                <td className="py-2 px-4 border">{product.name}</td>
                <td className="py-2 px-4 border">{product.price}</td>
                <td className="py-2 px-4 border">{product.quantity}</td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>



 
</>

  );
}


