import { AlertDialog } from "@/ui/components/commons/alert-dialog";
import { IconButton } from "@/ui/components/commons/icon-button";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { EyeIcon, Icon, Pen, Trash } from "lucide-react";
import { UpdateUserForm } from "../update-user-form";

export const ClientsTable = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Table
        className="w-screen md:w-full  "
        shadow="none"
        selectionMode="none"
        bottomContentPlacement="outside"
        bottomContent={
          true && (
            <div className="flex w-full justify-start">
              <Pagination showControls page={1} total={10} />
            </div>
          )
        }
      >
        <TableHeader>
          <TableColumn>NOME</TableColumn>
          <TableColumn>NOME SOCIAL</TableColumn>
          <TableColumn>DATA DE REGISTRO</TableColumn>
          <TableColumn>DEPENDENTES</TableColumn>
          <TableColumn>TITULAR</TableColumn>
          <TableColumn className="flex justify-center items-center">
            ACOES
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Joao</TableCell>
            <TableCell>Pena</TableCell>
            <TableCell>25/02/2006</TableCell>
            <TableCell>Gerson</TableCell>
            <TableCell>{null}</TableCell>
            <TableCell>
              <div className="flex items-center justify-center ">
                <IconButton onClick={onOpen}>
                  <Pen />
                </IconButton>

                <IconButton>
                  <EyeIcon />
                </IconButton>
                <AlertDialog
                  trigger={
                    <IconButton>
                      <Trash />
                    </IconButton>
                  }
                  onConfirm={() => console.log("Legal")}
                >
                  Voce tem certeza que deseja deletar esse usuario?
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Gerson</TableCell>
            <TableCell>Pena</TableCell>
            <TableCell>25/02/2018</TableCell>
            <TableCell>{null}</TableCell>
            <TableCell>Joao</TableCell>
            <TableCell>
              <div className="flex items-center justify-center ">
                <IconButton onClick={onOpen}>
                  <Pen />
                </IconButton>

                <IconButton>
                  <EyeIcon />
                </IconButton>
                <AlertDialog
                  trigger={
                    <IconButton>
                      <Trash />
                    </IconButton>
                  }
                  onConfirm={() => console.log("Legal")}
                >
                  Voce tem certeza que deseja deletar esse usuario?
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader>Editando cliente</DrawerHeader>
              <DrawerBody>
                <UpdateUserForm onCancel={onClose} />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
