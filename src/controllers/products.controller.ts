import type { Request, Response } from "express";
import pool from "../config/db.js";
import { ProductModel } from "../models/product.model.js";

export async function getAllProducts(req: Request, res: Response) {
    try {
        const resultado = await ProductModel.listar();

        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error al consultar los productos:", error);

        res.status(500).json({
            mensaje: "Error al obtener los productos"
        });
    }
}


export async function getProduct(req: Request, res: Response) {
  /*#swagger.tags = ['Products']  #swagger.summary = 'Obtener un producto por su ID' */
  const idBuscado = Number(req.params.id);
  if (!idBuscado) {
    return res.status(400).json({
      mensaje: "el id es obligatorio para este endpoint",
    });
  }
  try {
    const product = await ProductModel.getProductById(idBuscado);
    if (!product) {
      return res.status(404).json({
        mensaje: "el producto con ese id no existe o no fue encontrado",
      });
    }
    res.status(200).json({ ok: true, data: product });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener el producto",
      detalles: error.message,
    });
  }
}

export async function createProduct(req: Request, res: Response) {
  /*#swagger.tags = ['Products']  #swagger.summary = 'Crear un nuevo producto' */
  const { name, description, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "faltan datos obligatorios (name y price son requeridos)" });
  }
  try {
    const newProduct = await ProductModel.insertProduct(name, description, price);
    res.status(201).json({
      ok: true,
      data: newProduct,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al crear el producto",
      detalles: error.message,
    });
  }
}

export async function updateProduct(req: Request, res: Response) {
  /*#swagger.tags = ['Products']  #swagger.summary = 'Actualizar un producto existente' */
  const idBuscado = Number(req.params.id);
  if (!idBuscado) {
    return res.status(400).json({
      mensaje: "el id es obligatorio para actualizar",
    });
  }

  const { name, description, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "faltan datos obligatorios para la actualización" });
  }

  try {
    const updatedProduct = await ProductModel.updateProduct(idBuscado, name, description, price);
    if (!updatedProduct) {
      return res.status(404).json({
        mensaje: "el producto con ese id no existe o no fue encontrado",
      });
    }
    res.status(200).json({
      ok: true,
      data: updatedProduct,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al actualizar el producto",
      detalles: error.message,
    });
  }
}

