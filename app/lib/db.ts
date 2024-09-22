import mongoose from 'mongoose';

let mongooseCache: mongoose.Mongoose|null = null;

export async function dbConnect() {
    if (mongooseCache) {
        console.log('connected from previous');
        return mongooseCache;
    } else{
        const conString = process.env.MONGO_URL;
        const promise = mongoose.connect(conString!, {
            autoIndex: true,
        });

        mongooseCache=await promise;

        console.log('Newly connected');

        return mongooseCache;
    }
}