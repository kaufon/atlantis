"use client";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@heroui/react";
import { AccomodationsTable } from "./accommodations-table";
import { TypesOfAccommodationsTable } from "./types-of-accommodations-table";
import { RentAccommodationForm } from "./rent-accommodation-form";

export const AccommodationsPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="space-y-16 pt-10">
        <div className="w-full justify-between flex  sm:flex-row flex-col">
          <div className="text-4xl font-black">Alojamentos</div>
          <div>
            <Button color="primary" onPress={onOpen}>
              Hospedar cliente
            </Button>
          </div>
        </div>
        <Tabs variant="underlined">
          <Tab key="accommodations" title="Alojamentos">
            <AccomodationsTable />
          </Tab>
          <Tab key="accommodations-types" title="Tipos de alojamento">
            <TypesOfAccommodationsTable />
          </Tab>
        </Tabs>
      </div>
      <Drawer isOpen={isOpen} size="xl" onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader>Hospedando cliente</DrawerHeader>
              <DrawerBody>
                <RentAccommodationForm onCancel={onClose} />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
