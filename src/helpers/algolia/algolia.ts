import { algoliasearch } from "algoliasearch";
import { SearchResponse } from "@algolia/client-search";

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const ALGOLIA_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!;

export const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

export const fetchGlasses = async <T>(
  indexName: string = "avolta-glasses",
  query: string,
  page: number = 0,
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
