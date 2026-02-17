<script setup lang="ts">
import { useIsMobile } from '@/composables/useIsMobile';
import { provide, ref } from 'vue';

const isMobile = useIsMobile();
const isCollapsed = ref<boolean>(isMobile.value);
function toggleCollapse() {
    isCollapsed.value = !isCollapsed.value;
}

provide<typeof toggleCollapse>('toggleCollapse', toggleCollapse);
</script>

<template>
    <Transition name="collapse">
        <aside v-show="!isCollapsed" class="flex flex-col bg-gray-100 gap-2 p-4 z-9999 w-full h-full shadow-md">
            <header class="flex justify-between align-center">
                <h1 class="flex items-center font-bold text-3xl gap-2">
                    <slot name="title"></slot>
                </h1>
                <button class="font-bold cursor-pointer text-lg hover:text-(--primary-color)" @click="toggleCollapse">&#10005;</button>
            </header>
            <slot></slot>
            <button
                class="bg-(--primary-color) text-white cursor-pointer collapse-button shadow-md rounded-e-sm"
                @click="toggleCollapse"
                aria-label="close button"
            >
                <span> &#10094; </span>
            </button>
        </aside>
    </Transition>
    <Transition name="expand">
        <button v-if="isCollapsed" class="bg-(--primary-color) text-white cursor-pointer expand-button rounded-e-sm z-999" @click="toggleCollapse">
            <span>&#10095;</span>
        </button>
    </Transition>
</template>

<style scoped lang="less">
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
    transition: margin-left 20.5s ease;
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
