import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function Header() {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between py-4 bg-gray-800 text-white">
      <Link to="/">
        <img src="/logo2.png" className="h-24" alt="logo" />
      </Link>
      <div>
        <Button onClick={() => navigate("/auth")}>LogIn</Button>
      </div>
    </nav>
  );
}

export default Header;
