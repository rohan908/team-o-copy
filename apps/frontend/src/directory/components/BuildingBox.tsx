import React from "react";

interface LinkItem {
    title: string;
    path: string;
    children?: string[];
}

interface BuildingBoxProps {
    directoryList: LinkItem[];
    building: number;
}

const BuildingBox: React.FC<BuildingBoxProps> = ({ directoryList, building }) => {
    return (
        <div className="border-2 border-white rounded-lg p-4 shadow-md bg-blue-300 w-full">
            <h1 className="floor-Header font-bold text-center">Patriot {building}</h1>
            <ul className="list-disc list-inside space-y-2">
                {directoryList.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.path}
                            className="text-blue-900 hover:text-white hover:underline transition-colors duration-200"
                        >
                            {item.title}
                        </a>

                        {item.children && (
                            <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm text-black">
                                {item.children.map((child, i) => (
                                    <li key={i}>{child}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default BuildingBox;
