import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    sender: { type: String, required: true }, // User ID or Email of the sender
    receiver: { type: String, required: true }, // User ID or Email of the receiver
    message: { type: String, required: true }, // The chat message content
    timestamp: { type: Date, default: Date.now }, // Timestamp when the message was sent
});

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

export default Message;
