<script setup lang="ts">
import type { MarkerData } from '@/types/MarkerData';

const props = defineProps<MarkerData>();
</script>

<template>
    <article class="flex flex-col gap-2">
        <h2 class="text-nowrap font-semibold">
            {{ props.location }}
        </h2>
        <label class="italic font-normal"> {{ props.coordinates[0] }}, {{ props.coordinates[1] }} </label>
        <figure class="flex flex-col w-full max-h-10em gap-2 overflow-hidden">
            <img class="object-cover" :src="props.imageUrl" :alt="title" loading="lazy" />
            <label> {{ props.title }}</label>
        </figure>
        <a :href="url" class="text-nowrap text-ellipsis overflow-hidden"> {{ props.url }}</a>
    </article>
</template>

<style scoped></style>
