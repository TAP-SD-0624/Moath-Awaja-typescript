import express from 'express';
import { uploadMiddleware } from '../middlewares/uploadMiddleware';

import {
    uploadImageController,
    downloadImageController,
    resizeImageController,
    cropImageController,
    applyWatermarkController,
    applyFilterController,
    showImageController
} from '../Controllers/imageController';

const router = express.Router();

router.post('/upload', uploadMiddleware.single('image'), uploadImageController);
router.post('/download', uploadMiddleware.single('image'), downloadImageController);
router.post('/resize', uploadMiddleware.single('image'), resizeImageController);
router.post('/crop', uploadMiddleware.single('image'), cropImageController);
router.post('/watermark', uploadMiddleware.single('image'), applyWatermarkController);
router.post('/filter', uploadMiddleware.single('image'), applyFilterController);
router.get('/:imageName', showImageController);

export default router;
