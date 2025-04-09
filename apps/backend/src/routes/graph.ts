import express, { Router, RequestHandler } from 'express';
import { NavigationService } from '../services/NavigationService';
import { Coordinate } from '../models/types';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();
const navigationService = new NavigationService();

// Initialize navigation service when server starts
(async (): Promise<void> => {
    try {
        await navigationService.initialize();
    } catch (error) {
        console.error('Failed to initialize navigation service:', error);
    }
})();

// Define types for request body
interface PathFindingRequestBody {
    startX: number;
    startY: number;
    startZ: number;
    endX: number;
    endY: number;
    endZ: number;
}

// Define types for response body
interface PathFindingSuccessResponse {
    success: true;
    result: {
        path: Coordinate[];
        distance: number;
        layersTraversed: number[];
    };
}

interface PathFindingErrorResponse {
    success: false;
    error: string;
}

type PathFindingResponse = PathFindingSuccessResponse | PathFindingErrorResponse;

// Use RequestHandler with generics for proper typing
const findPathHandler: RequestHandler<
    {}, // Route parameters
    PathFindingResponse, // Response body
    PathFindingRequestBody // Request body
> = (req, res) => {
    try {
        const { startX, startY, startZ, endX, endY, endZ } = req.body;

        // Validate input
        if ([startX, startY, startZ, endX, endY, endZ].some((param) => param === undefined)) {
            res.status(400).json({
                success: false,
                error: 'Missing required parameters',
            });
            return; // Return void
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
            res.status(404).json({
                success: false,
                error: 'No path found between the specified points',
            });
            return; // Return void
        }

        res.json({
            success: true,
            result,
        });
        return; // Return void explicitly
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error finding path:', error);

        res.status(500).json({
            success: false,
            error: errorMessage || 'An error occurred while finding the path',
        });
        return; // Return void
    }
};

// Debug endpoint to get information about the navigation grid
/*
router.get('/debug', (req: any, res: any) => {
    if (!navigationService.isInitialized()) {
        return res.status(500).json({ error: 'Navigation service not initialized' });
    }

    // Get the grid dimensions and some sample walkable points
    const debug = navigationService.getDebugInfo();
    res.json(debug);
});
*/
// Register the handler with the router
router.post('/findPath', findPathHandler);

// Register the handler with the router
router.post('/findPath', findPathHandler);

export default router;
