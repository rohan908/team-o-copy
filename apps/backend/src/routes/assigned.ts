import express, { Router, Request, Response } from 'express';
import { Prisma } from 'database';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const createAssignedEmployees = await PrismaClient.assigned.createMany({
        data: [
            {
                employeeID: 1,
                requestID: 1,
            },
            {
                employeeID: 2,
                requestID: 1,
            },
            {
                employeeID: 3,
                requestID: 2,
            },
            {
                employeeID: 4,
                requestID: 3,
            },
            {
                employeeID: 5,
                requestID: 4,
            },
        ],
        skipDuplicates: true,
    });

    const allAssignedEmployees = await PrismaClient.assigned.findMany({});
    console.log(allAssignedEmployees);
    res.json(allAssignedEmployees);
});

export default router;
