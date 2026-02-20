import { DisplayModeId, type DisplayMode } from "@/types/DisplayMode";
import { useLocalStorage } from "./useLocalStorage";

const displayMode = useLocalStorage<DisplayModeId>('newsmap_display_mode', DisplayModeId.Articles);
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