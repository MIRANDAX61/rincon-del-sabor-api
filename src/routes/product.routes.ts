import { Router } from 'express';
import { getAllProducts, getProduct, createProduct, updateProduct } from '../controllers/products.controller.js';
import { validateProduct } from '../middlewares/validate-product.js';

const router : Router = Router();

router.get("/menu", getAllProducts);
router.get('/products/:id', getProduct);
router.post('/products', validateProduct, createProduct);
router.put('/products/:id', updateProduct);

export default router;