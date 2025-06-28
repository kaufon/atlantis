import { Button, Divider, Input, Select, SelectItem } from "@heroui/react";
import { redirect } from "next/navigation";

type RegisterUserFormProps = {
	onConfirm?: VoidFunction;
	onCancel: VoidFunction;
};
import { useState } from "react";

export const RegisterUserForm = ({ onCancel }: RegisterUserFormProps) => {
	const formatDateToISO = (dateString: string) => {
		if (!dateString) return "";

		const [day, month, year] = dateString.split("/");

		return new Date(`${year}-${month}-${day}`).toISOString();
	};
	const [formData, setFormData] = useState({
		username: "",
		socialName: "",
		birthDate: "",
		registrationDate: "",
		street: "",
		neighborhood: "",
		city: "",
		state: "",
		country: "",
		postalCode: "",
		areaCode: "",
		phoneNumber: "",
		documentType: "RG",
		documentValue: "",
		documentIssueDate: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

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
						value={formData.username}
						onChange={handleChange}
					/>
					<Input
						radius="sm"
						labelPlacement="outside"
						name="socialName"
						placeholder="Nome social"
						type="text"
						value={formData.socialName}
						onChange={handleChange}
					/>
					<Input
						radius="sm"
						labelPlacement="outside"
						name="birthDate"
						placeholder="Data de nascimento"
						type="text"
						value={formData.birthDate}
						onChange={handleChange}
					/>
					<Input
						radius="sm"
						labelPlacement="outside"
						name="registrationDate"
						placeholder="Data de registro"
						type="text"
						value={formData.registrationDate}
						onChange={handleChange}
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
						value={formData.street}
						onChange={handleChange}
					/>
					<Input
						radius="sm"
						labelPlacement="outside"
						name="neighborhood"
						placeholder="Bairro"
						type="text"
						value={formData.neighborhood}
						onChange={handleChange}
					/>
					<Input
						radius="sm"
						labelPlacement="outside"
						name="city"
						placeholder="Cidade"
						type="text"
						value={formData.city}
						onChange={handleChange}
					/>
					<Input
						radius="sm"
						labelPlacement="outside"
						name="state"
						placeholder="Estado"
						type="text"
						value={formData.state}
						onChange={handleChange}
					/>
					<Input
						radius="sm"
						labelPlacement="outside"
						name="country"
						placeholder="País"
						type="text"
						value={formData.country}
						onChange={handleChange}
					/>
					<Input
						radius="sm"
						labelPlacement="outside"
						name="postalCode"
						placeholder="Código Postal"
						type="text"
						value={formData.postalCode}
						onChange={handleChange}
					/>
				</div>
				<Divider />
				<div className="grid grid-cols-2 gap-4">
					<Input
						radius="sm"
						labelPlacement="outside"
						name="areaCode"
						placeholder="DDD"
						type="number"
						value={formData.areaCode}
						onChange={handleChange}
					/>

					<Input
						radius="sm"
						labelPlacement="outside"
						name="phoneNumber"
						placeholder="Telefone"
						type="number"
						value={formData.phoneNumber}
						onChange={handleChange}
					/>
				</div>
				<Divider />
				<div className="grid grid-cols-2 gap-4">
					<Select
						label="Tipo de documento"
						radius="sm"
						size="sm"
						name="documentType"
						value={formData.documentType}
						onChange={handleChange}
					>
						<SelectItem key="RG">RG</SelectItem>
						<SelectItem key="CPF">CPF</SelectItem>
						<SelectItem key="PASSAPORTE">Passaporte</SelectItem>
					</Select>

					<Input
						radius="sm"
						labelPlacement="outside"
						name="documentValue"
						placeholder="Documento"
						value={formData.documentValue}
						onChange={handleChange}
					/>

					<Input
						radius="sm"
						labelPlacement="outside"
						name="documentIssueDate"
						placeholder="Data de expedicao"
						value={formData.documentIssueDate}
						onChange={handleChange}
					/>
				</div>
				<div className="flex items-center gap-5">
					<Button
						onPress={() => {
							const missingFields = Object.entries(formData).filter(
								([key, value]) => !value.trim(),
							);
							if (missingFields.length > 0) {
								alert(
									`Por favor, preencha os seguintes campos: ${missingFields
										.map(([field]) => field)
										.join(", ")}`,
								);
								return;
							}
							fetch("http://localhost:3333/customer", {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									name: formData.username,
									socialName: formData.socialName,
									birthDate: formatDateToISO(formData.birthDate),
									registrationDate: formatDateToISO(formData.registrationDate),
									documents: [
										{
											type: formData.documentType,
											number: formData.documentValue,
											expeditionDate: formatDateToISO(formData.documentIssueDate),
										},
									],
									cellphones: [
										{
											ddd: formData.areaCode,
											number: formData.phoneNumber,
										},
									],
									address: {
										street: formData.street,
										neighborhood: formData.neighborhood,
										city: formData.city,
										state: formData.state,
										country: formData.country,
										zipcode: formData.postalCode,
									},
									dependents: [],
								}),
							})
								.then((response) => {
									if (!response.ok) {
										throw new Error("Erro ao criar o cliente");
									}
									return response.json();
								})
								.then((data) => {
                  redirect("/")
								})
								.catch((error) => {
									console.error(error);
									alert("Falha ao criar o cliente. Tente novamente.");
								});
						}}
						color="success"
						className="text-white"
					>
						Confirmar
					</Button>
					<Button onPress={onCancel} color="danger">
						Cancelar
					</Button>
				</div>
			</div>
		</>
	);
};
