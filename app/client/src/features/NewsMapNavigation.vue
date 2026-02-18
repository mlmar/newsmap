<script setup lang="ts">
import { useMapControls } from '@/composables/useMapControl';
import { useMapData } from '@/composables/useMapData';
import { useEventListener } from '@vueuse/core';

const { lastLocationIndex, flyToMarker } = useMapControls();
const { data, isLoading, isError } = useMapData();

/**
 * Move to next previous coordinate in data array
 */
function handlePrevClick() {
    if (!data.value[lastLocationIndex.value - 1]) {
        lastLocationIndex.value = data.value.length - 1;
    } else {
        lastLocationIndex.value--;
    }
    flyToMarker(data.value[lastLocationIndex.value]?.coordinates);
}

/**
 * Move to next coordinate in data array
 */
function handleNextClick() {
    if (!data.value[lastLocationIndex.value + 1]) {
        lastLocationIndex.value = 0;
    } else {
        lastLocationIndex.value++;
    }
    flyToMarker(data.value[lastLocationIndex.value]?.coordinates);
}

useEventListener('keyup', (event: KeyboardEvent) => {
    event.stopImmediatePropagation();
    if (event.shiftKey && event.key === 'ArrowRight') {
        handleNextClick();
    } else if (event.shiftKey && event.key === 'ArrowLeft') {
        handlePrevClick();
    }
});
</script>

<template>
    <nav class="flex fixed gap-2 z-999">
        <button
            class="back-button bg-black text-white p-2 px-4 rounded-sm shadow cursor-pointer transition-[background] hover:bg-(--primary-color)"
            @click="handlePrevClick"
            :disabled="isLoading || isError"
            title="Shift + ArrowLeft"
        >
            &#10094; Back
            <kbd class="sr"> Shortcut: Shift + ArrowLeft </kbd>
        </button>
        <button
            class="next-button bg-black text-white p-2 px-4 rounded-sm shadow cursor-pointer transition-[background] hover:bg-(--primary-color)"
            @click="handleNextClick"
            :disabled="isLoading || isError"
            title="Shift + ArrowRight"
        >
            Next &#10095;
            <kbd class="sr"> Shortcut: Shift + ArrowRight </kbd>
        </button>
    </nav>
</template>

<style scoped lang="less">
nav {
    bottom: 2em;
    right: 2em;

    .hint {
        display: none;
    }
}
</style>
