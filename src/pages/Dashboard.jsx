import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import { Filter } from "lucide-react";
import { UrlState } from "@/Context";
import useFetch from "@/hooks/useFetch";
import { getUrls } from "@/utils/apiUrl";
import { getClicksFromUrl } from "@/utils/apiUrlClicks";
import LinkCard from "@/Components/LinkCard";
import CreateLink from "@/Components/CreateLink";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();

  // fetches URLs created by the user
  const {
    error,
    loading,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  // fetches clicks for each URL
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksFromUrl,
    urls?.map((url) => url.id)
  );

  //  fetches urls when the component mounts
  useEffect(() => {
    fnUrls();
  }, []);

  //and fetches clicks when URLs are available
  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  //filters URLs based on the search query
  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {loading ||
        (loadingClicks && <BarLoader width={"100%"} color="#293197" />)}
      <div className="grid grid-cols-2 gap-4 ">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Filter links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error.message} />}
      {(filteredUrls || []).map((url, i) => {
        return <LinkCard key={i} url={url} fetchUrls={fnUrls} />;
      })}
    </div>
  );
}

export default Dashboard;
