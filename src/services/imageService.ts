import sharp from 'sharp';
import path from 'path';
import { Buffer } from 'buffer';
import { outPutFolder } from '../utils/outPut';

// function to upload image
export const uploadImage = async (fileBuffer: Buffer) => {
    const outPutPath = path.join(outPutFolder, `uploaded_${Date.now()}.jpg`);
    await sharp(fileBuffer).toFile(outPutPath);
    return outPutPath;
}


// Function to resize image
export const resizeImage = async (fileBuffer: Buffer, width: number, height: number) => {
    const resizedImage = await sharp(fileBuffer)
        .resize(width, height)
        .toBuffer();
    return resizedImage;
};


// Function to crop image
export const cropImage = async (fileBuffer: Buffer, width: number, height: number, x: number, y: number) => {
    const outPutPath = path.join(outPutFolder, `cropped_${Date.now()}.jpg`);
    await sharp(fileBuffer)
        .extract({ width, height, left: x, top: y })
        .toFile(outPutPath);
    return outPutPath;
}

// Function to download image
export const downloadImage = async (fileBuffer: Buffer) => {
    const outPutPath = path.join(outPutFolder, `downloaded_${Date.now()}.jpg`);
    await sharp(fileBuffer).toFile(outPutPath);
    return outPutPath;
}

// function to apply filter to image

export const applyFilter = async (fileBuffer: Buffer, filterType: string) => {
    const outPutPath = path.join(outPutFolder, `filtered_${Date.now()}.jpg`);
    let image = sharp(fileBuffer);

    switch (filterType) {
        case 'grayscale':
            image = image.grayscale();
            break;
        case 'blur':
            image = image.blur(5);
            break;
        case 'sharpen':
            image = image.sharpen();
            break;
        case 'negate':
            image = image.negate();
            break;
        default:
            throw new Error('Unsupported filter type');
    }

    await image.toFile(outPutPath);
    return outPutPath;
}

// function to apply watermark to image
export const addWatermark = async (fileBuffer: Buffer, text: string) => {
    const outputPath = path.join(outPutFolder, `watermarked_${Date.now()}.jpg`);
    const image = sharp(fileBuffer);
    const { width, height } = await image.metadata();

    const svgText = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="${height! - 10}" font-size="48" fill="white">${text}</text>
    </svg>`;

    const buffer = Buffer.from(svgText);

    await image
        .composite([{ input: buffer, blend: 'overlay' }])
        .toFile(outputPath);

    return outputPath;

};
// Function to get image metadata
export const getImageMetadata = async (fileBuffer: Buffer) => {
    const metadata = await sharp(fileBuffer).metadata();
    return metadata;
}
