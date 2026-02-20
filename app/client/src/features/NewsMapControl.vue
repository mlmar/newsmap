<script setup lang="ts">
import HighlightText from '@/components/HighlightText.vue';
import RadioButtonGroup from '@/components/RadioButtonGroup.vue';
import SearchInput from '@/components/SearchInput.vue';
import SelectDropdown from '@/components/SelectDropdown.vue';
import { useDisplayMode } from '@/composables/useDisplayMode';
import { useIsMobile } from '@/composables/useIsMobile';
import { useLanguages } from '@/composables/useLanguages';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { useMapControls } from '@/composables/useMapControl';
import { useMapData } from '@/composables/useMapData';
import { useSidebarMenuToggle } from '@/composables/useSidebarMenuToggle';
import { useVisibleMapData } from '@/composables/useVisibleMapData';
import { DisplayModeId } from '@/types/DisplayMode';
import type { MapData } from '@newsmap/types';
import { computed } from 'vue';

// From SidebarMenu
const isMobile = useIsMobile();
const toggleCollapse = useSidebarMenuToggle();

// Search filter
const searchFilter = useLocalStorage<string>('newsmap_search_filter', '');

// Display Mode State
const { displayMode, displayModes } = useDisplayMode();

// Language State
const { languages, selectedLanguage } = useLanguages();

// Map data state — watches selectedLanguage and refetches automatically
const { lastLocationIndex, flyToMarker } = useMapControls();
const { data, isLoading, isError } = useMapData(selectedLanguage);
const { data: visibleMapData } = useVisibleMapData();

// List data should reflect the display mode
const listData = computed<MapData[]>(() => {
    if (!data.value) {
        return [];
    }

    if (displayMode.value === DisplayModeId.Locations) {
        // Default location data (single location to single coordinate)
        return data.value;
    } else {
        // Convert article arrays to single points (many articles to single coordinate)
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

const filteredData = computed<MapData[]>(() => {
    if (!searchFilter.value) {
        return listData.value;
    }

    return listData.value.filter((item) => {
        return item.location?.toLocaleLowerCase().includes(searchFilter.value) || item.label?.toLowerCase().includes(searchFilter.value);
    });
});

/**
 *  Delegate event handler.
 *  Pan to location and open pop up.
 */
async function handleTrendingClick(event: MouseEvent) {
    const li = (event.target as HTMLElement).closest('li');
    const coordinatesString: string | undefined = li?.dataset.coordinates;
    if (coordinatesString) {
        lastLocationIndex.value = data.value.findIndex((item) => item.coordinates.join() === coordinatesString); // Find current index of selected coordinates

        const [lat, long] = coordinatesString.split(','); // Fly to coordinates
        flyToMarker([parseFloat(lat!), parseFloat(long!)], {
            scroll: false,
        });

        if (toggleCollapse && isMobile.value) {
            // Collapse menu on mobile screens
            toggleCollapse();
        }
    }
}
</script>

<template>
    <h2 class="font-semibold text-(--primary-color)">
        <template v-if="isLoading"> Loading Map Data </template>
        <template v-else-if="isError"> Failed to Load Map Data </template>
        <template v-else-if="data.length"> {{ visibleMapData.length }} / {{ data.length }} Locations </template>
    </h2>
    <RadioButtonGroup :data="displayModes" v-model:selected-id="displayMode">
        <legend class="w-full font-semibold py-2 border-b-2 border-gray-300">Display & Language</legend>
    </RadioButtonGroup>
    <SelectDropdown :data="languages" v-model:selected-id="selectedLanguage" :disabled="isLoading || !languages.length"> </SelectDropdown>
    <section v-if="displayMode === DisplayModeId.Locations" class="flex flex-col grow overflow-hidden gap-2">
        <h2 class="font-semibold py-2 border-b-2 border-gray-300">Trending Locations</h2>
        <section class="flex flex-col grow overflow-auto">
            <menu class="flex flex-col list-decimal list-inside gap-2" @click="handleTrendingClick">
                <li
                    v-for="item in filteredData"
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
                    v-for="item in filteredData"
                    :key="item.label + item.location + item.coordinates!.join()"
                    class="cursor-pointer p-2 bg-white border-1 border-(--border-color) rounded-sm hover:text-(--primary-color)"
                    :data-coordinates="item.coordinates"
                    :title="item.location"
                >
                    <HighlightText :target="searchFilter" :text="item.label" />
                    <br />
                    <span class="text-xs font-extralight"> <HighlightText :target="searchFilter" :text="`(${item.location})`" /> </span>
                </li>
            </menu>
        </section>
    </section>
    <SearchInput v-model="searchFilter" :disabled="isLoading" />
</template>

<style scoped lang="less">
li {
    content-visibility: auto;

    &::marker {
        font-weight: bold;
    }
}
</style>
