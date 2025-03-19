import { algoliasearch } from "algoliasearch";
import { SearchResponse } from "@algolia/client-search";

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const ALGOLIA_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!;

export const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

export const fetchGlasses = async <T>(
  indexName: string,
  query: string,
  page: number,
  filters?: string,
  sortOrder?: string
): Promise<SearchResponse<T>> => {
  try {
    let sortedIndex = indexName;
    if (sortOrder === "lowToHigh") {
      sortedIndex = `${indexName}-asc`;
    } else if (sortOrder === "highToLow") {
      sortedIndex = `${indexName}-desc`;
    }

    const response = await client.searchSingleIndex<T>({
      indexName: sortedIndex,
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

    const brands = Object.entries(response.facets?.brand || {}).map(
      ([name, count]) => ({
        name,
        count: Number(count),
      })
    );

    const prices = Object.keys(response.facets?.priceDutyFree || {})
      .map(Number)
      .sort((a, b) => a - b);

    return { brands, prices };
  } catch (error) {
    console.error("Error fetching facets from Algolia:", error);
    return { brands: [], prices: [] };
  }
};
