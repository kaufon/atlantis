import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";

type RegisterUserFormProps = {
  onConfirm?: VoidFunction
  onCancel:VoidFunction
}
export const RegisterUserForm = ({onCancel}:RegisterUserFormProps) => {
  return (
    <>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Input
            radius="sm"
            labelPlacement="outside"
            name="username"
            placeholder="Nome"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            name="socialName"
            placeholder="Nome social"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            name="birthDate"
            placeholder="Data de nascimento"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            name="registrationDate"
            placeholder="Data de registro"
            type="text"
          />
        </div>
        <Divider />
        <div className="grid-cols-2 grid gap-4">
          <Input
            radius="sm"
            labelPlacement="outside"
            name="street"
            placeholder="Rua"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            name="neighborhood"
            placeholder="Bairro"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            name="city"
            placeholder="Cidade"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            name="state"
            placeholder="Estado"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            name="country"
            placeholder="País"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            name="postalCode"
            placeholder="Código Postal"
            type="text"
          />
        </div>
        <Divider />
        <div className="grid grid-cols-2 gap-4">
          <Input
            radius="sm"
            labelPlacement="outside"
            name="postalCode"
            placeholder="DDD"
            type="number"
          />

          <Input
            radius="sm"
            labelPlacement="outside"
            name="postalCode"
            placeholder="Telefone"
            type="number"
          />
        </div>
        <Divider />
        <div className="grid grid-cols-2 gap-4">
          <Select label="Tipo de documento" radius="sm" size="sm">
            <SelectItem>RG</SelectItem>
            <SelectItem>CPF</SelectItem>
            <SelectItem>Passaporte</SelectItem>
          </Select>

          <Input
            radius="sm"
            labelPlacement="outside"
            name="postalCode"
            placeholder="Documento"
          />

          <Input
            radius="sm"
            labelPlacement="outside"
            name="postalCode"
            placeholder="Data de expedicao"
          />
        </div>
        <div className="flex items-center gap-5">
          <Button onClick={onCancel} color="success" className="text-white">
            Confirmar
          </Button>
          <Button onClick={onCancel} color="danger">Cancelar</Button>
        </div>
      </div>
    </>
  );
};
