import express from "express";
import { randomUUID } from "node:crypto";

const app = express(); app.use(express.json());
const todos = [
  { id: randomUUID(), title: "อ่านบท Express", done: false, priority: "high" },
  { id: randomUUID(), title: "เขียน middleware", done: false, priority: "normal" },
  { id: randomUUID(), title: "ทดสอบด้วย Postman", done: true, priority: "low" },
  { id: randomUUID(), title: "ส่งงาน Workshop 4", done: false, priority: "normal" }
];
const findTodo = id => todos.find(todo => todo.id === id);
function validate(req, res, next) {
  const { title, done = false, priority = "normal" } = req.body ?? {};
  if (typeof title !== "string" || !title.trim() || typeof done !== "boolean" || !["high", "normal", "low"].includes(priority)) return res.status(400).json({ error: "ข้อมูล todo ไม่ถูกต้อง" });
  next();
}
app.get("/todos", (req, res) => {
  let items = [...todos];
  if (req.query.done === "true" || req.query.done === "false") items = items.filter(todo => todo.done === (req.query.done === "true"));
  if (typeof req.query.q === "string") items = items.filter(todo => todo.title.toLowerCase().includes(req.query.q.toLowerCase()));
  if (req.query.sort === "title") items.sort((a, b) => a.title.localeCompare(b.title, "th"));
  return res.status(200).json({ total: items.length, items });
});
app.get("/todos/:id", (req, res) => { const todo = findTodo(req.params.id); if (!todo) return res.status(404).json({ error: `ไม่พบรายการ ${req.params.id}` }); return res.status(200).json(todo); });
app.post("/todos", validate, (req, res) => { const todo = { id: randomUUID(), title: req.body.title.trim(), done: req.body.done ?? false, priority: req.body.priority ?? "normal" }; todos.push(todo); return res.status(201).json(todo); });
app.put("/todos/:id", validate, (req, res) => { const i = todos.findIndex(todo => todo.id === req.params.id); if (i < 0) return res.status(404).json({ error: `ไม่พบรายการ ${req.params.id}` }); todos[i] = { id: req.params.id, title: req.body.title.trim(), done: req.body.done, priority: req.body.priority }; return res.status(200).json(todos[i]); });
app.delete("/todos/:id", (req, res) => { const i = todos.findIndex(todo => todo.id === req.params.id); if (i < 0) return res.status(404).json({ error: `ไม่พบรายการ ${req.params.id}` }); todos.splice(i, 1); return res.status(204).end(); });
app.listen(3000, () => console.log("ex3 listening on http://localhost:3000"));

// query เป็น string เสมอ จึงต้องเทียบกับ "false" ไม่ใช่ if (done) ที่จะถือว่า string เป็นจริง
// งานนี้เลือก DELETE 204 เพราะลบสำเร็จและไม่มี representation ให้ส่งกลับ; การตอบซ้ำ 404 ยัง idempotent ต่อสถานะปลายทาง
// PUT แทน resource ทั้งก้อน ส่วน PATCH แก้บาง field; ข้อนี้ใช้ PUT เพราะส่งข้อมูล todo ครบทุก field
