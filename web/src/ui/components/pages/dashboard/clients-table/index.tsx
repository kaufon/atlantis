import { fetchCustomers } from "./fetchCustomers";
import { deleteCustomer } from "./deleteCustomer";
import { AlertDialog } from "@/ui/components/commons/alert-dialog";
import { IconButton } from "@/ui/components/commons/icon-button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { Pen, Trash } from "lucide-react";
import { UpdateUserForm } from "../update-user-form";
import type { CustomerDto } from "@/core/dtos/customer.dto";
import { useEffect, useState, useCallback } from "react"; // Adicionado useCallback

const formatDateToDdMmmYyyy = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};


export const ClientsTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Renomeado onOpenChange para onClose para clareza
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchCustomers();
      
      const formattedData = data.map(customer => ({
        ...customer,
        registrationDate: formatDateToDdMmmYyyy(customer.registrationDate)
      }));

      setCustomers(formattedData);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }, []); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdateSuccess = () => {
    onClose();      
    fetchData();   
  };
  
  const handleDeleteSuccess = async (customerId: string) => {
    await deleteCustomer(customerId);
    fetchData(); 
  };

  const handleEditClick = (customerId: string) => {
    setSelectedClientId(customerId);
    onOpen();
  };

  return (
    <>
      <Table
        className="w-screen md:w-full"
        shadow="none"
        selectionMode="none"
        bottomContentPlacement="outside"
      >
        <TableHeader>
          <TableColumn>NOME</TableColumn>
          <TableColumn>NOME SOCIAL</TableColumn>
          <TableColumn>DATA DE REGISTRO</TableColumn>
          <TableColumn className="flex justify-center items-center">AÇÕES</TableColumn>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.socialName}</TableCell>
              <TableCell>{customer.registrationDate}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <IconButton onClick={() => handleEditClick(customer.id as string)}>
                    <Pen />
                  </IconButton>
                  <AlertDialog
                    trigger={
                      <IconButton>
                        <Trash />
                      </IconButton>
                    }
                    onConfirm={() => handleDeleteSuccess(customer.id as string)}
                  >
                    Você tem certeza que deseja deletar este usuário?
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Drawer isOpen={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>Editando cliente</DrawerHeader>
          <DrawerBody>
            {selectedClientId && (
              <UpdateUserForm
                onCancel={onClose}
                onConfirm={handleUpdateSuccess} 
                clientId={selectedClientId}
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
