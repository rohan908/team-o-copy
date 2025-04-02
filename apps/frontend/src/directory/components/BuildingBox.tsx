import React from "react";

interface LinkItem {
    title: string;
    path: string;
}

interface BuildingBoxProps {
    directoryList: LinkItem[];
    building: number;
}

const BuildingBox: React.FC<BuildingBoxProps> = ({ directoryList, building }) => {
    return (
        <div className="border-2 border-white rounded-lg p-4 shadow-md bg-blue-300 w-full">
            <h1 className="floor-Header font-bold text-center">{building} Patriot Place</h1>
            <ul className="list-disc list-inside space-y-2">
                {directoryList.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.path}
                            className=" hover-shadow transition-colors duration-200"
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
