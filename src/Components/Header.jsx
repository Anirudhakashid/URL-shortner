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

function Header() {
  const navigate = useNavigate();

  const user = false; // Replace with actual user authentication logic

  return (
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
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Anirudha Kashid</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LinkIcon className="h-4 w-4 mr-1" />
                My Links
              </DropdownMenuItem>
              <DropdownMenuItem className={"text-red-500"}>
                <LogOut className="h-4 w-4 mr-1 text-red-500 " />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}

export default Header;
