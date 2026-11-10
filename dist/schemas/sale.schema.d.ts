import { z } from "zod";
export declare const createSaleSchema: z.ZodObject<{
    customer_id: z.ZodNumber;
    sale_date: z.ZodOptional<z.ZodISODate>;
    status: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const saleIdSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>;
}, z.core.$strip>;
//# sourceMappingURL=sale.schema.d.ts.map