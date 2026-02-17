import { DisplayModeId, type DisplayMode } from "@/types/DisplayMode";
import { ref } from "vue";

const displayMode = ref<DisplayModeId>(DisplayModeId.locations);
export function useDisplayMode() {
    const displayModes: DisplayMode[] = [
        { id: DisplayModeId.locations, label: 'Locations' },
        { id: DisplayModeId.articles, label: 'Articles' },
    ];
    return {
        displayMode,
        displayModes
    }
}