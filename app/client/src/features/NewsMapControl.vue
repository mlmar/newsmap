<script setup lang="ts">
import { useMapControls } from '@/composables/useMapControl';
import { useMapData } from '@/composables/useMapData';
import { useVisibleMapData } from '@/composables/useVisibleMapData';
import { DisplayModeId, type DisplayMode } from '@/types/DisplayMode';
import type { MapData } from '@newsmap/types';
import { computed, ref } from 'vue';

// Display Mode State
const displayMode = ref<DisplayModeId>(DisplayModeId.locations);
const displayModes: DisplayMode[] = [
    { id: DisplayModeId.locations, label: 'Locations' },
    { id: DisplayModeId.articles, label: 'Articles' },
];

// Map data state
const { flyToMarker } = useMapControls();
const { data } = useMapData();
const { data: visibleMapData } = useVisibleMapData();

// List data should reflect the display mode
const listData = computed<MapData[]>(() => {
    if (!data.value) {
        return [];
    }

    if (displayMode.value === DisplayModeId.locations) {
        return data.value; // Default location data
    } else {
        return data.value.reduce((result: MapData[], item: MapData) => {
            result.push(
                ...item.articles.map((article) => {
                    return {
                        count: item.articles?.length,
                        location: item.location,
                        coordinates: item.coordinates,
                        label: article.title,
                        imageUrl: undefined,
                        articles: [],
                    };
                }),
            );
            return result;
        }, []);
    }
});

// Toggle display mode
function handleChange(event: Event) {
    displayMode.value = (event.target as HTMLInputElement).value as DisplayModeId;
}

/**
 *  Delegate event handler.
 *  Pan to location and open pop up.
 */
async function handleTrendingClick(event: MouseEvent) {
    const li = (event.target as HTMLElement).closest('li');
    const coordinatesString: string | undefined = li?.dataset.coordinates;
    if (coordinatesString) {
        const [lat, long] = coordinatesString.split(',');
        flyToMarker([parseFloat(lat!), parseFloat(long!)]);
    }
}
</script>

<template>
    <h2 class="font-semibold text-blue-600">{{ visibleMapData.length }} / {{ data.length }} Results</h2>
    <fieldset class="flex flex-col" @change="handleChange">
        <legend class="w-full font-semibold border-b-1 py-2">Display Mode</legend>
        <label v-for="mode in displayModes" class="pt-1 cursor-pointer" :key="mode.id">
            <input type="radio" name="mode" :value="mode.id" :checked="displayMode == mode.id" />
            {{ mode.label }}
        </label>
    </fieldset>
    <section v-if="displayMode === DisplayModeId.locations" class="flex flex-col grow overflow-hidden">
        <h2 class="font-semibold border-b-1 py-2">Trending Locations</h2>
        <section class="flex flex-col grow overflow-auto">
            <menu class="flex flex-col list-decimal list-inside" @click="handleTrendingClick">
                <li
                    v-for="item in listData"
                    :key="item.label + item.coordinates!.join()"
                    class="overflow-hidden text-nowrap text-ellipsis cursor-pointer pt-1 hover:text-blue-600"
                    :data-coordinates="item.coordinates"
                    :title="item.label"
                >
                    {{ item.label }}
                </li>
            </menu>
        </section>
    </section>
    <section v-if="displayMode === DisplayModeId.articles" class="flex flex-col grow overflow-hidden">
        <h2 class="font-semibold border-b-1 py-2">Trending Articles</h2>
        <section class="flex flex-col grow overflow-auto">
            <menu class="flex flex-col list-decimal list-inside" @click="handleTrendingClick">
                <li
                    v-for="item in listData"
                    :key="item.label + item.location + item.coordinates!.join()"
                    class="overflow-hidden text-ellipsis cursor-pointer pt-1 hover:text-blue-600"
                    :data-coordinates="item.coordinates"
                    :title="item.location"
                >
                    {{ item.label }} <br />
                    <span class="text-xs font-extralight"> ({{ item.location }}) </span>
                </li>
            </menu>
        </section>
    </section>
</template>

<style scoped>
li {
    content-visibility: auto;

    &::marker {
        font-weight: bold;
    }
}
</style>
