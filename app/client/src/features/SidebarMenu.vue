<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    title: string;
}>();

const isCollapsed = ref<boolean>(false);
</script>

<template>
    <aside v-if="!isCollapsed" class="flex flex-col bg-white gap-2 p-4 z-9999 min-w-[20rem] w-full h-full fixed md:relative md:w-[20rem]">
        <header class="flex justify-between align-center">
            <h1 class="font-bold text-3xl">{{ title }}</h1>
            <button class="border border-black cursor-pointer" @click="isCollapsed = true">Collapse</button>
        </header>
        <slot></slot>
    </aside>
</template>

<style scoped></style>
