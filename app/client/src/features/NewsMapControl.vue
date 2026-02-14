<script setup lang="ts">
import { useMapControls } from '@/composables/useMapControl';
import type { MapData } from '@newsmap/types';

const props = defineProps<{
    data: MapData[];
    visibleMapData: MapData[];
}>();

const { mapRef, markerRefs } = useMapControls();

// function handleChange() {
//     alert('TODO');
// }

/**
 *  Delegate event handler.
 *  Pan to location and open pop up.
 */
function handleLocationClick(event: MouseEvent) {
    const li = (event.target as HTMLElement).closest('li');
    const index: string | undefined = li?.dataset.index;
    if (index) {
        const coordinates = props.data[parseInt(index)]?.coordinates!;
        const leaflet = mapRef.value?.leafletObject!;

        const timeout = 1.2;
        leaflet.flyTo(coordinates, 5, {
            duration: timeout,
        });
        setTimeout(
            () => {
                // Open popup after fly out as elapsed
                const marker = markerRefs.value.get(coordinates.join());
                marker?.leafletObject.openPopup();
            },
            timeout * 1000 + 200,
        );
    }
}
</script>

<template>
    <h2 class="font-semibold text-blue-600">{{ visibleMapData.length }} / {{ data.length }} Results</h2>
    <!-- <fieldset class="flex flex-col" @change="handleChange">
        <legend class="font-semibold">Mode</legend>
        <label>
            <input type="radio" name="mode" value="PIN" />
            Pin
        </label>
        <label>
            <input type="radio" name="mode" value="RADIUS" />
            Radius
        </label>
    </fieldset> -->
    <section class="flex flex-col grow overflow-hidden">
        <h2 class="font-semibold border-b-1 py-2">Trending Locations</h2>
        <section class="flex flex-col grow overflow-auto">
            <menu class="flex flex-col" @click="handleLocationClick">
                <li
                    v-for="(item, i) in data"
                    :key="item.coordinates.join()"
                    class="overflow-hidden text-nowrap text-ellipsis cursor-pointer pt-1 hover:text-blue-600"
                    :data-index="i"
                    :title="item.location"
                >
                    {{ item.location }} <span class="text-xs font-extralight"> ({{ item.count }}) </span>
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
