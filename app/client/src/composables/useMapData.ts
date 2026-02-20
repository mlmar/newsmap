import type { MapData } from "@newsmap/types";
import { ref, watch, type Ref } from "vue";

const data = ref<MapData[]>([]);
const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);

/**
 * Composable for returning news data, function for fetching data, and loading flag.
 * Accepts an optional reactive language ref — when it changes, data is automatically refetched.
 */
export function useMapData(language?: Ref<string>): {
    data: typeof data,
    fetch: () => Promise<void>
    isLoading: typeof isLoading,
    isError: typeof isError,
} {
    const fetch = async () => {
        if (isLoading.value) {
            return;
        }
        isLoading.value = true;
        try {
            data.value = await fetchNews(language?.value);
        } catch (error) {
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
    }

    if (language) {
        watch(language, () => fetch());
    }

    return {
        data,
        fetch,
        isLoading,
        isError
    }
}

/**
 * Fetches geo data for worldwide news from server url
 * @param {string} [language] - Language ID to filter by
 * @returns {MapData[]}
 */
async function fetchNews(language?: string): Promise<MapData[]> {
    const url = new URL(import.meta.env.VITE_SERVER_URL + '/news');
    if (language) {
        url.searchParams.set('language', language);
    }
    const res = await fetch(url.toString());
    const json = await res.json();
    return json;
}