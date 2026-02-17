import { useWindowSize } from "@vueuse/core";
import { computed, type ComputedRef } from "vue";

const MIN_WIDTH = 768;
export function useIsMobile(minWidth: number = MIN_WIDTH): ComputedRef<boolean> {
    const { width } = useWindowSize();
    return computed(() => width.value <= minWidth)
}