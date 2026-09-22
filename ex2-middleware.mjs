import express from "express";

const app = express();
const TODOS = [{ id: "1", title: "อ่านบท Express", done: false, priority: "high" }];

function logger(req, res, next) {
  const started = Date.now();
  res.on("finish", () => console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${Date.now() - started}ms)`));
  next();
}
function requireApiKey(req, res, next) {
  if (req.path === "/health") return next();
  if (!req.get("x-api-key")) return res.status(401).json({ error: "ต้องส่ง x-api-key" });
  if (req.get("x-api-key") !== "ce385") return res.status(403).json({ error: "x-api-key ไม่ถูกต้อง" });
  next();
}
function validateTodo(req, res, next) {
  const { title, priority = "normal" } = req.body ?? {};
  if (typeof title !== "string" || !title.trim()) return res.status(400).json({ error: "title ต้องเป็นข้อความที่ไม่ว่าง" });
  if (!["high", "normal", "low"].includes(priority)) return res.status(400).json({ error: "priority ไม่ถูกต้อง" });
  next();
}

app.use(express.json());
app.use(logger);
app.use(requireApiKey);
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
app.post("/todos", validateTodo, (req, res) => {
  const todo = { id: String(TODOS.length + 1), title: req.body.title.trim(), done: false, priority: req.body.priority ?? "normal" };
  TODOS.push(todo); return res.status(201).json(todo);
});
app.get("/todos", (req, res) => res.status(200).json([...TODOS]));
app.listen(3000, () => console.log("ex2 listening on http://localhost:3000"));

// ถ้าลบ next() จาก logger คำขอจะค้าง เพราะไม่มีด่านถัดไปและไม่ได้ตอบ res
// application-level ใช้กับทุก route; route-level ใช้เฉพาะ route ที่ต้องตรวจ body เช่น POST
// middleware คือ Chain of Responsibility: แต่ละด่านรับผิดชอบงานตัวเอง แล้ว next() ส่งต่อ หรือ res หยุดสาย
