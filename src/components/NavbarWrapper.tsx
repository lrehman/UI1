"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Hide Navbar
  const hideNavbarRoutes = ["/", "/login", "/login/forget-pass"]; 

  
  if (hideNavbarRoutes.includes(pathname)) {
    return null; 
  }

  return <Navbar />;
}
