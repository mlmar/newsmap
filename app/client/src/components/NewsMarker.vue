<script setup lang="ts">
import NewsMarkerContent from '@/components/NewsMarkerContent.vue';
import type { MapData } from '@newsmap/types';
import { LMarker, LPopup } from '@vue-leaflet/vue-leaflet';

const props = defineProps<MapData>();
</script>

<template>
    <LMarker :lat-lng="coordinates">
        <LPopup>
            <NewsMarkerContent v-bind="props" />
        </LPopup>
    </LMarker>
</template>

<style scoped></style>
