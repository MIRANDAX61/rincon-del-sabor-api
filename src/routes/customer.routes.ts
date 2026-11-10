import { Router } from "express";

import {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer
} from "../controllers/customer.controller.js";

import {
    validateCustomer
} from "../middlewares/validate-customer.js";


const router : Router = Router();

router.get("/customers", getCustomers);

router.get("/customers/:id", getCustomerById);

router.post("/customers", validateCustomer, createCustomer);

router.put("/customers/:id", validateCustomer, updateCustomer);

export default router;
