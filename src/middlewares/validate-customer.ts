import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const customerSchema = z.object({
    name: z.string()
        .trim()
        .min(1, "El nombre es obligatorio")
        .max(100, "El nombre no puede superar 100 caracteres"),
    email: z.string()
        .trim()
        .email("El correo no tiene un formato válido")
        .max(150, "El correo no puede superar 150 caracteres"),
    phone_number: z.string()
        .trim()
        .max(20, "El teléfono no puede superar 20 caracteres")
        .nullable()
        .optional()
});

export function validateCustomer(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const resultado = customerSchema.safeParse(req.body);

    if (!resultado.success) {
        res.status(400).json({
            mensaje: "Datos del cliente inválidos",
            errores: resultado.error.issues
        });
        return;
    }
    
    req.body = resultado.data;
    next();
}