import {
    createContext,
    useReducer,
    useCallback,
    useEffect,
    useContext,
    PropsWithChildren,
} from 'react';
import { LanguageRequestItem } from './DirectoryItem';
import fetchRequestData from '../DatabaseFetching/GetRequestData.tsx';

/*
    What this file does:
        This file defines the LanguageRequestContext context, provider, and
        custom hook.

        LanguageRequestContext is used to store directory database data on the frontend.

        LanguageRequestContextProvider is a wrapper component that allows all of its
        children to access the context object data (our database data). This is
        called in App.tsx.

        useLanguageRequestContext is a custom hook which almost equivalent to
        useContext, but prevents modification of internal data in the context,
        as well as security issues or misuse.

    What this needs in the future:
      Implement the rest of the database data into contexts

 */

/*
  Adds fetchdata value to value prop, that way consumers can update context data
  by asking it to re-fetch data from the database after its been updated
 */
interface RequestContextType extends RequestState {
    fetchData: () => void;
}

/*
    define context for directory database data. undefined is placed in the type in case something goes
    wrong with the prop used with the provider component in app.tsx
 */
export const RequestContext = createContext<RequestContextType | undefined>(
    undefined
);

/*
    defines custom hooks so that consumer components don't directly interact
    with any contexts, that way no internal data can be modified.

    To use them to access database data, follow this example:

    const { patriot20, patriot22 } = usePatriotContext();

 */

export const useRequestContext = () => {
    const context = useContext(RequestContext);
    if (!context) {
        throw new Error(
            'The useRequestContext must be used within the provider component DirectoryProvider'
        );
    }

    return context;
};

// Context for language request
export const useLanguageRequestContext = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error(
      'The useRequestContext must be used within the provider component DirectoryProvider'
    );
  }

  return context.languageRequest;
};

/*
  This is for the reducer function.
 */
interface RequestState {
    languageRequest: LanguageRequestItem[];
    isLoading: boolean;
    error: string | null;
}

/*
  This is for the reducer function too. Each of these define actions the reducer
  can use, like setting array values, or load the state, or set an error to be
  thrown when the context is called and doesn't have any values in it.
 */
type DirectoryAction =
    | { type: 'SET_LANGUAGE_REQUEST'; data: LanguageRequestItem[] }
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
function RequestReducer(
    state: RequestState,
    action: DirectoryAction
): RequestState {
    switch (action.type) {
        case 'SET_LANGUAGE_REQUEST':
            return { ...state, languageRequest: action.data };
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
export const RequestProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(RequestReducer, {
        languageRequest: [],
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
            const langReqdata = await fetchRequestData('languageSR');
            const setLangReqData = await langReqdata.json().then((data) => {
              dispatch({ type: 'SET_LANGUAGE_REQUEST', data: data });
            });

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

    // In theory --> re-renders components if context is updated via "fetchdata"
    // which is given in the provider as a prop
    useEffect(() => {
        if (fetchData) {
            fetchData();
        }
    }, [fetchData]);

    /*
  Wraps child components in RequestContext provider so that they can
  use the context.
 */

    return (
        <RequestContext.Provider value={{ ...state, fetchData }}>
            {children}
        </RequestContext.Provider>
    );
};
