import { UrlState } from "@/Context";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/Components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/useFetch";
import { createUrl } from "@/utils/apiUrl";
import { BeatLoader } from "react-spinners";

function CreateLink() {
  const ref = useRef();
  const { user } = UrlState();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const longLink = searchParam.get("createNew");

  const [errors, setErrors] = useState();
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is requires"),
    longUrl: yup
      .string()
      .url("Must be a valid url")
      .required("Long url is required"),
    customUrl: yup.string(),
  });

  //* updates the value whenever there is change in the input assigns [value] to [id]
  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, user_id: user.id });

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [data, error]);

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });

      const canvas = ref.current.canvasRef.current;
      //* converts the image of qr into a binary data format
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParam({});
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive" className={"hover:cursor-pointer"}>
          Create new Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-m">
        <DialogHeader>
          <DialogTitle className={"font-extrabold text-2xl"}>
            Create New
          </DialogTitle>
          <DialogDescription>
            Enter the details for your new Link
          </DialogDescription>
          {formValues?.longUrl && (
            <QRCode value={formValues?.longUrl} size={250} ref={ref} />
          )}
        </DialogHeader>
        <Input
          id="title"
          placeholder="Short Link's title"
          value={formValues.title}
          onChange={handleInputChange}
        />
        {errors?.title && <Error message={errors.title} />}

        <Input
          id="longUrl"
          placeholder="Enter Yout Looong Url"
          value={formValues.longUrl}
          onChange={handleInputChange}
        />
        {errors?.longUrl && <Error message={errors.longUrl} />}

        <div className="flex items-center gap-2">
          <Card className="px-2 py-1">shrnk.in</Card> /
          <Input
            id="customUrl"
            placeholder="Custom Url (optional)"
            value={formValues.customUrl}
            onChange={handleInputChange}
          />
        </div>

        {error && <Error message={error} />}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className={"hover:cursor-pointer"}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={loading}
            onClick={createNewLink}
            className={"hover:cursor-pointer"}
          >
            {loading ? (
              <BeatLoader size={10} color="white" />
            ) : (
              "Create New Link"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateLink;
