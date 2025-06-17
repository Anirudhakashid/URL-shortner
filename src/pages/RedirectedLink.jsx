import useFetch from "@/hooks/useFetch";
import { storeClicks } from "@/utils/apiUrlClicks";
import { getLongUrl } from "@/utils/apiUrl";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

function RedirectedLink() {
  const { id } = useParams();

  const { loading, data, fn: fnLongUrl } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fnLongUrl();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#293197" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
}

export default RedirectedLink;
