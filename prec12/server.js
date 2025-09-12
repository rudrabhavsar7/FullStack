import express from "express";
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
})

app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;

    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (Number.isNaN(a) || Number.isNaN(b)) {
        return res.status(400).json({ error: 'Invalid numbers' });
    }

    let result;
    switch (operation) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = b === 0 ? null : a / b;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }

    if (result === null) return res.status(400).json({ error: 'Division by zero' });
    return res.json({ result });
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
