import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {Todo} from "../types/todo.ts";
import {createTodo, deleteTodo, updateTodo} from "./api.ts";

export const useCreateTodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Todo) => createTodo(data),
		//TODO: onMutate будет запущена до того, как мы запустим mutationFn
		onMutate: () => {
			console.log("mutate");
		},
		//TODO: onError будет вызываться при ошибке
		onError: () => {
			console.log("error");
		},
		//TODO: onSuccess будет вызваться при успешном выполнении мутации
		onSuccess: () => {
			console.log("success");
		},
		//TODO: onSettled будет вызываться в самом конце, независимо от результата выполнения мутации
		//TODO: variables - это параметры, которые мы передаем в функцию мутации
		onSettled: async (_, error) => {
			console.log("settles");
			if (error) {
				console.log(error)
			} else {
				//TODO: queryClient.invalidateQueries - делает запросы недействительными, для того, чтобы они обновились в фоновом режиме. Внимание: Это асинхронная функция
				await queryClient.invalidateQueries({queryKey: ["todos"]})
			}
		}
	})
}

export const useUpdateTodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Todo) => updateTodo(data),
		onSettled: async (_, error, variables) => {
			if (error) {
				console.log(error)
			} else {
				await queryClient.invalidateQueries({queryKey: ["todos"]})
				await queryClient.invalidateQueries({queryKey: ["todo", {id: variables.id}]})
			}
		}
	})
}

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => deleteTodo(id),
		onSuccess: () => {
			console.log("deleted successfully")
		},
		onSettled: async (_, error) => {
			if (error) {
				console.log(error)
			} else {
				await queryClient.invalidateQueries({queryKey: ["todos"]})
			}
		}
	})
}