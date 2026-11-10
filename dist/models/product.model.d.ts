import type { GetProductsQueryInput } from "../schemas/product.schema.js";
export declare const ProductModel: {
    listar(filtros: GetProductsQueryInput): Promise<any[]>;
    getProductById(id: number): Promise<any>;
    insertProduct(name: string, description: string, price: string): Promise<any>;
    updateProduct(id: number, name: string, description: string, price: string): Promise<any>;
};
//# sourceMappingURL=product.model.d.ts.map