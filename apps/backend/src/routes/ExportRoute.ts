import { Router } from 'express';
import path from 'path';
import { Request, Response } from 'express';
import fs from 'fs';

const router = Router();

/*
  This router is used for exporting backup CSV files
  to the frontend

 */
router.get('/static-export/:filename', (req: Request, res: Response) => {
    const fileName = req.params.filename;

    const filePath = path.join('./src/directoryBackup', fileName);

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
