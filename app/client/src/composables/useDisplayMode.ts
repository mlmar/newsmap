import { DisplayModeId, type DisplayMode } from "@/types/DisplayMode";
import { ref } from "vue";

const displayMode = ref<DisplayModeId>(DisplayModeId.Articles);
export function useDisplayMode() {
    const displayModes: DisplayMode[] = [
        { id: DisplayModeId.Articles, label: 'Articles' },
        { id: DisplayModeId.Locations, label: 'Locations' },
    ];
    return {
        displayMode,
        displayModes
    }
}