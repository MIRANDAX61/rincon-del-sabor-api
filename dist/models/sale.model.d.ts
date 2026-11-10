export interface CreateSaleInput {
    customer_id: number;
    sale_date?: string | undefined;
    status?: string | undefined;
}
export declare const SaleModel: {
    listar(): Promise<any[]>;
    obtenerPorId(id: number): Promise<any>;
    crear(datos: CreateSaleInput): Promise<any>;
};
//# sourceMappingURL=sale.model.d.ts.map