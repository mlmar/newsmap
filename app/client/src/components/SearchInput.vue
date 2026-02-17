<script setup lang="ts">
const props = defineProps<{
    modelValue: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'clear'): void;
}>();

function handleClear() {
    emit('update:modelValue', '');
    emit('clear');
}
</script>

<template>
    <span class="flex w-full relative items-center">
        <input
            class="flex w-full border p-2 rounded-sm focus:outline-none"
            type="text"
            placeholder="Search Filter"
            autofocus="true"
            :value="props.modelValue"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <button v-if="props.modelValue" class="absolute font-bold cursor-pointer text-lg" @click="handleClear">&#10005;</button>
    </span>
</template>

<style scoped>
button {
    right: 1em;
}
</style>
