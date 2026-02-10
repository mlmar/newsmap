<script setup lang="ts">
const props = defineProps<{
    visible: boolean;
}>();
</script>

<template>
    <label class="loading-overlay flex fixed text-white text-5xl text-shadow-lg" v-if="props.visible"> <slot></slot> </label>
</template>

<style scoped>
.loading-overlay {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
}
</style>
