
export const deleteCustomer = async (id: string): Promise<void> => {
	const response = await fetch(`http://localhost:3333/customer/${id}`, {
		method: "DELETE",
	});
	console.log(response);
	if (!response.ok) {
		throw new Error("Failed to fetch customers");
	}
};
