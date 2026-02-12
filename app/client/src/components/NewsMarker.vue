<script setup lang="ts">
import NewsContent from '@/components/NewsContent.vue';
import type { MapData } from '@newsmap/types';
import { LMarker, LPopup } from '@vue-leaflet/vue-leaflet';

const props = defineProps<MapData>();
</script>

<template>
    <LMarker :lat-lng="coordinates">
        <LPopup>
            <NewsContent v-bind="props" />
        </LPopup>
    </LMarker>
</template>

<style scoped></style>
