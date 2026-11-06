import type { Request, Response } from "express";
import { CustomerModel } from "../models/customer.model.js";

export async function getCustomers(req: Request, res: Response) {
    try {
        const customers = await CustomerModel.findAll();

        res.status(200).json(customers);
    } catch (error) {
        console.error ("Error al obtener clientes:", error);

        res.status(500).json({
            mensaje: "Error al obtener los clientes"
        });
    }
}

export async function getCustomerById(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        res.status(400).json({
            mensaje: "El ID debe ser un entero positivo"
        });
        return;
    }

    try {
        const customer = await CustomerModel.findById(id);

        if (!customer) {
            res.status(404).json({
                mensaje: "Cliente no encontrado"
            });
            return;
        }

        res.status(200).json(customer);
    } catch (error) {
        console.error("Error al buscar cliente", error);

        res.status(500).json({
            mensaje: "Error al obtener el cliente"
        });
    }
}

export async function createCustomer(req: Request, res: Response) {
    try {
        const customer = await CustomerModel.create(req.body);

        res.status(201).json(customer);
    } catch (error) {
        console.error("Error al crear cliente:", error);

        if (
            error instanceof Error &&
            "code" in error &&
            error.code === "23505"
        ) {
            res.status(409).json({
                mensaje: "Los datos enviados duplican un valor único"
            });
            return;
        }

        res.status(500).json({
            mensaje: "Error al crear el cliente"
        });
    }
}

export async function updateCustomer(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        res.status(400).json({
            mensaje: "El ID debe ser un entero positivo"
        });
        return;
    }
    try { 
        const customer = await CustomerModel.update(id, req.body);

        if (!customer) {
            res.status(404).json({
                mensaje: "Cliente no encontrado"
            });
            return;
        }

        res.status(200).json(customer);
    } catch (error) {
        console. error("Error al actualizar cliente:", error);

        if (
            error instanceof Error &&
            "code" in error && 
            error.code === "23505"
        ) {
            res.status(409).json({
                mensaje: "Los datos enviados duplican un valor único"
            });
            return;
        }

        res.status(500).json({
            mensaje: "Error al actualizar el cliente"
        });
    }
}