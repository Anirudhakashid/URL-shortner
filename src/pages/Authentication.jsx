import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import Login from "@/Components/Login";
import Signup from "@/Components/Signup";
import { UrlState } from "@/Context";

function Authentication() {
  const [searchParam] = useSearchParams();
  const longLink = searchParam.get("createNew");
  const navigate = useNavigate();

  const { loading, isAuthenticated } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [isAuthenticated, loading]);

  return (
    <>
      <div className="mt-28 flex flex-col items-center gap-10">
        <h1 className="text-5xl font-extrabold">
          {longLink ? "Kindly log in to continue!" : "Login / Signup"}
        </h1>
        <Tabs defaultValue="Login" className="w-[400px]">
          <TabsList className={"grid w-full grid-cols-2"}>
            <TabsTrigger value="Login">Login</TabsTrigger>
            <TabsTrigger value="Signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="Login">
            <Login />
          </TabsContent>

          <TabsContent value="Signup">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Authentication;
