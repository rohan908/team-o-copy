import React, {useEffect, useRef, MouseEvent, MouseEventHandler} from 'react';
import {useState} from 'react';
import '../routes/MapPage/MapPageStyles.css';
import {Simulate} from "react-dom/test-utils";
import mouseOver = Simulate.mouseOver;

const HoverInfoComponent = () => {
    const [hoverInfo, setHoverInfo] = useState("");
    const [isHovering, setIsHovering] = useState(false);
    const [isOverTransparent, setIsOverTransparent] = useState(false);
    const canvasRefImaging = useRef<HTMLCanvasElement>(null);
    const canvasRefPharmacy = useRef<HTMLCanvasElement>(null);
    const canvasRefPhlebotomy = useRef<HTMLCanvasElement>(null);
    const canvasRefSpecClinic = useRef<HTMLCanvasElement>(null);
    const canvasRefUrgentCare = useRef<HTMLCanvasElement>(null);

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

    function handleMouseOver(e: MouseEvent, num: number) {
        let canvas;
        let context
        switch (num) {
            case 2:
                canvas = canvasRefImaging.current;
                if (!canvas) return;
                context = canvas.getContext("2d");
                if (!context) return;
                break;
            case 3:
                canvas = canvasRefPharmacy.current;
                if (!canvas) return;
                context = canvas.getContext("2d");
                if (!context) return;
                break;
            case 4:
                canvas = canvasRefPhlebotomy.current;
                if (!canvas) return;
                context = canvas.getContext("2d");
                if (!context) return;
                break;
            case 5:
                canvas = canvasRefSpecClinic.current;
                if (!canvas) return;
                context = canvas.getContext("2d");
                if (!context) return;
                break;
            case 6:
                canvas = canvasRefUrgentCare.current;
                if (!canvas) return;
                context = canvas.getContext("2d");
                if (!context) return;
                break;
        }
        if (!canvas) return;
        if (!context) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const pixelData = context.getImageData(x,y,1,1);
        console.log("Alpha value = " + pixelData.data[3]);
        if (pixelData.data[3] == 0){
            setIsOverTransparent(true);
        } else {
            setIsOverTransparent(false);
        }
    }

    useEffect(() => {
        let canvas = canvasRefImaging.current;
        if (!canvas) return;
        let context = canvas.getContext('2d');
        if (!context) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        let image = new Image();
        image.src = "public/MapImages/ImagingSuiteAlphaChannel.png";
        context.beginPath();
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        canvas = canvasRefPharmacy.current;
        if (!canvas) return;
        context = canvas.getContext('2d');
        if (!context) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        image = new Image();
        image.src = "public/MapImages/Pharmacy.png";
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        canvas = canvasRefPhlebotomy.current;
        if (!canvas) return;
        context = canvas.getContext('2d');
        if (!context) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        image = new Image();
        image.src = "public/MapImages/Phlebotomy.png";
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        canvas = canvasRefSpecClinic.current;
        if (!canvas) return;
        context = canvas.getContext('2d');
        if (!context) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        image = new Image();
        image.src = "public/MapImages/SpecClinic.png";
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        canvas = canvasRefUrgentCare.current;
        if (!canvas) return;
        context = canvas.getContext('2d');
        if (!context) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        image = new Image();
        image.src = "public/MapImages/UrgentCare.png";
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    })

    return (
        <div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6 w-300">
                <div className="text-2xl font-bold mb-4 text-center py-2 rounded">
                    {!isHovering || isOverTransparent ? `No information to display` : `Area Information: ${hoverInfo}`}
                </div>
            </div>
            <div className="mapContainer">
                <img
                    src="public/MapImages/Whole_Floor_Plan.png"
                    alt="MainMapImage"
                    className="mainMapImage"
                />
                <canvas id="imaging" className="imagingSuite" width={479} height={520} ref={canvasRefImaging}
                        onMouseEnter={() => handleMouseEnter(2)}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event, 2)}/>
                <canvas id="specClinic" className="specClinic" width={474} height={532} ref={canvasRefSpecClinic}
                        onMouseEnter={() => handleMouseEnter(5)}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event, 5)}/>
                <canvas id="urgentCare" className="urgentCare" width={273} height={229} ref={canvasRefUrgentCare}
                        onMouseEnter={() => handleMouseEnter(6)}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event, 6)}/>
                <canvas id="pharmacy" className="pharmacy" width={49} height={96} ref={canvasRefPharmacy}
                        onMouseEnter={() => handleMouseEnter(3)}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event, 3)}/>
                <canvas id="phlebotomy" className="phlebotomy" width={82} height={152} ref={canvasRefPhlebotomy}
                        onMouseEnter={() => handleMouseEnter(4)}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event, 4)}/>
            </div>
        </div>
    );
}

export default HoverInfoComponent;
