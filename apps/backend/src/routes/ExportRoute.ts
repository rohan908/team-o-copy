import { Router } from 'express';
import path from 'path';
import { Request, Response } from 'express';
import fs from 'fs';

const router = Router();

router.get('/static-export/:filename', (req: Request, res: Response) => {
    const fileName = req.params.filename;

    const filePath = path.join('./src/directorybackup', fileName);

    if (!fs.existsSync(filePath)) {
        return console.log('file not found:');
    }

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error('Download failed:', err);
        }
    });
});

export default router;
