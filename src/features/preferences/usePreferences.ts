import { ref, watch } from "vue";

const DEFAULT_THEME = import.meta.env.VITE_DEFAULT_THEME
const DEFAULT_FONTSIZE = import.meta.env.VITE_DEFAULT_FONTSIZE

export function usePreferences() {
    const theme = ref<string>(localStorage.getItem('theme') || DEFAULT_THEME)
    const fontSize = ref<string>(localStorage.getItem('fontSize') || DEFAULT_FONTSIZE)

    watch(theme, val => localStorage.setItem('theme', val), { immediate: true })
    watch(fontSize, val => localStorage.setItem('fontSize', val), { immediate: true })

    return {
        theme,
        fontSize
    }
}