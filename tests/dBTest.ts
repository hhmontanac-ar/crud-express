import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = async () => {
        return await MongoMemoryServer.create();
};

module.exports.connect = async () => {
    var _mongoServer = await mongoServer();
    await mongoose.connect(_mongoServer.getUri(), { dbName: "crud-express-test" }).then(() => {
        console.log("Connected to Test Database");
        }).catch((err: any) => {
            console.log("Not Connected to Test Database ERROR! ", err);
        });
};

module.exports.reset = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};

module.exports.disconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
};