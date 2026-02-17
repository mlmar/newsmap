<script setup lang="ts">
import HighlightText from '@/components/HighlightText.vue';
import RadioButtonGroup from '@/components/RadioButtonGroup.vue';
import SearchInput from '@/components/SearchInput.vue';
import { useDisplayMode } from '@/composables/useDisplayMode';
import { useIsMobile } from '@/composables/useIsMobile';
import { useMapControls } from '@/composables/useMapControl';
import { useMapData } from '@/composables/useMapData';
import { useSidebarMenuToggle } from '@/composables/useSidebarMenuToggle';
import { useVisibleMapData } from '@/composables/useVisibleMapData';
import { DisplayModeId } from '@/types/DisplayMode';
import type { MapData } from '@newsmap/types';
import { computed, ref } from 'vue';

// From SidebarMenu
const isMobile = useIsMobile();
const toggleCollapse = useSidebarMenuToggle();

// Search filter
const searchFilter = ref<string>('');

// Display Mode State
const { displayMode, displayModes } = useDisplayMode();

// Map data state
const { flyToMarker } = useMapControls();
const { data, isLoading, isError } = useMapData();
const { data: visibleMapData } = useVisibleMapData();

// List data should reflect the display mode
const listData = computed<MapData[]>(() => {
    if (!data.value) {
        return [];
    }

    let filteredData = [];
    if (displayMode.value === DisplayModeId.Locations) {
        filteredData = data.value; // Default location data
    } else {
        filteredData = data.value.reduce((result: MapData[], item: MapData) => {
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

    filteredData = filteredData.filter((item) => {
        return item.label?.toLowerCase().includes(searchFilter.value);
    });

    return filteredData;
});

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
        if (toggleCollapse && isMobile.value) {
            toggleCollapse();
        }
    }
}
</script>

<template>
    <h2 class="font-semibold text-(--primary-color)">
        <template v-if="data.length"> {{ visibleMapData.length }} / {{ data.length }} Locations </template>
        <template v-if="isLoading"> Loading Map Data </template>
        <template v-if="isError"> Failed to Load Map Data </template>
    </h2>
    <SearchInput v-model="searchFilter" :disabled="isLoading" />
    <RadioButtonGroup :data="displayModes" v-model:selected-id="displayMode">
        <legend class="w-full font-semibold py-2 border-b-2 border-gray-300">Display</legend>
    </RadioButtonGroup>
    <section v-if="displayMode === DisplayModeId.Locations" class="flex flex-col grow overflow-hidden gap-2">
        <h2 class="font-semibold py-2 border-b-2 border-gray-300">Trending Locations</h2>
        <section class="flex flex-col grow overflow-auto">
            <menu class="flex flex-col list-decimal list-inside gap-2" @click="handleTrendingClick">
                <li
                    v-for="item in listData"
                    :key="item.label + item.coordinates!.join()"
                    class="cursor-pointer p-2 bg-white border-1 border-(--border-color) rounded-sm hover:text-(--primary-color)"
                    :data-coordinates="item.coordinates"
                    :title="item.label"
                >
                    <HighlightText :target="searchFilter" :text="item.label" />
                </li>
            </menu>
        </section>
    </section>
    <section v-if="displayMode === DisplayModeId.Articles" class="flex flex-col grow overflow-hidden gap-2">
        <h2 class="font-semibold py-2 border-b-2 border-gray-300">Trending Articles</h2>
        <section class="flex flex-col grow overflow-auto">
            <menu class="flex flex-col list-decimal list-inside gap-2" @click="handleTrendingClick">
                <li
                    v-for="item in listData"
                    :key="item.label + item.location + item.coordinates!.join()"
                    class="cursor-pointer p-2 bg-white border-1 border-(--border-color) rounded-sm hover:text-(--primary-color)"
                    :data-coordinates="item.coordinates"
                    :title="item.location"
                >
                    <HighlightText :target="searchFilter" :text="item.label" />
                    <br />
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
