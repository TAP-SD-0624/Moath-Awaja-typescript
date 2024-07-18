import request from 'supertest';
import express from 'express';
import multer from 'multer';
import {
    uploadImageController,
    downloadImageController,
    resizeImageController,
    cropImageController,
    applyFilterController,
    applyWatermarkController
} from '../src/Controllers/imageController';
import { getImageBuffer } from '../src/utils/Buffer';

const app = express();
app.use(express.json());
const upload = multer();

app.post('/upload', upload.single('image'), uploadImageController);
app.post('/download', upload.single('image'), downloadImageController);
app.post('/resize', upload.single('image'), resizeImageController);
app.post('/crop', upload.single('image'), cropImageController);
app.post('/filter', upload.single('image'), applyFilterController);
app.post('/watermark', upload.single('image'), applyWatermarkController);

describe('Image Controller', () => {
    const buffer = getImageBuffer('./test.jpg');
    const file = {
        buffer,
        originalname: 'test.jpg',
        mimetype: 'image/jpeg',
    };

    it('should upload an image', async () => {
        const res = await request(app)
            .post('/upload')
            .attach('image', buffer, 'test.jpg');
        expect(res.status).toBe(201);
    });

    it('should download an image', async () => {
        const res = await request(app)
            .post('/download')
            .attach('image', buffer, 'test.jpg');
        expect(res.status).toBe(200);
    });

    it('should resize an image', async () => {
        const res = await request(app)
            .post('/resize')
            .field('width', 100)
            .field('height', 100)
            .attach('image', buffer, 'test.jpg');
        expect(res.status).toBe(200);
    });

    it('should crop an image', async () => {
        const res = await request(app)
            .post('/crop')
            .field('width', 100)
            .field('height', 100)
            .field('x', 10)
            .field('y', 10)
            .attach('image', buffer, 'test.jpg');
        expect(res.status).toBe(200);
    });

    it('should apply filter to an image', async () => {
        const res = await request(app)
            .post('/filter')
            .field('filterType', 'grayscale')
            .attach('image', buffer, 'test.jpg');
        expect(res.status).toBe(200);
    });

    it('should apply watermark to an image', async () => {
        const res = await request(app)
            .post('/watermark')
            .field('text', 'Test Watermark')
            .attach('image', buffer, 'test.jpg');
        expect(res.status).toBe(200);
    });
});
