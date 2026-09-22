import express from "express";

const app = express();
const TODOS = [
  { id: "1", title: "อ่านบท Express", done: false, priority: "high" },
  { id: "2", title: "เขียน middleware", done: false, priority: "normal" },
  { id: "3", title: "ทดสอบด้วย Postman", done: true, priority: "normal" },
  { id: "4", title: "ส่งงาน Workshop 4", done: false, priority: "low" }
];

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
app.get("/todos", (req, res) => res.status(200).json([...TODOS]));
app.get("/todos/:id", (req, res) => {
  const todo = TODOS.find(item => item.id === req.params.id);
  if (!todo) return res.status(404).json({ error: `ไม่พบรายการ ${req.params.id}` });
  return res.status(200).json(todo);
});

app.listen(3000, () => console.log("ex1 listening on http://localhost:3000"));

// คำตอบ: type:module ทำให้ใช้ import/export แบบ ESM ได้; ถ้าไม่ใส่จะเกิด SyntaxError
// ไม่พบรายการต้องเป็น 404 เพื่อให้ client รู้ว่าทรัพยากรไม่มีอยู่จริง ไม่ใช่ผลลัพธ์ว่างที่ดูเหมือนสำเร็จ
// nodemon เฝ้าดูไฟล์และ restart อัตโนมัติ จึงเป็น devDependency เพราะใช้เฉพาะตอนพัฒนา
