import React, {useState} from "react";
import {createContext} from "react";

interface LinkItem {
    title: string;
    path: string;
    xOffset: number;
    yOffset: number;
}

interface BuildingBoxProps {
    directoryList: LinkItem[];
    building: number;
    onStateChange: (childData: number[]) => void;
}

const BuildingBox: React.FC<BuildingBoxProps> = ({ directoryList, building, onStateChange }) => {
    const [offsetData, setOffsetData] = useState([0,0])

    //Sets new offsets based on the hovered component, and passes them to directory.tsx (parent) so they can be routed to HoverInfoComponent.
    function setNewOffsets(xOffset: number, yOffset: number) {
        setOffsetData([xOffset, yOffset]);
        onStateChange(offsetData);
    }

    return (
        <div className="border-2 border-white rounded-lg p-4 shadow-md bg-teal-100 w-full">
            <h1 className="floor-Header font-bold text-center">{building} Patriot Place</h1>
            <ul className="list-disc list-inside space-y-2">
                {directoryList.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.path}
                            className=" hover-shadow transition-colors duration-200"
                            onMouseMove={() => setNewOffsets(item.xOffset, item.yOffset)}
                        >
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default BuildingBox;
