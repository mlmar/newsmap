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
const { data } = useMapData();
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
    <section class="h-full w-full" ref="map-container">
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
    </section>
</template>

<style scoped></style>
