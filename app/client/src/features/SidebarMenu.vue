<script setup lang="ts">
import { useIsMobile } from '@/composables/useIsMobile';
import { provide, ref } from 'vue';

defineProps<{
    title: string;
}>();

const isMobile = useIsMobile();
const isCollapsed = ref<boolean>(isMobile.value);
function toggleCollapse() {
    isCollapsed.value = !isCollapsed.value;
}

provide<typeof toggleCollapse>('toggleCollapse', toggleCollapse);
</script>

<template>
    <Transition name="collapse">
        <aside v-show="!isCollapsed" class="flex flex-col bg-white gap-2 p-4 z-9999 w-full h-full shadow-md">
            <header class="flex justify-between align-center">
                <h1 class="font-bold text-3xl">{{ title }}</h1>
                <button class="font-bold cursor-pointer text-lg" @click="toggleCollapse">&#10005;</button>
            </header>
            <slot></slot>
            <button class="bg-white cursor-pointer collapse-button shadow-md" @click="toggleCollapse">&#10094;</button>
        </aside>
    </Transition>
    <Transition name="expand">
        <button v-if="isCollapsed" class="bg-white cursor-pointer expand-button z-999" @click="toggleCollapse">&#10095;</button>
    </Transition>
</template>

<style scoped>
aside {
    --sidebar-width: 100dvw;
    position: fixed;

    min-width: var(--sidebar-width);
    width: var(--sidebar-width);
}

@media (width >= 768px) {
    aside {
        --sidebar-width: 20rem;
        position: relative;
    }
}

.collapse-enter-active,
.collapse-leave-active {
    transition: margin-left 0.5s ease;
}

.collapse-enter-from,
.collapse-leave-to {
    margin-left: calc(var(--sidebar-width) * -1);
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
