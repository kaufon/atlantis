"use client";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import { ClientsTable } from "./clients-table";
import { RegisterUserForm } from "./register-user-form";

export function DashBoardPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="space-y-16 pt-10">
        <div className="w-full justify-between flex  sm:flex-row flex-col">
          <div className="text-4xl font-black">Clientes</div>
          <div>
            <Button onPress={onOpen} color="primary">
              Adicionar cliente
            </Button>
          </div>
        </div>
        <div>
          <ClientsTable />
        </div>
      </div>
      <Drawer isOpen={isOpen} size="2xl" onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader>Adicionando cliente</DrawerHeader>
              <DrawerBody>
                <RegisterUserForm onCancel={onClose} />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
