import { Router } from "express";
import { getSales, getSaleById, createSale } from "../controllers/sale.controller.js";
const router = Router();
router.get("/sales", getSales);
router.get("/sales/:id", getSaleById);
router.post("/sales", createSale);
export default router;
//# sourceMappingURL=sale.routes.js.map