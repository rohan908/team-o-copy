import express, { Router, Request, Response } from 'express';
const router: Router = express.Router();

// checks server status, should return "OK"
router.get('/', (req: Request, res: Response) => {
    res.sendStatus(200); // Send an HTTP 200 Code (OK)
});

export default router;
