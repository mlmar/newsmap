
const BASE_URL = 'https://api.gdeltproject.org/api/v1/gkg_geojson';

export class NewsService {
    static async get() {
        try {
            const params = new URLSearchParams({
                OUTPUTFIELDS: 'url,name,sharingimage,tone,lang'
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