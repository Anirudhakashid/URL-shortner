import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Delete, Download } from "lucide-react";
import { toast } from "sonner";
import { hover } from "motion";

function LinkCard({ url, fetchUrls }) {
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

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-[#171717] rounded-lg border-1">
      <img
        src={url?.qr_code}
        className="h-32 object-contain ring ring-blue-600 self-start"
        alt="qr code"
      />
      <Link className="flex flex-col flex-1" to={`/link/${url.id}`}>
        <span className="text-3xl font-extrabold hover:underline cursor-pointer ">
          {url?.title}
        </span>
        <span className="text-2xl text-blue-500 font-bold hover:underline">
          {baseUrl}
          {url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="flex items-center hover:underline">
          {url?.original_url}
        </span>
        <span className="flex items-end text-sm font-extralight flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className=" flex gap-2">
        <Button
          variant="ghost"
          className="hover: cursor-pointer"
          onClick={handleCopy}
        >
          <Copy />
        </Button>
        <Button className="hover: cursor-pointer" variant="ghost">
          <Download />
        </Button>
        <Button className="hover: cursor-pointer" variant="ghost">
          <Delete />
        </Button>
      </div>
    </div>
  );
}

export default LinkCard;
