import fs from 'fs';
import path from 'path';

export const getImageBuffer = (filePath: string): Buffer => {
    return fs.readFileSync(path.resolve(filePath));
};
