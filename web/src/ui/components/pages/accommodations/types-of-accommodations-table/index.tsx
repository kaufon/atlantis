import {
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	Input,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	useDisclosure,
} from "@heroui/react";
// --- MODIFICADO: Importando os ícones necessários ---
import { Plus, Trash } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { IconButton } from "@/ui/components/commons/icon-button";

interface Accommodation {
	id: string;
	name: string;
	singleBeds: number;
	coupleBeds: number;
	suites: number;
	hasAirConditioning: boolean;
	garages: number;
	quantityAvailable: number;
}

export const TypesOfAccommodationsTable = () => {
	const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedAccommodationId, setSelectedAccommodationId] = useState<
		string | null
	>(null);

	// --- MODIFICADO: Estados mais genéricos para o drawer ---
	const [quantityInputValue, setQuantityInputValue] = useState<number>(1);
	const [drawerMode, setDrawerMode] = useState<"add" | "remove" | null>(null);

	const fetchData = useCallback(async () => {
		// ... (função fetchData continua a mesma)
		setIsLoading(true);
		try {
			const response = await fetch("http://localhost:3333/accommodation");
			if (!response.ok) throw new Error("Não foi possível buscar os dados.");
			const data: Accommodation[] = await response.json();
			setAccommodations(data);
		} catch (error) {
			console.error("Erro:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	// --- MODIFICADO: Funções para abrir o drawer em diferentes modos ---
	const handleOpenDrawer = (id: string, mode: "add" | "remove") => {
		setDrawerMode(mode);
		setSelectedAccommodationId(id);
		setQuantityInputValue(1); // Reseta o valor do input
		onOpen();
	};

	// --- ADICIONADO: Função para lidar com a confirmação, chamando a lógica correta ---
	const handleConfirmAction = async () => {
		if (!selectedAccommodationId || quantityInputValue <= 0) return;

		const isAddMode = drawerMode === "add";
		// Corrigindo o endpoint para 'remove-quantity' (padrão comum)
		const endpointAction = isAddMode ? "add-quantity" : "remove-quantity";
		const url = `http://localhost:3333/accommodation/${selectedAccommodationId}/${endpointAction}`;

		try {
			const response = await fetch(url, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ quantity: quantityInputValue }),
			});

			if (!response.ok) {
				throw new Error(
					`Falha ao ${isAddMode ? "adicionar" : "remover"} quantidade.`,
				);
			}

			onClose(); // Fecha o drawer
			fetchData(); // Atualiza a tabela
		} catch (error) {
			console.error("Erro ao atualizar quantidade:", error);
			alert(`Não foi possível atualizar a quantidade. ${error}`);
		}
	};

	return (
		<>
			<Table className="w-screen md:w-full" shadow="none" selectionMode="none">
				<TableHeader>
					<TableColumn>NOME</TableColumn>
					<TableColumn>CAMAS DE SOLTEIRO</TableColumn>
					<TableColumn>CAMAS DE CASAL</TableColumn>
					<TableColumn>SUÍTES</TableColumn>
					<TableColumn>AR CONDICIONADO</TableColumn>
					<TableColumn>GARAGENS</TableColumn>
					<TableColumn>QTD. DISPONÍVEL</TableColumn>
					<TableColumn className="text-center">AÇÕES</TableColumn>
				</TableHeader>

				<TableBody
					isLoading={isLoading}
					loadingContent={<p>Carregando tipos de acomodação...</p>}
					emptyContent={"Nenhuma acomodação encontrada."}
				>
					{accommodations.map((room) => (
						<TableRow key={room.id}>
							<TableCell>{room.name}</TableCell>
							<TableCell>{room.singleBeds}</TableCell>
							<TableCell>{room.coupleBeds}</TableCell>
							<TableCell>{room.suites}</TableCell>
							<TableCell>{room.hasAirConditioning ? "SIM" : "NAO"}</TableCell>
							<TableCell>{room.garages}</TableCell>
							<TableCell>{room.quantityAvailable}</TableCell>

							<TableCell>
								{/* --- MODIFICADO: Div agora contém os dois botões --- */}
								<div className="flex items-center justify-center gap-2">
									<IconButton onClick={() => handleOpenDrawer(room.id, "add")}>
										<Plus />
									</IconButton>
									<IconButton
										onClick={() => handleOpenDrawer(room.id, "remove")}
									>
										<Trash />
									</IconButton>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* --- MODIFICADO: Drawer agora é dinâmico baseado no 'drawerMode' --- */}
			<Drawer isOpen={isOpen} onOpenChange={onClose}>
				<DrawerContent>
					<DrawerHeader>
						{drawerMode === "add"
							? "Adicionar Quantidade"
							: "Remover Quantidade"}
					</DrawerHeader>
					<DrawerBody className="flex flex-col gap-4">
						<p>
							{drawerMode === "add"
								? "Quantas unidades você deseja adicionar ao estoque?"
								: "Quantas unidades você deseja remover do estoque?"}
						</p>
						<Input
							type="number"
							label="Quantidade"
							value={String(quantityInputValue)}
							onChange={(e) => setQuantityInputValue(Number(e.target.value))}
							min={1}
						/>
						<div className="flex gap-4">
							<Button
								onPress={handleConfirmAction}
								color="success"
								className="text-white"
							>
								Confirmar
							</Button>
							<Button onPress={onClose} color="danger">
								Cancelar
							</Button>
						</div>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};
