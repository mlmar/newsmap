import { ref, watch, type Ref } from "vue";

/**
 * Creates a ref synced to localStorage.
 * Reads the stored value on init, falls back to `defaultValue` if nothing is stored,
 * and persists every subsequent change.
 *
 * Intended to be called at the top level of a module so the ref is a shared constant.
 */
export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
    const stored = localStorage.getItem(key);
    const initial: T = stored !== null ? (JSON.parse(stored) as T) : defaultValue;
    const state = ref<T>(initial) as Ref<T>;

    watch(state, (value) => {
        localStorage.setItem(key, JSON.stringify(value));
    });

    return state;
}
