
import { type News } from '@newsmap/types'
const BASE_URL = 'https://api.gdeltproject.org/api/v2/geo/geo'

export class NewsService {
    static async get(): Promise<News> {
        try {
            const params = new URLSearchParams({
                query: 'sourcelang:english',
                mode: 'pointdata',
                format: 'geojson'
            })
            const res = await fetch(BASE_URL + '?' + params.toString());
            const json = await res.json();
            return json;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch data')
        }
    }
}