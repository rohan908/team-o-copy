import express, { Router, Request, Response } from 'express';
import { Prisma } from 'database';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const createServiceRequest = await PrismaClient.serviceRequest.createMany({
        data: [
            {
                requestID: 1,
                room: 'ER1',
                createdAt: new Date('2024-03-27T15:22:53.444Z'),
                date: 'Mar 27, 2024',
                time: new Date('2024-03-27T15:22:53.444Z'),
                medicalDevice: 'Defibrillator',
            },
            {
                requestID: 2,
                room: 'ER2',
                createdAt: new Date('2024-03-27T15:22:53.444Z'),
                date: 'Mar 27, 2024',
                time: new Date('2024-03-27T15:22:53.444Z'),
                medicalDevice: 'Chest Compressor',
            },
            {
                requestID: 3,
                room: 'ER3',
                createdAt: new Date('2024-03-27T15:22:53.444Z'),
                date: 'Mar 27, 2024',
                time: new Date('2024-03-27T15:22:53.444Z'),
                medicalDevice: 'defibrillator',
            },
            {
                requestID: 4,
                room: 'ER4',
                createdAt: new Date('2024-03-27T15:22:53.444Z'),
                date: 'Mar 27, 2024',
                time: new Date('2024-03-27T15:22:53.444Z'),
                medicalDevice: 'Pulse Oximeter',
            },
            {
                requestID: 5,
                room: 'ER5',
                createdAt: new Date('2024-03-27T15:22:53.444Z'),
                date: 'Mar 27, 2024',
                time: new Date('2024-03-27T15:22:53.444Z'),
                medicalDevice: 'Wheelchair',
            },
            {
                requestID: 6,
                room: 'ICU1',
                createdAt: new Date('2024-03-27T15:22:53.444Z'),
                date: 'Mar 27, 2024',
                time: new Date('2024-03-27T15:22:53.444Z'),
                medicalDevice: 'Stretcher',
            },
            {
                requestID: 7,
                room: 'ICU2',
                createdAt: new Date('2024-03-27T15:22:53.444Z'),
                date: 'Mar 27, 2024',
                time: new Date('2024-03-27T15:22:53.444Z'),
                medicalDevice: 'Vacuum Regulator',
            },
            {
                requestID: 8,
                room: 'ICU3',
                createdAt: new Date('2024-03-27T15:22:53.444Z'),
                date: 'Mar 27, 2024',
                time: new Date('2024-03-27T15:22:53.444Z'),
                medicalDevice: 'Vital Sign Monitor',
            },
            {
                requestID: 9,
                room: 'ICU4',
                createdAt: new Date('2024-03-27T15:22:53.444Z'),
                date: 'Mar 27, 2024',
                time: new Date('2024-03-27T15:22:53.444Z'),
                medicalDevice: 'Centrifuge',
            },
            {
                requestID: 10,
                room: 'ICU5',
                createdAt: new Date('2024-03-27T15:22:53.444Z'),
                date: 'Jan 2, 2024',
                time: new Date('2024-03-27T15:22:53.444Z'),
                medicalDevice: 'Treatment Table',
            },
        ],
        skipDuplicates: true,
    });

    const allServiceRequests = await PrismaClient.serviceRequest.findMany({});
    console.log(allServiceRequests);
    res.json(allServiceRequests);
});

export default router;
