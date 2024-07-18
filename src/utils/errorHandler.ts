import { Response } from 'express';

// Function to handle internal server errors
export const handleError = (res: Response, error: any) => {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
};

// Function to handle validation errors
export const handleValidationError = (res: Response, error: any) => {
    console.error(error);
    res.status(400).json({ message: 'Bad Request: Validation Error', details: error });
};

// Function to handle unauthorized access errors
export const handleUnauthorizedError = (res: Response, error: any) => {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized', details: error });
};

// Function to handle forbidden access errors
export const handleForbiddenError = (res: Response, error: any) => {
    console.error(error);
    res.status(403).json({ message: 'Forbidden', details: error });
};

// Function to handle not found errors
export const handleNotFoundError = (res: Response, error: any) => {
    console.error(error);
    res.status(404).json({ message: 'Not Found', details: error });
};

// Function to handle conflict errors
export const handleConflictError = (res: Response, error: any) => {
    console.error(error);
    res.status(409).json({ message: 'Conflict', details: error });
};

// General error handler for other status codes
export const handleCustomError = (res: Response, status: number, message: string, error: any) => {
    console.error(error);
    res.status(status).json({ message, details: error });
};
