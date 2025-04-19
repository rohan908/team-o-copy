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
    let angleOffset = angle2 - angle1;
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

export function GetTextDirections(path: NodeDataType[]): TextDirection[] {
    const directions: TextDirection[] = [];
    // Always start w/ straight for the first 2 nodes, since this will determine the original direction to then change from
    const node1 = path[0];
    const node2 = path[1];
    // calculate starting angle
    let startingAngle = calculateAngle(node1, node2);
    directions.push({
        Direction: 'Straight',
        // placeholder until distance is integrated
        Distance: 0,
        Floor: node1.floor,
    });
    // loop through and get directions for every following set of nodes
    for (let i = 1; i < path.length - 1; i++) {
        const firstNode = path[i];
        const secondNode = path[i + 1];
        // check for floor value
        if (firstNode.floor !== secondNode.floor) {
            // handle floor change, this will be the last direction per floor -> instructs how to move to the next using nodeType
            directions.push({
                Direction: 'Straight',
                Distance: 0,
                Floor: firstNode.floor,
            });
            continue;
        }
        // call helpers
        const nextAngle = calculateAngle(firstNode, secondNode);
        const turnDirection = getDirection(startingAngle, nextAngle);
        // push data to directions
        directions.push({
            Direction: turnDirection,
            Distance: 0,
            Floor: firstNode.floor,
        });
        // update starting angle for next offset calculation
        startingAngle = nextAngle;
    }
    return directions;
}
