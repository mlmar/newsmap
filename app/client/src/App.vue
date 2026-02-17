<script setup lang="ts">
import { onMounted } from 'vue';
import { useMapData } from '@/composables/useMapData';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import NewsMap from '@/features/NewsMap.vue';
import SidebarMenu from '@/features/SidebarMenu.vue';
import NewsMapControl from '@/features/NewsMapControl.vue';
import { useMapControls } from '@/composables/useMapControl';
import TooltipPopup from '@/components/TooltipPopup.vue';

// Data
const { data, isLoading, fetch } = useMapData();
const { flyToMarker } = useMapControls();
onMounted(async () => {
    await fetch();
    flyToMarker(data.value[0]?.coordinates);
});
</script>

<template>
    <SidebarMenu>
        <template #title>
            News Map
            <TooltipPopup>
                <button
                    class="flex items-center justify-center rounded-full w-[1.5em] h-[1.5em] text-sm bg-blue-600 text-white font-semibold cursor-pointer"
                >
                    i
                </button>
                <template #tooltip>
                    <p>
                        This map visualizes the geographic footprint of global media coverage.
                        <b>Locations represent where news is being reported about, which may differ from where an event is physically occurring.</b>
                        All metadata including location, tone, and themes are extracted algorithmically by the
                        <a class="text-blue-600 underline" href="https://blog.gdeltproject.org/gdelt-geo-2-0-api-debuts/">GDELT Project</a>.
                    </p>
                </template>
            </TooltipPopup>
        </template>
        <NewsMapControl />
    </SidebarMenu>
    <main class="h-screen w-screen">
        <NewsMap />
    </main>
    <LoadingOverlay :visible="isLoading" />
</template>

<style scoped></style>
