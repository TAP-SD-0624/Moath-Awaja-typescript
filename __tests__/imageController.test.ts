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
    const buffer = Buffer.from('test');
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
            .send({ width: 100, height: 100 })
            .attach('image', buffer, 'test.jpg');
        expect(res.status).toBe(200);
    });

    it('should crop an image', async () => {
        const res = await request(app)
            .post('/crop')
            .send({ width: 100, height: 100, x: 10, y: 10 })
            .attach('image', buffer, 'test.jpg');
        expect(res.status).toBe(200);
    });

    it('should apply filter to an image', async () => {
        const res = await request(app)
            .post('/filter')
            .send({ filterType: 'grayscale' })
            .attach('image', buffer, 'test.jpg');
        expect(res.status).toBe(200);
    });

    it('should apply watermark to an image', async () => {
        const res = await request(app)
            .post('/watermark')
            .send({ text: 'Test Watermark' })
            .attach('image', buffer, 'test.jpg');
        expect(res.status).toBe(200);
    });
});
