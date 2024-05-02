import {useState} from "react";
import {useProjects} from "../services/queries.ts";

export const Projects = () => {
	const [page, setPage] = useState(1);

	const {data, isPending, error, isError, isPlaceholderData, isFetching} = useProjects(page);

	return <>
		{isPending ? (
			<div>Loading...</div>
		) : isError ? (
			<div>Error: {error.message}</div>
		) : (<div>
			{data.map((project) => (
				<p key={project.id}>Project {project.name}</p>
			))}
			<span>Current page: {page}</span>
			<button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>
				Previous Page
			</button>
			{" "}
			<button onClick={() => {
				if (!isPlaceholderData) {
					setPage(prev => prev + 1);
				}
			}}
					disabled={isPlaceholderData}
			>
				Next Page
			</button>
			{isFetching ? <span>Loading...</span> : null}{" "}
		</div>)
		}
	</>
}