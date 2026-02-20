import { Router } from "express";
import { NewsService } from "../services/NewsService.js";

const router = Router();


/**
 * Returns marker data
 */
router.get('/', async (req, res) => {
    const language = req.query.language as string | undefined;
    console.log(`Fetching news (language: ${language ?? 'default'})`);
    const news = await NewsService.getData(language);
    console.log(`Successfully fetched ${news.length} results`)

    // s-maxage=3600: Vercel caches this for 1 hour
    // max-age=0: The browser must check Vercel for updates every time
    // stale-while-revalidate: Serve old data while Vercel fetches new data in the background
    res.setHeader('Cache-Control', 'public, s-maxage=3600, max-age=0, stale-while-revalidate=600');
    res.send(news);
});

/**
 * Returns supported source languages
 */
router.get('/languages', async (req, res) => {
    console.log('Fetching languages');
    const languages = await NewsService.getLanguages();
    console.log(`Successfully fetched ${languages.length} languages`);

    // Languages rarely change; cache for 24 hours
    res.setHeader('Cache-Control', 'public, s-maxage=86400, max-age=86400, stale-while-revalidate=3600');
    res.send(languages);
});

export default router;