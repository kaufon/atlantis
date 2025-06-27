import type { AddressDto } from "./address.dto";
import type { CellphoneDto } from "./cellphone.dto";
import type { DocumentDto } from "./document.dto";

export type CustomerDto = {
	id?: string;
	name: string;
	socialName: string;
	birthDate: string;
	registrationDate: string;
	documents: DocumentDto[];
	cellphones: CellphoneDto[];
	address: AddressDto;
	dependents: CustomerDto[];
};
