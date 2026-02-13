<script setup lang="ts">
import { useMapControls } from '@/composables/useMapControl';
import type { MapData } from '@newsmap/types';

const props = defineProps<{
    data: MapData[];
    visibleMapData: MapData[];
}>();

const { mapRef } = useMapControls();

function handleChange() {
    alert('TODO');
}

/**
 *  Delegate event handler
 */
function handleLocationClick(event: MouseEvent) {
    const index: string | undefined = (event.target as HTMLLIElement)!.dataset.index;
    if (index) {
        const coordinates = props.data[parseInt(index)]?.coordinates;
        const leaflet = mapRef.value?.leafletObject!;
        leaflet.flyTo(coordinates);
    }
}
</script>

<template>
    <h2 class="font-semibold">{{ visibleMapData.length }} / {{ data.length }} Results</h2>
    <fieldset class="flex flex-col" @change="handleChange">
        <legend class="font-semibold">Mode</legend>
        <label>
            <input type="radio" name="mode" value="PIN" />
            Pin
        </label>
        <label>
            <input type="radio" name="mode" value="RADIUS" />
            Radius
        </label>
    </fieldset>
    <section class="flex flex-col gap-2 grow overflow-hidden">
        <h2 class="font-semibold">Trending Locations</h2>
        <section class="flex flex-col grow overflow-auto">
            <menu class="flex flex-col" @click="handleLocationClick">
                <li
                    v-for="(item, i) in data"
                    :key="item.coordinates.join()"
                    class="overflow-hidden text-nowrap text-ellipsis cursor-pointer pt-1 pb-1 hover:text-blue-600"
                    :data-index="i"
                >
                    {{ item.location }} ({{ item.count }})
                </li>
            </menu>
        </section>
    </section>
</template>

<style scoped>
li {
    content-visibility: auto;
}
</style>
