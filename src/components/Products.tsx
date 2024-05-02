import {useProducts} from "../services/queries.ts";
import {Fragment, useState} from "react";

export const Products = () => {
	const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
	const productsQuery = useProducts()
	return <>{productsQuery.data?.pages.map((group, index) => (
		<Fragment key={index}>
			{group.map((product) => (
				<Fragment key={product.id}>
					<button onClick={() => setSelectedProductId(product.id)}>{product.name}</button>
					<br/>
				</Fragment>
			))}
		</Fragment>
	))}</>
}