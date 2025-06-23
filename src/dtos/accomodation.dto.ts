export type AccommodationDto = {
	id?: string;
	name: string;
	singleBeds: number;
	coupleBeds: number;
	suites: number;
	garages: number;
	hasAirConditioning: boolean;
	customerId?: string;
};
