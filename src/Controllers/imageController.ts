import { Request, Response } from 'express';
import {
    uploadImage,
    applyFilter,
    cropImage,
    resizeImage,
    addWatermark,
    downloadImage,
    getImagePath
} from '../services/imageService';
import {
    handleError,
    handleNotFoundError,
    handleValidationError
} from '../utils/errorHandler';
import path from 'path';

// Controller to upload image
export const uploadImageController = async (req: Request, res: Response) => {
    try {
        if (req.file) {
            const uploadedImage = await uploadImage(req.file.buffer);
            res.status(201).json({ message: 'Image uploaded successfully', path: uploadedImage });
        } else {
            handleNotFoundError(res, 'No file uploaded');
        }
    } catch (error) {
        handleError(res, error);
    }
}

// Controller to download image
export const downloadImageController = async (req: Request, res: Response) => {
    try {
        if (req.file) {
            const downloadedImage = await downloadImage(req.file.buffer);
            const absolutePath = path.resolve(downloadedImage);
            res.status(200).sendFile(absolutePath);
        } else {
            handleNotFoundError(res, 'No file uploaded');
        }
    } catch (error) {
        handleError(res, error);
    }
}

// Controller to resize image
export const resizeImageController = async (req: Request, res: Response) => {
    try {
        const { width, height } = req.body;

        // Validate input
        const widthInt = parseInt(width, 10);
        const heightInt = parseInt(height, 10);

        if (isNaN(widthInt) || isNaN(heightInt)) {
            return handleValidationError(res, 'Invalid input');
        }

        if (req.file) {
            const resizedImage = await resizeImage(req.file.buffer, widthInt, heightInt);
            res.set('Content-Type', 'image/jpeg');
            res.status(200).send(resizedImage);
        } else {
            handleNotFoundError(res, 'No file uploaded');
        }
    } catch (error) {
        handleError(res, error);
    }
}

// Controller to crop image
export const cropImageController = async (req: Request, res: Response) => {
    try {
        const { width, height, x, y } = req.body;

        // Validate input
        const widthInt = parseInt(width, 10);
        const heightInt = parseInt(height, 10);
        const xInt = parseInt(x, 10);
        const yInt = parseInt(y, 10);

        if (isNaN(widthInt) || isNaN(heightInt) || isNaN(xInt) || isNaN(yInt)) {
            return handleValidationError(res, 'Invalid input');
        }

        if (req.file) {
            const croppedImage = await cropImage(req.file.buffer, widthInt, heightInt, xInt, yInt);
            const absolutePath = path.resolve(croppedImage);
            res.status(200).sendFile(absolutePath);
        } else {
            handleNotFoundError(res, 'No file uploaded');
        }
    } catch (error) {
        handleError(res, error);
    }
}

// Controller to apply filter to image
export const applyFilterController = async (req: Request, res: Response) => {
    try {
        const { filterType } = req.body;

        if (req.file) {
            const filteredImage = await applyFilter(req.file.buffer, filterType);
            const absolutePath = path.resolve(filteredImage);
            res.status(200).sendFile(absolutePath);
        } else {
            handleNotFoundError(res, 'No file uploaded');
        }
    } catch (error) {
        handleError(res, error);
    }
}

// Controller to apply watermark to image
export const applyWatermarkController = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;

        if (req.file) {
            const watermarkedImage = await addWatermark(req.file.buffer, text);
            const absolutePath = path.resolve(watermarkedImage);
            res.status(200).sendFile(absolutePath);
        } else {
            handleNotFoundError(res, 'No file uploaded');
        }
    } catch (error) {
        handleError(res, error);
    }
}

// Controller to show image
export const showImageController = async (req: Request, res: Response) => {
    try {
        const { imageName } = req.params;
        const imagePath = getImagePath(imageName);
        res.status(200).sendFile(path.resolve(imagePath));
    } catch (error) {
        handleError(res, error);
    }
}
