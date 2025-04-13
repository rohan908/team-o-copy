import React, { createContext, useReducer, useCallback, ReactNode, useEffect, useContext } from 'react';
import { DirectoryItem, DirectoryDataStore } from '../data/DirectoryDataStore';

interface DirectoryState {
  patriot20: DirectoryItem[];
  patriot22: DirectoryItem[];
  chestnutehill: DirectoryItem[];
  isLoading: boolean;
  error: string | null;
}

// Action types
type DirectoryAction =
  | { type: 'SET_PATRIOT20'; payload: DirectoryItem[] }
  | { type: 'SET_PATRIOT22'; payload: DirectoryItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

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
    define context for directory database data DirectoryContext

 */
export const DirectoryContext = createContext(null);

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



// Reducer
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

// Context
interface DirectoryContextType extends DirectoryState {
  fetchData: () => void;
}

export const DirectoryContext = createContext<DirectoryContextType | undefined>(undefined);

// Provider
export const DirectoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(directoryReducer, {
    patriot20: [],
    patriot22: [],
    isLoading: false,
    error: null,
  });

  // This will fetch the data when the provider mounts
  const fetchData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`http://localhost:3001/directory/fulldirectory`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      dispatch({ type: 'SET_PATRIOT20', payload: data[0] });
      dispatch({ type: 'SET_PATRIOT22', payload: data[1] });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Fetch data only once when the provider mounts
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DirectoryContext.Provider value={{ ...state, fetchData }}>
  {children}
  </DirectoryContext.Provider>
);
};





// State shape
interface DirectoryState {
  patriot20: DirectoryItem[];
  patriot22: DirectoryItem[];
  isLoading: boolean;
  error: string | null;
}

// Action types
type DirectoryAction =
  | { type: 'SET_PATRIOT20'; payload: DirectoryItem[] }
  | { type: 'SET_PATRIOT22'; payload: DirectoryItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

// Reducer
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

// Context
interface DirectoryContextType extends DirectoryState {
  fetchData: () => void;
}

export const DirectoryContext = createContext<DirectoryContextType | undefined>(undefined);

// Provider
export const DirectoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(directoryReducer, {
    patriot20: [],
    patriot22: [],
    isLoading: false,
    error: null,
  });

  // This will fetch the data when the provider mounts
  const fetchData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`http://localhost:3001/directory/fulldirectory`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      dispatch({ type: 'SET_PATRIOT20', payload: data[0] });
      dispatch({ type: 'SET_PATRIOT22', payload: data[1] });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Fetch data only once when the provider mounts
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DirectoryContext.Provider value={{ ...state, fetchData }}>
  {children}
  </DirectoryContext.Provider>
);
};


