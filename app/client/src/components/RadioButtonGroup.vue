<script setup lang="ts">
defineProps<{
    data: { id: string; label: string }[];
    selectedId: string;
}>();
</script>

<template>
    <fieldset class="flex flex-col items-stretch">
        <div class="flex flex-col gap-2">
            <slot></slot>
            <div class="flex gap-2">
                <label
                    v-for="item in data"
                    :key="item.id"
                    class="flex items-center justify-center basis-50 cursor-pointer text-white p-2 hover:bg-(--primary-color) transition-[background] rounded-sm"
                    :class="{
                        'bg-slate-900': item.id !== selectedId,
                        'bg-(--primary-color) font-semibold': item.id === selectedId,
                    }"
                >
                    <input
                        type="radio"
                        name="mode"
                        :value="item.id"
                        :checked="item.id === selectedId"
                        class="hidden-radio"
                        @change="$emit('update:selectedId', item.id)"
                    />
                    <span class="text-content">{{ item.label }}</span>
                </label>
            </div>
        </div>
    </fieldset>
</template>

<style scoped>
/* Visually hide radio but keep it accessible */
.hidden-radio {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

/* Focus State for Keyboard Users */
label:has(.hidden-radio:focus-visible) {
    outline: 0.1em solid black;
    outline-offset: 0.1em;
}
</style>
