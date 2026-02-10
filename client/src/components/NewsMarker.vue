<script setup lang="ts">
import { type NewsFeature } from '@/types/News';
import { LMarker, LPopup } from '@vue-leaflet/vue-leaflet';

const props = defineProps<{
    item: NewsFeature;
}>();

const coordinates = [props.item.geometry.coordinates[1], props.item.geometry.coordinates[0]];
const date = new Date(props.item.properties.urlpubtimedate).toLocaleDateString();
</script>

<template>
    <LMarker :lat-lng="coordinates">
        <LPopup>
            <article class="flex flex-col gap-2">
                <h2 class="text-nowrap font-semibold">
                    {{ props.item.properties.name }}
                    <label class="italic font-normal"> (Language: {{ props.item.properties.urllangcode }}) </label>
                </h2>
                <figure class="flex flex-col w-full h-10em gap-2">
                    <span class="flex justify-between">
                        <label> Date: {{ date }} </label>
                        <label> Position: {{ coordinates[0] }}, {{ coordinates[1] }} </label>
                    </span>
                    <img
                        class="object-cover"
                        :src="props.item.properties.urlsocialimage"
                        :alt="'Image from article in ' + props.item.properties.name"
                        loading="lazy"
                    />
                </figure>
                <a :href="props.item.properties.url" class="text-nowrap text-ellipsis overflow-hidden"> {{ props.item.properties.url }}</a>
            </article>
        </LPopup>
    </LMarker>
</template>

<style scoped>
figure {
}
</style>
