import { Button, Select, SelectItem } from "@heroui/react";

type RentAccommodationFormProps = {
  onConfirm?: VoidFunction;
  onCancel: VoidFunction;
};
export const RentAccommodationForm = ({
  onCancel,
}: RentAccommodationFormProps) => {
  return (
    <div className="space-y-5">
      <div className="space-y-5">
        <Select label="Hospede" radius="sm" size="sm">
          <SelectItem>Joao</SelectItem>
          <SelectItem>Banana</SelectItem>
          <SelectItem>Marcos</SelectItem>
          <SelectItem>Pedro</SelectItem>
        </Select>
        <Select label="Alojamento" radius="sm" size="sm">
          <SelectItem>Casal Simples</SelectItem>
          <SelectItem>Família Simples</SelectItem>
          <SelectItem>Família Mais</SelectItem>
          <SelectItem>Família Super</SelectItem>
          <SelectItem>Solteiro Simples</SelectItem>
          <SelectItem>Solteiro Mais</SelectItem>
        </Select>
      </div>
      <div className="flex items-center gap-5">
        <Button onClick={onCancel} color="success" className="text-white">
          Confirmar
        </Button>
        <Button onClick={onCancel} color="danger">
          Cancelar
        </Button>
      </div>
    </div>
  );
};
