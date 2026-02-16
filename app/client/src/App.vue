<script setup lang="ts">
import { onMounted } from 'vue';
import { useMapData } from '@/composables/useMapData';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import NewsMap from '@/features/NewsMap.vue';
import SidebarMenu from '@/features/SidebarMenu.vue';
import NewsMapControl from '@/features/NewsMapControl.vue';
import { useMapControls } from '@/composables/useMapControl';

// Data
const { data, isLoading, fetch } = useMapData();
const { flyToMarker } = useMapControls();
onMounted(async () => {
    await fetch();
    flyToMarker(data.value[0]?.coordinates);
});
</script>

<template>
    <SidebarMenu title="News Map">
        <NewsMapControl />
    </SidebarMenu>
    <main class="h-screen w-screen">
        <NewsMap />
    </main>
    <LoadingOverlay :visible="isLoading" />
</template>

<style scoped></style>
