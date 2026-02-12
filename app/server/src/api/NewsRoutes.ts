import { Router } from "express";
import { NewsService } from "../services/NewsService.js";

const router = Router();


/**
 * Returns marker data
 */
router.get('/', async (req, res) => {
    console.log('Fetching news');
    const news = await NewsService.get();
    console.log(`Successfully fetched ${news.length} results`)
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(news);
});

export default router;