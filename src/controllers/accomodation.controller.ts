import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { AccommodationService } from "src/services/accomodation.service";

@Controller("accommodation")
export class AccomodationController {
	constructor(private readonly accomodationService: AccommodationService) {}

	@Get("/")
	async getAll() {
		return await this.accomodationService.findAll();
	}
	@Get("/:id")
	async getById(@Param("id") id: string) {
		return await this.accomodationService.findById(id);
	}
	@Patch("/:id/add-quantity")
	async addQuantity(
		@Param("id") id: string,
		@Body() body: { quantity: number },
	) {
		return await this.accomodationService.addQuantity(id, body.quantity);
	}
	@Patch("/:id/remove-quantity")
	async removeQuantity(
		@Param("id") id: string,
		@Body() body: { quantity: number },
	) {
		return await this.accomodationService.remove(id, body.quantity);
	}
}
