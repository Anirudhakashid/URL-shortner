import React from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/Components/Login";
import Signup from "@/Components/Signup";

function Authentication() {
  const [searchParam] = useSearchParams();

  return (
    <>
      <div className="mt-28 flex flex-col items-center gap-10">
        <h1 className="text-5xl font-extrabold">
          {searchParam.get("createNew")
            ? "Kindly log in to continue!"
            : "Login / Signup"}
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
