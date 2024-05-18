import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import { app, server } from "./socket/socket.js";
import connect from "./config/db.js";
import chatbotRoutes from "./routes/chatbot.routes.js";
import eventRoutes from "./routes/events.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import editorRoutes from "./routes/editor.routes.js";
import companyRoutes from "./routes/company.routes.js";

app.use(
  express.json({
    limit: "50mb"
  })
);

app.use(cookieParser());
app.use(cors());
// app.use(express.limit("50mb"));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/editor", editorRoutes);
app.use("/api/company", companyRoutes);

const PORT = process.env.PORT || 8000;
server.listen(PORT, err => {
  if (err) throw new Error(err);
  console.log(`Server is runing on port ${PORT}`);
  connect();
});
