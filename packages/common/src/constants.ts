/*
  This file contains constant values that can be used
  in the backend and the frontend
 */

// each router path MUST be set up here with /api at the start
export const API_ROUTES = {
    HEALTHCHECK: '/api/healthcheck',
    EMPLOYEE: '/api/employee',
    DIRECTORY: '/api/directory',
    GRAPH: '/api/graph',
    LANGUAGESR: '/api/languageSR',
    SANITATIONSR: '/api/sanitationSR',
    EXPORTROUTE: '/api/exportRoute',
};

// file paths for backup files
export const BACKUP_PATHS = {
    directoryBackup: './src/directoryBackup/backup.csv',
};
