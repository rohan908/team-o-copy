import createError, { HttpError } from 'http-errors';
import express, { Express, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import healthcheckRouter from './routes/HealthCheck.ts';
import directoryRouter from './routes/directory.ts';
import languageServiceRequestRouter from './routes/LanguageServiceRequest.ts';
import exportRoute from './routes/ExportRoute.ts';
import graphRouter from './routes/Graph.ts';
import securityServiceRequestRouter from './routes/SecurityServiceRequest.ts';

import { API_ROUTES } from 'common/src/constants';
import PrismaClient from './bin/prisma-client.ts';

const cors = require('cors');
const app: Express = express(); // Setup the backend

// Setup generic middlewear
app.use(
    logger('dev', {
        stream: {
            // This is a "hack" that gets the output to appear in the remote debugger :)
            write: (msg) => console.info(msg),
        },
    })
); // This records all HTTP requests

app.use(cors());
app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser

/*
  Setup routers. ALL ROUTERS MUST use /api as a start point, or they
  won't be reached by the default proxy and prod setup.

  When posting or fetching database data, create a new router file
  under /routes and add it here

  Also give it an API route under 'common/src/constants'
 */
app.use(API_ROUTES.HEALTHCHECK, healthcheckRouter);
app.use(API_ROUTES.DIRECTORY, directoryRouter);
app.use(API_ROUTES.LANGUAGESR, languageServiceRequestRouter);
app.use(API_ROUTES.GRAPH, graphRouter);
app.use(API_ROUTES.SECURITY, securityServiceRequestRouter);

// adding route for file exporting
app.use(API_ROUTES.EXPORTROUTE, exportRoute);

/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use((req: Request, res: Response, next: NextFunction) => {
    // Have the next (generic error handler) process a 404 error
    next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response) => {
    // Provide the error message
    res.statusMessage = err.message;

    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Reply with the error
    res.status(err.status || 500);
});

// Export the backend, so that www.ts can start it
export default app;
