import express from 'express';
import cors from 'cors';
import newsRouter from './src/api/NewsRoutes.js';

const app = express();
const port = 3300;

app.use(cors({
    origin: '*'
}))

app.use('/news', newsRouter);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});