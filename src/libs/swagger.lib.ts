// src/libs/swagger.lib.ts
import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'API de Estudiantes',
        description: 'Documentación automática generada para el bootcamp',
        version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json'; // Asegúrate de que apunte a la raíz o donde lo necesites
const endpointsFiles = ['./src/index.ts']; // O la ruta a tus archivos de rutas

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    console.log("Documentación de Swagger generada con éxito 🚀");
});