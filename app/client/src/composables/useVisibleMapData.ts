import { useMapControls } from "@/composables/useMapControl";
import type { MapData } from "@newsmap/types";
import { type Ref, ref } from "vue";

/**
 * Refreshes visible markers when refreshMarkers is called
 * @param {Ref<MapData[]>} data 
 * @returns {{ visibleMapData: Ref<MapData[]>, refreshMarkers: () => void }}
 */
export function useVisibleMapData(data: Ref<MapData[]>): { visibleMapData: Ref<MapData[]>, refreshMarkers: () => void } {
    const visibleMapData: Ref<MapData[]> = ref([]); // Not using compute because mapRef.value.leafletObject is not reactive

    // Map markers
    const { mapRef } = useMapControls();
    function refreshMarkers() {
        // Ensures that only articles within the view box are being rendered
        const map = mapRef.value?.leafletObject;
        if (map && data.value) {
            // If map exists
            const bounds = map.getBounds();
            visibleMapData.value = data.value.filter((item) => {
                // Filter for articles that appear within view
                return bounds.contains(item.coordinates);
            });
        }
    }

    return { visibleMapData, refreshMarkers }
}