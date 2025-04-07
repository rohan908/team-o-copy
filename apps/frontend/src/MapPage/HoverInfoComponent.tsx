import React, {useEffect, useRef, MouseEvent, MouseEventHandler} from 'react';
import {useState} from 'react';
import './MapPageStyles.css';
import {Simulate} from "react-dom/test-utils";
import mouseOver = Simulate.mouseOver;

const HoverInfoComponent = () => {
    const [hoverInfo, setHoverInfo] = useState("");
    const [isHovering, setIsHovering] = useState(false);
    const [isOverTransparent, setIsOverTransparent] = useState(false);
    const [numHovering, setNumHovering] = useState(-1);
    const canvasRefImaging = useRef<HTMLCanvasElement>(null);
    const canvasRefPharmacy = useRef<HTMLCanvasElement>(null);
    const canvasRefPhlebotomy = useRef<HTMLCanvasElement>(null);
    const canvasRefSpecClinic = useRef<HTMLCanvasElement>(null);
    const canvasRefUrgentCare = useRef<HTMLCanvasElement>(null);
    const canvasRef22 = useRef<HTMLCanvasElement>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    // Store preloaded images
    const [images, setImages] = useState<{
        normal: { [key: string]: HTMLImageElement },
        dark: { [key: string]: HTMLImageElement }
    }>({
        normal: {},
        dark: {}
    });

    // Preload all images
    useEffect(() => {
        const imageSources = {
            normal: {
                imaging: "public/MapImages/ImagingSuiteAlphaChannel.png",
                pharmacy: "public/MapImages/Pharmacy.png",
                phlebotomy: "public/MapImages/Phlebotomy.png",
                specClinic: "public/MapImages/SpecClinic.png",
                urgentCare: "public/MapImages/UrgentCare.png",
                twentyTwo: "public/MapImages/22PatFull.png"
            },
            dark: {
                imaging: "public/MapImages/ImagingDark.png",
                pharmacy: "public/MapImages/PharmacyDark.png",
                phlebotomy: "public/MapImages/PhleDark.png",
                specClinic: "public/MapImages/SpecDark.png",
                urgentCare: "public/MapImages/UrgentDark.png",
                twentyTwo: "public/MapImages/Darker22.png"
            }
        };

        //if we don't have the inital images, the first view is realllyyyyy weird. 
        //the async function is used to load the images and then set the state, making the first view normal
        const loadImages = async () => {
            const normalImages: { [key: string]: HTMLImageElement } = {};
            const darkImages: { [key: string]: HTMLImageElement } = {};

            for (const [key, src] of Object.entries(imageSources.normal)) {
                const img = new Image();
                img.src = src;
                normalImages[key] = img;
            }

            for (const [key, src] of Object.entries(imageSources.dark)) {
                const img = new Image();
                img.src = src;
                darkImages[key] = img;
            }

            setImages({ normal: normalImages, dark: darkImages });
        };

        loadImages();
    }, []);

    // Original dimensions of the map and canvases
    const originalMapWidth = 1425;
    const canvasDimensions = {
        imaging: { width: 321, height: 349 },
        pharmacy: { width: 31, height: 61 },
        phlebotomy: { width: 54, height: 100 },
        specClinic: { width: 314, height: 352 },
        urgentCare: { width: 180, height: 151 },
        twentyTwo: { width: 525, height: 608 }
    };

    // Function to update canvas dimensions based on container width
    // sorry connor, i like my switch cases lol
    const updateCanvasDimensions = () => {
        const mapContainer = mapContainerRef.current;
        if (!mapContainer) return;

        const containerWidth = mapContainer.offsetWidth;
        const scale = containerWidth / originalMapWidth;

        const canvases = [
            { ref: canvasRefImaging, dimensions: canvasDimensions.imaging },
            { ref: canvasRefPharmacy, dimensions: canvasDimensions.pharmacy },
            { ref: canvasRefPhlebotomy, dimensions: canvasDimensions.phlebotomy },
            { ref: canvasRefSpecClinic, dimensions: canvasDimensions.specClinic },
            { ref: canvasRefUrgentCare, dimensions: canvasDimensions.urgentCare },
            { ref: canvasRef22, dimensions: canvasDimensions.twentyTwo }
        ];

        canvases.forEach(({ ref, dimensions }) => {
            const canvas = ref.current;
            if (!canvas) return;
            
            const newWidth = dimensions.width * scale;
            const newHeight = dimensions.height * scale;
            
            canvas.width = newWidth;
            canvas.height = newHeight;
            
            // Redraw the image after resizing
            const context = canvas.getContext('2d');
            if (!context) return;
            
            const image = new Image();
            switch (ref) {
                case canvasRefImaging:
                    image.src = "public/MapImages/ImagingSuiteAlphaChannel.png";
                    break;
                case canvasRefPharmacy:
                    image.src = "public/MapImages/Pharmacy.png";
                    break;
                case canvasRefPhlebotomy:
                    image.src = "public/MapImages/Phlebotomy.png";
                    break;
                case canvasRefSpecClinic:
                    image.src = "public/MapImages/SpecClinic.png";
                    break;
                case canvasRefUrgentCare:
                    image.src = "public/MapImages/UrgentCare.png";
                    break;
                case canvasRef22:
                    image.src = "public/MapImages/22PatFull.png";
                    break;
            }
            
            // idk why onload works here but not everywhere else but it works so lol!
            image.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
            };
        });
    };

    
    //Sets back to default text if you leave the hover area.
    function handleMouseExit() {
        setIsHovering(false);
        // Restore original images
        const canvases = [
            { ref: canvasRefImaging, image: images.normal.imaging },
            { ref: canvasRefPharmacy, image: images.normal.pharmacy },
            { ref: canvasRefPhlebotomy, image: images.normal.phlebotomy },
            { ref: canvasRefSpecClinic, image: images.normal.specClinic },
            { ref: canvasRefUrgentCare, image: images.normal.urgentCare },
            { ref: canvasRef22, image: images.normal.twentyTwo }
        ];

        canvases.forEach(({ ref, image }) => {
            const canvas = ref.current;
            if (!canvas) return;
            const context = canvas.getContext('2d');
            if (!context) return;
            
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        });
    }

    function handleMouseOver(e: MouseEvent) {
        let canvas;
        let context;
        let hasDetectedColor = false;
        setNumHovering(-1);
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
            if (pixelData.data[3] == 0 && !hasDetectedColor) {
                setIsOverTransparent(true);
            } else if (!hasDetectedColor) {
                hasDetectedColor = true;
                setIsOverTransparent(false);
                switch (num){
                    case 0:
                        setHoverInfo("This area is the Imaging Suite");
                        setIsHovering(true);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(images.dark.imaging, 0, 0, canvas.width, canvas.height);
                        setNumHovering(0);
                        break;
                    case 1:
                        setHoverInfo("This area is the Pharmacy");
                        setIsHovering(true);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(images.dark.pharmacy, 0, 0, canvas.width, canvas.height);
                        setNumHovering(1);
                        break;
                    case 2:
                        setHoverInfo("This area is the Phlebotomy Area");
                        setIsHovering(true);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(images.dark.phlebotomy, 0, 0, canvas.width, canvas.height);
                        setNumHovering(2);
                        break;
                    case 3:
                        setHoverInfo("This area is the Spec Clinic");
                        setIsHovering(true);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(images.dark.specClinic, 0, 0, canvas.width, canvas.height);
                        setNumHovering(3);
                        break;
                    case 4:
                        setHoverInfo("This area is the Urgent Care");
                        setIsHovering(true);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(images.dark.urgentCare, 0, 0, canvas.width, canvas.height);
                        setNumHovering(4);
                        break;
                    case 5:
                        setHoverInfo("This area is 22 Patriot Place");
                        setIsHovering(true);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(images.dark.twentyTwo, 0, 0, canvas.width, canvas.height);
                        setNumHovering(5);
                        break;
                }
            }
            switch (num) {
                case 0:
                    if (numHovering !=0) {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(images.normal.imaging, 0, 0, canvas.width, canvas.height);
                    }
                    break;
                case 1:
                    if (numHovering !=1) {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(images.normal.pharmacy, 0, 0, canvas.width, canvas.height);
                    }
                    break;
                case 2:
                    if (numHovering !=2) {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(images.normal.phlebotomy, 0, 0, canvas.width, canvas.height);
                    }
                    break;
                case 3:
                    if (numHovering !=3) {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(images.normal.specClinic, 0, 0, canvas.width, canvas.height);
                    }
                    break;
                case 4:
                    if (numHovering !=4) {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(images.normal.urgentCare, 0, 0, canvas.width, canvas.height);
                    }
                    break;
                case 5:
                    if (numHovering !=5) {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(images.normal.twentyTwo, 0, 0, canvas.width, canvas.height);
                    }
                    break;
            }
        }
    }

    useEffect(() => {
        // Initial setup
        updateCanvasDimensions();
        
        // Add resize listener
        window.addEventListener('resize', updateCanvasDimensions);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', updateCanvasDimensions);
        };
    }, []);

    return (
        <div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6 hoverInfoBar">
                <div className="text-2xl font-bold mb-4 text-center py-2 rounded">
                    {!isHovering || isOverTransparent ? `Hover over a map region to learn more` : `Area Information: ${hoverInfo}`}
                </div>
            </div>
            <div className="mapContainer" ref={mapContainerRef}>
                <img
                    src="public/MapImages/Whole_Floor_Plan.png"
                    alt="MainMapImage"
                    className="mainMapImage"
                />
                <canvas id="imaging" className="imagingSuite" ref={canvasRefImaging}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event)}/>
                <canvas id="specClinic" className="specClinic" ref={canvasRefSpecClinic}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event)}/>
                <canvas id="urgentCare" className="urgentCare" ref={canvasRefUrgentCare}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event)}/>
                <canvas id="pharmacy" className="pharmacy" ref={canvasRefPharmacy}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event)}/>
                <canvas id="phlebotomy" className="phlebotomy" ref={canvasRefPhlebotomy}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event)}/>
                <canvas id="22" className="twentytwo" ref={canvasRef22}
                        onMouseLeave={() => handleMouseExit()}
                        onMouseMove={(event) => handleMouseOver(event)}/>
            </div>
        </div>
    );
}

export default HoverInfoComponent;
