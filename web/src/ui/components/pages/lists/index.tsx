"use client";
import { Button, Tab, Tabs } from "@heroui/react";
import { DependentsTable } from "./dependents-table";
import { GuardiansTable } from "./guardians-table";

export const ListsPage = () => {
  return (
    <>
      <div className="space-y-16 pt-10">
        <div className="w-full justify-between flex  sm:flex-row flex-col">
          <div className="text-4xl font-black">Listagens</div>
        </div>
        <div>
          <Tabs variant="underlined">
            <Tab key="dependents" title="Dependentes">
              <DependentsTable />
            </Tab>
            <Tab key="guardians" title="Responsaveis">
              <GuardiansTable />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};
