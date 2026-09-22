export class AppError extends Error { constructor(status, message) { super(message); this.status = status; } }
export function notFound(req, res, next) { next(new AppError(404, `ไม่พบเส้นทาง ${req.method} ${req.originalUrl}`)); }
export function errorHandler(err, req, res, next) { const status = err.status ?? 500; if (status >= 500) return res.status(500).json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" }); return res.status(status).json({ error: err.message }); }
