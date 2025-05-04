import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
import { Tween, Easing } from '@tweenjs/tween.js';
export function createNewOrbitControls(
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    domElement: HTMLElement,
    previousControls?: OrbitControls
): OrbitControls {
    if (previousControls) {
        // this should dispose the event listener too
        previousControls.dispose();
    }
    const controls = new OrbitControls(camera, domElement);
    const isPerspective = camera instanceof THREE.PerspectiveCamera;
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableRotate = isPerspective; // enable rotating for perspective cameras
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
    };

    const aspect = domElement.clientWidth / domElement.clientHeight;
    const frustumSize = 400;
    const frustumHalfHeight = frustumSize / 2;
    const frustumHalfWidth = frustumHalfHeight * aspect;

    // zoom and rotation limits based on camera type
    if (isPerspective) {
        controls.minDistance = 100;
        controls.maxDistance = 700;
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI / 2 - 0.01;
    } else {
        controls.minZoom = 1;
        controls.maxZoom = 5;
    }

    const maxPanX = frustumHalfWidth * 2;
    const maxPanY = frustumHalfHeight * 2;

    const initialTarget = new THREE.Vector3(0, 0, 0);
    const vTarget = new THREE.Vector3();

    const enforceBoundaries = () => {
        if (isPerspective) {
            // for perspective camera use distance
            const distanceRatio =
                (controls.getDistance() - controls.minDistance) /
                (controls.maxDistance - controls.minDistance);
            const zoomRatio = 1 - distanceRatio; // Invert so closer = higher zoom

            const allowedPanX = maxPanX * zoomRatio;
            const allowedPanY = maxPanY * zoomRatio;

            vTarget.copy(controls.target);

            controls.target.x = Math.max(
                initialTarget.x - allowedPanX,
                Math.min(initialTarget.x + allowedPanX, controls.target.x)
            );
            controls.target.y = Math.max(
                initialTarget.y - allowedPanY,
                Math.min(initialTarget.y + allowedPanY, controls.target.y)
            );

            vTarget.x = vTarget.x - controls.target.x;
            vTarget.y = vTarget.y - controls.target.y;

            camera.position.x -= vTarget.x;
            camera.position.y -= vTarget.y;
        } else {
            // for orthographic camera use zoom ratio
            const orthoCamera = camera as THREE.OrthographicCamera;
            const zoomRatio =
                (orthoCamera.zoom - controls.minZoom) / (controls.maxZoom - controls.minZoom);

            const allowedPanX = maxPanX * zoomRatio;
            const allowedPanY = maxPanY * zoomRatio;

            vTarget.copy(controls.target);

            controls.target.x = Math.max(
                initialTarget.x - allowedPanX,
                Math.min(initialTarget.x + allowedPanX, controls.target.x)
            );
            controls.target.y = Math.max(
                initialTarget.y - allowedPanY,
                Math.min(initialTarget.y + allowedPanY, controls.target.y)
            );

            vTarget.x = vTarget.x - controls.target.x;
            vTarget.y = vTarget.y - controls.target.y;

            camera.position.x -= vTarget.x;
            camera.position.y -= vTarget.y;
        }
    };

    controls.addEventListener('change', enforceBoundaries);
    controls.update();

    return controls;
}

export function createNewCamera(
    canvasElement: HTMLCanvasElement,
    cameraType: 'orthographic' | 'perspective' | 'fov' = 'perspective',
    renderer: THREE.WebGLRenderer,
    position?: THREE.Vector3,
    previousCamera?: THREE.OrthographicCamera | THREE.PerspectiveCamera
): THREE.OrthographicCamera | THREE.PerspectiveCamera {
    const aspect = canvasElement.clientWidth / canvasElement.clientHeight;
    const frustumSize = 400;
    const frustumHalfHeight = frustumSize / 2;
    const frustumHalfWidth = frustumHalfHeight * aspect;

    if (cameraType === 'perspective') {
        const fov = 45; // Field of view in degrees
        const near = 0.1;
        const far = 1000;

        // dispose fov camera event listeners if switching from fov
        if (previousCamera && previousCamera.userData && previousCamera.userData.cleanupListeners) {
            previousCamera.userData.cleanupListeners();
        }

        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        console.log(position);
        if (position) {
            camera.position.set(position.x, position.y, position.z);
        } else {
            camera.position.set(0, 0, 330);
        }
        camera.zoom = 1.2;
        camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);

        // this is used to maintain orientation when switching to the fov camera
        camera.userData = { fovAngles: { phi: 0, theta: 0 } };

        camera.updateProjectionMatrix();

        return camera;
    } else if (cameraType === 'orthographic') {
        const camera = new THREE.OrthographicCamera(
            -frustumHalfWidth,
            frustumHalfWidth,
            frustumHalfHeight,
            -frustumHalfHeight,
            0.1,
            1000
        );

        // dispose fov camera event listeners if switching from fov
        if (previousCamera && previousCamera.userData && previousCamera.userData.cleanupListeners) {
            previousCamera.userData.cleanupListeners();
        }

        camera.position.set(0, 0, 330);
        camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);
        camera.zoom = 1.3;

        // this is used to maintain orientation when switching to the fov camera
        camera.userData = { fovAngles: { phi: 0, theta: 0 } };

        camera.updateProjectionMatrix();

        return camera;
    }
    // orbit controls don't work for rotating around the camera's position so had to make a controller for fov controls and just disable orbit controls.
    // I'm a monke and couldn't figure out how to directly rotate the camera's euler angles with quaternions without causing strange gimble lock issues
    // so this is probably mega inefficient, but better than the ship sinking.
    else if (cameraType === 'fov') {
        const fov = 100; // Field of view in degrees
        const near = 0.1;
        const far = 1000;

        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.up.set(0, 0, 1);

        if (position) {
            camera.position.copy(position);
        }

        let phi = 0; // yaw
        let theta = 0; // pitch

        if (previousCamera && previousCamera.userData && previousCamera.userData.fovAngles) {
            phi = previousCamera.userData.fovAngles.phi;
            theta = previousCamera.userData.fovAngles.theta;
        }

        camera.userData.fovAngles = { phi, theta };

        const updateCamera = () => {
            theta = Math.max(-Math.PI / 2, Math.min(Math.PI / 2 - 0.01, theta)); // limits pitch

            // spherical coords
            const targetX = camera.position.x + Math.sin(phi) * Math.cos(theta);
            const targetY = camera.position.y + Math.cos(phi) * Math.cos(theta);
            const targetZ = camera.position.z + Math.sin(theta);

            // point camera at target
            camera.lookAt(targetX, targetY, targetZ);

            camera.userData.fovAngles.phi = phi;
            camera.userData.fovAngles.theta = theta;
        };

        updateCamera();

        camera.userData.updateCamera = updateCamera;

        let isRotating = false;
        let lastX = 0;
        let lastY = 0;

        const mouseDownHandler = function (event) {
            if (event.button === 0) {
                isRotating = true;
                lastX = event.clientX;
                lastY = event.clientY;
                event.preventDefault();
            }
        };

        const mouseMoveHandler = function (event) {
            if (!isRotating) return;

            const deltaX = event.clientX - lastX;
            const deltaY = event.clientY - lastY;
            lastX = event.clientX;
            lastY = event.clientY;

            const sensitivity = 0.004;

            phi += deltaX * sensitivity;
            theta -= deltaY * sensitivity;

            updateCamera();
        };

        const stopRotation = function () {
            isRotating = false;
        };

        renderer.domElement.addEventListener('mousedown', mouseDownHandler);
        renderer.domElement.addEventListener('mousemove', mouseMoveHandler);
        renderer.domElement.addEventListener('mouseup', stopRotation);
        renderer.domElement.addEventListener('mouseleave', stopRotation);

        // disposal function other cameras can use when switching
        camera.userData.cleanupListeners = function () {
            renderer.domElement.removeEventListener('mousedown', mouseDownHandler);
            renderer.domElement.removeEventListener('mousemove', mouseMoveHandler);
            renderer.domElement.removeEventListener('mouseup', stopRotation);
            renderer.domElement.removeEventListener('mouseleave', stopRotation);
        };

        camera.zoom = 1;
        camera.updateProjectionMatrix();

        return camera;
    }
}

export function moveCamera(
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    controls: OrbitControls,
    position: THREE.Vector3,
    duration: number,
    onComplete?: () => void
) {
    const tween = new Tween(camera.position);
    tween.easing(Easing.Quadratic.Out);
    tween.to(position, duration);
    tween.onComplete(onComplete);
    tween.start();

    return tween;
}
