<script setup lang="ts">
import type { MapData } from '@newsmap/types';

const props = defineProps<MapData>();

function handleClick() {
    console.log(props);
}
</script>

<template>
    <article class="flex flex-col gap-2" @click="handleClick">
        <h2 class="text-lg text-nowrap font-bold text-ellipsis overflow-hidden" :title="location">
            {{ location }}
        </h2>
        <figure class="flex flex-col w-full max-h-[15em] gap-2 overflow-hidden">
            <img class="object-cover" :src="imageUrl" :alt="imageUrl" loading="lazy" />
        </figure>
        <section class="flex flex-col gap-2">
            <h3 class="font-semibold py-2 border-b-1">Articles</h3>
            <ul class="flex flex-col gap-2">
                <li v-for="article in articles" :key="article.url">
                    <a class="hover:underline" :href="article.url" :title="article.title"> {{ article.title }}</a>
                </li>
            </ul>
        </section>
    </article>
</template>

<style scoped></style>
