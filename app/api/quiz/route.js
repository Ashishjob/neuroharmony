import { dbConnect } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { userId, answers } = await req.json();
  const con = await dbConnect();
  const db = con.connection.db;
  const collection = db.collection('quiz'); 

  try {
    const result = await collection.insertOne({
      userId,
      answers,
      timestamp: new Date(),
    });

    return new NextResponse(JSON.stringify({ message: 'Quiz answers stored successfully', result }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Error storing answers', error }), { status: 500 });
  }
}
