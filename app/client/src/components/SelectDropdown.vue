<script setup lang="ts">
defineProps<{
    data: { id: string; label: string }[];
    selectedId: string;
    disabled?: boolean;
}>();
</script>

<template>
    <fieldset class="flex flex-col gap-2">
        <slot></slot>
        <div class="flex flex-col py-2">
            <select
                :value="selectedId"
                :disabled="disabled"
                class="w-full p-2 border-1 border-(--border-color) rounded-sm bg-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                @change="$emit('update:selectedId', ($event.target as HTMLSelectElement).value)"
            >
                <option v-for="item in data" :key="item.id" :value="item.id">
                    {{ item.label }}
                </option>
            </select>
        </div>
    </fieldset>
</template>

<style scoped>
select {
    appearance: base-select;
}
select::picker-icon {
    margin-right: 0.1em; /* Adjust positioning */
}
</style>
