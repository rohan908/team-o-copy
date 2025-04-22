/**
 Author: Liam O'Driscoll
 Use: Takes in NodeDataType[] and provides TextDirection[] -> this is then used to display Textbased directions
 NOTES: CTRL+F !!! for changes that may need to be made
 I use ({Date}) in comments to manually track myself
 */

import { NodeDataType } from './MapClasses/MapTypes.ts';

/** TextDirection
 *  Direction: "left","right" or "straight"
 *  Distance:  # in (units)
 *  Floor: Floor number -> used to separate directions when displaying
 */

interface TextDirection {
    Direction: string;
    // for future implementation w/ distance (4/19)
    Distance: number;
    Floor: number;
}
/**
 * Required functions: -Calculate angular offset -> calculateAngle(node1: NodeDataType,node2: NodeDataType):number
 *                     -Get direction based off of this -> getDirection(angle1: number, angle2:number):string ("left","right","straight")
 *                     (In future -> need to figure out scale first)
 *                     -Calculate distance -> calculateDistance(node1: NodeDataType,node2: NodeDataType):number
 *
 */

/** calculateAngle(node1: NodeDataType,node2: NodeDataType):number
 *  Takes in: 2 NodeDataType's
 *  Produces: Number representing the offset in degrees from node1 to node2
 *  Notes: Result used to determine direction change
 */
function calculateAngle(node1: NodeDataType, node2: NodeDataType): number {
    const deltaY = node1.y - node2.y;
    const deltaX = node2.x - node1.x;
    // calculate offset in radians using atan2
    const radians = Math.atan2(deltaY, deltaX);
    let degrees = radians * (180 / Math.PI);
    return degrees;
}

/** getDirection(angle1: number, angle2:number):string
 *  Takes in: 2 number's
 *  Produces: string representing the direction change / angle offset between angle1 and angle2
 *  Notes: Result used to give user's directions
 *  Current weight of a change in directions is anythign greater than 30 degrees, may need to be changed in the future
 */
function getDirection(angle1: number, angle2: number): string {
    //let angleOffset = angle2 - angle1;
    let angleOffset = ((angle2 - angle1 + 540) % 360) - 180;
    // if less than a 30 degree change (positive or negative) -> straight
    if (Math.abs(angleOffset) <= 30) {
        return 'Straight';
    }
    // >30 -> Right
    else if (angleOffset > 30) {
        return 'Right';
    }
    // <-30 -> Left
    else if (angleOffset < -30) {
        return 'Left';
    }
    return 'unknown';
}
function calculateDistance(node1: NodeDataType, node2: NodeDataType): number {
    const dx = node2.x - node1.x;
    const dy = node2.y - node1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 *
 * @param path
 * @constructor
 */
export function GetTextDirections(path: NodeDataType[]): TextDirection[] {
    const directions: TextDirection[] = [];
    // Always start w/ straight for the first 2 nodes, since this will determine the original direction to then change from
    if (path.length >= 2) {
        directions.push({
            Direction: 'Straight',
            // placeholder until distance is integrated
            // added distance
            Distance: calculateDistance(path[0], path[1]),
            Floor: path[0].floor,
        });
    }
    // loop through and get directions for every following set of nodes
    for (let i = 0; i < path.length - 2; i++) {
        const firstNode = path[i];
        const secondNode = path[i + 1];
        // add thirdNode
        const thirdNode = path[i + 2];
        // check for floor value
        if (firstNode.floor !== secondNode.floor || secondNode.floor !== thirdNode.floor) {
            // skip direction if on different floors
            continue;
        }
        // call helpers
        // change from nextAngle to angle 1 and add angle2
        const angle1 = calculateAngle(firstNode, secondNode);
        const angle2 = calculateAngle(secondNode, thirdNode);
        const turnDirection = getDirection(angle1, angle2);
        // push data to directions
        directions.push({
            Direction: turnDirection,
            // added distance
            Distance: 0,
            Floor: secondNode.floor,
        });
        // push data to directions
        directions.push({
            Direction: 'Straight',
            // added distance
            Distance: calculateDistance(secondNode, thirdNode),
            Floor: secondNode.floor,
        });
    }
    return directions;
}
