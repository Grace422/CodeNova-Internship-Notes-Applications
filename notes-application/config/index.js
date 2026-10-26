import "dotenv/config";
import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import multer from "multer";
import { randomUUID } from "node:crypto";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173"
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Notes App API is running!");
});

const PORT = process.env.PORT || 5000;
const CONNECTION_STRING = process.env.DATABASE_URL;
const DATABASENAME = process.env.DATABASE_NAME;
const client = new MongoClient(CONNECTION_STRING);
let database;

const collection = () =>
    database.collection("NotesAppCollection");

// Get all notes
app.get("/api/notesapp/getnotes", async (req, res) => {
    try {
        const notes = await collection().find({}).toArray();
        res.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Failed to fetch notes." });
    }
});

// Add a note
app.post(
    "/api/notesapp/addnote",
    multer().none(),
    async (req, res) => {
        try {
            const title = req.body.title?.trim();
            const description = (
                req.body.description ?? req.body.newNotes ?? ""
            ).trim();

            if (!title || !description) {
                return res.status(400).json({
                    error: "Title and description are required."
                });
            }

            const note = {
                id: randomUUID(),
                title,
                description
            };

            await collection().insertOne(note);

            res.status(201).json({
                message: "Note added successfully.",
                note
            });
        } catch (error) {
            console.error("Error adding note:", error);
            res.status(500).json({ error: "Failed to add note." });
        }
    }
);

// Search notes by title or description
app.get("/api/notesapp/searchnotes", async (req, res) => {
    try {
        const query = String(req.query.q || "").trim();

        if (!query) {
            const notes = await collection().find({}).toArray();
            return res.json(notes);
        }

        const escapedQuery = query.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const notes = await collection()
            .find({
                $or: [
                    {
                        title: {
                            $regex: escapedQuery,
                            $options: "i"
                        }
                    },
                    {
                        description: {
                            $regex: escapedQuery,
                            $options: "i"
                        }
                    }
                ]
            })
            .toArray();

        res.json(notes);
    } catch (error) {
        console.error("Error searching notes:", error);
        res.status(500).json({ error: "Failed to search notes." });
    }
});

// Edit a note


app.put("/api/notesapp/editnote/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const title = req.body.title?.trim();
        const description = req.body.description?.trim();

        if (!title || !description) {
            return res.status(400).json({
                error: "Title and description are required."
            });
        }

        const existingNote = await collection().findOne({
            id: id
        });

        const numericId = Number(id);
        const filter = existingNote
            ? { id: id }
            : Number.isFinite(numericId) && id.trim() !== ""
                ? { id: numericId }
                : { id: id };

        const result = await collection().updateOne(
            filter,
            {
                $set: {
                    title: title,
                    description: description
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: "Note not found."
            });
        }

        res.json({
            message: "Note updated successfully."
        });
    } catch (error) {
        console.error("Edit error:", error);
        res.status(500).json({
            error: error.message || "Failed to update note."
        });
    }
});



// Delete a note
app.delete("/api/notesapp/deletenote/:id", async (req, res) => {
    try {
        const result = await collection().deleteOne({
            id: req.params.id
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: "Note not found."
            });
        }

        res.json({ message: "Note deleted successfully." });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Failed to delete note." });
    }
});

// Connect to MongoDB before starting the server
async function startServer() {
    try {
        console.log("Connecting to MongoDB...");

        await client.connect();
        database = client.db(DATABASENAME);

        await database.command({ ping: 1 });

        console.log("MongoDB connection successful.");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start backend:", error);
        await client.close().catch(() => { });
        process.exitCode = 1;
    }
}

startServer();