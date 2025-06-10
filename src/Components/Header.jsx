import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/Context";
import useFetch from "@/hooks/useFetch";
import { logout } from "@/utils/apiAuth";
import { BarLoader, BeatLoader } from "react-spinners";

function Header() {
  const navigate = useNavigate();

  const { user, fetchUser, setUser } = UrlState();

  const { loading, fn: Logout } = useFetch(logout);

  return (
    <>
      <nav className="flex items-center justify-between  px-4  text-white">
        <Link to="/">
          <img src="/logo2.png" className="h-24" alt="logo" />
        </Link>
        <div>
          {!user ? (
            <Button onClick={() => navigate("/auth")}>LogIn</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none overflow-hidden ">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className="object-contain"
                  />
                  <AvatarFallback>
                    {user?.user_metadata?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LinkIcon className="h-4 w-4 mr-1" />
                  My Links
                </DropdownMenuItem>
                <DropdownMenuItem className={"text-red-500"}>
                  <LogOut className="h-4 w-4 mr-1 text-red-500 " />
                  <span
                    onClick={() => {
                      Logout().then(() => {
                        setUser(null); // Clear user data from context
                        navigate("/");
                        fetchUser(); // Refresh user data
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" color="#36d7b7" width={"100%"} />}
    </>
  );
}

export default Header;
