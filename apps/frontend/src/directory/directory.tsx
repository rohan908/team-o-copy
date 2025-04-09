import React, {useState} from 'react';
import BuildingBox from "./components/BuildingBox.tsx";
import { Patriot20, Patriot22 } from './components/directorydata';
import HoverInfoComponent from "../MapPage/HoverInfoComponent.tsx";
import {Button, Flex} from "@mantine/core";

export function Directory() {
    const [buildingA, setBuildingA] = useState(true);
    const [offsetData, setOffsetData] = useState([0,0]);
    const [keyData, setKeyData] = useState(0);

    //Sets up links for both buildings
    const buildingALinks = Patriot20.map(item => ({
        title: item.title,
        path: `/directory/${item.slug}`,
        xOffset: item.xOffset,
        yOffset: item.yOffset
    }));

    const buildingBLinks = Patriot22.map(item => ({
        title: item.title,
        path: `/directory/${item.slug}`,
        xOffset: item.xOffset,
        yOffset: item.yOffset
    }));

    const handleChildStateChange = (childData: number[]) => {
        setOffsetData(childData);
    };


    //Functions that switch displayed map when the two buttons are clicked.
    const displayMapOne = () =>{
        setBuildingA(true);
        setKeyData(keyData + 1);
    }
    const displayMapTwo = () =>{
        setBuildingA(false);
        setKeyData(keyData + 1);
    }

    if (buildingA) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-center mb-8">Directory Overview</h1>
                <Flex
                    mih={40}
                    bg="rgba(0, 0, 0, .0)"
                    gap="md"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="wrap">
                    <Button onClick={displayMapOne}> 20 Patriot Place</Button>
                    <Button onClick={displayMapTwo}> 22 Patriot Place</Button>
                </Flex>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BuildingBox
                        directoryList={buildingALinks}
                        building={20}
                        onStateChange={handleChildStateChange}
                    />
                    <HoverInfoComponent mapVersion={1} offsetData={offsetData}></HoverInfoComponent>
                </div>
            </div>
        );
    } else {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-center mb-8">Directory Overview</h1>
                <Button onClick={displayMapOne}> 20 Patriot Place</Button>
                <Button onClick={displayMapTwo}> 22 Patriot Place</Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BuildingBox
                        directoryList={buildingBLinks}
                        building={22}
                        onStateChange={handleChildStateChange}
                    />
                    <HoverInfoComponent key = {keyData} mapVersion={2} offsetData={offsetData}></HoverInfoComponent>
                </div>
            </div>
        );
    }
}

export default Directory;

