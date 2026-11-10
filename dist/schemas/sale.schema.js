import { z } from "zod";
export const createSaleSchema = z.object({
    customer_id: z.number().int().positive(),
    sale_date: z.iso.date().optional(),
    status: z.string().trim().min(1).optional()
});
export const saleIdSchema = z.object({
    id: z
        .string()
        .regex(/^\d+$/, "El ID debe contener solo números")
        .transform(Number)
        .pipe(z.number().int().positive())
});
//# sourceMappingURL=sale.schema.js.map