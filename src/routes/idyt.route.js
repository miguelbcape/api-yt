import { Router } from 'express';
import { authRequire } from '../middlewares/validateToken.js';
import {
  getIds,
  createId,
  getId,
  deleteId,
  updateId,
} from '../controllers/idyt.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createIdSchema } from '../schemas/id.schema.js';

const router = Router();

router.post('/ids', authRequire, validateSchema(createIdSchema), createId); //inserto un id
router.get('/ids', authRequire, getIds); //listo todos los ids
router.get('/ids/:id', authRequire, getId); //listo solo un id
router.delete('/ids/:id', authRequire, deleteId); //elimino un id
router.put('/ids/:id', authRequire, updateId); //actualizo un id

export default router;
