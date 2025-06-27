"use client";
import { Logo } from "@/ui/components/commons/logo";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NavBarRoot,
} from "@heroui/react";
import { Hotel, NotebookTabs, User } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <>
      <NavBarRoot className="bg-primary h-full">
        <NavbarContent
          className="flex-col justify-start h-screen  gap-10   w-full   text-white"
          justify="start"
        >
          <NavbarItem className="mt-10 flex items-center justify-center">
            <Logo />
          </NavbarItem>
          <NavbarItem className=" flex items-center justify-start pl-4  w-full">
            <Link href="/">
              <div className="flex justify-start gap-4">
                <User />
                Clientes
              </div>
            </Link>
          </NavbarItem>
          <NavbarItem className="flex items-center justify-start pl-4 w-full">
            <Link href="/accommodations">
              <div className="flex justify-center gap-4">
                <Hotel />
                Alojamentos
              </div>
            </Link>
          </NavbarItem>
          <NavbarItem className="flex items-center justify-start pl-4 w-full">
            <Link href="/lists">
              <div className="flex justify-center gap-4">
                <NotebookTabs />
                Listagens
              </div>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavBarRoot>
    </>
  );
};
