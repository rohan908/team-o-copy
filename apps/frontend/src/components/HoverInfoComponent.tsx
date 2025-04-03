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
    const canvasRef22 = useRef<HTMLCanvasElement>(null);

    function handleMouseEnter(num: number) {
        //Has cases for each area.
        //The area tag should supply which area number it is and match it to the correct description
        switch (num){
            case 1:
                if (!isOverTransparent) {
                    setHoverInfo("Unspecified Hospital Space");
                    setIsHovering(true);
                }
                break;
            case 2:
                if (!isOverTransparent) {
                    setHoverInfo("This area is the Imaging Suite");
                    setIsHovering(true);
                }
                break;
            case 3:
                if (!isOverTransparent) {
                    setHoverInfo("This area is the Pharmacy");
                    setIsHovering(true);
                }
                break;
            case 4:
                if (!isOverTransparent) {
                    setHoverInfo("This area is the Phlebotomy Area");
                    setIsHovering(true);
                }
                break;
            case 5:
                if (!isOverTransparent) {
                    setHoverInfo("This area is the Spec Clinic");
                    setIsHovering(true);
                }
                break;
            case 6:
                if (!isOverTransparent) {
                    setHoverInfo("This area is the Urgent Care");
                    setIsHovering(true);
                }
                break;
        }
    }
    //Sets back to default text if you leave the hover area.
    function handleMouseExit() {
        setIsHovering(false);
    }

    function handleMouseOver(e: MouseEvent) {
        let canvas;
        let context
        let hasDetectedColor = false;
        for (let num = 0; num < 6; num++) {
            switch (num) {
                case 0:
                    canvas = canvasRefImaging.current;
                    if (!canvas) return;
                    context = canvas.getContext("2d");
                    if (!context) return;
                    break;
                case 1:
                    canvas = canvasRefPharmacy.current;
                    if (!canvas) return;
                    context = canvas.getContext("2d");
                    if (!context) return;
                    break;
                case 2:
                    canvas = canvasRefPhlebotomy.current;
                    if (!canvas) return;
                    context = canvas.getContext("2d");
                    if (!context) return;
                    break;
                case 3:
                    canvas = canvasRefSpecClinic.current;
                    if (!canvas) return;
                    context = canvas.getContext("2d");
                    if (!context) return;
                    break;
                case 4:
                    canvas = canvasRefUrgentCare.current;
                    if (!canvas) return;
                    context = canvas.getContext("2d");
                    if (!context) return;
                    break;
                case 5:
                    canvas = canvasRef22.current;
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
            const pixelData = context.getImageData(x, y, 1, 1);
            console.log("Alpha value = " + pixelData.data[3]);
            if (pixelData.data[3] == 0 && !hasDetectedColor) {
                setIsOverTransparent(true);
            } else if (!hasDetectedColor) {
                hasDetectedColor = true;
                setIsOverTransparent(false);
                const image = new Image();
                switch (num){
                    case 0:
                        setHoverInfo("This area is the Imaging Suite");
                        setIsHovering(true);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        image.src = "public/MapImages/ImagingDark.png";
                        context.beginPath();
                        context.drawImage(image, 0, 0, canvas.width, canvas.height);
                        break;
                    case 1:
                        setHoverInfo("This area is the Pharmacy");
                        setIsHovering(true);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        image.src = "public/MapImages/PharmacyDark.png";
                        context.beginPath();
                        context.drawImage(image, 0, 0, canvas.width, canvas.height);
                        break;
                    case 2:
                        setHoverInfo("This area is the Phlebotomy Area");
                        setIsHovering(true);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        image.src = "public/MapImages/PhleDark.png";
                        context.beginPath();
                        context.drawImage(image, 0, 0, canvas.width, canvas.height);
                        break;
                    case 3:
                        setHoverInfo("This area is the Spec Clinic");
                        setIsHovering(true);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        image.src = "public/MapImages/SpecDark.png";
                        context.beginPath();
                        context.drawImage(image, 0, 0, canvas.width, canvas.height);
                        break;
                    case 4:
                        setHoverInfo("This area is the Urgent Care");
                        setIsHovering(true);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        image.src = "public/MapImages/UrgentDark.png";
                        context.beginPath();
                        context.drawImage(image, 0, 0, canvas.width, canvas.height);
                        break;
                    case 5:
                        setHoverInfo("This area is 22 Patriot Place");
                        setIsHovering(true);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        image.src = "public/MapImages/Darker22.png";
                        context.beginPath();
                        context.drawImage(image, 0, 0, canvas.width, canvas.height);
                        break;
                }

            }
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

        canvas = canvasRef22.current;
        if (!canvas) return;
        context = canvas.getContext('2d');
        if (!context) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        image = new Image();
        image.src = "public/MapImages/22PatFull.png";
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
                <canvas id="imaging" className="imagingSuite" width={321} height={349} ref={canvasRefImaging}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event)}/>
                <canvas id="specClinic" className="specClinic" width={314} height={352} ref={canvasRefSpecClinic}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event)}/>
                <canvas id="urgentCare" className="urgentCare" width={180} height={151} ref={canvasRefUrgentCare}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event)}/>
                <canvas id="pharmacy" className="pharmacy" width={31} height={61} ref={canvasRefPharmacy}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event)}/>
                <canvas id="phlebotomy" className="phlebotomy" width={54} height={100} ref={canvasRefPhlebotomy}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event)}/>
                <canvas id="22" className="twentytwo" width={525} height={608} ref={canvasRef22}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event)}/>
            </div>
        </div>
    );
}

export default HoverInfoComponent;
