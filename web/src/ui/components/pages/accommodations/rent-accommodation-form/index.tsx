import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useEffect, useState } from "react";

interface CustomerDto {
	id: string;
	name: string;
}
interface AccommodationDto {
	id: string;
	name: string;
}

type RentAccommodationFormProps = {
	onConfirm?: VoidFunction;
	onCancel: VoidFunction;
};

export const RentAccommodationForm = ({
	onCancel,
	onConfirm,
}: RentAccommodationFormProps) => {
	const [customers, setCustomers] = useState<CustomerDto[]>([]);
	const [accommodations, setAccommodations] = useState<AccommodationDto[]>([]);

	const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
	const [selectedAccommodationId, setSelectedAccommodationId] =
		useState<string>("");
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchDropdownData = async () => {
			setIsLoading(true);
			try {
				const [customerRes, accommodationRes] = await Promise.all([
					fetch("http://localhost:3333/customer"),
					fetch("http://localhost:3333/accommodation"),
				]);

				if (!customerRes.ok || !accommodationRes.ok) {
					throw new Error("Falha ao buscar dados para o formulário.");
				}

				const customerData: CustomerDto[] = await customerRes.json();
				const accommodationData: AccommodationDto[] =
					await accommodationRes.json();

				setCustomers(customerData);
				setAccommodations(accommodationData);
			} catch (error) {
				console.error("Erro ao carregar dados do formulário:", error);
				alert("Não foi possível carregar as opções do formulário.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchDropdownData();
	}, []); 

	const handleSubmit = async () => {
		if (
			!selectedCustomerId ||
			!selectedAccommodationId ||
			!startDate ||
			!endDate
		) {
			alert("Por favor, preencha todos os campos.");
			return;
		}

		const payload = {
			customerId: selectedCustomerId,
			accomodationId: selectedAccommodationId, 
			startDate: startDate,
			endDate: endDate,
		};

		try {
			const response = await fetch("http://localhost:3333/hosting", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error("Não foi possível criar a hospedagem.");
			}

			if (onConfirm) {
				onConfirm();
			}
			onCancel(); 
      window.location.reload(); 
		} catch (error) {
			console.error("Erro ao criar hospedagem:", error);
			alert(`Erro: ${error}`);
		}
	};

	return (
		<div className="space-y-5">
			<div className="space-y-5">
				<Select
					label="Hóspede"
					radius="sm"
					size="sm"
					isLoading={isLoading}
					value={selectedCustomerId}
					onChange={(e) => setSelectedCustomerId(e.target.value)}
					placeholder="Selecione um hóspede"
				>
					{customers.map((customer) => (
						<SelectItem key={customer.id} value={customer.id}>
							{customer.name}
						</SelectItem>
					))}
				</Select>

				<Select
					label="Alojamento"
					radius="sm"
					size="sm"
					isLoading={isLoading}
					value={selectedAccommodationId}
					onChange={(e) => setSelectedAccommodationId(e.target.value)}
					placeholder="Selecione um alojamento"
				>
					{accommodations.map((accommodation) => (
						<SelectItem key={accommodation.id} value={accommodation.id}>
							{accommodation.name}
						</SelectItem>
					))}
				</Select>

				{/* --- ADICIONADO: Inputs para as datas --- */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input
						type="date"
						label="Data de Início"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
					/>
					<Input
						type="date"
						label="Data de Fim"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
					/>
				</div>
			</div>
			<div className="flex items-center gap-5">
				<Button onClick={handleSubmit} color="success" className="text-white">
					Confirmar
				</Button>
				<Button onClick={onCancel} color="danger">
					Cancelar
				</Button>
			</div>
		</div>
	);
};
