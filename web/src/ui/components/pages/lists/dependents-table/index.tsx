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

export const DependentsTable = () => {
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
        topContent={
          <Select label="Responsavel" size="sm">
            <SelectItem>Joao</SelectItem>
            <SelectItem>Marcos</SelectItem>
          </Select>
        }
        topContentPlacement="outside"
      >
        <TableHeader>
          <TableColumn>NOME DO DEPENDENTE</TableColumn>
          <TableColumn>DOCUMENTO</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Pedro</TableCell>
            <TableCell>47839748392</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Joaozinho</TableCell>
            <TableCell>3890172</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
