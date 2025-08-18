import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'counter.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize the counter file if it doesn't exist
function initDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ count: 0 }), 'utf-8');
  }
}

// Read current count from file
function readCount() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (typeof parsed.count === 'number') return parsed.count;
  } catch (e) {
    // Fall through and reinitialize if corrupted
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify({ count: 0 }), 'utf-8');
  return 0;
}

// Write count to file atomically
function writeCount(count) {
  const tempFile = DATA_FILE + '.tmp';
  fs.writeFileSync(tempFile, JSON.stringify({ count }), 'utf-8');
  fs.renameSync(tempFile, DATA_FILE);
}

initDataFile();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple in-memory cache to avoid frequent disk reads; still persisted on every change
let currentCount = readCount();

// Get current count
app.get('/api/count', (req, res) => {
  res.json({ count: currentCount });
});

// Increment
app.post('/api/increment', (req, res) => {
  currentCount += 1;
  writeCount(currentCount);
  res.json({ count: currentCount });
});

// Decrement (never below 0 by default; change if negatives allowed)
app.post('/api/decrement', (req, res) => {
  currentCount = Math.max(0, currentCount - 1);
  writeCount(currentCount);
  res.json({ count: currentCount });
});

// Reset
app.post('/api/reset', (req, res) => {
  currentCount = 0;
  writeCount(currentCount);
  res.json({ count: currentCount });
});

// Health check
app.get('/health', (req, res) => res.send('OK'));

app.listen(PORT, () => {
  console.log(`Rep counter running at http://localhost:${PORT}`);
});
