/**
 Author: Liam O'Driscoll
 Use: Provides indoor map path for Child components
 NOTES: CTRL+F !!! for changes that may need to be made
        I use ({Date}) in comments to manually track myself
*/

import { NodeDataType } from './MapClasses/MapTypes.ts';
import { createContext, useContext, useState, useEffect } from 'react';
import { findPath } from './FindPathRouting.ts';
import { getNode } from './GetNodeRouting.ts';

/** PathContextType
 *  pathNodes: List of nodes in current path
 *  setStartEnd: function to set start/end ID's -> !!! This can be triggered by StartNavigation in future?
 */
interface PathContextType {
    pathNodes: NodeDataType[];
    setStartEnd: (startID: number, endID: number) => void;
}
// create context -> start w/ default (empty) value
const PathContext = createContext<PathContextType>({
    pathNodes: [],
    setStartEnd: () => {},
});

// Provider component for Children: GetTextDirections (+ DraggableMap in the future (4/19))
export function PathProvider({ children }: { children: React.ReactNode }) {
    // useState const's for PathContextType
    const [startID, setStartID] = useState<number | null>(null);
    const [endID, setEndID] = useState<number | null>(null);
    const [pathNodes, setPathNodes] = useState<NodeDataType[]>([]);

    // If/When startID or endID change -> get and set path/nodes
    useEffect(() => {
        // similar logic to const path in DraggableMap as of (4/19)
        const fetchPath = async () => {
            if (startID != null && endID != null) {
                try {
                    // get list of node IDs in path
                    // !!! Will need to change path finding option here
                    const pathResult = await findPath(startID, endID, 'BFS');
                    const ids = pathResult.result.pathIDs;

                    // get full node date for each node and push to nodes
                    const nodes: NodeDataType[] = [];
                    for (const id of ids) {
                        const nodeRes = await getNode(id);
                        nodes.push(nodeRes.result.nodeData);
                    }

                    // setPathNodes to store full list of nodes
                    setPathNodes(nodes);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchPath();
        // console log to manage excess useEffect triggers
        console.log('Fetch path ', startID, endID);
    }, [startID, endID]);
    // function to let each child component trigger new path fetch
    const setStartEnd = (startID: number, endID: number) => {
        setStartID(startID);
        setEndID(endID);
    };
    return (
        // provide pathNodes and setStartEnd to all children
        <PathContext.Provider value={{ pathNodes, setStartEnd }}>{children}</PathContext.Provider>
    );
}
// hook to access context from any child
export function usePathContext() {
    return useContext(PathContext);
}
