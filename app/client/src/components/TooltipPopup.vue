<script setup lang="ts"></script>

<template>
    <div class="flex relative tooltip-container" aria-describedby="tooltip">
        <slot></slot>
        <div
            class="absolute tooltip text-base font-normal bg-white border border-(--border-color) shadow rounded-sm w-90 p-4 z-999"
            id="tooltip"
            aria-label="tooltip"
            role="tooltip"
        >
            <slot name="tooltip"></slot>
        </div>
    </div>
</template>

<style scoped>
.tooltip-container {
    .tooltip {
        display: none;
        top: 50%;
        left: 50%;
        max-width: 50dvw;
    }

    &:hover,
    &:focus,
    &:focus-within {
        .tooltip {
            display: flex;
        }
    }
}
</style>
