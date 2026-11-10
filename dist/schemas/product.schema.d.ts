import { z } from "zod";
export declare const getProductsQuerySchema: z.ZodObject<{
    maxPrice: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>;
    page: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>;
    limit: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>, z.ZodNumber>>;
}, z.core.$strip>;
export type GetProductsQueryInput = z.infer<typeof getProductsQuerySchema>;
//# sourceMappingURL=product.schema.d.ts.map