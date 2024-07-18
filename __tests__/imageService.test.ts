import sharp from 'sharp';
import * as imageService from '../src/services/imageService';

describe('Image Service', () => {
    const buffer = Buffer.from('test');

    it('should upload an image', async () => {
        const result = await imageService.uploadImage(buffer);
        expect(result).toContain('uploaded_');
    });

    it('should resize an image', async () => {
        const result = await imageService.resizeImage(buffer, 100, 100);
        expect(result).toBeInstanceOf(Buffer);
    });

    it('should crop an image', async () => {
        const result = await imageService.cropImage(buffer, 100, 100, 10, 10);
        expect(result).toContain('cropped_');
    });

    it('should apply filter to an image', async () => {
        const result = await imageService.applyFilter(buffer, 'grayscale');
        expect(result).toContain('filtered_');
    });

    it('should add watermark to an image', async () => {
        const result = await imageService.addWatermark(buffer, 'Test Watermark');
        expect(result).toContain('watermarked_');
    });

    it('should get image metadata', async () => {
        const metadata = await imageService.getImageMetadata(buffer);
        expect(metadata).toBeDefined();
    });
});
