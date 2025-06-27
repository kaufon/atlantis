import { AccommodationDto } from "src/dtos/accomodation.dto";

export const SuperFamilyAccommodationMock: AccommodationDto = {
	id: "1",
	name: "Familia Super",
	singleBeds: 6,
	coupleBeds: 2,
	suites: 3,
	garages: 2,
	hasAirConditioning: true,
	customerId: undefined,
  quantityAvailable: 0
};
export const SimpleSingleAccommodationMock: AccommodationDto = {
  id: "2",
  name: "Solteiro Simples",
  singleBeds: 1,
  coupleBeds: 0,
  suites: 1,
  garages: 0,
  hasAirConditioning: true,
  customerId: undefined,
  quantityAvailable: 0

}
export const PlusSingleAccommodationMock: AccommodationDto = {
  id: "3",
  name: "Solteiro Mais",
  singleBeds: 1,
  coupleBeds: 0,
  suites: 1,
  garages: 1,
  hasAirConditioning: true,
  customerId: undefined,
  quantityAvailable: 0

}
export const SimpleCoupleAccommodationMock: AccommodationDto = {
  id: "4",
  name: "Casal Simples",
  singleBeds: 0,
  coupleBeds: 1,
  suites: 1,
  garages: 1,
  hasAirConditioning: true,
  customerId: undefined,
  quantityAvailable: 0

}
export const PlusFamilyAccommodationMock: AccommodationDto = {
  id: "5",
  name: "Familia Mais",
  singleBeds: 5,
  coupleBeds: 1,
  suites: 2,
  garages: 2,
  hasAirConditioning: true,
  customerId: undefined,
  quantityAvailable: 0

}
export const SimpleFamilyAccommodationMock: AccommodationDto = {
  id: "6",
  name: "Familia Simples",
  singleBeds: 2,
  coupleBeds: 1,
  suites: 1,
  garages: 1,
  hasAirConditioning: true,
  customerId: undefined,
  quantityAvailable: 0
}
