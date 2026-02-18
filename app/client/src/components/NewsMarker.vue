<script setup lang="ts">
import NewsContent from '@/components/NewsContent.vue';
import { useMapControls } from '@/composables/useMapControl';
import { useMapData } from '@/composables/useMapData';
import { useVisibleMapData } from '@/composables/useVisibleMapData';
import type { MarkerInstance } from '@/types/MarkerInstance';
import type { MapData } from '@newsmap/types';
import { LMarker, LPopup } from '@vue-leaflet/vue-leaflet';

const props = defineProps<MapData>();
const { lastLocationIndex } = useMapControls();
const { data } = useMapData();
const { markerRefs } = useVisibleMapData();

function handleMarkerClick() {
    // Find location index by coordinates
    lastLocationIndex.value = data.value.findIndex((item) => item.coordinates === props.coordinates);
}
</script>

<template>
    <LMarker
        :lat-lng="props.coordinates"
        :ref="
            (el) => {
                if (el) markerRefs.set(props.coordinates.join(), el as MarkerInstance);
            }
        "
        @click="handleMarkerClick"
    >
        <LPopup>
            <NewsContent v-bind="props" />
        </LPopup>
    </LMarker>
</template>

<style scoped></style>
