import type { Province } from '../types';

export interface DataSourceConfig {
  url?: string;
  cacheKey?: string;
  cacheDuration?: number;
  fallbackData?: Province[];
  onError?: (error: Error) => void;
  onSuccess?: (data: Province[]) => void;
}

const DEFAULT_URL =
  'https://gist.githubusercontent.com/mahdialavitabar/115d131d6fe1f56e1f177aa4c741739d/raw/a070a0fe4f82a8a378c67d42abda3046134ed97c/data.json';

export class DataSource {
  private config: Required<DataSourceConfig>;

  constructor(config: DataSourceConfig = {}) {
    this.config = {
      url: config.url || DEFAULT_URL,
      cacheKey: config.cacheKey || 'iran-regions-provinces-data',
      cacheDuration: config.cacheDuration || 1000 * 60 * 60 * 24,
      fallbackData: config.fallbackData || [],
      onError: config.onError || (() => {}),
      onSuccess: config.onSuccess || (() => {}),
    };
  }

  async fetchProvinces(): Promise<Province[]> {
    try {
      const cachedData = this.getCachedData();
      if (cachedData) {
        this.config.onSuccess(cachedData);
        return cachedData;
      }

      const response = await fetch(this.config.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: expected an array');
      }

      this.setCachedData(data);
      this.config.onSuccess(data);
      return data;
    } catch (error) {
      const errorObj =
        error instanceof Error ? error : new Error(String(error));
      this.config.onError(errorObj);

      const cachedData = this.getCachedData(true);
      if (cachedData) {
        return cachedData;
      }

      return this.config.fallbackData;
    }
  }

  private getCachedData(ignoreExpiry = false): Province[] | null {
    try {
      const cached = localStorage.getItem(this.config.cacheKey);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > this.config.cacheDuration;

      if (!ignoreExpiry && isExpired) {
        localStorage.removeItem(this.config.cacheKey);
        return null;
      }

      if (Array.isArray(data)) {
        return data;
      }
      return null;
    } catch {
      return null;
    }
  }

  private setCachedData(data: Province[]): void {
    try {
      const cacheObject = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(this.config.cacheKey, JSON.stringify(cacheObject));
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  }

  clearCache(): void {
    try {
      localStorage.removeItem(this.config.cacheKey);
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }
}

export const defaultDataSource = new DataSource();
