import { PrismaService } from "src/database/prisma.service";
import { HostingDto } from "src/dtos/hosting.dto";
import { AccommodationService } from "./accomodation.service";
import { BadRequestException } from "@nestjs/common";

export class HostingService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly accomodationService: AccommodationService,
	) {}

	async getHostings() {
		const hostings = await this.prismaService.hostings.findMany();
		return hostings.map(this.mapToDto);
	}
	async getHostingById(id: string): Promise<HostingDto> {
		const hosting = await this.prismaService.hostings.findUnique({
			where: { id },
		});
		if (!hosting) {
			throw new BadRequestException("Hospedagem não encontrada");
		}
		return this.mapToDto(hosting);
	}
	async createHosting(data: HostingDto) {
		const accomodation = await this.prismaService.accommodation.findUnique({
			where: { id: data.accomodationId },
		});
		if (!accomodation) return;
		this.accomodationService.remove(data.accomodationId, 1);
		return await this.prismaService.hostings.create({
			data: {
				accommodation: { connect: { id: data.accomodationId } },
				customer: { connect: { id: data.customerId } },
				startDate: new Date(data.startDate),
				endDate: new Date(data.endDate),
				createdAt: new Date(),
			},
		});
	}
	async removeHosting(id: string) {
		const hosting = await this.getHostingById(id);
		await this.prismaService.hostings.delete({
			where: { id: hosting.id },
		});
	}
	private mapToDto(hosting: any): HostingDto {
		return {
			id: hosting.id,
			accomodationId: hosting.accommodationId,
			customerId: hosting.customerId,
			startDate: hosting.startDate.toISOString(),
			endDate: hosting.endDate.toISOString(),
			createdAt: hosting.createdAt.toISOString(),
		};
	}
}
