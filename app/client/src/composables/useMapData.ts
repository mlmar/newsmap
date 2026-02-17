import type { MapData } from "@newsmap/types";
import { ref } from "vue";

const data = ref<MapData[]>([]);
const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);

/**
 * Composable for returning news data, function for fetching data, and loading flag
 */
export function useMapData(): {
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
            data.value = await fetchNews();
        } catch (error) {
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
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
 * @returns {MapData[]}
 */
async function fetchNews(): Promise<MapData[]> {
    const res = await fetch(import.meta.env.VITE_SERVER_URL + '/news');
    const json = await res.json();
    return json;
}