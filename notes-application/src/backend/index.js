// import 'dotenv/config';
// import dotenv from 'dotenv';
// import path from 'path';
import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import multer from 'multer';
// dotenv.config({ path: path.resolve(process.cwd(), '.env') }); 

var app = express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://kwahamgrace:grace123@cluster0.bk0obc3.mongodb.net/?appName=Cluster0";
var DATABASENAME = "NotesApp";
var database;

const client = new MongoClient(CONNECTION_STRING);
app.listen(5000, async() => {
    console.log("Server is running on port 5000");
    try{
        console.log("Connecting to MongoDB...");
        await client.connect();
        database = client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error);
    }
})