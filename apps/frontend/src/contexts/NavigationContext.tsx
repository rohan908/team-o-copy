import {
    createContext,
    useReducer,
    useContext,
    PropsWithChildren,
} from 'react';
import { NavSelectionItem, PathItem } from './NavigationItem.ts';


/*
    What this file does:
        This file defines the NavigationContext context, and provider

        NavigationContext is used to store and share user selected navigation data across the frontend.

 */

/*
  Adds fetchdata value to value prop, that way consumers can update context data
  by asking it to re-fetch data from the database after its been updated
 */
interface RequestContextType extends NavigationState {
    fetchData: () => void;
}

export const NavSelectionContext = createContext<
    { state: NavigationState; dispatch: React.Dispatch<NavigationAction> } | undefined
>(undefined);

// Context for user selected navigation data
export const useNavSelectionContext = () => {
    const context = useContext(NavSelectionContext);
    if (!context) {
        throw new Error(
            'The useNavSelectionContext must be used within the provider component DirectoryProvider'
        );
    }

    return context;
};

// Context for the path data to reduce api calls
export const usePathContext = () => {
    const context = useContext(NavSelectionContext);
    if (!context) {
        throw new Error(
            'The usePathContext must be used within the provider component DirectoryProvider'
        );
    }

    return context;
};

/*
  This is for the reducer function.
 */
interface NavigationState {
    navSelectRequest: NavSelectionItem | null;
    pathSelectRequest: PathItem | null;
    error: string | null;
}

/*
  This is for the reducer function too. Each of these define actions the reducer
  can use, like setting array values, or load the state, or set an error to be
  thrown when the context is called and doesn't have any values in it.
 */
type NavigationAction =
    | { type: 'SET_NAV_REQUEST'; data: NavSelectionItem }
    | { type: 'SET_PATH_REQUEST'; data: PathItem }
    | { type: 'SET_ERROR'; data: string };

/*
  This is the reducer function. Based on the React docs, it is convention to use
  switch statements
 */
function NavigationReducer(state: NavigationState, action: NavigationAction): NavigationState {
    switch (action.type) {
        case 'SET_NAV_REQUEST':
            return { ...state, navSelectRequest: action.data };
        case 'SET_PATH_REQUEST':
            return { ...state, pathSelectRequest: action.data };
        case 'SET_ERROR':
            return { ...state, error: action.data };
        default:
            return state;
    }
}

/*
  Defines the provider component to be used in app.tsx. This
  is what allows consumer INDOORMAPScomponents (child INDOORMAPScomponents --> In our
  projects, this is only Routing) of the provider to access the
  context data (through use of custom hooks).

  Calls the useReducer hook with our defined reducer function and default
  "empty" values for the state
 */
export const NavigationProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(NavigationReducer, {
        navSelectRequest: null,
        pathSelectRequest: null,
        error: null,
    });

    /*
Wraps child INDOORMAPScomponents in RequestContext provider so that they can
use the context.
*/

    return (
        <NavSelectionContext.Provider value={{ state, dispatch }}>
            {children}
        </NavSelectionContext.Provider>
    );
};
