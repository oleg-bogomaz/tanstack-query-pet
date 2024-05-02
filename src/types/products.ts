type Product = {
	id: number,
	name: string,
}

export type Products = {
	first: number,
	last: number,
	previous: number | null,
	next: number | null,
	pages: number,
	items: number
	data: Product[]
}