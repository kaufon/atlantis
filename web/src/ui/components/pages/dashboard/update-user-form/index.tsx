import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";

type UpdateUserFormProps = {
  onConfirm?: VoidFunction;
  onCancel: VoidFunction;
};
export const UpdateUserForm = ({ onCancel }: UpdateUserFormProps) => {
  return (
    <>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Input
            radius="sm"
            labelPlacement="outside"
            name="username"
            value="Joao"
            placeholder="Nome"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            value="Pena"
            name="socialName"
            placeholder="Nome social"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            value="28/02/2006"
            name="birthDate"
            placeholder="Data de nascimento"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            value="28/02/2006"
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
            value="Caragueijeiras"
            name="street"
            placeholder="Rua"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            value="Industrias"
            name="neighborhood"
            placeholder="Bairro"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            value="RJ"
            name="city"
            placeholder="Cidade"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            value="RJ"
            name="state"
            placeholder="Estado"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            value="Brasil"
            name="country"
            placeholder="País"
            type="text"
          />
          <Input
            radius="sm"
            labelPlacement="outside"
            value="321312312"
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
            value="21"
            name="postalCode"
            placeholder="DDD"
            type="number"
          />

          <Input
            radius="sm"
            value="1290909090"
            labelPlacement="outside"
            name="postalCode"
            placeholder="Telefone"
            type="number"
          />
        </div>
        <Divider />
        <div className="grid grid-cols-2 gap-4">
          <Select label="Tipo de documento" defaultSelectedKeys={["RG"]} radius="sm" size="sm">
            <SelectItem key="RG">RG</SelectItem>
            <SelectItem key="CPF">CPF</SelectItem>
            <SelectItem key="Passaporte">Passaporte</SelectItem>
          </Select>

          <Input
            radius="sm"
            value="13678312"
            labelPlacement="outside"
            name="postalCode"
            placeholder="Documento"
          />

          <Input
            radius="sm"
            value="25/12/2010"
            labelPlacement="outside"
            name="postalCode"
            placeholder="Data de expedicao"
          />
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
    </>
  );
};
