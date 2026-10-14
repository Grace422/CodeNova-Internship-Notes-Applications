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

app.get('/api/notesapp/getnotes', async(request, response) => {
    try{
        const results = await database.collection('NotesAppCollection').find({}).toArray();
        response.send(results);
    }
    catch(error){
        console.error("Error fetching notes:", error);
        response.status(500).send({ error: "Internal Server Error" });
    }
});

app.post('/api/notesapp/addnote', multer().none(), async (request, response) => {
    try {
        const collection = database.collection("NotesAppCollection");
        const numOfDocs = await collection.estimatedDocumentCount({});
        await collection.insertOne({
            id: (numOfDocs + 1).toString(),
            description: request.body.newNotes,
        });

        response.json("Added Successfully");
    } 
    catch (error) {
        console.error("Error adding note:", error);
        response.status(500).send({ error: "Internal Server Error" });
    }
});

app.delete('api/notesapp/deletenote/:id', async(request,response) => {
    try{
        const collection = database.collection("NotesAppCollection");
        const noteId = request.params.id;
        const result = await collection.deleteOne({ id: noteId });
        if (result.deletedCount === 0) {
            return response.status(404).json({ error: "Note not found" });
        }
        response.json("Deleted Successfully");
    }
    catch (error) {
        console.error("Error deleting note:", error);
        response.status(500).send({ error: "Internal Server Error" });
    }
})

app.put('api/notesapp/modifynote/:id', async(request, response) => {
    try{
        const {description} = request.body;

        if(!description?.trim()) {
            return response.status(400).json({ error: "Description is required" });
        }

        const note = await Note.findByIdAndUpdate(
            request.params.id, { description }, 
            { new: true, runValidators: true }
        );

        if(!note){
            return response.status(404).json({ error: "Note not found" });      
        }
        response.json(note);
    }catch(error){
        const invalidId = error.name === 'CastError';

        response.status(invalidId ? 400 : 500).json
        ({ error: invalidId ? "Invalid note ID" : "Failed to update note" });   
    }
})
