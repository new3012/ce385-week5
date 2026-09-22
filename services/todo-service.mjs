import { randomUUID } from "node:crypto";
import { addTodo, allTodos, getTodo, removeTodo, updateTodo } from "../data/todo-data.mjs";
export function listTodos({ done, q, sort } = {}) { let items = allTodos(); if (done === "true" || done === "false") items = items.filter(t => t.done === (done === "true")); if (q) items = items.filter(t => t.title.toLowerCase().includes(q.toLowerCase())); if (sort === "title") items.sort((a, b) => a.title.localeCompare(b.title, "th")); return { total: items.length, items }; }
export function findTodo(id) { return getTodo(id); }
export function createTodo(input) { return addTodo({ id: randomUUID(), title: input.title.trim(), done: input.done ?? false, priority: input.priority ?? "normal" }); }
export function replaceTodo(id, input) { return updateTodo(id, { title: input.title.trim(), done: input.done, priority: input.priority }); }
export function deleteTodo(id) { return removeTodo(id); }
