import fs from 'fs';
import path from 'path';


export const outPutFolder = path.join(__dirname, '../../output');
if (!fs.existsSync(outPutFolder)) {
    fs.mkdirSync(outPutFolder);
}
