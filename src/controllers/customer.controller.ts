import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { CustomerDto } from "src/dtos/customer.dto";
import { CustomerService } from "src/services/customer.service";

@Controller("customer")
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Get("/")
	async getAll() {
		return await this.customerService.getCustomers();
	}
	@Get("/:id")
	async getById(@Param("id") id: string) {
		return await this.customerService.findById(id);
	}
	@Post("/")
	async createCustomer(@Body() body: CustomerDto) {
		await this.customerService.add(body);
		return body;
	}
	@Post("/:id/dependents")
	async addDependent(@Param("id") id: string, @Body() body: CustomerDto) {
		await this.customerService.addDependent(id, body);
		return body;
	}
	@Put("/:id/dependents/:dependentId")
	async updateDependent(
		@Param("id") id: string,
		@Param("dependentId") dependentId: string,
		@Body() body: CustomerDto,
	) {
		const dependentData: CustomerDto = body;
		dependentData.id = dependentId;
		const dependentDto = await this.customerService.findById(dependentId);
		if (!dependentDto) {
			return;
		}
		await this.customerService.updateDependent(id, dependentData);
	}
	@Put("/:id")
	async updateCustomer(@Param("id") id: string, @Body() body: CustomerDto) {
		await this.customerService.update(body, id);
		return body;
	}
	@Delete("/:id")
	async deleteCustomer(@Param("id") id: string) {
		await this.customerService.remove(id);
	}
}
