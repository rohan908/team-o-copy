import PrismaClient from '../bin/prisma-client';
import express, { Router, Request, Response } from 'express';
import { MergeForms } from './MergeFormHelper.ts';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const query = req.query.by as string;
    try {
        const lang = await PrismaClient.langaugeServiceRequest.groupBy({
            by: [query as any],
            _count: { [query]: true },
        });
        const sanitation = await PrismaClient.sanitationServiceRequest.groupBy({
            by: [query as any],
            _count: { [query]: true },
        });
        const maintenance = await PrismaClient.maintenanceServiceRequest.groupBy({
            by: [query as any],
            _count: { [query]: true },
        });
        const security = await PrismaClient.securityServiceRequest.groupBy({
            by: [query as any],
            _count: { [query]: true },
        });
        const summary = MergeForms([lang, sanitation, maintenance, security], query);
        res.json(summary);
    } catch (error) {
        console.error('error generating stats', error);
        res.status(500).send({ error: 'Backend Server Error' });
    }
});

export default router;
