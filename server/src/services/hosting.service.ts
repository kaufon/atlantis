import { PrismaService } from "src/database/prisma.service";
import { HostingDto } from "src/dtos/hosting.dto";
import { AccommodationService } from "./accomodation.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";

@Injectable()
export class HostingService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly accomodationService: AccommodationService,
	) {}

	async getHostings() {
		const hostings = await this.prismaService.hosting.findMany();
		return hostings.map((hosting) => this.mapToDto(hosting));
	}

	async getHostingById(id: string): Promise<HostingDto> {
		const hosting = await this.prismaService.hosting.findUnique({
			where: { id },
		});
		if (!hosting) {
			throw new BadRequestException("Hospedagem não encontrada");
		}
		return this.mapToDto(hosting);
	}
	async createHosting(data: HostingDto) {
		const accomodation = await this.accomodationService.findById(
			data.accomodationId,
		);
		if (!accomodation) return;
		this.accomodationService.remove(data.accomodationId, 1);
		return await this.prismaService.hosting.create({
			data: {
				id: data.id ?? randomUUID(),
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
		const accomodation = await this.accomodationService.findById(
			hosting.accomodationId,
		);
		if (!accomodation) return;
		this.accomodationService.addQuantity(accomodation.id as string, 1);
		await this.prismaService.hosting.delete({
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
