import type { Request, Response } from "express";
import { CustomerModel } from "../models/customer.model.js";

export async function getCustomers(req: Request, res: Response) {
    /* #swagger.tags = ['Customers']
    #swagger.summary = 'Listar todos los clientes'
    */

    /* #swagger.responses[200] = {
        description: 'Lista de clientes obtenida correctamente.'
    } */

    /* #swagger.responses[500] = {
        description: 'Error al obtener los clientes.'
    } */
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
    /* #swagger.tags = ['Customers']
     #swagger.summary = 'Obtener un cliente por su ID'
    */

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del cliente.',
        required: true,
        type: 'integer',
        minimum: 1
    } */

    /* #swagger.responses[200] = {
        description: 'Cliente encontrado.'
    } */

    /* #swagger.responses[400] = {
        description: 'El ID debe ser un entero positivo.'
    } */

    /* #swagger.responses[404] = {
        description: 'Cliente no encontrado.'
    } */

    /* #swagger.responses[500] = {
        description: 'Error al obtener el cliente.'
    } */
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
    /* #swagger.tags = ['Customers']
    #swagger.summary = 'Crear un cliente'
    */

    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Nombre y correo obligatorios. Teléfono opcional.',
        required: true,
        schema: {
            $name: 'Leonardo',
            $email: 'leo@ejemplo.com',
            phone_number: '70012345'
        }
    } */

    /* #swagger.responses[201] = {
        description: 'Cliente creado correctamente.'
    } */

    /* #swagger.responses[400] = {
        description: 'Los datos no cumplen la validación de Zod.'
    } */

    /* #swagger.responses[409] = {
        description: 'Los datos duplican un valor con restricción única.'
    } */

    /* #swagger.responses[500] = {
        description: 'Error al crear el cliente.'
    } */
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
    /* #swagger.tags = ['Customers']
    #swagger.summary = 'Actualizar un cliente'
    */

    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del cliente que se desea actualizar.',
        required: true,
        type: 'integer',
        minimum: 1
    } */

    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Nombre y correo obligatorios. Teléfono opcional.',
        required: true,
        schema: {
            $name: 'Leonardo Miranda',
            $email: 'leonardo@ejemplo.com',
            phone_number: '70012345'
        }
    } */

    /* #swagger.responses[200] = {
        description: 'Cliente actualizado correctamente.'
    } */

    /* #swagger.responses[400] = {
        description: 'ID inválido o datos rechazados por Zod.'
    } */

    /* #swagger.responses[404] = {
        description: 'Cliente no encontrado.'
    } */

    /* #swagger.responses[409] = {
        description: 'Los datos duplican un valor con restricción única.'
    } */

    /* #swagger.responses[500] = {
        description: 'Error al actualizar el cliente.'
    } */
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