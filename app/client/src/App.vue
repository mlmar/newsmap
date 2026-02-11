<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
import { useNews } from '@/composables/useNews';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import NewsMarker from '@/components/NewsMarker.vue';
import type { MarkerData } from '@newsmap/types';

// News state
const { data, isLoading, fetch } = useNews();

// Map state
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapRef: Ref<InstanceType<typeof LMap> | null> = ref(null);
const zoom: Ref<number> = ref(5);
const center: Ref<[number, number]> = ref([37, -97]);

const visibleData: Ref<MarkerData[]> = ref([]);
function updateMarkers() {
    // Ensures that only articles within the view box are being rendered
    const map = mapRef.value?.leafletObject;
    if (map && data.value) {
        // If map exists
        const bounds = map.getBounds();
        visibleData.value = data.value.filter((item) => {
            // Filter for articles that appear within view
            return bounds.contains(item.coordinates);
        });
    }
}

onMounted(async () => {
    await fetch();
    updateMarkers();
});
</script>

<template>
    <div style="height: 100vh; width: 100vw">
        <LMap
            ref="mapRef"
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
            :options="{ worldCopyJump: true }"
            @moveend="updateMarkers"
        >
            <LTileLayer :url="url" layer-type="base" name="OpenStreetMap" />
            <NewsMarker v-for="item in visibleData" :key="item.url + item.coordinates.join()" v-bind="item" />
        </LMap>
    </div>
    <LoadingOverlay :visible="isLoading" />
</template>

<style scoped></style>
