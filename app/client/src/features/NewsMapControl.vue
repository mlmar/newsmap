<script setup lang="ts">
import type { MapData } from '@newsmap/types';

defineProps<{
    data: MapData[];
    visibleMapData: MapData[];
}>();

function handleChange() {
    alert('TODO');
}
</script>

<template>
    <label class="font-semibold"> {{ visibleMapData.length }} / {{ data.length }} Results </label>
    <fieldset class="flex flex-col" @change="handleChange">
        <legend class="font-semibold">Mode</legend>
        <label>
            <input type="radio" name="mode" value="PIN" />
            Pin
        </label>
        <label>
            <input type="radio" name="mode" value="RADIUS" />
            Radius
        </label>
    </fieldset>
</template>

<style scoped></style>
