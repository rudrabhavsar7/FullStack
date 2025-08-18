import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.send();
})

app.listen(PORT,()=>{
    console.log(`Server Is Running On PORT : ${PORT}`);
})

