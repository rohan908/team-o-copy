import express, { Router, RequestHandler } from 'express';
import { NavigationService } from '../GraphMapClasses/NavigationService';
import { Node } from '../GraphMapClasses/Node';
import PrismaClient from '../bin/prisma-client';
import { NodeDataType, PathFinderResult, GetNodeResult } from '../models/MapTypes.ts';

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
    startID: number;
    endID: number;
    pathAlgo: string;
}

// Define types for response body
interface PathFindingSuccessResponse {
    result: {
        pathIDs: number[];
        distance: number;
        success?: boolean;
    };
}

interface PathFindingErrorResponse {
    success: false;
    error: string;
}

interface getNodeRequestBody {
    nodeId: number;
}

interface getNodeSuccessResponse {
    result: {
        nodeData: NodeDataType; // Just the data, not the full node
        connections: {
            // Separate array for connections to avoid infinite loops
            connectedId: number;
            weight: number;
        }[];
        success?: boolean;
    };
}

interface getNodeErrorResponse {
    success: false;
    error: string;
}

type PathFindingResponse = PathFindingSuccessResponse | PathFindingErrorResponse;

type getNodeResponse = getNodeSuccessResponse | getNodeErrorResponse;

// Use RequestHandler with generics for proper typing
const findPathHandler: RequestHandler<
    {}, // Route parameters
    PathFindingResponse, // Response body
    PathFindingRequestBody // Request body
> = (req, res) => {
    try {
        const { startID, endID, pathAlgo } = req.body;

        // Validate input
        if ([startID, endID, pathAlgo].some((param) => param === undefined)) {
            res.status(400).json({
                success: false,
                error: 'Missing required parameters',
            });
            return; // Return void
        }

        const start = Number(startID);
        const end = Number(endID);
        const algo = String(pathAlgo);
        const result: PathFinderResult = navigationService.findPath(start, end, algo);

        if (result.distance === 0) {
            res.status(404).json({
                success: false,
                error: 'No path found between the specified points',
            });
            return; // Return void
        }

        res.send({ result });

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

const getNodeHandler: RequestHandler<
    {}, // Route parameters
    getNodeResponse, // Response body
    getNodeRequestBody // Request body
> = (req, res) => {
    try {
        const { nodeId } = req.body;
        const isNumber = (val: any) => typeof val === 'number' && val === val;
        // Validate input
        if (!isNumber(nodeId)) {
            res.status(400).json({
                success: false,
                error: 'Missing required parameters',
            });
            return; // Return void
        }

        const result: GetNodeResult = navigationService.getNode(nodeId);

        if (result.node === undefined) {
            res.status(404).json({
                success: false,
                error: 'Node not found',
            });
            return;
        }

        // Returning the full connected nodes seems to create infinite loops. Instead return the ids of connected nodes
        const connections = result.node.adjNodes.map((adjNode) => ({
            connectedId: adjNode.destination.data.id,
            weight: adjNode.weight,
        }));

        const response: getNodeSuccessResponse = {
            result: {
                nodeData: result.node.data,
                connections: connections,
                success: true,
            },
        };

        res.json(response);

        return;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error getting node:', error);

        res.status(500).json({
            success: false,
            error: errorMessage || 'An error occurred while getting a node',
        });
        return; // Return void
    }
};

// Debug endpoint to get test the pathfinding between nodes
router.get('/debug', (req: any, res: any) => {
    // Get the grid dimensions and some sample walkable points
    const path = navigationService.findPath(1, 5, 'DFS');
    console.log('ran files and got:', path);
    res.json(path);
});

// Register the handler with the router
router.post('/findPath', findPathHandler);

router.post('/getNode', getNodeHandler);

export default router;
