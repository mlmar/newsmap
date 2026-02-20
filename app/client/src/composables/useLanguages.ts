import type { Language } from "@newsmap/types";
import { ref } from "vue";

const languages = ref<Language[]>([]);
const selectedLanguage = ref<string>('eng');
const isLoading = ref<boolean>(false);

/**
 * Composable for returning available languages, fetching them, and tracking the selected language
 */
export function useLanguages() {
    const fetch = async () => {
        if (isLoading.value) {
            return;
        }
        isLoading.value = true;
        try {
            languages.value = await fetchLanguages();
        } finally {
            isLoading.value = false;
        }
    }

    return {
        languages,
        selectedLanguage,
        fetch,
        isLoading,
    }
}

/**
 * Fetches supported languages from server
 * @returns {Language[]}
 */
async function fetchLanguages(): Promise<Language[]> {
    const res = await fetch(import.meta.env.VITE_SERVER_URL + '/news/languages');
    const json = await res.json();
    return json;
}
