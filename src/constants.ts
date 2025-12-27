// Data source configuration
export const DEFAULT_DATA_URL =
  'https://gist.githubusercontent.com/mahdialavitabar/115d131d6fe1f56e1f177aa4c741739d/raw/a070a0fe4f82a8a378c67d42abda3046134ed97c/data.json';

export const DEFAULT_CACHE_KEY = 'iran-regions-provinces-data';
export const DEFAULT_CACHE_DURATION_MS = 1000 * 60 * 60 * 24; // 24 hours

// Virtual scrolling defaults
export const DEFAULT_ITEM_HEIGHT = 36;
export const DEFAULT_CONTAINER_HEIGHT = 300;
export const DEFAULT_VIRTUAL_SCROLL_BUFFER = 5;
export const VIRTUAL_SCROLL_THRESHOLD = 100; // Enable virtual scroll when options > 100

// Debounce and throttle defaults
export const DEFAULT_SEARCH_DEBOUNCE_MS = 150;
export const DEFAULT_SCROLL_THROTTLE_MS = 16; // ~60fps

// Animation defaults
export const DEFAULT_ANIMATION_DURATION_MS = 200;
export const DEFAULT_ANIMATION_EASING = 'ease';
