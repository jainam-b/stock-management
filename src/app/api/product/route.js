// import { NextResponse } from "next/server";

// // const { MongoClient } = "mongodb";
// var MongoClient = require('mongodb').MongoClient;
// export async function GET(request) {

//     // Replace the uri string with your connection string.
//     const uri = "mongodb+srv://jainam:a@cluster0.h5mn9fs.mongodb.net/";
//     const client = new MongoClient(uri);
//     try {
//       const database = client.db('stock');
//       const inventory = database.collection('inventory');
//       const query = {};
//       const products= await inventory.find(query).toArray();
//       return NextResponse.json({ ok:true, products })
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
  
//   }


// // export async function POST(request) { 
// //     // Replace the uri string with your connection string.
// //     let body = await request.json()
// //     console.log(body)
// //     const uri = "mongodb+srv://jainam:a@cluster0.h5mn9fs.mongodb.net/";
// //     const client = new MongoClient(uri); 
// //       try {
// //         const database = client.db('stock');
// //         const inventory = database.collection('inventory');  
// //         const product = await inventory.insertOne(body)
// //         return NextResponse.json({ ok: true , product})
// //       } finally {
// //         // Ensures that the client will close when you finish/error
// //         await client.close();
// //       }  
// //     }

// export async function POST(request) {
//   const uri = "mongodb+srv://jainam:a@cluster0.h5mn9fs.mongodb.net/";
  
//   try {
//     const client = new MongoClient(uri);
//     await client.connect();
    
//     const database = client.db('stock');
//     const inventory = database.collection('inventory');
//     const body = await request.json();
    
//     const product = await inventory.insertOne(body);
    
//     return NextResponse.json({ ok: true, product });
//   } catch (error) {
//     console.error("Error adding product:", error);
//     return NextResponse.json({ ok: false, error: "Failed to add product" });
//   } finally {
//     if (client) {
//       await client.close();
//     }
//   }
// }


import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {

// Replace the uri string with your connection string.
const uri = "mongodb+srv://jainam:a@cluster0.h5mn9fs.mongodb.net/";
const client = new MongoClient(uri); 
  try {
    const database = client.db('stock');
    const inventory = database.collection('inventory'); 
    const query = {  };
    const products = await inventory.find(query).toArray(); 
    return NextResponse.json({ success: true, products})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  } 

}

export async function POST(request) { 
    // Replace the uri string with your connection string.
    let body = await request.json()
    console.log(body)
    const uri = "mongodb+srv://jainam:a@cluster0.h5mn9fs.mongodb.net/";
    const client = new MongoClient(uri); 
      try {
        const database = client.db('stock');
        const inventory = database.collection('inventory');  
        const product = await inventory.insertOne(body)
        return NextResponse.json({ product, ok: true})
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }  
    }
