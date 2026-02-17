<script setup lang="ts"></script>

<template>
    <div class="flex relative tooltip-container" aria-describedby="tooltip">
        <slot></slot>
        <div class="absolute tooltip text-base font-normal bg-gray-100 border w-90 p-2 z-999" id="tooltip" aria-label="tooltip" role="tooltip">
            <slot name="tooltip"></slot>
        </div>
    </div>
</template>

<style scoped>
.tooltip-container {
    .tooltip {
        display: none;
        top: 60%;
        left: 60%;
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
