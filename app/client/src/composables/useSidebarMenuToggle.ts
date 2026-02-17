import { inject } from "vue";

/**
 * Toggles SidebarMenu collapse
 * Injects toggle collapse function
 * @returns {(() => void) | undefined} 
 */
export function useSidebarMenuToggle(): (() => void) | undefined {
    const toggleCollapse = inject<() => void>('toggleCollapse');
    return toggleCollapse;
}