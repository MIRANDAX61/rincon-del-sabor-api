import { z } from "zod";
const productSchema = z.object({
    name: z.string()
        .trim()
        .min(1, "El nombre es obligatorio"),
    description: z.string()
        .trim()
        .min(1, "La descripción es obligatoria"),
    price: z.number()
        .positive("El precio debe ser mayor que cero"),
    cost: z.number()
        .min(0, "El costo no puede ser negativo")
        .optional(),
    stock: z.number()
        .int("El stock debe ser un número entero")
        .min(0, "El stock no puede ser negativo")
        .optional()
});
export function validateProduct(req, res, next) {
    const resultado = productSchema.safeParse(req.body);
    if (!resultado.success) {
        res.status(400).json({
            mensaje: "Datos del producto inválidos",
            errores: resultado.error.issues
        });
        return;
    }
    req.body = resultado.data;
    next();
}
//# sourceMappingURL=validate-product.js.map