import { Button, Divider, Input, Select, SelectItem } from "@heroui/react";
import { useState, useEffect } from "react";
import type { CustomerDto } from "@/core/dtos/customer.dto";

// --- INÍCIO DAS MODIFICAÇÕES ---

// 1. FUNÇÕES AUXILIARES PARA DATAS

/**
 * Converte data do formato API (ISO) para o formato de Exibição (dd/MM/yyyy).
 * @param dateString A data em formato ISO.
 * @returns A data formatada como dd/MM/yyyy.
 */
const formatDateToDdMmmYyyy = (dateString?: string): string => {
	if (!dateString) return "";
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return dateString; // Retorna original se inválida

	const day = String(date.getUTCDate()).padStart(2, "0");
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const year = date.getUTCFullYear();
	return `${day}/${month}/${year}`;
};

/**
 * Converte data do formato de Exibição (dd/MM/yyyy) de volta para o formato API (ISO).
 * @param ddmmyyyy A data no formato "dd/MM/yyyy".
 * @returns A data em formato ISO (UTC).
 */
const formatDateToISO = (ddmmyyyy?: string): string => {
	if (!ddmmyyyy || ddmmyyyy.split("/").length !== 3) {
		return ddmmyyyy || ""; // Retorna original se o formato for inesperado
	}
	const [day, month, year] = ddmmyyyy.split("/");
	const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
	if (isNaN(date.getTime())) {
		return ddmmyyyy;
	}
	return date.toISOString();
};

// Definindo os tipos para os props do componente
type UpdateUserFormProps = {
	onConfirm?: VoidFunction;
	onCancel: VoidFunction;
	clientId: string;
};

export const UpdateUserForm = ({
	clientId,
	onCancel,
	onConfirm,
}: UpdateUserFormProps) => {
	const [formData, setFormData] = useState<CustomerDto>({
		name: "",
		socialName: "",
		birthDate: "",
		registrationDate: "",
		address: {
			street: "",
			neighborhood: "",
			city: "",
			state: "",
			country: "",
			zipcode: "",
		},
		cellphones: [{ ddd: "", number: "" }],
		documents: [{ type: "", number: "", expeditionDate: "" }],
		dependents: [],
	});

	// 2. AJUSTE NO USEEFFECT
	useEffect(() => {
		const fetchCustomerData = async () => {
			try {
				const response = await fetch(
					`http://localhost:3333/customer/${clientId}`,
				);
				if (!response.ok) {
					throw new Error("Falha ao buscar dados do cliente");
				}
				const data: CustomerDto = await response.json();

				// Formata as datas para exibição antes de salvar no estado
				const formattedData = {
					...data,
					birthDate: formatDateToDdMmmYyyy(data.birthDate),
					registrationDate: formatDateToDdMmmYyyy(data.registrationDate),
					documents:
						data.documents?.map((doc) => ({
							...doc,
							expeditionDate: formatDateToDdMmmYyyy(doc.expeditionDate),
						})) || [],
				};

				setFormData({
					...formattedData,
					cellphones:
						formattedData.cellphones?.length > 0
							? formattedData.cellphones
							: [{ ddd: "", number: "" }],
					documents:
						formattedData.documents?.length > 0
							? formattedData.documents
							: [{ type: "", number: "", expeditionDate: "" }],
				});
			} catch (error) {
				console.error(error);
				alert(
					"Não foi possível carregar os dados do cliente. Tente novamente.",
				);
			}
		};

		fetchCustomerData();
	}, [clientId]);

	// As funções de 'change' permanecem as mesmas
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};
	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			address: { ...prevData.address, [name]: value },
		}));
	};
	const handleArrayChange = (
		index: number,
		field: string,
		value: string,
		arrayName: "cellphones" | "documents",
	) => {
		setFormData((prevData) => {
			const updatedArray = [...prevData[arrayName]];
			updatedArray[index] = { ...updatedArray[index], [field]: value };
			return { ...prevData, [arrayName]: updatedArray };
		});
	};

	// 3. AJUSTE NO HANDLESUBMIT
	const handleSubmit = async () => {
		// O objeto 'payload' com as datas formatadas continua o mesmo
		const payload = {
			...formData,
			birthDate: formatDateToISO(formData.birthDate),
			registrationDate: formatDateToISO(formData.registrationDate),
			documents: formData.documents.map((doc) => ({
				...doc,
				expeditionDate: formatDateToISO(doc.expeditionDate),
			})),
		};

		try {
			const response = await fetch(
				`http://localhost:3333/customer/${clientId}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				},
			);

			if (!response.ok) {
				throw new Error("Falha ao atualizar cliente");
			}

			await response.json();
			console.log("Cliente atualizado com sucesso!");

			// --- MODIFICAÇÃO AQUI ---
			// Após o sucesso, recarrega a página.
			window.location.reload();

			// O código abaixo não será mais executado por causa do refresh,
			// mas podemos mantê-lo por segurança.
			if (onConfirm) {
				onConfirm();
			}
			onCancel();
		} catch (error) {
			console.error(error);
			alert("Falha ao atualizar cliente. Por favor, tente novamente.");
		}
	};
	// O JSX não precisa de alterações
	return (
		<>
			<div className="space-y-5">
				{/* Campos de Dados Pessoais */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input
						radius="sm"
						label="Nome"
						labelPlacement="outside"
						name="name"
						value={formData.name}
						placeholder="Nome completo"
						type="text"
						onChange={handleChange}
					/>
					<Input
						radius="sm"
						label="Nome Social"
						labelPlacement="outside"
						value={formData.socialName}
						name="socialName"
						placeholder="Nome social"
						type="text"
						onChange={handleChange}
					/>
					<Input
						radius="sm"
						label="Data de Nascimento"
						labelPlacement="outside"
						value={formData.birthDate}
						name="birthDate"
						placeholder="dd/MM/yyyy"
						type="text"
						onChange={handleChange}
					/>
					<Input
						radius="sm"
						label="Data de Registro"
						labelPlacement="outside"
						value={formData.registrationDate}
						name="registrationDate"
						placeholder="dd/MM/yyyy"
						type="text"
						onChange={handleChange}
					/>
				</div>

				<Divider />

				{/* Campos de Endereço */}
				<h3 className="text-lg font-medium">Endereço</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input
						radius="sm"
						labelPlacement="outside"
						name="street"
						value={formData.address.street}
						placeholder="Rua"
						onChange={handleAddressChange}
					/>
					<Input
						radius="sm"
						labelPlacement="outside"
						name="neighborhood"
						value={formData.address.neighborhood}
						placeholder="Bairro"
						onChange={handleAddressChange}
					/>
					<Input
						radius="sm"
						labelPlacement="outside"
						name="city"
						value={formData.address.city}
						placeholder="Cidade"
						onChange={handleAddressChange}
					/>
					<Input
						radius="sm"
						labelPlacement="outside"
						name="state"
						value={formData.address.state}
						placeholder="Estado"
						onChange={handleAddressChange}
					/>
					<Input
						radius="sm"
						labelPlacement="outside"
						name="country"
						value={formData.address.country}
						placeholder="País"
						onChange={handleAddressChange}
					/>
					<Input
						radius="sm"
						labelPlacement="outside"
						name="zipcode"
						value={formData.address.zipcode}
						placeholder="Código Postal"
						onChange={handleAddressChange}
					/>
				</div>

				<Divider />

				{/* Campos de Telefone */}
				<h3 className="text-lg font-medium">Telefone</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input
						radius="sm"
						label="DDD"
						labelPlacement="outside"
						value={formData.cellphones[0]?.ddd || ""}
						placeholder="DDD"
						onChange={(e) =>
							handleArrayChange(0, "ddd", e.target.value, "cellphones")
						}
					/>
					<Input
						radius="sm"
						label="Número"
						labelPlacement="outside"
						value={formData.cellphones[0]?.number || ""}
						placeholder="Telefone"
						onChange={(e) =>
							handleArrayChange(0, "number", e.target.value, "cellphones")
						}
					/>
				</div>

				<Divider />

				{/* Campos de Documentos */}
				<h3 className="text-lg font-medium">Documento</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Select
						label="Tipo de documento"
						radius="sm"
						selectedKeys={[formData.documents[0]?.type || ""]}
						onChange={(e) =>
							handleArrayChange(0, "type", e.target.value, "documents")
						}
					>
						<SelectItem key="RG">RG</SelectItem>
						<SelectItem key="CPF">CPF</SelectItem>
						<SelectItem key="Passaporte">Passaporte</SelectItem>
					</Select>
					<Input
						radius="sm"
						label="Número do Documento"
						labelPlacement="outside"
						value={formData.documents[0]?.number || ""}
						placeholder="Documento"
						onChange={(e) =>
							handleArrayChange(0, "number", e.target.value, "documents")
						}
					/>
					<Input
						radius="sm"
						label="Data de Expedição"
						labelPlacement="outside"
						value={formData.documents[0]?.expeditionDate || ""}
						placeholder="dd/MM/yyyy"
						onChange={(e) =>
							handleArrayChange(
								0,
								"expeditionDate",
								e.target.value,
								"documents",
							)
						}
					/>
				</div>

				<Divider />

				{/* Botões de Ação */}
				<div className="flex items-center gap-5 pt-4">
					<Button onPress={handleSubmit} color="success" className="text-white">
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
