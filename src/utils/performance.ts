export interface VirtualScrollConfig {
  itemHeight: number;
  containerHeight: number;
  buffer?: number;
}

export function calculateVisibleRange(
  scrollTop: number,
  config: VirtualScrollConfig,
): { start: number; end: number } {
  const { itemHeight, containerHeight, buffer = 5 } = config;
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const end = start + visibleCount + buffer * 2;

  return { start, end };
}

type AnyFunction = (...args: any[]) => any;

export interface DebouncedFunction<T extends AnyFunction> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

export function debounce<T extends AnyFunction>(
  func: T,
  wait: number,
): DebouncedFunction<T> {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const executedFunction = function (...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  } as DebouncedFunction<T>;

  executedFunction.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return executedFunction;
}

export interface ThrottledFunction<T extends AnyFunction> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

export function throttle<T extends AnyFunction>(
  func: T,
  limit: number,
): ThrottledFunction<T> {
  let inThrottle: boolean = false;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const executedFunction = function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      timeout = setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  } as ThrottledFunction<T>;

  executedFunction.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    inThrottle = false;
  };

  return executedFunction;
}

export function memoize<T extends AnyFunction>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn(...args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  }) as T;
}
