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
        controls.addEventListener('change', enforceBoundaries);
        controls.update();
    };

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

        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.position.set(100, 300, 300);
        camera.zoom = 1.2;
        camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);
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

        camera.position.set(0, 0, 330);
        camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);
        camera.zoom = 1;
        camera.updateProjectionMatrix();

        return camera;
    }
    // orbit controls don't work for rotating around the camera's position so had to make a controller for fov controls and just disable orbit controls.
    else if (cameraType === 'fov') {
        const fov = 100; // Field of view in degrees
        const near = 0.1;
        const far = 1000;

        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        const initialQuaternion = new THREE.Quaternion();
        if (previousCamera) {
            initialQuaternion.copy(previousCamera.quaternion.clone());
        }
        camera.quaternion.copy(initialQuaternion);

        camera.up.set(0, 0, 1);
        if (position) {
            camera.position.copy(position);
        }

        let isRotating = false;
        let lastX = 0;
        let lastY = 0;

        let rotationX = 0;
        let rotationY = 0;

        renderer.domElement.addEventListener('mousedown', function (event) {
            if (event.button === 0) {
                isRotating = true;
                lastX = event.clientX;
                lastY = event.clientY;
                event.preventDefault();
            }
        });

        renderer.domElement.addEventListener('mousemove', function (event) {
            if (!isRotating) return;

            // mouse movement
            const deltaX = event.clientX - lastX;
            const deltaY = event.clientY - lastY;
            lastX = event.clientX;
            lastY = event.clientY;
            const sensitivity = 0.004;

            rotationX -= deltaX * sensitivity;
            rotationY = Math.max(
                -Math.PI / 2,
                Math.min(Math.PI / 2 - 0.01, rotationY - deltaY * sensitivity)
            );

            const euler = new THREE.Euler(0, 0, 0, 'ZYX');
            euler.y = rotationX;
            euler.x = rotationY;

            const rotationQuaternion = new THREE.Quaternion().setFromEuler(euler);

            // rotation relative to initial orientation
            camera.quaternion.copy(initialQuaternion).multiply(rotationQuaternion);
        });

        // handle mouse leave to stop rotation
        const stopRotation = function () {
            isRotating = false;
        };

        renderer.domElement.addEventListener('mouseup', stopRotation);
        renderer.domElement.addEventListener('mouseleave', stopRotation);

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
