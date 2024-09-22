import { dbConnect } from '@/app/lib/db';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest) {
  const { userId, answers } = await req.body.json();
  const con = await dbConnect();
  const db = con.connection.db!;
  const collection = db.collection('user'); 

  const questions = [
    "Do you find it difficult to focus on tasks?",
    "Do you prefer routine and predictability?",
    "Do you find social interactions challenging?",
    "Do you have intense interests in specific topics?",
    "Do you experience sensory sensitivities?",
    "Do you find it hard to understand social cues?",
    "Do you often feel overwhelmed in busy environments?",
    "Do you have a strong preference for specific textures or fabrics?",
    "Do you find it difficult to switch between tasks?",
    "Do you have a tendency to hyperfocus on certain activities?",
    "Do you find it challenging to make eye contact?",
    "Do you have a strong aversion to certain sounds or lights?",
    "Do you find it difficult to express your emotions?",
    "Do you have a need for a structured daily routine?",
    "Do you find it hard to understand jokes or sarcasm?",
    "Do you have repetitive behaviors or rituals?",
    "Do you find it difficult to adapt to changes?",
    "Do you have a strong interest in numbers, patterns, or statistics?",
    "Do you find it challenging to work in a team?",
    "Do you have a strong preference for solitude?",
  ];

  const userObject = {
    userId,
    timestamp: new Date(),
    quiz:{}
  };


  questions.forEach((question, index) => {
    (userObject.quiz as any)[question] = answers[index]; // Map each question to its corresponding answer
  });

  try {
    const result = await collection.findOneAndReplace({userId}, userObject, {upsert: true})

    return new NextResponse(JSON.stringify({ message: 'Quiz answers stored successfully', result }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Error storing answers', error }), { status: 500 });
  }
}
