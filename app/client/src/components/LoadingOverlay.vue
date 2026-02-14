<script setup lang="ts">
defineProps<{
    visible: boolean;
}>();
</script>

<template>
    <div class="loading-overlay flex fixed items-center justify-center" v-if="visible">
        <span class="flex fixed text-white text-5xl"></span>
        <slot></slot>
    </div>
</template>

<style scoped>
.loading-overlay {
    --border-size: 0.3em;
    width: 100%;
    height: 100%;
    z-index: 9999;

    span {
        border: var(--border-size) solid black;
        height: 3em;
        width: 3em;
        border-radius: 100%;
        border-top: solid var(--border-size) transparent;
        animation: spin infinite 1s forwards linear;
        mix-blend-mode: multiply;
    }
}

@keyframes spin {
    0% {
        rotate: 0deg;
    }
    100% {
        rotate: 360deg;
    }
}
</style>
