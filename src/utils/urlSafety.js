import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_CLOUD_API;

export async function checkUrlSafety(url) {
  try {
    const response = await axios.post(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`,
      {
        client: {
          clientId: "bitSnip",
          clientVersion: "1.0",
        },
        threatInfo: {
          threatTypes: [
            "MALWARE",
            "SOCIAL_ENGINEERING",
            "UNWANTED_SOFTWARE",
            "POTENTIALLY_HARMFUL_APPLICATION",
          ],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url }],
        },
      }
    );

    const hasThreats =
      response.data.matches && response.data.matches.length > 0;
    return !hasThreats; // true = safe, false = unsafe
  } catch (err) {
    console.error("Error checking URL:", err.message);
    return false; // assume unsafe on error
  }
}
