import axios, { AxiosError } from "axios";

interface CircuitBreakerOptions {
  failureThreshold: number;
  cooldownMs: number;
}

export function createCircuitBreakerApi(options: CircuitBreakerOptions) {
  let failureCount = 0;
  let circuitOpen = false;
  let lastFailureTime = 0;

  const api = axios.create();

  api.interceptors.request.use((config) => {
    if (circuitOpen && Date.now() - lastFailureTime < options.cooldownMs) {
      console.warn("Circuit is open skipping request");
      return Promise.reject(new AxiosError("Circuit is open", config));
    }

    return config;
  });

  api.interceptors.response.use(
    (res) => {
      failureCount = 0;
      return res;
    },
    (err) => {
        failureCount++
        if(failureCount >= options.failureThreshold) {
            circuitOpen = true
            lastFailureTime = Date.now()
            setTimeout(() => {
                circuitOpen = false
                failureCount = 0
            }, options.cooldownMs)
            console.warn('circuit breaker triggered. cooling down...')
        }
        return Promise.reject(err)
    }
  );

  return api
}
