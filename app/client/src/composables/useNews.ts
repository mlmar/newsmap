import type { MarkerData, News, NewsFeature } from "@newsmap/types";
import { ref, type Ref } from "vue";

const data: Ref<MarkerData[]> = ref([]);
const isLoading: Ref<boolean> = ref(false);

/**
 * Composable for returning news data, function for fetching data, and loading flag
 */
export function useNews() {
    const fetch = async () => {
        if (isLoading.value) {
            return;
        }
        isLoading.value = true;
        const news = await fetchNews();
        data.value = news.features.map(getMarkerData);
        isLoading.value = false;
    }

    return {
        data,
        fetch,
        isLoading
    }
}

const BASE_URL = import.meta.env.DEV ? 'http://localhost:3300' : '';

/**
 * Fetches worldwide news from server url
 * @returns {News}
 */
async function fetchNews(): Promise<News> {
    const res = await fetch(BASE_URL + '/news');
    const json = await res.json();
    return json as News;
}

function getMarkerData(feature: NewsFeature): MarkerData {
    const coordinates: [number, number] = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];

    // Extract title and url from HTML string in API resposne
    const parser = new DOMParser();
    const doc = parser.parseFromString(feature.properties.html, 'text/html');
    const anchorElement = [...doc.body.querySelectorAll('a')].at(-1);
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