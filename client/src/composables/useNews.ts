import { type News } from "@/types/News";
import { ref, type Ref } from "vue";

const data: Ref<News | null> = ref(null);
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
        data.value = await fetchNews();
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