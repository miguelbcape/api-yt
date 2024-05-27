import { Router } from 'express';
import { homeApi } from '../controllers/home.controller.js';
import { searchApi } from '../controllers/search.controller.js';
import { convertApi } from '../controllers/convert.controller.js';
import { detailsApi } from '../controllers/details.controller.js';
import { downloadApi } from '../controllers/download.controller.js';

const router = Router();

router.get('/', homeApi);
router.get('/yt/search', searchApi);
router.get('/yt/convert', convertApi);
router.get('/yt/details', detailsApi);
router.get('/yt/download', downloadApi);

export default router;
