<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
import { useNews } from '@/composables/useNews';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import NewsMarker from '@/components/NewsMarker.vue';
import type { NewsFeature } from '@/types/News';

// News state
const { data, isLoading, fetch } = useNews();

// Map state
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapRef: Ref<InstanceType<typeof LMap> | null> = ref(null);
const zoom: Ref<number> = ref(5);
const center: Ref<[number, number]> = ref([37, -97]);

const visibleData: Ref<NewsFeature[]> = ref([]);
function updateMarkers() {
    // Ensures that only articles within the view box are being rendered
    const map = mapRef.value?.leafletObject;
    if (map && data.value) {
        // If map exists
        const bounds = map.getBounds();
        visibleData.value = data.value.features.filter((item) => {
            // Filter for articles that appear within view
            const [long, lat] = item.geometry.coordinates;
            return bounds.contains([lat, long]);
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
            <NewsMarker v-for="(item, i) in visibleData" :key="item.properties.url + i" :item="item" />
        </LMap>
    </div>
    <LoadingOverlay :visible="isLoading">Loading Data</LoadingOverlay>
</template>

<style scoped></style>
