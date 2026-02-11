<script setup lang="ts">
import NewsMarkerContent from '@/components/NewsMarkerContent.vue';
import { LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import type { MarkerData } from '@/types/MarkerData';

const props = defineProps<MarkerData>();
</script>

<template>
    <LMarker :lat-lng="props.coordinates">
        <LPopup>
            <NewsMarkerContent v-bind="props" />
        </LPopup>
    </LMarker>
</template>

<style scoped></style>
