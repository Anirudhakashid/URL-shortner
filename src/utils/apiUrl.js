import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error.message);
    throw new Error("Failed to fetch URLs");
  }

  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Failed to fetch URLs");
  }

  return data;
}

export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  //* generating a short URL
  const short_url = Math.random().toString(36).substring(2, 6);

  //*Logic for uploding qrcode
  const fileName = `qr-${short_url}`;
  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  //* creating the url
  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        short_url,
        custom_url: customUrl || null,
        user_id,
        qr_code: qr,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Error creating short URL");
  }

  return data;
}

export async function getLongUrl(id) {
  const { error, data } = await supabase
    .from("urls")
    .select("id,original_url")
    .or(`short_url.eq.${id}, custom_url.eq.${id}`)
    .maybeSingle();

  if (error) {
    console.error(error.message);
    throw new Error("Error fetching long url");
  }
  return data;
}

export async function getUrl({ id, user_id }) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Error fetching the url");
  }
  return data;
}

export async function getCustomUrl(custom_url) {
  const { data, error } = await supabase
    .from("urls")
    .select("id")
    .eq("custom_url", custom_url)
    .maybeSingle();

  if (error) {
    console.error("Error checking custom URL:", error.message);
    throw new Error("Failed to check custom URL");
  }

  return data;
}
