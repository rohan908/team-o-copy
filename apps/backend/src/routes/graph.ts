import express, { Router, Request, Response } from 'express';
import { NavigationService } from '../services/NavigationService';
import { Coordinate } from '../models/types';

const router: Router = express.Router();
const navigationService = new NavigationService();

// Initialize navigation service when server starts
(async () => {
    try {
        await navigationService.initialize();
    } catch (error) {
        console.error('Failed to initialize navigation service:', error);
    }
})();

/*
Frontend will make a request like this and receive the path:

fetch('/graph/findPath', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    startX: 10, startY: 20, startZ: 0,
    endX: 50, endY: 60, endZ: 2
  })
})
 */

// declaring types as any to get around typescript error. Revisit if it becomes a problem.
router.post('/findPath', (req: any, res: any) => {
    try {
        const { startX, startY, startZ, endX, endY, endZ } = req.body;

        // Validate input
        if ([startX, startY, startZ, endX, endY, endZ].some((param) => param === undefined)) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters',
            });
        }

        const start: Coordinate = {
            x: Number(startX),
            y: Number(startY),
            z: Number(startZ),
        };

        const end: Coordinate = {
            x: Number(endX),
            y: Number(endY),
            z: Number(endZ),
        };

        const result = navigationService.findPath(start, end);

        if (result.path.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'No path found between the specified points',
            });
        }

        return res.json({
            success: true,
            result,
        });
    } catch (error: any) {
        console.error('Error finding path:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'An error occurred while finding the path',
        });
    }
});

export default router;
