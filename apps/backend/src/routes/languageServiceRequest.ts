import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

router.post('/',async (req: Request, res: Response) => {
    // For inputting a request form, adds entry
});

// Retrieves all language service request forms
router.get('/', async (req: Request, res: Response) => {
    const allServiceRequests = await PrismaClient.langaugeServiceRequest.findMany({});
    console.log(allServiceRequests);
    res.json(allServiceRequests);
});

export default router;
