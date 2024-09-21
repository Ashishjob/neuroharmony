import { dbConnect } from '@/app/lib/db'; // Connect to the database
import Message from '@/app/lib/models/Message'; // Message model

export async function GET(request) {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const sender = searchParams.get('sender');
    const receiver = searchParams.get('receiver');
    
    if (!sender || !receiver) {
        return new Response(JSON.stringify({ error: 'Sender and Receiver are required' }), { status: 400 });
    }
    
    // Fetch messages between the sender and receiver
    const messages = await Message.find({
        $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender }
        ]
    }).sort({ timestamp: 1 });
    
    return new Response(JSON.stringify(messages), { status: 200 });
}

export async function POST(request) {
    await dbConnect();
    
    const { sender, receiver, message } = await request.json();
    
    if (!sender || !receiver || !message) {
        return new Response(JSON.stringify({ error: 'Sender, Receiver, and Message are required' }), { status: 400 });
    }
    
    const newMessage = new Message({
        sender,
        receiver,
        message,
    });
    
    await newMessage.save();
    
    return new Response(JSON.stringify(newMessage), { status: 201 });
}
