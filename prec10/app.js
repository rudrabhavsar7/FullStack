import express from 'express';
import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static assets (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index'); // simple form
});

app.get('/view', (req, res) => {
  const fileParam = req.query.file;
  if (!fileParam) {
    return res.render('index');
  }

  const requestedPath = path.normalize(fileParam);

  fs.readFile(requestedPath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') return res.status(404).render('not-found', { file: requestedPath });
      if (err.code === 'EACCES') return res.status(403).render('forbidden', { file: requestedPath });
      return res.status(500).render('error', { file: requestedPath, message: err.message });
    }

    const escaped = data
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    res.render('view', { file: requestedPath, content: escaped });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
