import axios from "axios";
import type {Todo} from "../types/todo.ts";
import {Project} from "../types/project.ts";
import {Products} from "../types/products.ts";

const BASE_URL = 'http://localhost:3001'
const axiosInstance = axios.create({baseURL: BASE_URL})

export const getTodosIds = async () => {
	return (await axiosInstance.get<Todo[]>('todos')).data.reduce((acc, todo) => todo.id ? [...acc, todo.id] : [...acc], [] as number[])
}

export const getTodo = async (id: number) => {
	return (await axiosInstance.get<Todo>(`todos/${id}`)).data
}

export const createTodo = async (data: Todo) => {
	await axiosInstance.post<Todo>('todos', data)
}

export const updateTodo = async (data: Todo) => {
	await axiosInstance.put(`todos/${data.id}`, data)
}

export const deleteTodo = async (id: number) => {
	await axiosInstance.delete(`todos/${id}`)
}

export const getProjects = async (page = 1) => {
	return (await axiosInstance.get<{ data: Project[] }>(`projects?_page=${page}&_per_page=3`)).data.data
}

export const getProducts = async ({pageParam}: { pageParam: number }) => {
	return (await axiosInstance.get<Products>(`products?_page=${pageParam}&_per_page=3`)).data.data
}