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

const staticDirectory = path.resolve(__dirname, '../dist');
app.use(express.static(staticDirectory));
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, staticDirectory, "index.html"));
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});