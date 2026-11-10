import { z } from "zod";
export const getProductsQuerySchema = z.object({
    maxPrice: z
        .string()
        .trim()
        .min(1, "El precio máximo no puede estar vacío")
        .transform(Number)
        .pipe(z.number().finite().nonnegative())
        .optional(),
    page: z
        .string()
        .regex(/^\d+$/, "La página debe contener solo números")
        .transform(Number)
        .pipe(z.number().int().positive())
        .default(1),
    limit: z
        .string()
        .regex(/^\d+$/, "El límite debe contener solo números")
        .transform(Number)
        .pipe(z.number().int().min(1).max(100))
        .default(10)
});
//# sourceMappingURL=product.schema.js.map