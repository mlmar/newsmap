import path from 'node:path';
import express from 'express';
import cors from 'cors';
import newsRouter from './api/NewsRoutes.js';
import { fileURLToPath } from 'node:url';
const app = express();
const port = 3300;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({
    origin: '*'
}));
app.use('/news', newsRouter);
const staticDirectory = '../../client/dist';
app.use(express.static(path.join(__dirname, staticDirectory)));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, staticDirectory, "index.html"));
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
