<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    target: string | undefined;
    text: string | undefined;
}>();

const search = computed<{ first: string | undefined; middle: string | undefined; last: string | undefined }>(() => {
    const index = props.text && props.target ? props.text.toLowerCase().indexOf(props.target) : -1;
    const lastIndex = props.target ? index + props.target.length : 0;

    if (!props.target?.length || index === -1) {
        return {
            first: props.text,
            middle: undefined,
            last: undefined,
        };
    }

    const first = props.text?.slice(0, index);
    const middle = props.text?.slice(index, lastIndex);
    const last = props.text?.slice(lastIndex);

    return {
        first,
        middle,
        last,
    };
});
</script>

<template :key="prosp.target + '_' + props.text">
    {{ search.first }}<span v-if="search.middle" class="font-semibold">{{ search.middle }}</span
    >{{ search.last }}
</template>

<style scoped></style>
