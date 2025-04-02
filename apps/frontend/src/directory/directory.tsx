import React from 'react';
import FloorBox from "./components/FloorBox";
import {Directorypath} from "./directory-links/directorypath.tsx";

export function Directory() {
    const floorFour20 = [
        { title: 'Directorypath (EMG)'},
        { title: 'Nutrition'},
        { title: 'React Docs'},
    ];


    return (
        <>
            <h1>Some useful links:</h1>
            <FloorBox directoryList={floorFour20} floor={1} path="./directory-links/directorypath.tsx"/>
        </>
    );
}
export default Directory;
