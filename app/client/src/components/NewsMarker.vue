<script setup lang="ts">
import NewsContent from '@/components/NewsContent.vue';
import { useVisibleMapData } from '@/composables/useVisibleMapData';
import type { MarkerInstance } from '@/types/MarkerInstance';
import type { MapData } from '@newsmap/types';
import { LMarker, LPopup } from '@vue-leaflet/vue-leaflet';

const props = defineProps<MapData>();
const { markerRefs } = useVisibleMapData();
</script>

<template>
    <LMarker
        :lat-lng="coordinates"
        :ref="
            (el) => {
                if (el) markerRefs.set(coordinates.join(), el as MarkerInstance);
            }
        "
    >
        <LPopup>
            <NewsContent v-bind="props" />
        </LPopup>
    </LMarker>
</template>

<style scoped></style>
