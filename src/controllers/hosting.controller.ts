import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
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
}
