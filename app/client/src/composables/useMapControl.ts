// Map state

import type { LMap } from "@vue-leaflet/vue-leaflet";
import { type Ref, ref } from "vue";

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapRef: Ref<InstanceType<typeof LMap> | null> = ref(null);
const zoom: Ref<number> = ref(5);
const center: Ref<[number, number]> = ref([37, -97]);

export function useMapControls() {
    return {
        url,
        mapRef,
        zoom,
        center
    }
}