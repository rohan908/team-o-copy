import React, {createContext} from 'react';

/*
    What this file does:
        This file defines the DirectoryContext context, which is used to store
        directory database data on the frontend.

    What this needs in the future:
        DirectoryContext will need to be renamed, since this context will
        eventually (probably) store the ENTIRE database's data on the
        frontend

    Who made it:
        Joe

    Why did I comment it like this:
        idk tbh ts chopped </3

 */

// define context for directory database data
export const DirectoryContext = createContext(null);