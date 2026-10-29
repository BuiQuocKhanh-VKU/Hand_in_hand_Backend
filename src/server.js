import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import viewEngine from "./config/viewEngine.js";
import initWebRoutes from "./route/web.js";
import connectDB from "./config/connectDB.js";

dotenv.config();

const app = express();

/**
 * CORS whitelist
 * - Thêm các origin frontend được phép truy cập API
 * - URL_REACT phải khớp EXACT (protocol + host + port)
 *   ví dụ: http://localhost:3000 hoặc https://your-frontend.com
 */
const whitelist = [
  process.env.URL_REACT,
  // "https://your-frontend.com",
];

/**
 * Cấu hình CORS
 * - Cho phép Authorization để trình duyệt gửi header này
 * - Expose Retry-After để FE đọc và backoff khi 429
 * - credentials: true nếu bạn DÙNG cookie/session. Nếu không dùng, có thể set false.
 */
const corsOptions = {
  origin(origin, callback) {
    // Cho phép request không có Origin (Postman, curl)
    if (!origin) return callback(null, true);

    if (whitelist.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type", "X-Requested-With"],
  exposedHeaders: ["Retry-After"],
  credentials: true, // bật nếu dùng cookie; nếu không cần cookie, có thể để false
};

// Áp dụng CORS cho mọi route
app.use(cors(corsOptions));
// Đảm bảo preflight OPTIONS cho tất cả endpoint
app.options("*", cors(corsOptions));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine & routes (giữ nguyên theo dự án của bạn)
viewEngine(app);
initWebRoutes(app);

// DB
connectDB();

/**
 * Middleware bắt lỗi CORS (để server trả 403 thay vì crash)
 */
app.use((err, req, res, next) => {
  if (err && err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: 1, message: "CORS_FORBIDDEN" });
  }
  return next(err);
});

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("Backend Nodejs is running on port", port);
});
