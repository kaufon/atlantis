"use client";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import type { ReactNode } from "react";
import { Navbar } from "./navbar";
import { MenuIcon } from "lucide-react";

type DashboardLayoutProps = {
  children: ReactNode;
};
export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex min-h-screen">
      <div className="lg:w-52 hidden lg:block h-screen">
        <Navbar />
      </div>

      <div className="flex-1 mt-20 lg:mt-0 p-6">{children}</div>

      <div className="p-3 lg:hidden fixed top-0 left-0 z-50">
        <Button onPress={onOpen} variant="bordered" className="border-none">
          <MenuIcon />
        </Button>
        <Drawer
          radius="none"
          isOpen={isOpen}
          placement="left"
          className="w-[70%]"
          onOpenChange={onOpenChange}
        >
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="bg-primary">{null}</DrawerHeader>
                <Navbar />
              </>
            )}
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
