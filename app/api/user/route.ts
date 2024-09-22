import { dbConnect } from '@/app/lib/db';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req:NextApiRequest) {
  const user = await req.body.json();
  const con = await dbConnect();
  const db = con.connection.db!;
  const collection = db.collection('quiz'); 


  user.timestamp= new Date();
  
  try {
    const result = await collection.insertOne(user);

    return new NextResponse(JSON.stringify({ message: 'User stored successfully', result }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Error storing answers', error }), { status: 500 });
  }
}
