import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

/*
    These remain open for pathfinding implementation
    Might not be necessary since frontend will not want to
    fetch entries, very slow
 */

router.post('/', async (req: Request, res: Response) => {});

router.get('/', async (req: Request, res: Response) => {});

export default router;
