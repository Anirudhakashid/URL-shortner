import { Button } from "@/Components/ui/button";
import { UrlState } from "@/Context";
import useFetch from "@/hooks/useFetch";
import { deleteUrl, getUrl } from "@/utils/apiUrl";
import { getClickForUrl } from "@/utils/apiUrlClicks";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import Location from "@/Components/Location";
import DeviceStats from "@/Components/DeviceStats";

function Link() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  //* Creating a toaster for copying the text
  const handleCopy = async () => {
    const textToCopy = `${baseUrl}${
      url?.custom_url ? url?.custom_url : url?.short_url
    }`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Link Copied to clipboard!", {
        description: textToCopy,
        duration: 2000,
      });
    } catch (err) {
      toast.error("Failed to copy text!", {
        description: "Please try again",
        duration: 2000,
      });
    }
  };

  //* Downloding the qr logic and toaster
  const downloadImage = (url) => {
    const imageUrl = url?.qr_code;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    toast.success("Qr downloaded!", {
      duration: 2000,
    });
  };

  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClickForUrl, { url_id: id });

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader width={"100%"} color="#293197" />
      )}
      <div className="flex flex-col sm:flex-row gap-8 justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-bold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`${baseUrl}${link}`}
            target="_blank"
            className="text-3x1 sm:text-4x1 text-blue-400 font-bold hover:underline
            cursor-pointer"
          >
            {baseUrl}
            {link}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline transition-all duration-200 cursor-pointer break-all"
          >
            <LinkIcon className="w-5 h-5 text-blue-600" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>

          <div className="flex gap-2 shrink-0 self-start md:self-start">
            {/* copy button */}

            <Button
              variant="ghost"
              className="hover:cursor-pointer"
              onClick={handleCopy}
            >
              <Copy />
            </Button>

            {/* download button */}
            <Button
              className="hover:cursor-pointer"
              variant="ghost"
              onClick={() => {
                downloadImage(url);
              }}
            >
              <Download />
            </Button>

            {/* delete button */}
            <Button
              className="hover:cursor-pointer"
              variant="ghost"
              onClick={() =>
                fnDelete().then(() => {
                  toast.success("Url Deleted successfully!", {
                    duration: 2000,
                  });
                  navigate("/dashboard");
                })
              }
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash color="red" />
              )}
            </Button>
          </div>
          <img
            src={url?.qr_code}
            alt="qr_code"
            className=" w-3/5 sm:w-2/5 sm:self-start ring-2 ring-blue-500 object-contain"
          />
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className={" text-4xl font-extrabold"}>
              Statistics
            </CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className={"flex flex-col gap-8"}>
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <Location stats={stats} />
              <CardTitle>Device Data</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No Statistic yet!"
                : "Loading Statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
}

export default Link;
