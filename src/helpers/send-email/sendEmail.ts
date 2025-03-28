export const sendEmail = async ({
  email,
  name,
  purpose,
  objects,
}: {
  email: string;
  name: string;
  purpose: string;
  objects?: {
    brand: string;
    imageUrlBase: string;
    priceDutyFree: number;
    productUrl: string;
    triedOnImage: string;
  }[];
}) => {
  try {
    const res = await fetch("https://glass-tryon.mirrar.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        purpose,
        ...(objects && objects.length > 0 ? { objects } : {}),
      }),
    });

    const result = await res.json();
    if (!res.ok) {
      console.error("Send email error:", result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Failed to send email:", error);
    return null;
  }
};
