<script setup lang="ts">
import NewsMarker from '@/components/NewsMarker.vue';
import { useMapControls } from '@/composables/useMapControl';
import { useMapData } from '@/composables/useMapData';
import { useMapRef } from '@/composables/useMapRef';
import { useVisibleMapData } from '@/composables/useVisibleMapData';
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
import { useResizeObserver } from '@vueuse/core';
import { useTemplateRef } from 'vue';

const mapRef = useMapRef();
const { url, zoom, center, flyToMarker } = useMapControls();
const { data, isError } = useMapData();
const { data: visibleMapData, refreshMarkers } = useVisibleMapData();
const mapContainer = useTemplateRef('map-container');
useResizeObserver(mapContainer, () => {
    mapRef.value?.leafletObject?.invalidateSize();
});

function handleReady() {
    refreshMarkers();
    flyToMarker(data.value[0]?.coordinates);
}
</script>

<template>
    <section class="h-full w-ful relative" ref="map-container">
        <LMap
            ref="mapRef"
            v-model:zoom="zoom"
            v-model:center="center"
            :use-global-leaflet="false"
            :options="{ worldCopyJump: true }"
            @moveend="refreshMarkers"
            @ready="handleReady"
        >
            <LTileLayer :url="url" layer-type="base" name="OpenStreetMap" />
            <NewsMarker v-for="item in visibleMapData" :key="item.coordinates.join()" v-bind="item" />
        </LMap>
        <p v-if="isError" class="error-message bg-white border border-red-400 p-3 font-bold rounded-sm">
            We're having trouble connecting to the GDELT GEO API. Service may be offline or rate-limited. Try again in a few minutes.
        </p>
    </section>
</template>

<style scoped>
.error-message {
    position: fixed;
    z-index: 99999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 90dvw;
    width: 30em;
}
</style>
