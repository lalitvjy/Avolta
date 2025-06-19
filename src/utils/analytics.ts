import * as amplitude from "@amplitude/analytics-browser";

const AMPLITUDE_API_KEY = "1bdb07d29daba89c5e9305942ff33376";

export const initAmplitude = () => {
  amplitude.init(AMPLITUDE_API_KEY, undefined, {
    defaultTracking: true,
  });
};

export const logEvent = (
  eventName: string,
  props?: Record<string, string | number | boolean>
) => {
  amplitude.track(eventName, props);
};

export const logGetStarted = () => logEvent("get-started");

export const logAgreementAccepted = () => logEvent("agreement-accepted");

export const logCaptureImage = () => logEvent("capture-image");

export const logCaptureImageRetake = () => logEvent("capture-image-retake");

export const logUserProfileSave = (email: string, name: string) =>
  logEvent("user-profile-save", {
    email,
    name,
  });

export const logUserProfileSkip = () => logEvent("user-profile-skip");

export const logTryOn = (sku: string, email?: string, name?: string) =>
  logEvent("try-on", {
    sku,
    ...(email && { email }),
    ...(name && { name }),
  });

export const logEmailSkuOpen = (sku: string, email?: string, name?: string) =>
  logEvent("email-sku", {
    sku,
    ...(email && { email }),
    ...(name && { name }),
  });

export const logEmailSkuSend = (sku: string, email?: string, name?: string) =>
  logEvent("email-sku-send", {
    sku,
    ...(email && { email }),
    ...(name && { name }),
  });

export const logEmailSkuClose = (sku: string, email?: string, name?: string) =>
  logEvent("email-sku-close", {
    sku,
    ...(email && { email }),
    ...(name && { name }),
  });

export const logWishlistAdd = (
  page: "try-on" | "catalogue-pdp" | "catalogue-plp"
) => logEvent("wishlist-add", { page });

export const logWishlistRemove = (
  page: "try-on" | "catalogue-pdp" | "catalogue-plp"
) => logEvent("wishlist-remove", { page });

export const logWishlistView = (email?: string, name?: string) =>
  logEvent("wishlist", {
    ...(email && { email: email }),
    ...(name && { Name: name }),
  });

export const logWishlistDelete = (sku: string, email?: string, name?: string) =>
  logEvent("wishlist-delete", {
    sku,
    ...(email && { email }),
    ...(name && { name }),
  });
export const logWishlistReceiveEmail = (
  sku: string,
  email?: string,
  name?: string
) =>
  logEvent("wishlist-receive-email", {
    sku,
    ...(email && { email }),
    ...(name && { name }),
  });

export const logWishlistSendEmail = (
  sku: string,
  email?: string,
  name?: string
) =>
  logEvent("wishlist-send-email", {
    sku,
    ...(email && { email }),
    ...(name && { name }),
  });

export const logWishlistLater = (email?: string, name?: string) =>
  logEvent("wishlist-later", {
    ...(email && { email }),
    ...(name && { name }),
  });

export const logWishlistClose = (email?: string, name?: string) =>
  logEvent("wishlist-close", {
    ...(email && { email }),
    ...(name && { name }),
  });

export const logViewCatalogue = (email?: string, name?: string) =>
  logEvent("view-catalogue", {
    ...(email && { email }),
    ...(name && { name }),
  });
export const logViewCatalogueClose = (email?: string, name?: string) => {
  logEvent("view-catalogue-close", {
    ...(email && { "Email ID": email }),
    ...(name && { Name: name }),
  });
};
export const logViewCatalogueSku = (
  sku: string,
  email?: string,
  name?: string
) =>
  logEvent("view-catalogue-sku", {
    sku,
    ...(email && { email }),
    ...(name && { name }),
  });

export const logViewCatalogueSkuMore = (
  sku: string,
  email?: string,
  name?: string
) =>
  logEvent("view-catalogue-sku-more", {
    sku,
    ...(email && { email }),
    ...(name && { name }),
  });
export const logViewCatalogueSkuLess = (
  sku: string,
  email?: string,
  name?: string
) =>
  logEvent("view-catalogue-sku-less", {
    sku,
    ...(email && { email }),
    ...(name && { name }),
  });
export const logFilterClick = (page: "try-on" | "catalogue") =>
  logEvent("filter", {
    page,
  });

export const logFilterApply = (
  location: "try-on" | "catalogue",
  filterString: string
) => {
  logEvent("filter-apply", {
    location,
    filters: filterString,
  });
};
export const logFilterReset = (
  location: "try-on" | "catalogue",
  filterString: string
) => {
  logEvent("filter-reset", {
    location,
    filters: filterString,
  });
};

export const logGetRecommendations = (
  skus: string[],
  email?: string,
  name?: string
) => {
  logEvent("get-recommendations", {
    SKU: skus.join(", "),
    ...(email && { email: email }),
    ...(name && { Name: name }),
  });
};
export const logGetRecommendationsSend = (
  skus: string[],
  email?: string,
  name?: string
) => {
  logEvent("get-recommendations-send", {
    SKU: skus.join(", "),
    ...(email && { "Email ID": email }),
    ...(name && { Name: name }),
  });
};
