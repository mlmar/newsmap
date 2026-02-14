<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    title: string;
}>();

const isCollapsed = ref<boolean>(false);
</script>

<template>
    <Transition name="collapse">
        <aside
            v-if="!isCollapsed"
            class="flex flex-col bg-white gap-2 p-4 z-9999 min-w-[20rem] w-full h-full fixed md:relative md:w-[20rem] relative shadow-md"
        >
            <header class="flex justify-between align-center">
                <h1 class="font-bold text-3xl">{{ title }}</h1>
            </header>
            <slot></slot>
            <button class="bg-white cursor-pointer collapse-button shadow-md" @click="isCollapsed = !isCollapsed">&#10094;</button>
        </aside>
    </Transition>
    <Transition name="expand">
        <button v-if="isCollapsed" class="bg-white cursor-pointer expand-button z-999" @click="isCollapsed = !isCollapsed">&#10095;</button>
    </Transition>
</template>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
    transition: margin 0.5s ease;
}

.collapse-enter-from,
.collapse-leave-to {
    margin-left: -20rem;
}

.collapse-button,
.expand-button {
    height: 3em;
    width: 2em;
    font-size: 1.2em;
    bottom: 0;
}

.collapse-button {
    position: absolute;
    left: 100%;
}

.expand-button {
    position: fixed;
    left: 0;
}
</style>
