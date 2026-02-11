import { JSDOM } from 'jsdom';
import { MarkerData, NewsFeature, type News } from '@newsmap/types'
const BASE_URL = 'https://api.gdeltproject.org/api/v2/geo/geo'

export class NewsService {
    /**
     * Fetches list of news features with geo json information and converts items to MarkerData
     * @returns {MarkerData[]} 
     */
    static async get(): Promise<MarkerData[]> {
        try {
            const params = new URLSearchParams({
                query: 'sourcelang:english',
                mode: 'pointdata',
                format: 'geojson'
            })
            const res = await fetch(BASE_URL + '?' + params.toString());
            const json: News = await res.json() as News;
            const markerData = json.features.map(getMarkerData);
            return markerData;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch data')
        }
    }
}

/**
 * Cleans feature data and transforms to MarkerData
 * @param {NewsFeature} feature 
 * @returns {MarkerData}
 */
function getMarkerData(feature: NewsFeature): MarkerData {
    const coordinates: [number, number] = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];

    // Extract title and url from HTML string in API resposne
    const dom = new JSDOM(feature.properties.html);
    const anchorElements: HTMLAnchorElement[] = Array.from(dom.window.document.querySelectorAll('a'));
    const anchorElement = anchorElements.at(-1);
    const title = anchorElement?.title;
    const url = anchorElement?.href;

    return {
        location: feature.properties.name,
        coordinates,
        title,
        url,
        imageUrl: feature.properties.shareimage
    }
}