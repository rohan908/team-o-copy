import React from "react"

interface linkItem {
    title: string
}

interface floorBox {
    directoryList: linkItem[]
    floor: number
    path: string
}

const floorBox: React.FC<floorBox> = ({directoryList, floor, path}) =>{


return (
    <div className ="border-2 border-white rounded-lg p-4 shadow-md bg-blue-300 max-w-md mx-auto my-4">
        <h1 className={"floor-Header font-bold"}> Floor: {floor}
        </h1>
    <ul className ="list-disc list-inside space-y-2">
        {directoryList.map((item, index) => (
            <li key={index}>
                <a href={path} target="_blank" rel="noopener noreferrer">
                    {item.title}
                </a>
            </li>
        ))}
    </ul>
    </div>

);
};

export default floorBox;