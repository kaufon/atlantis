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

export const AccomodationsTable = () => {
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
          <TableColumn>HOSPEDE</TableColumn>
          <TableColumn>DOCUMENTO DO HOSPEDE</TableColumn>
          <TableColumn>ALOJAMENTO</TableColumn>
          <TableColumn className="flex justify-center items-center">
            ACOES
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Joao</TableCell>
            <TableCell>490909090312312</TableCell>
            <TableCell>Solteiro Simples</TableCell>
            <TableCell>
              <div className="flex items-center justify-center ">
                <AlertDialog
                  trigger={
                    <IconButton>
                      <Trash />
                    </IconButton>
                  }
                  onConfirm={() => console.log("Legal")}
                >
                  Voce tem certeza que deseja desalojar esse hospede?
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Gerson</TableCell>
            <TableCell>467938</TableCell>
            <TableCell>Super Familia</TableCell>
            <TableCell>
              <div className="flex items-center justify-center ">
                <AlertDialog
                  trigger={
                    <IconButton>
                      <Trash />
                    </IconButton>
                  }
                  onConfirm={() => console.log("Legal")}
                >
                  Voce tem certeza que deseja desalojar esse hospede?
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
