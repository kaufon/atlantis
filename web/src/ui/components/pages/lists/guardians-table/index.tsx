
import {
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

export const GuardiansTable = () => {
  return (
    <>
      <Table
        className="w-screen md:w-full  "
        shadow="none"
        selectionMode="none"
        bottomContentPlacement="outside"
        topContent={
          <Select label="Dependente" size="sm">
            <SelectItem>Pedrinho</SelectItem>
            <SelectItem>Marquinho</SelectItem>
          </Select>
        }
        topContentPlacement="outside"
      >
        <TableHeader>
          <TableColumn>NOME DO RESPONSAVEL</TableColumn>
          <TableColumn>DOCUMENTO</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Walker Lorota</TableCell>
            <TableCell>3890172</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
