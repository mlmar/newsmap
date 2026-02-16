import { useMapData } from "@/composables/useMapData";
import { useMapRef } from "@/composables/useMapRef";
import type { MarkerInstance } from "@/types/MarkerInstance";
import type { MapData } from "@newsmap/types";
import { ref } from "vue";

const visibleMapData = ref<MapData[]>([]); // Not using compute because mapRef.value.leafletObject is not reactive
const markerRefs = ref<Map<string, MarkerInstance>>(new Map());

/**
 * Refreshes visible markers when refreshMarkers is called.
 * References single instance of visibleMapData ref
 * @returns {{ visibleMapData: Ref<MapData[]>, refreshMarkers: () => void }}
 */
export function useVisibleMapData(): {
    data: typeof visibleMapData,
    markerRefs: typeof markerRefs,
    refreshMarkers: () => void
} {

    // Map markers
    const mapRef = useMapRef();
    const { data } = useMapData();

    /**
     * Refreshes visible map markers
     */
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

    return { data: visibleMapData, markerRefs, refreshMarkers }
}