import { Router } from 'express';
import PrismaClient from '../bin/prisma-client';

const router = Router();

// getter for employees
// used in NameEntry.tsx
router.get('/', async (req, res) => {
    try {
        const employees = await PrismaClient.employee.findMany({
            select: {
                name: true,
            },
        });

        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

export default router;
