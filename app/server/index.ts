import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import newsRouter from './src/api/NewsRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.DEV ? '*' : process.env.CLIENT_URL
}))

app.use('/news', newsRouter);

const port = 3300;
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

export default app;