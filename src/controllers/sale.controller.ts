import type { Request, Response } from "express";
import { SaleModel } from "../models/sale.model.js";
import {
  createSaleSchema,
  saleIdSchema
} from "../schemas/sale.schema.js";

export async function getSales(req: Request, res: Response) {
  /* #swagger.tags = ['Sales']
     #swagger.summary = 'Listar ventas con el nombre del cliente'
  */

  try {
    const ventas = await SaleModel.listar();

    res.status(200).json(ventas);
  } catch (error) {
    console.error("Error al consultar ventas:", error);

    res.status(500).json({
      mensaje: "Error al obtener las ventas"
    });
  }
}

export async function getSaleById(req: Request, res: Response) {
  /* #swagger.tags = ['Sales']
     #swagger.summary = 'Obtener una venta por su ID'
  */

  /* #swagger.parameters['id'] = {
    in: 'path',
    required: true,
    type: 'integer',
    minimum: 1,
    description: 'ID de la venta.'
  } */

  const result = saleIdSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({
      mensaje: "ID inválido",
      errores: result.error.issues
    });
    return;
  }

  try {
    const venta = await SaleModel.obtenerPorId(result.data.id);

    if (!venta) {
      res.status(404).json({
        mensaje: "Venta no encontrada"
      });
      return;
    }

    res.status(200).json(venta);
  } catch (error) {
    console.error("Error al consultar la venta:", error);

    res.status(500).json({
      mensaje: "Error al obtener la venta"
    });
  }
}

export async function createSale(req: Request, res: Response) {
  /* #swagger.tags = ['Sales']
     #swagger.summary = 'Crear una venta'
  */

  /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'El cliente debe existir. Fecha y estado son opcionales.',
    schema: {
      $customer_id: 1,
      sale_date: '2026-11-09',
      status: 'pendiente'
    }
  } */

  const result = createSaleSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      mensaje: "Datos de venta inválidos",
      errores: result.error.issues
    });
    return;
  }

  try {
    const venta = await SaleModel.crear(result.data);

    res.status(201).json(venta);
  } catch (error) {
    console.error("Error al crear la venta:", error);

    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "23503"
    ) {
      res.status(422).json({
        mensaje: "El cliente indicado no existe"
      });
      return;
    }

    res.status(500).json({
      mensaje: "Error al crear la venta"
    });
  }
}