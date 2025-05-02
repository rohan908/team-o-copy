import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// this route is used for logging in via RFID
// the path to this router is '/api/loginRFID'

router.get('/', async (req: Request, res: Response) => {
    //todo do whatever it is for logging in here
});

export default router;
