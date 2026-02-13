<script setup lang="ts">
import { onMounted } from 'vue';
import { useNews } from '@/composables/useNews';
import { useVisibleMapData } from '@/composables/useVisibleMapData';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import NewsMap from '@/features/NewsMap.vue';
import SidebarMenu from '@/features/SidebarMenu.vue';
import NewsMapControl from '@/features/NewsMapControl.vue';

// Data
const { data, isLoading, fetch } = useNews();
const { visibleMapData, refreshMarkers } = useVisibleMapData(data);
onMounted(async () => {
    await fetch();
    refreshMarkers();
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
