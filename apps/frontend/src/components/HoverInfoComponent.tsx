import React from 'react';
import {useState} from 'react';
import '../routes/MapPage/MapPageStyles.css';

const HoverInfoComponent = () => {
    const [hoverInfo, setHoverInfo] = useState("");
    const [isHovering, setIsHovering] = useState(false);
    function handleMouseEnter(num: number) {
        //Has cases for each area.
        //The area tag should supply which area number it is and match it to the correct description
        switch (num){
            case 1:
                setHoverInfo("Unspecified Hospital Space");
                setIsHovering(true);
                break;
            case 2:
                setHoverInfo("This area is the Imaging Suite");
                setIsHovering(true);
                break;
            case 3:
                setHoverInfo("This area is the Pharmacy");
                setIsHovering(true);
                break;
            case 4:
                setHoverInfo("This area is the Phlebotomy Area");
                setIsHovering(true);
                break;
            case 5:
                setHoverInfo("This area is the Spec Clinic");
                setIsHovering(true);
                break;
            case 6:
                setHoverInfo("This area is the Urgent Care");
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
            <div className="bg-gray-100 rounded-lg shadow-md p-6 w-300">
                <div className="text-2xl font-bold mb-4 text-center py-2 rounded">
                    {!isHovering ? `No information to display` : `Area Information: ${hoverInfo}`}
                </div>
            </div>
            <div className="mapContainer">
                <img src="public/MapImages/Rough_Floor_Plan.png" alt="MainMapImage" className = "mainMapImage"/>
                <img src="public/MapImages/ImagingSuite.png" alt="MainMapImage"  className = "imagingSuite"
                     onMouseEnter={() => handleMouseEnter(2)}
                     onMouseLeave={() => handleMouseExit()}/>
                <img src="public/MapImages/Pharmacy.png" alt="MainMapImage" className = "pharmacy"
                     onMouseEnter={() => handleMouseEnter(3)}
                     onMouseLeave={() => handleMouseExit()}/>
                <img src="public/MapImages/Phlebotomy.png" alt="MainMapImage" className = "phlebotomy"
                     onMouseEnter={() => handleMouseEnter(4)}
                     onMouseLeave={() => handleMouseExit()}/>
                <img src="public/MapImages/SpecClinic.png" alt="MainMapImage" className = "specClinic"
                     onMouseEnter={() => handleMouseEnter(5)}
                     onMouseLeave={() => handleMouseExit()}/>
                <img src="public/MapImages/UrgentCare.png" alt="MainMapImage" className = "urgentCare"
                     onMouseEnter={() => handleMouseEnter(6)}
                     onMouseLeave={() => handleMouseExit()}/>
            </div>
            <div
                className="bg-gray-300 rounded-lg shadow-md p-6 w-64"
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={() => handleMouseExit()}
            >
                <div className="text-2xl font-bold mb-4 text-center py-2 rounded">{`Area 1`}</div>
            </div>
            <div
                className="bg-gray-400 rounded-lg shadow-md p-6 w-64"
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={() => handleMouseExit()}
            >
                <div className="text-2xl font-bold mb-4 text-center py-2 rounded">{`Area 2`}</div>
            </div>
            <div
                className="bg-gray-500 rounded-lg shadow-md p-6 w-64"
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={() => handleMouseExit()}
            >
                <div className="text-2xl font-bold mb-4 text-center py-2 rounded">{`Area 3`}</div>
            </div>
        </div>
    );
}

export default HoverInfoComponent;
