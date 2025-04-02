import React from 'react';
import {useState} from 'react';

const HoverInfoComponent = () => {
    const [hoverInfo, setHoverInfo] = useState("");
    const [isHovering, setIsHovering] = useState(false);
    function handleMouseEnter(num: number) {
        //Has cases for each area.
        //The area tag should supply which area number it is and match it to the correct description
        switch (num){
            case 1:
                setHoverInfo("You are hovering over Area 1");
                setIsHovering(true);
                break;
            case 2:
                setHoverInfo("You are hovering over Area 2");
                setIsHovering(true);
                break;
            case 3:
                setHoverInfo("You are hovering over Area 3");
                setIsHovering(true);
                break;
        }
    }
    //Sets back to default text if you leave the hover area.
    function handleMouseExit() {
        setIsHovering(false);
    }

    return (
        <div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6 w-64">
                <div className="text-2xl font-bold mb-4 text-center py-2 rounded">
                    {!isHovering ? `No information to display` : `Area Information: ${hoverInfo}`}
                </div>
            </div>
            <div className="bg-gray-300 rounded-lg shadow-md p-6 w-64"
                 onMouseEnter={() => handleMouseEnter(1)}
                 onMouseLeave={() => handleMouseExit()}>
                <div className="text-2xl font-bold mb-4 text-center py-2 rounded">
                    {`Area 1`}
                </div>
            </div>
            <div className="bg-gray-400 rounded-lg shadow-md p-6 w-64"
                 onMouseEnter={() => handleMouseEnter(2)}
                 onMouseLeave={() => handleMouseExit()}>
                <div className="text-2xl font-bold mb-4 text-center py-2 rounded">
                    {`Area 2`}
                </div>
            </div>
            <div className="bg-gray-500 rounded-lg shadow-md p-6 w-64"
                 onMouseEnter={() => handleMouseEnter(3)}
                 onMouseLeave={() => handleMouseExit()}>
                <div className="text-2xl font-bold mb-4 text-center py-2 rounded">
                    {`Area 3`}
                </div>
            </div>
        </div>
    );
}

export default HoverInfoComponent;
