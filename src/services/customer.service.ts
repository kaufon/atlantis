import { Injectable } from "@nestjs/common";
import { DocumentType } from "@prisma/client";
import { randomUUID } from "crypto";
import { PrismaService } from "src/database/prisma.service";
import { CellphoneDto } from "src/dtos/cellphone.dto";
import { CustomerDto } from "src/dtos/customer.dto";
import { DocumentDto } from "src/dtos/document.dto";

@Injectable()
export class CustomerService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getCustomers(): Promise<CustomerDto[]> {
		const customers = await this.prismaService.customer.findMany({
			include: {
				address: true,
				cellphones: true,
				documents: true,
				dependents: {
					orderBy: {
						createdAt: "asc",
					},
					include: {
						address: true,
						cellphones: true,
						documents: true,
					},
				},
			},
			where: {
				guardianId: null,
			},
		});
		return customers.map(this.mapToDto);
	}
	async findById(id: string): Promise<CustomerDto | null> {
		const customer = await this.prismaService.customer.findUnique({
			where: { id, guardianId: null },
			include: {
				address: true,
				cellphones: true,
				documents: true,
				dependents: {
					orderBy: {
						createdAt: "asc",
					},
					include: {
						address: true,
						cellphones: true,
						documents: true,
					},
				},
			},
		});

		return customer ? this.mapToDto(customer) : null;
	}
	async findDependentById(id: string): Promise<CustomerDto | null> {
		const customer = await this.prismaService.customer.findUnique({
			where: { id, guardianId: { not: null } },
			include: {
				address: true,
				cellphones: true,
				documents: true,
				dependents: {
					orderBy: {
						createdAt: "asc",
					},
					include: {
						address: true,
						cellphones: true,
						documents: true,
					},
				},
			},
		});

		return customer ? this.mapToDto(customer) : null;
	}

	async hasDocument(document: DocumentDto): Promise<boolean> {
		const documentExists = await this.prismaService.document.findFirst({
			where: { number: document.number, type: document.type as DocumentType },
		});
		return Boolean(documentExists);
	}

	async hasCellphone(cellphone: CellphoneDto): Promise<boolean> {
		const cellphoneExists = await this.prismaService.cellphone.findFirst({
			where: { number: cellphone.number, ddd: cellphone.ddd },
		});
		return Boolean(cellphoneExists);
	}

	async add(customer: CustomerDto): Promise<void> {
		await this.prismaService.customer.create({
			data: {
				id: customer.id,
				name: customer.name,
				socialName: customer.socialName,
				birthDate: customer.birthDate,
				registrationDate: customer.registrationDate,
				address: customer.address
					? {
							create: {
								street: customer.address.street,
								neighborhood: customer.address.neighborhood,
								city: customer.address.city,
								state: customer.address.state,
								country: customer.address.country,
								zipcode: customer.address.zipcode,
							},
						}
					: undefined,
				cellphones: {
					create: customer.cellphones.map((cellphone) => ({
						ddd: cellphone.ddd,
						number: cellphone.number,
					})),
				},
				dependents: {
					create: customer.dependents.map((dependent) => ({
						id: dependent.id,
						name: dependent.name,
						socialName: dependent.socialName,
						birthDate: dependent.birthDate,
						registrationDate: dependent.registrationDate,
						address: customer.address // Supondo que o dependente tem o mesmo endereço do titular
							? {
									create: {
										street: customer.address.street,
										neighborhood: customer.address.neighborhood,
										city: customer.address.city,
										state: customer.address.state,
										country: customer.address.country,
										zipcode: customer.address.zipcode,
									},
								}
							: undefined,
						cellphones: {
							create: dependent.cellphones.map((cellphone) => ({
								ddd: cellphone.ddd,
								number: cellphone.number,
							})),
						},
						documents: {
							create: dependent.documents.map((document) => ({
								number: document.number,
								type: document.type as DocumentType,
								expeditionDate: document.expeditionDate,
							})),
						},
					})),
				},
				documents: {
					create: customer.documents.map((document) => ({
						number: document.number,
						type: document.type as DocumentType,
						expeditionDate: document.expeditionDate,
					})),
				},
			},
		});
	}

	async addDependent(
		customerId: string,
		dependentDto: CustomerDto,
	): Promise<void> {
		const customerDto = await this.findById(customerId);
		if (!customerDto) return;

		const guardian = await this.prismaService.customer.findUnique({
			where: { id: customerId, guardianId: null },
		});
		if (!guardian) {
			throw new Error("Guardian not found");
		}

		const dependent = {
			...dependentDto,
			address: customerDto.address,
			cellphones: customerDto.cellphones.map((cellphone) => cellphone),
		};

		await this.prismaService.customer.create({
			data: {
				guardian: {
					connect: { id: customerId },
				},
				id: dependent.id ?? randomUUID(),
				name: dependent.name,
				socialName: dependent.socialName,
				birthDate: dependent.birthDate,
				registrationDate: dependent.registrationDate,
				address: dependent.address
					? {
							create: {
								street: dependent.address.street,
								neighborhood: dependent.address.neighborhood,
								city: dependent.address.city,
								state: dependent.address.state,
								country: dependent.address.country,
								zipcode: dependent.address.zipcode,
							},
						}
					: undefined,
				cellphones: {
					create: dependent.cellphones.map((cellphone) => ({
						ddd: cellphone.ddd,
						number: cellphone.number,
					})),
				},
				documents: {
					create: dependent.documents.map((document) => ({
						number: document.number,
						type: document.type as DocumentType,
						expeditionDate: document.expeditionDate,
					})),
				},
			},
		});
	}

	async update(customer: CustomerDto, id: string): Promise<void> {
		await this.prismaService.customer.update({
			where: { id: id },
			data: {
				name: customer.name,
				socialName: customer.socialName,
				birthDate: customer.birthDate,
				registrationDate: customer.registrationDate,
				address: customer.address
					? {
							upsert: {
								create: {
									street: customer.address.street,
									neighborhood: customer.address.neighborhood,
									city: customer.address.city,
									state: customer.address.state,
									country: customer.address.country,
									zipcode: customer.address.zipcode,
								},
								update: {
									street: customer.address.street,
									neighborhood: customer.address.neighborhood,
									city: customer.address.city,
									state: customer.address.state,
									country: customer.address.country,
									zipcode: customer.address.zipcode,
								},
							},
						}
					: {
							delete: true,
						},
				cellphones: {
					deleteMany: {},
					create: customer.cellphones.map((cellphone) => ({
						ddd: cellphone.ddd,
						number: cellphone.number,
					})),
				},
				documents: {
					deleteMany: {},
					create: customer.documents.map((document) => ({
						number: document.number,
						type: document.type as DocumentType,
						expeditionDate: document.expeditionDate,
					})),
				},
			},
		});
	}

	async updateDependent(
		customerId: string,
		dependentDto: CustomerDto,
	): Promise<void> {
		const customerDto = await this.findById(customerId);
		if (!customerDto) {
			console.error("Customer not found:", customerId);
			throw new Error("Customer not found");
		}

		const dependent = {
			...dependentDto,
			address: customerDto.address,
			cellphones: customerDto.cellphones.map((cellphone) => cellphone),
		};
		console.log("Updating dependent:", dependent);

		await this.prismaService.customer.update({
			where: {
				id: dependent.id,
				guardianId: customerId,
			},
			data: {
				name: dependent.name,
				socialName: dependent.socialName,
				birthDate: dependent.birthDate,
				registrationDate: dependent.registrationDate,
				address: dependent.address
					? {
							upsert: {
								create: {
									street: dependent.address.street,
									neighborhood: dependent.address.neighborhood,
									city: dependent.address.city,
									state: dependent.address.state,
									country: dependent.address.country,
									zipcode: dependent.address.zipcode,
								},
								update: {
									street: dependent.address.street,
									neighborhood: dependent.address.neighborhood,
									city: dependent.address.city,
									state: dependent.address.state,
									country: dependent.address.country,
									zipcode: dependent.address.zipcode,
								},
							},
						}
					: {
							delete: true,
						},
				cellphones: {
					deleteMany: {},
					create: dependent.cellphones.map((cellphone) => ({
						ddd: cellphone.ddd,
						number: cellphone.number,
					})),
				},
				documents: {
					deleteMany: {},
					create: dependent.documents.map((document) => ({
						number: document.number,
						type: document.type as DocumentType,
						expeditionDate: document.expeditionDate,
					})),
				},
			},
		});
	}

	async remove(id: string): Promise<void> {
		await this.prismaService.customer.delete({
			where: { id },
		});
	}

	async removeDependent(
		customerId: string,
		dependentId: string,
	): Promise<void> {
		await this.prismaService.customer.delete({
			where: {
				id: dependentId,
				guardianId: customerId,
			},
		});
	}

	private mapToDto(customer: any): CustomerDto {
		return {
			id: customer.id,
			name: customer.name,
			socialName: customer.socialName,
			birthDate: customer.birthDate.toISOString(),
			registrationDate: customer.registrationDate.toISOString(),
			address: customer.address
				? {
						id: customer.address.id,
						street: customer.address.street,
						neighborhood: customer.address.neighborhood,
						city: customer.address.city,
						state: customer.address.state,
						country: customer.address.country,
						zipcode: customer.address.zipcode,
					}
				: {
						street: "",
						neighborhood: "",
						city: "",
						state: "",
						country: "",
						zipcode: "",
					},
			cellphones: customer.cellphones.map((cellphone: any) => ({
				id: cellphone.id,
				ddd: cellphone.ddd,
				number: cellphone.number,
			})),
			documents: customer.documents.map((document: any) => ({
				id: document.id,
				number: document.number,
				type: document.type,
				expeditionDate: document.expeditionDate.toISOString(),
			})),
			dependents: customer.dependents.map((dependent: any) => ({
				id: dependent.id,
				name: dependent.name,
				socialName: dependent.socialName,
				birthDate: dependent.birthDate.toISOString(),
				registrationDate: dependent.registrationDate.toISOString(),
				address: dependent.address
					? {
							id: dependent.address.id,
							street: dependent.address.street,
							neighborhood: dependent.address.neighborhood,
							city: dependent.address.city,
							state: dependent.address.state,
							country: dependent.address.country,
							zipcode: dependent.address.zipcode,
						}
					: {
							street: "",
							neighborhood: "",
							city: "",
							state: "",
							country: "",
							zipcode: "",
						},
				cellphones: dependent.cellphones.map((cellphone: any) => ({
					id: cellphone.id,
					ddd: cellphone.ddd,
					number: cellphone.number,
				})),
				documents: dependent.documents.map((document: any) => ({
					id: document.id,
					number: document.number,
					type: document.type,
					expeditionDate: document.expeditionDate.toISOString(),
				})),
				dependents: [],
			})),
		};
	}
}
