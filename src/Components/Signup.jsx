import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import * as yup from "yup";
import { signup } from "@/utils/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/Context";

function Signup() {
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longUrl = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  //fetching data from the custom hook
  const { data, loading, error, fn: fnSignup } = useFetch(signup, formData);
  const { fetchUser, user } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longUrl ? `createNew=${longUrl}` : ""}`);
      fetchUser(); // Fetch the user data after successful login
    }
  }, [data, error]);

  //Validation logic using Yup
  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
        password: yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: yup.mixed().required("Profile picture is required"),
      });

      // Validate the form data against the schema
      await schema.validate(formData, { abortEarly: false });
      // abortEarly: false is useful when you want to show all form errors at once to the user.

      await fnSignup();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message; // Collect all errors by their path
      });
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>Create a new account to get started</CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-0.5">
            <Input
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={handleInputChange}
            />
            {errors.name && <Error message={errors.name} />}
          </div>
          <div className="space-y-0.5">
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
            />
            {errors.email && <Error message={errors.password} />}
          </div>
          <div className="space-y-1">
            <Input
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
            />
            {errors.profile_pic && <Error message={errors.profile_pic} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignup}>
            {loading ? <BeatLoader size={5} /> : "Create Account"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default Signup;
