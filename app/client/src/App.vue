<script setup lang="ts">
import { onMounted } from 'vue';
import { useNews } from '@/composables/useNews';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import NewsMap from '@/features/NewsMap.vue';
import { useVisibleMapData } from '@/composables/useVisibleMapData';

// Data
const { data, isLoading, fetch } = useNews();
const { visibleMapData, refreshMarkers } = useVisibleMapData(data);
onMounted(async () => {
    await fetch();
    refreshMarkers();
});
</script>

<template>
    <main class="h-screen w-screen">
        <NewsMap :data="visibleMapData" @view-change="refreshMarkers" />
    </main>
    <LoadingOverlay :visible="isLoading" />
</template>

<style scoped></style>
