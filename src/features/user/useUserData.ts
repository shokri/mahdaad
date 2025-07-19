import { ref, watchEffect, type Ref } from "vue";
import { useMapCache } from "../../lib/useMapCache";
import type { CancelTokenSource } from "axios";
import axios from "axios";
import { fetchUserById } from "./userApi";

export function useUserData(userId: Ref<string | null>) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref<unknown>(null);

  const { get, set, has } = useMapCache<string, any>();

  let cancelToken: CancelTokenSource | null = null;

  watchEffect(async (onInvalidate) => {
    const id = userId.value;
    if (!id) return;
    if (has(id)) {
      data.value = get(id);
      return;
    }

    loading.value = true;
    error.value = null;

    cancelToken?.cancel("Canceled due to userId change");
    cancelToken = axios.CancelToken.source();

    onInvalidate(() => cancelToken?.cancel());

    try {
      const res = await fetchUserById(id, cancelToken?.token);
      set(id, res.data);
      data.value = res.data;
    } catch (err: any) {
      if (!axios.isCancel(err)) {
        error.value = err;
      }
    } finally {
      loading.value = false;
    }
  });

  return { data, loading, error };
}
