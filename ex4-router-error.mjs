import express from "express";
import { router as todosRouter } from "./routes/todos.mjs";
import { logger } from "./middlewares/logger.mjs";
import { errorHandler, notFound } from "./middlewares/error-handler.mjs";
const app = express();
app.use(express.json());
app.use(logger);
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/todos", todosRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(3000, () => console.log("ex4 listening on http://localhost:3000"));

// ย้ายกลุ่มไป /api/v2/todos แก้เพียง prefix ในไฟล์ประกอบ app เพราะ router ไม่รู้จัก prefix
// errorHandler ต้องมี 4 พารามิเตอร์ Express จึงจำได้ว่าเป็น error middleware
// service ไม่ import express ทำให้ทดสอบกฎธุรกิจแยกจาก HTTP และนำไปใช้กับ CLI/งานอื่นได้
// Express 4 ไม่จับ throw จาก async handler เอง ต้องใช้ asyncHandler หรือ try/catch; โค้ดนี้ใช้ handler sync
