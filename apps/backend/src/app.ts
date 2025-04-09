import createError, { HttpError } from 'http-errors';
import express, { Express, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import healthcheckRouter from './routes/healthcheck';
import directoryRouter from './routes/directory';
import languageServiceRequestRouter from './routes/languageServiceRequest.ts';
import exportRoute from './routes/ExportRoute.ts';
import graphRouter from './routes/graph.ts';

import { API_ROUTES } from 'common/src/constants';

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

// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup -> Not True
app.use('/', healthcheckRouter);
app.use('/directory', directoryRouter);
app.use('/languageServiceRequest', languageServiceRequestRouter);
app.use('/graph', graphRouter);
// adding export routing
app.use('/exportRoute', exportRoute);

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
