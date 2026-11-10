export interface CustomerInput {
    name: string;
    email: string;
    phone_number?: string | null;
}
export declare const CustomerModel: {
    findAll(): Promise<any[]>;
    findById(id: number): Promise<any>;
    create(datos: CustomerInput): Promise<any>;
    update(id: number, datos: CustomerInput): Promise<any>;
};
//# sourceMappingURL=customer.model.d.ts.map