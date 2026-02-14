// Map state

import type { MarkerInstance } from "@/types/MarkerInstance";
import type { LMap } from "@vue-leaflet/vue-leaflet";
import { type Ref, ref } from "vue";

const url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';
const mapRef: Ref<InstanceType<typeof LMap> | null> = ref(null);
const markerRefs: Ref<Map<string, MarkerInstance>> = ref(new Map());
const zoom: Ref<number> = ref(5);
const center: Ref<[number, number]> = ref([37, -97]);

export function useMapControls() {
    return {
        url,
        mapRef,
        markerRefs,
        zoom,
        center
    }
}