"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // TEMP (later replace with real auth)
    setCurrentUser({
      name: "राम कुमार",
      role: "user",
    });
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return <Navbar/>;
}
