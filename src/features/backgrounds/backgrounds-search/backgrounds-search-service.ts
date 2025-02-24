import { BackgroundsSearchApi } from "./backgrounds-search-api";

export function createBackgroundsSearchService(
  backgroundsSearchApi: BackgroundsSearchApi
) {
  return {
    async isSearchHealthOk() {
      return await backgroundsSearchApi.isHealthOk();
    },
  };
}
