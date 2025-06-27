import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { HostingDto } from "src/dtos/hosting.dto";
import { HostingService } from "src/services/hosting.service";

@Controller("hosting")
export class HostingController {
	constructor(private readonly hostingService: HostingService) {}

	@Get("/")
	async getAll() {
		return await this.hostingService.getHostings();
	}
	@Get("/:id")
	async getById(@Param("id") id: string) {
		return await this.hostingService.getHostingById(id);
	}
	@Post("/")
	async create(@Body() data: HostingDto) {
		return await this.hostingService.createHosting(data);
	}
	@Delete("/:id")
	async delete(@Param("id") id: string) {
		return await this.hostingService.removeHosting(id);
	}
}
