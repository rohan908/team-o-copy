import express, { Router, Request, Response } from 'express';
import { Prisma } from 'database';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const deleteEmployees = await PrismaClient.employee.deleteMany({});

    const createEmployees = await PrismaClient.employee.createMany({
        data: [
            {
                employeeid: 1,
                name: 'bob',
                email: 'bob@gmail.com',
                address: '80 pine rd',
                phoneNumber: 1112223333,
                position: 'recruiter',
            },
            {
                employeeid: 2,
                name: 'dave',
                email: 'dave@gmail.com',
                address: '81 pine rd',
                phoneNumber: 1112223334,
                position: 'recruiter',
            },
            {
                employeeid: 3,
                name: 'john',
                email: 'john@gmail.com',
                address: '82 pine rd',
                phoneNumber: 1112223335,
                position: 'software engineer',
            },
            {
                employeeid: 4,
                name: 'jack',
                email: 'jack@gmail.com',
                address: '83 pine rd',
                phoneNumber: 1112223336,
                position: 'manager',
            },
            {
                employeeid: 5,
                name: 'julia',
                email: 'julia@gmail.com',
                address: '84 pine rd',
                phoneNumber: 1112223337,
                position: 'admin',
            },
        ],
    });

    const allEmployees = await PrismaClient.employee.findMany({});
    console.log(allEmployees);
    res.json(allEmployees);
});

export default router;
