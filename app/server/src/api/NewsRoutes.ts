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

    // s-maxage=3600: Vercel caches this for 1 hour
    // max-age=0: The browser must check Vercel for updates every time
    // stale-while-revalidate: Serve old data while Vercel fetches new data in the background
    res.setHeader('Cache-Control', 'public, s-maxage=3600, max-age=0, stale-while-revalidate=600');
    res.send(news);
});

export default router;