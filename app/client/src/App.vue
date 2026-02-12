<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useNews } from '@/composables/useNews';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import type { MapData } from '@newsmap/types';
import NewsMap from '@/features/NewsMap.vue';
import { useMapControls } from '@/composables/useMapControl';

// Data
const { data, isLoading, fetch } = useNews();
const visibleData: Ref<MapData[]> = ref([]); // Not using compute because mapRef.value.leafletObject is not reactive

// Map markers
const { mapRef } = useMapControls();
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
    <main class="h-screen w-screen">
        <NewsMap :data="visibleData" @view-change="updateMarkers" />
    </main>
    <LoadingOverlay :visible="isLoading" />
</template>

<style scoped></style>
