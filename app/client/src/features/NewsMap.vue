<script setup lang="ts">
import NewsMarker from '@/components/NewsMarker.vue';
import { useMapControls } from '@/composables/useMapControl';
import type { MapData } from '@newsmap/types';
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
import { useResizeObserver } from '@vueuse/core';
import { useTemplateRef } from 'vue';

defineProps<{
    data: MapData[];
}>();

const { mapRef, url, zoom, center } = useMapControls();
const mapContainer = useTemplateRef('map-container');
useResizeObserver(mapContainer, () => {
    mapRef.value?.leafletObject?.invalidateSize();
});
</script>

<template>
    <section class="h-full w-full" ref="map-container">
        <LMap
            ref="mapRef"
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
            :options="{ worldCopyJump: true }"
            @moveend="$emit('viewChange')"
            @ready="$emit('viewChange')"
        >
            <LTileLayer :url="url" layer-type="base" name="OpenStreetMap" />
            <NewsMarker v-for="item in data" :key="item.coordinates.join()" v-bind="item" />
        </LMap>
    </section>
</template>

<style scoped></style>
