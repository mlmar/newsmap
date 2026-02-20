import { JSDOM } from 'jsdom';
import { Language, MapData, NewsFeature, type News } from '@newsmap/types'
import { fetch, Agent } from 'undici';
const BASE_URL = 'https://api.gdeltproject.org/api/v2/geo/geo'
const LANGUAGES_URL = 'http://data.gdeltproject.org/api/v2/guides/LOOKUP-LANGUAGES.TXT'

export class NewsService {
    /**
     * Fetches list of news features with geo json information and converts items to MapData
     * @returns {MapData[]} 
     */
    static async getData(language?: string): Promise<MapData[]> {
        try {
            const params = new URLSearchParams({
                query: `sourcelang:${language ?? 'english'}`,
                mode: 'pointdata',
                format: 'imagegeojson',
                sortby: 'datedesc',
                timespan: '1h'
            })
            const url = BASE_URL + '?' + params.toString();

            const customDispatcher = new Agent({
                connectTimeout: 30000, // Connection timeout in ms (default is 10000ms)
            });
            const res = await fetch(url, {
                dispatcher: customDispatcher
            });

            const json: News = await res.json() as News;
            const MapData = getMapData(json.features);
            return MapData;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch data')
        }
    }

    /**
     * Fetches the list of supported languages from the GDELT lookup file
     * @returns {Language[]}
     */
    static async getLanguages(): Promise<Language[]> {
        try {
            const res = await fetch(LANGUAGES_URL);
            const text = await res.text();

            const languages: Language[] = text
                .split('\n')
                .filter((line) => line.trim().length > 0)
                .map((line) => {
                    const [id, label] = line.split('\t');
                    return { id: id!.trim(), label: label!.trim() };
                })
                .sort((a, b) => a.label.localeCompare(b.label));

            // Prepend English since it is absent from the GDELT lookup file
            languages.unshift({ id: 'eng', label: 'English' });

            return languages;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch languages');
        }
    }
}

/**
 * Cleans feature data and transforms to MapData
 * @param {NewsFeature} features
 * @returns {MapData}
 */
function getMapData(features: NewsFeature[]): MapData[] {

    // Initialize a single instance outside the loop
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="container"></div></body></html>');
    const container = dom.window.document.getElementById('container')!;

    function parseNewsFeature(feature: NewsFeature) {
        const coordinates: [number, number] = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];

        // Extract article titles and urls from HTML string in API response
        container.innerHTML = feature.properties.html;
        const anchorElements = Array.from(dom.window.document.querySelectorAll('a'));

        return {
            count: feature.properties.count,
            location: feature.properties.name,
            label: feature.properties.name,
            coordinates,
            imageUrl: feature.properties.shareimage,
            articles: anchorElements.map(parseAnchorElement)
        }
    }

    return features.map(parseNewsFeature)
}


function parseAnchorElement(anchorElement: HTMLAnchorElement): { title: string, url: string } {
    return {
        title: cleanGDELTText(anchorElement?.title),
        url: anchorElement?.href
    }
}

function cleanGDELTText(text: string): string {
    if (!text) {
        return '';
    }

    return text
        // Removes spaces before common punctuation
        .replace(/\s+([.,!?;:])(?=\s|$)/g, '$1')
        // Fixes cases like " ( Word ) " -> "(Word)"
        .replace(/\(\s+/g, '(')
        .replace(/\s+\)/g, ')')
        .replace(/\(\s+/g, "'")
        .replace(/\s+\)/g, "'")
        .replace(/\(\s+/g, '"')
        .replace(/\s+\)/g, '"')
        .trim();
}