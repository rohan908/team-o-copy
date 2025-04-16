import {
    createContext,
    useReducer,
    useCallback,
    useEffect,
    useContext,
    PropsWithChildren,
} from 'react';
import { fetchDirectoryData } from '../DatabaseFetching/GetDirectoryData.tsx';
import { DirectoryNodeItem } from './DirectoryItem';

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
      Implement the rest of the database data into contexts

 */

/*
  Adds fetchdata value to value prop, that way consumers can update context data
  by asking it to re-fetch data from the database after its been updated
 */
interface DirectoryContextType extends DirectoryState {
    fetchData: () => void;
}

/*
    define context for directory database data. undefined is placed in the type in case something goes
    wrong with the prop used with the provider component in app.tsx
 */
export const DirectoryContext = createContext<DirectoryContextType | undefined>(undefined);

/*
    defines custom hooks so that consumer components don't directly interact
    with any contexts, that way no internal data can be modified.

    To use them to access database data, follow this example:

    const patriot = usePatriotContext();

 */

export const usePatriotContext = () => {
    const context = useContext(DirectoryContext);
    if (!context) {
        throw new Error(
            'The usePatriotContext must be used within the provider component Patriot20Provider'
        );
    }

    return context.patriot;
};

export const useDirectoryContext = () => {
    const context = useContext(DirectoryContext);
    if (!context) {
        throw new Error(
            'The useDirectoryContext must be used within the provider component DirectoryProvider'
        );
    }

    return context;
};

export const useChestnutHillContext = () => {
    const context = useContext(DirectoryContext);
    if (!context) {
        throw new Error(
            'The ChestnutContext must be used within the provider component ChestnutProvider'
        );
    }

    return context;
};

/*
  This is for the reducer function.
 */
interface DirectoryState {
    patriot: DirectoryNodeItem[];
    chestnutHill: DirectoryNodeItem[];
    isLoading: boolean;
    error: string | null;
}

/*
  This is for the reducer function too. Each of these define actions the reducer
  can use, like setting array values, or load the state, or set an error to be
  thrown when the context is called and doesn't have any values in it.
 */
type DirectoryAction =
    | { type: 'SET_PATRIOT'; data: DirectoryNodeItem[] }
    | { type: 'SET_CHESTNUTHILL'; data: DirectoryNodeItem[] }
    | { type: 'SET_LOADING'; data: boolean }
    | { type: 'SET_ERROR'; data: string };

/*
  This is the reducer function. Based on the React docs, it is convention to use
  switch statements, so I used that instead of if statements.

  This function defines what state is returned depending on the given "action",
  i.e "SET_PATRIOT20" which will set values for patriot20. Using this should
  hopefully prevent some unnecessary re-renders, and also pretty cleanly
  handles states.

  If we need a cache for quicker page loading or some optimization, store data externally in this function
 */
function directoryReducer(state: DirectoryState, action: DirectoryAction): DirectoryState {
    switch (action.type) {
        case 'SET_PATRIOT':
            return { ...state, patriot: action.data };
        case 'SET_CHESTNUTHILL':
            return { ...state, chestnutHill: action.data };
        case 'SET_LOADING':
            return { ...state, isLoading: action.data };
        case 'SET_ERROR':
            return { ...state, error: action.data };
        default:
            return state;
    }
}

/*
  Defines the provider component to be used in app.tsx. This
  is what allows consumer components (child components --> In our
  projects, this is only Routing) of the provider to access the
  context data (through use of custom hooks).

  Calls the useReducer hook with our defined reducer function and default
  "empty" values for the state
 */
export const DirectoryProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(directoryReducer, {
        patriot: [],
        chestnutHill: [],
        isLoading: false,
        error: null,
    });

    /*
    This variable fetches data from the database when the provider mounts.
   */

    const fetchData = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', data: true });
        try {
            // grabs data from the database for each building
            const patData = await fetchDirectoryData('1');
            const chestHilldata = await fetchDirectoryData('2');

            dispatch({ type: 'SET_PATRIOT', data: patData });
            dispatch({ type: 'SET_CHESTNUTHILL', data: chestHilldata });
        } catch (err) {
            // I made if statements for this to fix " err is of type unknown"
            if (err instanceof Error) {
                dispatch({ type: 'SET_ERROR', data: err.message });
            } else {
                dispatch({ type: 'SET_ERROR', data: 'An unknown error occurred' });
            }
        } finally {
            dispatch({ type: 'SET_LOADING', data: false });
        }
    }, []);

    // Fetch data only once when the provider mounts. maybe doesn't need useEffect because
    // there's already one used in fetchDirectoryData()...
    useEffect(() => {
        if (fetchData) {
            fetchData();
        }
    }, [fetchData]);

    /*
    Wraps child components in DirectoryContext provider so that they can
    use the context.
   */

    return (
        <DirectoryContext.Provider value={{ ...state, fetchData }}>
            {children}
        </DirectoryContext.Provider>
    );
};
