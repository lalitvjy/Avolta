import { algoliasearch } from "algoliasearch";
import { SearchResponse } from "@algolia/client-search";

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const ALGOLIA_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!;

export const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

export const fetchGlasses = async <T>(
  indexName: string,
  query: string,
  page: number,
  filters?: string
): Promise<SearchResponse<T>> => {
  try {
    const response = await client.searchSingleIndex<T>({
      indexName,
      searchParams: {
        query,
        page,
        filters,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching data from Algolia:", error);
    throw error;
  }
};
export const fetchFacets = async (indexName: string) => {
  try {
    const response = await client.searchSingleIndex({
      indexName,
      searchParams: {
        query: "",
        facets: ["brand", "priceDutyFree"],
      },
    });

    return {
      brands: Object.keys(response.facets?.brand || {}),
      prices: Object.keys(response.facets?.priceDutyFree || {})
        .map(Number)
        .sort((a, b) => a - b),
    };
  } catch (error) {
    console.error("Error fetching facets from Algolia:", error);
    return { brands: [], prices: [] };
  }
};
