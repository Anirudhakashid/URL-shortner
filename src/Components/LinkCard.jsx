import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Delete, Download, Trash } from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";
import { deleteUrl } from "@/utils/apiUrl";
import { BeatLoader } from "react-spinners";

function LinkCard({ url, fetchUrls }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  //* deleting the url
  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

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

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-[#171717] rounded-lg border-1 relative">
      <img
        src={url?.qr_code}
        className="h-32 object-contain ring ring-blue-600 self-start"
        alt="qr code"
      />
      <Link
        className="flex flex-col flex-1 min-w-0 gap-2 md:gap-0 "
        to={`/link/${url.id}`}
      >
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-2xl break-all text-blue-500 font-bold hover:underline">
          {baseUrl}
          {url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="flex items-center overflow-hidden break-all hover:underline">
          {url?.original_url}
        </span>
        <span className="flex items-end text-sm font-extralight flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2 shrink-0 self-start md:self-start">
        <Button
          variant="ghost"
          className="hover:cursor-pointer"
          onClick={handleCopy}
        >
          <Copy />
        </Button>
        <Button
          className="hover:cursor-pointer"
          variant="ghost"
          onClick={() => {
            downloadImage(url);
          }}
        >
          <Download />
        </Button>
        <Button
          className="hover:cursor-pointer"
          variant="ghost"
          onClick={() =>
            fnDelete().then(() => {
              fetchUrls();
              toast.success("Url Deleted successfully!", {
                duration: 2000,
              });
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
    </div>
  );
}

export default LinkCard;
