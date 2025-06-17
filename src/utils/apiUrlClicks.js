import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getClicksFromUrl(urlIds) {
  const { data, error } = await supabase
    .from("url_clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error(error.message);
    throw new Error("Failed to fetch URL clicks");
  }

  return data;
}

// getting the device info and other insights from urlClicks
const parser = new UAParser(); // detects browser and device type

export const storeClicks = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";

    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();

    await supabase.from("url_clicks").insert({
      url_id: id,
      country: country,
      city: city,
      device: device,
    });

    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error recording the click", error);
  }
};

export async function getClickForUrl({ url_id }) {
  const { data, error } = await supabase
    .from("url_clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error("Unable to load stats", error);
  }
  return data;
}
