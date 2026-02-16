import type { LMap } from "@vue-leaflet/vue-leaflet";
import { ref } from "vue";

const mapRef = ref<InstanceType<typeof LMap> | null>(null);

export function useMapRef() {
    return mapRef;
}