"use client";
import React, { useState, useEffect } from "react";
import Header from "/components/Header";

export default function Home() {
  const [productForm, setProductForm] = useState({
    productName: "",
    quantity: "",
    price: "",
  });

  const [alert, setAlert] = useState("");
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState([
    // {
    //   "_id": "64aa378851b721f453bc2b36",
    //   "slug": "tshirt",
    //   "quantity": "1",
    //   "price": "1"
    //   },
    //   {
    //     "_id": "64aa378851b721f453bc2b36",
    //     "slug": "jeans",
    //     "quantity": "1",
    //     "price": "1"
    //     }

  ])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/product");
      let rjson = await response.json();
      setProducts(rjson.products);
    };
    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        // Product added successfully
        console.log("jainam");
        setAlert("Your Product has been added!");
        setProductForm();
      } else {
        // Handle error case
        console.error("Error adding product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }

    // Fetch all the products again to sync back
    const response = await fetch("/api/product");
    let rjson = await response.json();
    setProducts(rjson.products);
    e.preventDefault();
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const onDropdownEdit = async (e) => {
    setQuery(e.target.value);

    if (!loading) {
      setLoading(true);
      setDropdown([]);
      const response = await fetch("/api/search?query="+query);
      let rjson = await response.json();
      setDropdown(rjson.products);
      setLoading(false);
    }
  };

  return (
    <>
       <div className="container mx-2 my-4">
        <Header />
       
        <div className="container mx-auto my-2">
          <div className="text-green-800 text-center">{alert}</div>
          <h1 className="text-3xl font-semibold mb-6">Search a Product</h1>
          <div className="flex mb-2">
            <input
              onChange={onDropdownEdit}
              onBlur={()=>{setDropdown([])}}
              type="text"
              placeholder="Enter a product name"
              className="flex-1 border border-gray-300 px-4 py-2 rounded-l-md"
            />
            <select className="border border-gray-300 px-4 py-2 rounded-r-md">
              <option value="">All</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <div className="container">
          {loading && (
            <div className="flex justify-center items-center ">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="64px"
                height="64px"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="gray"
                  stroke-width="4"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="lightgray"
                  stroke-width="4"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    attributeType="XML"
                    from="1, 200"
                    to="89, 200"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-dashoffset"
                    attributeType="XML"
                    from="0"
                    to="-124"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 12 12"
                    to="360 12 12"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
          )}
          
          <div className="dropcontainer absolute w-[90vw]  border-1 bg-purple-100 rounded-md ">

          {dropdown.map((item) => {
            return (
              <div
              className="container flex justify-between p-2 my-1 "
              key={item.slug}
              >
                <span className="slug">{item.slug}</span>
                <span className="slug">{item.price}</span>
                <span className="slug">{item.quantity}</span>
              </div>
            );
          })}
        </div>
        </div>

        {/* Adding a product  */}
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Add a Product</h1>

          <form>
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-2">
                Product Slug
              </label>
              <input
                value={productForm?.slug || ""}
                name="slug"
                onChange={handleChange}
                type="text"
                id="productName"
                className="w-full border border-gray-300 px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block mb-2">
                Quantity
              </label>
              <input
                value={productForm?.quantity || ""}
                name="quantity"
                onChange={handleChange}
                type="number"
                id="quantity"
                className="w-full border border-gray-300 px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block mb-2">
                Price
              </label>
              <input
                value={productForm?.price || ""}
                name="price"
                onChange={handleChange}
                type="number"
                id="price"
                className="w-full border border-gray-300 px-4 py-2"
              />
            </div>

            <button
              onClick={addProduct}
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>

      {/* // Display Current Stock  */}

      <div className="container mx-auto my-5">
        {/* <h1 className="font-bold mb-6 my-10">Display Current Stock </h1> */}

        <h1 className=" text-3xl font-bold mb-6 my-5">Display Current Stock</h1>

        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Product Name</th>
              <th className="py-2 px-4 bg-gray-200">Price</th>
              <th className="py-2 px-4 bg-gray-200">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.slug}>
                  <td className="border px-4 py-2">{product.slug}</td>
                  <td className="border px-4 py-2">{product.quantity}</td>
                  <td className="border px-4 py-2">₹{product.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
    </>
  );
}
