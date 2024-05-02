import {useTodos, useTodosIds} from "../services/queries.ts";
import {useIsFetching} from "@tanstack/react-query";
import {useCreateTodo, useDeleteTodo, useUpdateTodo} from "../services/mutations.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import type {Todo} from "../types/todo.ts";

export const Todos = () => {
	const todosIdsQuery = useTodosIds();
	const todosQueries = useTodos(todosIdsQuery.data);
	const createTodoMutation = useCreateTodo();
	const updateTodoMutation = useUpdateTodo();
	const deleteTodoMutation = useDeleteTodo();
	// const isFetching = useIsFetching();

	const {register, handleSubmit} = useForm<Todo>();

	const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
		createTodoMutation.mutate(data)
	}
	const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
		if (data) {
			updateTodoMutation.mutate({...data, checked: true})
		}
	}
	//TODO: Пример асинхронного использования мутации. Это нужно когда нам после того, как мутация будет произведена понадобиться выполнить какое-то действие
	const handleDeleteTodo = async (id: number) => {
		await deleteTodoMutation.mutateAsync(id)
		console.log("deleted")
	}

	// if (todosIdsQuery.isPending) {
	// 	return <span>Loading...</span>
	// }
	//
	// if (todosIdsQuery.isError) {
	// 	return <span>There is an error!</span>
	// }
	return (<div style={{display: 'flex', justifyContent: 'center', gap: "40px"}}>
		{/*<p>Query function status (Статус самой функции запроса): {todosIdsQuery.fetchStatus}</p>*/}
		{/*<p>Query data status (Статус получения данных): {todosIdsQuery.status}</p>*/}
		{/*<p>Global isFetching (Общее количество запросов, которые выполняются в данный момент): {isFetching}</p>*/}
		<div>
			<form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
				<h4>New todo:</h4>
				<input placeholder="Title"{...register("title")}/>
				<br/>
				<input placeholder="Description"{...register("description")}/>
				<br/>
				{/*TODO: Пока отправляем запрос - делаем кнопку неактивной*/}
				<input type={"submit"} disabled={createTodoMutation.isPending}
					   value={createTodoMutation.isPending ? "Добавление..." : "Добавить"}/>
			</form>
		</div>
		<div>
			{todosIdsQuery.data?.map((id) => <p key={id}>id: {id}</p>)}
		</div>
		<ul>
			{todosQueries.map(({data}) => (
				<li style={{marginBottom: "15px"}} key={data?.id}>
					<div>Id: {data?.id}</div>
					<span>
						<div>
							<strong>Title: </strong> {data?.title}
						</div>
						<div>
							<strong>Description: </strong> {data?.description}
						</div>
					</span>
					<div>
						<button disabled={data?.checked}
								onClick={() => handleMarkAsDoneSubmit(data)}>{data?.checked ? "Done" : "Mark as done"}
						</button>
					</div>
					<div>
						{data && data.id && (
							<button onClick={() => handleDeleteTodo(data.id!)}>Delete</button>
						)}
					</div>
				</li>))}
		</ul>
	</div>)
}