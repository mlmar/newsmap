import path from 'node:path';
import express from 'express';
import cors from 'cors';
import { NewsService } from '../services/NewsService';

const app = express();
const port = 3300;

app.use(cors({
    origin: '*'
}))

app.get('/news', async (req, res) => {
    const news = await NewsService.get();
    res.send(news);
});

const staticDirecory = "/dist";
app.use(express.static(path.join(__dirname, staticDirecory)));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, staticDirecory, "index.html"));
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});