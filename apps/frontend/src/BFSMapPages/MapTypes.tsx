export interface Coordinate {
    x: number;
    y: number;
    z: number;
}


export interface Map {
    name: string;
    width: number; //px
    height: number; //px
    floor: number;
    xBigMapToSmallMapOffset: number; //for conversion from outside map to inside map
    xBigMapToSmallMapScale: number;
    yBigMapToSmallMapOffset: number;
    yBigMapToSmallMapScale: number;
    imageSrc: string;
}


