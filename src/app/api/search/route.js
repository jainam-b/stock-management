import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
const query = request.nextUrl.searchParams.get("query")
console.log(query)
// Replace the uri string with your connection string.
const uri = "mongodb+srv://jainam:a@cluster0.h5mn9fs.mongodb.net/";
const client = new MongoClient(uri); 
try {
  const database = client.db('stock');
  const inventory = database.collection('inventory'); 
  
  const products = await inventory.aggregate([
    {
      $match: {
        $or: [
          { slug: { $regex: query , $options: "i" } },
        ]
      }
    }
  ]).toArray()
  return NextResponse.json({ success: true, products}) 
} finally {
  // Ensures that the client will close when you finish/error
  await client.close();
} 

}


