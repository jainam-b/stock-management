import { NextResponse } from "next/server";

const { MongoClient } = ("mongodb");
export async function GET(request) {
    return   NextResponse.json({"a":34})
}

// Replace the uri string with your connection string.
const uri = "mongodb+srv://jainam:a@cluster0.h5mn9fs.mongodb.net/";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);