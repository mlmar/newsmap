import { JSDOM } from 'jsdom';
import { MapData, NewsFeature, type News } from '@newsmap/types'
const BASE_URL = 'https://api.gdeltproject.org/api/v2/geo/geo'

export class NewsService {
    /**
     * Fetches list of news features with geo json information and converts items to MapData
     * @returns {MapData[]} 
     */
    static async get(): Promise<MapData[]> {
        try {
            const params = new URLSearchParams({
                query: 'sourcelang:english',
                mode: 'pointdata',
                format: 'imagegeojson',
                sortby: 'datedesc',
                timespan: '1h'
            })
            const url = BASE_URL + '?' + params.toString();
            const res = await fetch(url);
            const json: News = await res.json() as News;
            const MapData = getMapData(json.features);
            return MapData;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch data')
        }
    }
}

/**
 * Cleans feature data and transforms to MapData
 * @param {NewsFeature} feature 
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
        .trim();
}