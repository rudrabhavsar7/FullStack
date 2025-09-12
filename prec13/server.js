import express from "express";
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('form', { error: null, values: { income1: '', income2: '' } });
});

app.post('/calculate', (req, res) => {
    const income1 = parseFloat(req.body.income1);
    const income2 = parseFloat(req.body.income2);

    if (
        isNaN(income1) || isNaN(income2) ||
        income1 < 0 || income2 < 0
    ) {
        return res.render('form', {
            error: 'Please enter valid non-negative numbers for both income sources.',
            values: { income1: req.body.income1, income2: req.body.income2 }
        });
    }

    const total = income1 + income2;
    res.render('result', { income1, income2, total });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});