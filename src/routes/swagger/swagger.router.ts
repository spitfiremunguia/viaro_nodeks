import express from 'express';
import swaggerui from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
const router=express.Router();

router.use('/',swaggerui.serve);
router.get('/',swaggerui.setup(swaggerDocument));

export default router;