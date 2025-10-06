import * as functions from "firebase-functions";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Read Mongo URI from env or functions config (firebase functions:config:set mongodb.uri=...)
const MONGODB_URI =
  process.env.MONGODB_URI ||
  (functions.config().mongodb && functions.config().mongodb.uri);
if (!MONGODB_URI) {
  console.warn(
    'MONGODB_URI not set. Configure with: firebase functions:config:set mongodb.uri="YOUR_URI"'
  );
}

let conn;
function getConn() {
  if (!conn) {
    conn = mongoose.createConnection(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
    });
  }
  return conn;
}

const noteSchema = new mongoose.Schema(
  { title: String, body: String, tags: [String] },
  { timestamps: true }
);

function getModel() {
  return getConn().model("Note", noteSchema);
}

app.get("/api/health", (req, res) => res.json({ ok: true, ts: Date.now() }));

app.get("/api/notes", async (req, res) => {
  const Note = getModel();
  const list = await Note.find().sort({ createdAt: -1 });
  res.json(list);
});
app.post("/api/notes", async (req, res) => {
  const Note = getModel();
  const n = await Note.create(req.body);
  res.json(n);
});
app.put("/api/notes/:id", async (req, res) => {
  const Note = getModel();
  const n = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(n);
});
app.delete("/api/notes/:id", async (req, res) => {
  const Note = getModel();
  await Note.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error("API error:", err);
  res
    .status(500)
    .json({
      error: "internal_error",
      message: err?.message || "Unknown error",
    });
});

export const api = functions.region("us-central1").https.onRequest(app);
