import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { AccommodationDto } from "src/dtos/accomodation.dto";
import {
	PlusFamilyAccommodationMock,
	PlusSingleAccommodationMock,
	SimpleCoupleAccommodationMock,
	SimpleFamilyAccommodationMock,
	SimpleSingleAccommodationMock,
	SuperFamilyAccommodationMock,
} from "src/tests/accomodation.mock";

@Injectable()
export class AccommodationService {
	constructor(private readonly prismaService: PrismaService) {
		this.seed();
	}
	async findAll(): Promise<AccommodationDto[]> {
		const accommodations = await this.prismaService.accommodation.findMany({
			orderBy: {
				createdAt: "asc",
			},
		});
		return accommodations.map(this.mapToDto);
	}

	async findById(id: string): Promise<AccommodationDto | null> {
		const accommodation = await this.prismaService.accommodation.findUnique({
			where: { id },
		});

		return accommodation ? this.mapToDto(accommodation) : null;
	}

	async hasName(name: string): Promise<boolean> {
		const accommodationExists =
			await this.prismaService.accommodation.findFirst({
				where: { name },
			});
		return Boolean(accommodationExists);
	}

	async add(accommodation: AccommodationDto): Promise<void> {
		await this.prismaService.accommodation.create({
			data: {
				id: accommodation.id,
				name: accommodation.name,
				singleBeds: accommodation.singleBeds,
				coupleBeds: accommodation.coupleBeds,
				suites: accommodation.suites,
				garages: accommodation.garages,
				hasAirConditioning: accommodation.hasAirConditioning,
			},
		});
	}

	async update(accommodation: AccommodationDto): Promise<void> {
		if (!accommodation.customerId) {
			throw new Error("Customer ID is required for updates.");
		}
		await this.prismaService.accommodation.update({
			where: { id: accommodation.id },
			data: {
				name: accommodation.name,
				singleBeds: accommodation.singleBeds,
				coupleBeds: accommodation.coupleBeds,
				suites: accommodation.suites,
				garages: accommodation.garages,
				hasAirConditioning: accommodation.hasAirConditioning,
			},
		});
	}

	async remove(id: string, quantity: number): Promise<void> {
		const accommodation = await this.prismaService.accommodation.findUnique({
			where: { id },
		});
		if (!accommodation) {
			return;
		}
		const newQuantity = accommodation.QuantityAvailable - quantity;
		if (newQuantity < 0) {
			throw new BadRequestException("Quantia indisponível.");
		}
		await this.prismaService.accommodation.update({
			where: { id },
			data: { QuantityAvailable: newQuantity },
		});
	}
	async addQuantity(id: string, quantity: number): Promise<void> {
		const accommodation = await this.prismaService.accommodation.findUnique({
			where: { id },
		});
		if (!accommodation) {
			throw new Error("Acomodação não encontrada.");
		}
		const newQuantity = accommodation.QuantityAvailable + quantity;
		await this.prismaService.accommodation.update({
			where: { id },
			data: { QuantityAvailable: newQuantity },
		});
	}

	private async seed(): Promise<void> {
		const count = await this.prismaService.accommodation.count();

		if (count === 0) {
			const seedAccommodations = [
				SuperFamilyAccommodationMock,
				SimpleSingleAccommodationMock,
				PlusSingleAccommodationMock,
				SimpleCoupleAccommodationMock,
				PlusFamilyAccommodationMock,
				SimpleFamilyAccommodationMock,
			];

			for (const accommodationDto of seedAccommodations) {
				await this.add(accommodationDto);
			}
		}
	}

	private mapToDto(accommodation: any): AccommodationDto {
		return {
			id: accommodation.id,
			name: accommodation.name,
			singleBeds: accommodation.singleBeds,
			coupleBeds: accommodation.coupleBeds,
			suites: accommodation.suites,
			garages: accommodation.garages,
			hasAirConditioning: accommodation.hasAirConditioning,
			customerId: accommodation.customerId,
			quantityAvailable: accommodation.QuantityAvailable,
		};
	}
}
