import { shallowRef } from "vue";

export function useMapCache<k, v>() {
    const cache = shallowRef(new Map<k, v>())

    function get(key: k): v | undefined {
        return cache.value.get(key)
    }

    function set(key: k, value: v): void {
        cache.value.set(key, value)
    }

    function has(key: k): boolean {
        return cache.value.has(key)
    }

    return { get, set, has}
}