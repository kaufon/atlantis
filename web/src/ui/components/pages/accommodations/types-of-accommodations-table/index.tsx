import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

export const TypesOfAccommodationsTable = () => {
  const rooms = [
    {
      name: "Casal Simples",
      singleBed: 0,
      doubleBed: 1,
      suite: 1,
      airConditioning: "Sim",
      garage: 1,
    },
    {
      name: "Família Simples",
      singleBed: 2,
      doubleBed: 1,
      suite: 1,
      airConditioning: "Sim",
      garage: 1,
    },
    {
      name: "Família Mais",
      singleBed: 5,
      doubleBed: 1,
      suite: 2,
      airConditioning: "Sim",
      garage: 2,
    },
    {
      name: "Família Super",
      singleBed: 6,
      doubleBed: 2,
      suite: 3,
      airConditioning: "Sim",
      garage: 2,
    },
    {
      name: "Solteiro Simples",
      singleBed: 1,
      doubleBed: 0,
      suite: 1,
      airConditioning: "Sim",
      garage: 0,
    },
    {
      name: "Solteiro Mais",
      singleBed: 0,
      doubleBed: 1,
      suite: 1,
      airConditioning: "Sim",
      garage: 1,
    },
  ];

  return (
    <Table
      className="w-screen md:w-full"
      shadow="none"
      selectionMode="none"
    >
      <TableHeader>
        <TableColumn>NOME</TableColumn>
        <TableColumn>CAMAS DE SOLTEIRO</TableColumn>
        <TableColumn>CAMAS DE CASAL</TableColumn>
        <TableColumn>SUITES</TableColumn>
        <TableColumn>AR CONDICIONADO</TableColumn>
        <TableColumn>GARAGENS</TableColumn>
      </TableHeader>
      <TableBody>
        {rooms.map((room, index) => (
          <TableRow key={index}>
            <TableCell>{room.name}</TableCell>
            <TableCell>{room.singleBed}</TableCell>
            <TableCell>{room.doubleBed}</TableCell>
            <TableCell>{room.suite}</TableCell>
            <TableCell>{room.airConditioning}</TableCell>
            <TableCell>{room.garage}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
