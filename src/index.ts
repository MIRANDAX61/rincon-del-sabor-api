import express, { type Request, type Response } from "express"; 
import swaggerRouter from "./routes/swagger.router.js";
import cors from "cors";
import pool from "./config/db.js";
import ProductRouter from "./routes/product.routes.js";
import customerRouter from "./routes/customer.routes.js";

// Asignamos un puerto por defecto (3000) por si process.env.PORT no está definido
const port = process.env.PORT || 3000; 

const app = express();

// Middlewares 
app.use(express.json());
app.use(cors());
app.use("/api", customerRouter);

// Documentación Swagger
app.use("/api/docs", swaggerRouter); 

// Ruta de prueba
app.get("/", (req: Request, res: Response) => {
    /*#swagger.tags = ['Tests']*/
    res.json({
        status: "Server online",
        version: "1.0.0"
    });
});

// Rutas de productos (quedurán en /api/products)
app.use('/api', ProductRouter);

app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
});