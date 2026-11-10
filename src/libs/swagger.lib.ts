
import swaggerAutogen from "swagger-autogen";
import { fileURLToPath } from "node:url";

const doc = {
  info: {
    title: "API Rincón del Sabor",
    description: "Documentación de productos, clientes y ventas",
    version: "1.0.0"
  },
  host: "localhost:3000",
  basePath: "/api",
  schemes: ["http"]
};

const outputFile = fileURLToPath(
  new URL("../../swagger-output.json", import.meta.url)
);

const endpointsFiles = [
  fileURLToPath(
    new URL("../../dist/routes/product.routes.js", import.meta.url)
  ),
  fileURLToPath(
    new URL("../../dist/routes/customer.routes.js", import.meta.url)
  ),
  fileURLToPath(
    new URL("../../dist/routes/sale.routes.js", import.meta.url)
  )
].map(ruta => ruta.replace(/\\/g, "/"));
const resultado = await swaggerAutogen()(
  outputFile,
  endpointsFiles,
  doc
);

if (!resultado || !resultado.success) {
  throw new Error("No se pudo generar Swagger");
}