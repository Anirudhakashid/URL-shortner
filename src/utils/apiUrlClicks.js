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
