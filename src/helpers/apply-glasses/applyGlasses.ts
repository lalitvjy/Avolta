export const applyGlasses = async (
  uuid: string,
  selectedGlasses: Record<string, string>
) => {
  try {
    const res = await fetch("/api/apply-glasses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid,
        glasses_urls: selectedGlasses,
      }),
    });

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Failed to apply glasses:", error);
    return null;
  }
};
