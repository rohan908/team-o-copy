import React, { createContext, useReducer, useCallback, ReactNode, useEffect, useContext } from 'react';
import { DirectoryItem, DirectoryDataStore } from '../data/DirectoryDataStore';


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
    defines custom hooks so that consumer components don't directly interact
    with any contexts, that way no internal data can be modified.

    There are 3 separate ones for the same context so that it is easier
    to read in a frontend file; looks simpler than doing:

    const { patriot20 } = useDirectoryContext();

    This seems slightly harder to read/understand than just:

    const Patriot20 = usePatriot20Context;

    Which looks cleaner and simpler.
 */

export const usePatriot20Context = () => {
    const context = useContext(DirectoryContext);
    if (!context) {
        throw new Error("The usePatriot20Context must be used within the provider component Patriot20Provider");
    }

    return context.patriot20;
}

export const usePatriot22Context = () => {
  const context = useContext(DirectoryContext);
  if (!context) {
    throw new Error("The usePatriot22Context must be used within the provider component Patriot22Provider");
  }

  return context.patriot22;
}

export const useChestnutHillContext = () => {
  const context = useContext(DirectoryContext);
  if (!context) {
    throw new Error("The usePatriot20Context must be used within the provider component Patriot20Provider");
  }

  return context;
}





/*
  This is for the reducer function.
 */
interface DirectoryState {
  patriot20: DirectoryItem[];
  patriot22: DirectoryItem[];
  chestnuthill: DirectoryItem[];
  isLoading: boolean;
  error: string | null;
}

/*
  This is for the reducer function too. Each of these define actions the reducer
  can use, like setting array values, or load the state, or set an error to be
  thrown when the context is called and doesn't have any values in it.
 */
type DirectoryAction =
  | { type: 'SET_PATRIOT20'; payload: DirectoryItem[] }
  | { type: 'SET_PATRIOT22'; payload: DirectoryItem[] }
  | { type: 'SET_CHESTNUTHILL'; payload: DirectoryItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

/*
  This is the reducer function. Based on the React docs, it is convention to use
  switch statements, so I used that instead of if statements.

  This function defines what state is returned depending on the given "action",
  i.e "SET_PATRIOT20" which will set values for patriot20. Using this should
  hopefully prevent some unnecessary re-renders, and also pretty cleanly
  handles states.
 */
function directoryReducer(state: DirectoryState, action: DirectoryAction): DirectoryState {
  switch (action.type) {
    case 'SET_PATRIOT20':
      DirectoryDataStore.patriot20 = action.payload;
      return { ...state, patriot20: action.payload };
    case 'SET_PATRIOT22':
      DirectoryDataStore.patriot22 = action.payload;
      return { ...state, patriot22: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

/*
    define context for directory database data. This is what the custom hooks
    (usePatriot20, etc.) use. undefined is placed there in case something goes
    wrong with the prop used with the provider component in app.tsx
 */
export const DirectoryContext = createContext<DirectoryState  | undefined>(undefined);


/*
  Defines the provider component to be used in app.tsx. This
  is what allows consumer components (child components --> In our
  projects, this is only Routing) of the provider to access the
  context data (through use of custom hooks).

  Calls the useReducer hook with our defined reducer function and default
  "empty" values for the state
 */
export const DirectoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(directoryReducer, {
    patriot20: [],
    patriot22: [],
    chestnuthill: [],
    isLoading: false,
    error: null,
  });


  /*
    This function fetches data from the database when the provider mounts
   */

  const fetchData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await fetchDirectoryData();
      dispatch({ type: 'SET_PATRIOT20', payload: data[0] });
      dispatch({ type: 'SET_PATRIOT22', payload: data[1] });
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Fetch data only once when the provider mounts
  useEffect(() => {
    fetchData();
  }, [fetchData]);


  /*
    Wraps child components in DirectoryContext provider so that they can
    use the context. This
   */

  return (
    <DirectoryContext.Provider value={{ ...state, fetchData }}>
  {children}
  </DirectoryContext.Provider>
);
};


