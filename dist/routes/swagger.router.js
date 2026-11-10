import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import swaggerDoc from '../../swagger-output.json' with { type: 'json' };
export const swaggerRouter = Router();
swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
export default swaggerRouter;
//# sourceMappingURL=swagger.router.js.map