<script setup lang="ts">
import { onMounted } from 'vue';
import { useNews } from '@/composables/useNews';
import { useVisibleMapData } from '@/composables/useVisibleMapData';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import NewsMap from '@/features/NewsMap.vue';
import SidebarMenu from '@/features/SidebarMenu.vue';
import NewsMapControl from '@/features/NewsMapControl.vue';
import { useMapControls } from '@/composables/useMapControl';

// Data
const { data, isLoading, fetch } = useNews();
const { visibleMapData, refreshMarkers } = useVisibleMapData(data);
const { mapRef } = useMapControls();
onMounted(async () => {
    await fetch();
    refreshMarkers();
    if (data.value[0]) {
        // Fly to top trending location
        const coordinates = data.value[0].coordinates;
        mapRef.value?.leafletObject?.flyTo(coordinates);
    }
});
</script>

<template>
    <SidebarMenu title="News Map">
        <NewsMapControl :data="data" :visible-map-data="visibleMapData" />
    </SidebarMenu>
    <main class="h-screen w-screen">
        <NewsMap :data="visibleMapData" @view-change="refreshMarkers" />
    </main>
    <LoadingOverlay :visible="isLoading" />
</template>

<style scoped></style>
