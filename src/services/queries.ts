import {keepPreviousData, useInfiniteQuery, useQueries, useQuery} from "@tanstack/react-query";
import {getProducts, getProjects, getTodo, getTodosIds} from "./api.ts";

export const useTodosIds = () => {
	return useQuery(
		{
			//TODO: queryKey - ключ запроса нужен для того, чтобы в дальнейшем можно было ссылаться на этот запрос, например для перевалидации данных. И также по этому ключу данный запрос будет отображаться в devtools
			queryKey: ["todos"],

			//TODO: queryFn - Сама функция запрос. Она должна возвращать Promise
			queryFn: getTodosIds,

			//TODO: refetchOnWindowFocus - По умолчанию запрос будет всегда перевыполняться, если мы уводим фокус с нашего окна и возвращаем его
			// refetchOnWindowFocus: true,

			//TODO: enabled - Мы можем включать и отключать запрос данным свойством. Например мы можем передать в оборачивающую функцию boolean параметр и вставить его сюда, и снаружи управлять включением запроса
			// enabled: true
		}
	)
}

export const useTodos = (ids: (number | undefined)[] | undefined) => {
	//TODO: useQueries - нужен когда нам нужно использовать несколько запросов, количество которых неизвестно
	return useQueries({
		queries: (ids ?? []).map(id => {
			return {
				//TODO: Динамические ключи лучше всегда помещать в фигурные скобки
				queryKey: ["todo", {id}],
				queryFn: () => getTodo(id!),
			}
		}),
	})
}

export const useProjects = (page: number) => {
	return useQuery({
		queryKey: ["projects", {page}],
		queryFn: () => getProjects(page),
		//TODO: placeholderData: keepPreviousData - данная запись означает, что при нажатии на следующую страницу, пока загружаются данные следующей страницы, данные предыдущей страницы отображаются, для того чтобы Ui не мерцал и не перескакивал
		placeholderData: keepPreviousData
	})
}

export const useProducts = () => {
	//TODO: useInfiniteQuery() хорошо подходит для реализации бесконечной ленты
	return useInfiniteQuery({
		queryKey: ["products"],
		queryFn: () => getProducts,
		//TODO: начальный параметр страницы
		initialPageParam: 0,
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined
			}
			return lastPageParam + 1
		},
		getPreviousPageParam: (_, __, firstPageParam) => {
			if (firstPageParam <= 1) {
				return undefined
			}
			return firstPageParam - 1
		}
	})
}