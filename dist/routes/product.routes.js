import { Router } from 'express';
import { getAllProducts, getProduct, createProduct, updateProduct } from '../controllers/products.controller.js';
import { validateProduct } from '../middlewares/validate-product.js';
const router = Router();
router.get("/menu", getAllProducts);
router.get('/menu/:id', getProduct);
router.post('/menu', validateProduct, createProduct);
router.put('/menu/:id', updateProduct);
export default router;
//# sourceMappingURL=product.routes.js.map