import { AlertDialog } from "@/ui/components/commons/alert-dialog";
import { IconButton } from "@/ui/components/commons/icon-button";
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/react";
import { Trash } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// --- DTOs que esperamos de cada endpoint ---
// DTO da sua API /hosting
export type HostingDto = {
	id: string;
	accomodationId: string;
	customerId: string;
	startDate: string;
	endDate: string;
	createdAt: string;
};
// Suposição do DTO da API /customer
interface CustomerDto {
	id: string;
	name: string;
	document: string;
}
// Suposição do DTO da API /accommodation
interface AccommodationDto {
	id: string;
	name: string;
}
// --- Estrutura final dos dados combinados para a tabela ---
interface MergedHosting {
	id: string;
	startDate: string;
	endDate: string;
	customerName: string;
	customerDocument: string;
	accommodationName: string;
}

// Função auxiliar para formatar a data
const formatDateToDdMmmYyyy = (dateString?: string): string => {
	if (!dateString) return "";
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return dateString;
	const day = String(date.getUTCDate()).padStart(2, "0");
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const year = date.getUTCFullYear();
	return `${day}/${month}/${year}`;
};

export const AccomodationsTable = () => {
	// Estado para guardar os dados já combinados
	const [mergedHostings, setMergedHostings] = useState<MergedHosting[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// --- MODIFICADO: Função agora busca de 3 fontes e combina os dados ---
	const fetchAndMergeData = useCallback(async () => {
		setIsLoading(true);
		try {
			// 1. Fazer todas as requisições em paralelo para mais performance
			const [hostingRes, customerRes, accommodationRes] = await Promise.all([
				fetch("http://localhost:3333/hosting"),
				fetch("http://localhost:3333/customer"),
				fetch("http://localhost:3333/accommodation"),
			]);

			if (!hostingRes.ok || !customerRes.ok || !accommodationRes.ok) {
				throw new Error("Falha ao buscar um ou mais recursos.");
			}

			const hostings: HostingDto[] = await hostingRes.json();
			const customers: CustomerDto[] = await customerRes.json();
			const accommodations: AccommodationDto[] = await accommodationRes.json();

			// 2. Criar 'Mapas' para busca rápida de nomes (muito mais rápido que usar .find() em um loop)
			const customerMap = new Map(customers.map((c) => [c.id, c]));
			const accommodationMap = new Map(accommodations.map((a) => [a.id, a]));

			// 3. Combinar os dados
			const finalMergedData = hostings.map((hosting) => {
				const customer = customerMap.get(hosting.customerId);
				const accommodation = accommodationMap.get(hosting.accomodationId);

				return {
					id: hosting.id,
					startDate: hosting.startDate,
					endDate: hosting.endDate,
					customerName: customer ? customer.name : "Cliente não encontrado",
					customerDocument: customer ? customer.documents[0].number : "N/A",
					accommodationName: accommodation
						? accommodation.name
						: "Alojamento não encontrado",
				};
			});

			setMergedHostings(finalMergedData);
		} catch (error) {
			console.error("Erro ao buscar e combinar dados:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAndMergeData();
	}, [fetchAndMergeData]);

	const handleUnhost = async (hostingId: string) => {
		try {
			await fetch(`http://localhost:3333/hosting/${hostingId}`, {
				method: "DELETE",
			});
			// Após deletar, precisa buscar e combinar tudo novamente
			fetchAndMergeData();
		} catch (error) {
			console.error("Erro ao desalojar:", error);
			alert("Não foi possível desalojar o hóspede.");
		}
	};

	return (
		<>
			<Table className="w-screen md:w-full" shadow="none" selectionMode="none">
				<TableHeader>
					<TableColumn>HÓSPEDE</TableColumn>
					<TableColumn>DOCUMENTO DO HÓSPEDE</TableColumn>
					<TableColumn>ALOJAMENTO</TableColumn>
					<TableColumn>DATA DE INÍCIO</TableColumn>
					<TableColumn>DATA DE FIM</TableColumn>
					<TableColumn className="flex justify-center items-center">
						AÇÕES
					</TableColumn>
				</TableHeader>

				<TableBody
					items={mergedHostings}
					isLoading={isLoading}
					loadingContent={<p>Carregando hospedagens...</p>}
					emptyContent={"Nenhuma hospedagem ativa encontrada."}
				>
					{(item) => (
						<TableRow key={item.id}>
							<TableCell>{item.customerName}</TableCell>
							<TableCell>{item.customerDocument}</TableCell>
							<TableCell>{item.accommodationName}</TableCell>
							<TableCell>{formatDateToDdMmmYyyy(item.startDate)}</TableCell>
							<TableCell>{formatDateToDdMmmYyyy(item.endDate)}</TableCell>
							<TableCell>
								<div className="flex items-center justify-center">
									<AlertDialog
										trigger={
											<IconButton>
												<Trash />
											</IconButton>
										}
										onConfirm={() => handleUnhost(item.id)}
									>
										Você tem certeza que deseja desalojar este hóspede?
									</AlertDialog>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
};
