import type { CustomerDto } from "@/core/dtos/customer.dto";

export const fetchCustomers = async (): Promise<CustomerDto[]> => {
  const response = await fetch("http://localhost:3333/customer/");
  console.log(response)
  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }
  return response.json();
};

