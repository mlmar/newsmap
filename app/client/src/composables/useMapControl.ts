
import { useMapRef } from "@/composables/useMapRef";
import { useVisibleMapData } from "@/composables/useVisibleMapData";
import type { MarkerInstance } from "@/types/MarkerInstance";
import type { MapData } from "@newsmap/types";
import { ref } from "vue";

type FlyToMarkerOptions = { minDistance: number, zoomLevel: number, duration: number }

// Map state
const url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';
const zoom = ref<number>(5);
const center = ref<[number, number]>([37, -97]);

export function useMapControls() {
    const mapRef = useMapRef();
    const { refreshMarkers, markerRefs } = useVisibleMapData();

    function openPopup(coordinates: MapData['coordinates']) {
        const marker = markerRefs.value.get(coordinates.join());
        marker?.leafletObject.openPopup();
    }

    /**
     * Flies to coordinates at data index
     * @param {MapData['coordinates'] | undefined | null} coordinates 
     * @param {FlyToMarkerOptions} options 
     */
    function flyToMarker(coordinates: MapData['coordinates'] | undefined | null, options?: FlyToMarkerOptions) {
        const {
            minDistance = 550,
            zoomLevel = 5,
            duration = .8
        } = options ?? {};

        const map = mapRef.value?.leafletObject;
        if (coordinates && map) {

            // Calculate distance in meters
            const distance = map.distance(center.value, coordinates) / 1000;

            // If distance is further than the minimum distance threshold, then fly
            if (distance > minDistance) {
                // Fly to location
                map.flyTo(coordinates, zoomLevel, {
                    duration,
                });

                refreshMarkers();
                const delay = duration * 1000 + 200;
                setTimeout(() => { // Delay popup if map needs to move
                    openPopup(coordinates);
                }, delay);
            } else { // Otherwise open immediately
                openPopup(coordinates);
            }
        }
    }

    return {
        url,
        mapRef,
        zoom,
        center,
        flyToMarker
    }
}