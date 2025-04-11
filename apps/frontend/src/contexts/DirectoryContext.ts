import React, { createContext, useContext } from 'react';

/*
    What this file does:
        This file defines the DirectoryContext context, provider, and
        custom hook.

        DirectoryContext is used to store directory database data on the frontend.

        DirectoryContextProvider is a wrapper component that allows all of its
        children to access the context object data (our database data). This is
        called in App.tsx.

        UseDirectoryContext is a custom hook which almost equivalent to
        useContext, but prevents modification of internal data in the context,
        as well as security issues or misuse.

    What this needs in the future:
        Anything that says "directory" will need to be renamed, since this context will
        soon (probably) store the ENTIRE database's data

    Who made it:
        Joe

    Why did I comment it like this:
        idk tbh ts chopped </3

 */

/*
    define context for directory database data

 */
export const DirectoryContext = createContext(null);

/*
    defines custom hook so that consumer components don't directly interact
    with DirectoryContext, that way no internal data can be modified.
 */

export const useDirectoryContext = () => {
    const context = useContext(DirectoryContext);
    if (!context) {
        throw new Error("The useDirectoryContext must be used within the provider" + "component DirectoryProvider");
    }

    return context;
}