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

router.post('/findPath', async (req: Request, res: Response) => {
    try {
        const { startX, startY, startZ, endX, endY, endZ } = req.body;

        // Validate input
        if ([startX, startY, startZ, endX, endY, endZ].some(param => param === undefined)) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters'
            });
        }

        const start: Coordinate = {
            x: parseInt(startX),
            y: parseInt(startY),
            z: parseInt(startZ)
        };

        const end: Coordinate = {
            x: parseInt(endX),
            y: parseInt(endY),
            z: parseInt(endZ)
        };

        const result = navigationService.findPath(start, end);

        if (result.path.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'No path found between the specified points'
            });
        }

        return res.json({
            success: true,
            result
        });
    } catch (error) {
        console.error('Error finding path:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'An error occurred while finding the path'
        });
    }
});

export default router;