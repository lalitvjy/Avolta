export interface AlgoliaProduct {
  objectID: string;
  name: string;
  categories?: string;
  localItemCode?: string;
  globalItemCode?: string;
  parentProductId?: string | null;
  brand: string;
  priceDutyFree?: number;
  priceDutyPaid?: number;
  imageUrlBase?: string;
  triedOnUrl?: string;
  asset2DUrl?: string;
  shortDescription?: string | null;
  description?: string | null;
  size?: string;
  gender?: string;
  currency?: string;
  productUrl?: string;
  sku: string;
}
