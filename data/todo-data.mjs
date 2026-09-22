const todos = [
  { id: "1", title: "อ่านบท Express", done: false, priority: "high" },
  { id: "2", title: "เขียน middleware", done: false, priority: "normal" },
  { id: "3", title: "ทดสอบด้วย Postman", done: true, priority: "low" },
  { id: "4", title: "ส่งงาน Workshop 4", done: false, priority: "normal" }
];
export function allTodos() { return todos.map(todo => ({ ...todo })); }
export function getTodo(id) { const todo = todos.find(item => item.id === id); return todo ? { ...todo } : undefined; }
export function addTodo(todo) { todos.push({ ...todo }); return { ...todo }; }
export function updateTodo(id, todo) { const i = todos.findIndex(item => item.id === id); if (i < 0) return undefined; todos[i] = { id, ...todo }; return { ...todos[i] }; }
export function removeTodo(id) { const i = todos.findIndex(item => item.id === id); if (i < 0) return false; todos.splice(i, 1); return true; }
