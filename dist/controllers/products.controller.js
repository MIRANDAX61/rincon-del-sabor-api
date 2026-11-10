import pool from "../config/db.js";
import { ProductModel } from "../models/product.model.js";
import { getProductsQuerySchema } from "../schemas/product.schema.js";
export async function getAllProducts(req, res) {
    /* #swagger.tags = ['Products']
       #swagger.summary = 'Listar productos con filtro y paginación'
    */
    /* #swagger.parameters['maxPrice'] = {
      in: 'query',
      description: 'Precio máximo. Omitir para no filtrar.',
      required: false,
      type: 'number',
      minimum: 0
    } */
    /* #swagger.parameters['page'] = {
      in: 'query',
      description: 'Página solicitada.',
      required: false,
      type: 'integer',
      minimum: 1,
      default: 1
    } */
    /* #swagger.parameters['limit'] = {
      in: 'query',
      description: 'Cantidad de productos por página.',
      required: false,
      type: 'integer',
      minimum: 1,
      maximum: 100,
      default: 10
    } */
    /* #swagger.responses[200] = {
      description: 'Lista de productos obtenida correctamente.'
    } */
    /* #swagger.responses[400] = {
      description: 'Parámetros de consulta inválidos.'
    } */
    /* #swagger.responses[500] = {
      description: 'Error al obtener los productos.'
    } */
    try {
        const result = getProductsQuerySchema.safeParse(req.query);
        if (!result.success) {
            res.status(400).json({
                mensaje: "Parámetros de consulta inválidos",
                errores: result.error.issues
            });
            return;
        }
        const { page, limit } = result.data;
        if (!Number.isSafeInteger((page - 1) * limit)) {
            res.status(400).json({
                mensaje: "La página solicitada es demasiado grande"
            });
            return;
        }
        const productos = await ProductModel.listar(result.data);
        res.status(200).json(productos);
    }
    catch (error) {
        console.error("Error al consultar los productos:", error);
        res.status(500).json({
            mensaje: "Error al obtener los productos"
        });
    }
}
export async function getProduct(req, res) {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "error al obtener el producto",
            detalles: error.message,
        });
    }
}
export async function createProduct(req, res) {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "error al crear el producto",
            detalles: error.message,
        });
    }
}
export async function updateProduct(req, res) {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "error al actualizar el producto",
            detalles: error.message,
        });
    }
}
//# sourceMappingURL=products.controller.js.map