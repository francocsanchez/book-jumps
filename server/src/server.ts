import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";

// Connect to MongoDB
import { connectDB } from "./config/mongo";
import { corsOptions } from "./config/cors";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());

// Routes
import usuarioRoutes from "./routes/usuarioRoutes";
import clubRoutes from "./routes/clubRoutes";
import licenciaRoutes from "./routes/licenciaRoutes";
import marcaAvionRoutes from "./routes/marcaAvionRoutes";

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/licencias", licenciaRoutes);
app.use("/api/marcas-aviones", marcaAvionRoutes);

export default app;
