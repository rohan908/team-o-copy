import * as THREE from 'three';
import { TubeGeometry } from 'three';

export class FlowingTubeAnimation {
    private scene: React.MutableRefObject<THREE.Scene>;
    private tubes: THREE.Mesh[] = [];
    private time: number = 0;
    private options: {
        color1: number;
        color2: number;
        flowSpeed: number;
        pulseFrequency?: number;
        pulseWidth?: number;
    };

    constructor(
        scene: React.MutableRefObject<THREE.Scene>,
        options = {
            color1: 0x00aaff,
            color2: 0xff3300,
            flowSpeed: 0.3,
            pulseFrequency: 2.0,
            pulseWidth: 0.25,
        }
    ) {
        this.scene = scene;
        this.options = options;
    }

    // Creates a tube between two nodes
    createEdge(node1: { x: number; y: number }, node2: { x: number; y: number }) {
        // Create start and end points
        const startPoint = new THREE.Vector3(node1.x, node1.y, 0);
        const endPoint = new THREE.Vector3(node2.x, node2.y, 0);

        // Calculate direction vector and length
        const direction = new THREE.Vector3().subVectors(startPoint, endPoint);
        const tubeLength = direction.length();

        // Normalize direction for shader
        const normalizedDirection = direction.clone().normalize();

        const path = new THREE.LineCurve3(startPoint, endPoint);

        const flowingShader = {
            uniforms: {
                time: { value: 0.0 },
                colorA: { value: new THREE.Color(0x2a68f7) }, // Blue
                colorB: { value: new THREE.Color(0x4deefb) }, // Teal
                speed: { value: 2 },
                amplitude: { value: 0.5 },
                tubeLength: { value: tubeLength },
                startPoint: { value: startPoint },
                tubeDirection: { value: normalizedDirection },
                wavesPerUnit: { value: 0.05 }, // Number of waves per unit length (adjust as needed)
            },
            vertexShader: `
                uniform vec3 startPoint;
                uniform vec3 tubeDirection;
                uniform float tubeLength;
                
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying float vDistance; // Distance along tube in world space
                
                void main() {
                  vPosition = position;
                  vNormal = normalize(normalMatrix * normal);
                  
                  // Calculate the vector from start point to current position
                  vec3 toPosition = position - startPoint;
                  
                  // Project this vector onto the tube direction to get distance along tube
                  vDistance = dot(toPosition, tubeDirection);
                  
                  // Normalize
                  vDistance = vDistance / tubeLength;
                  
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
                `,
            fragmentShader: `
                uniform float time;
                uniform vec3 colorA;
                uniform vec3 colorB;
                uniform float speed;
                uniform float amplitude;
                uniform float tubeLength;
                uniform float wavesPerUnit;
                
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying float vDistance;
                
                void main() {
                  // Calculate wave pattern based on actual world-space distance
                  // wavesPerUnit controls how many waves per world-space unit
                  float waveFrequency = wavesPerUnit * tubeLength * 6.28318; // 2π per wave
                  
                  // Flow effect along the tube
                  float flowOffset = time * speed;
                  
                  // Create waves with consistent world-space frequency
                  float wave = sin((vDistance * waveFrequency) - flowOffset) * amplitude;
                  
                  // Center wave around 0.5 for better color mixing
                  float colorMix = 0.5 + wave;
                  
                  // Create a smooth transition between colors
                  vec3 finalColor = mix(colorA, colorB, clamp(colorMix, 0.0, 1.0));
                  
                  // Output the final color
                  gl_FragColor = vec4(finalColor, 1.0);
                }
            `,
        };

        // Create flowing shader material with distinct pulses
        const flowingMaterial = new THREE.ShaderMaterial(flowingShader);

        // Create tube geometry with enough segments for smooth appearance
        const tubeSegments = Math.max(16, Math.ceil(tubeLength * 4)); // More segments for longer tubes
        const geometry = new TubeGeometry(path, tubeSegments, 0.5, 8, false);

        const tube = new THREE.Mesh(geometry, flowingMaterial);
        this.scene.current.add(tube);
        this.tubes.push(tube);

        return tube;
    }

    update(deltaTime: number) {
        this.time += deltaTime;

        // Update time uniform for all tube materials
        this.tubes.forEach((tube) => {
            if (tube.material instanceof THREE.ShaderMaterial) {
                tube.material.uniforms.time.value = this.time;
            }
        });
    }

    dispose() {
        // Clean up resources when no longer needed
        this.tubes.forEach((tube) => {
            this.scene.current.remove(tube);
            if (tube.geometry) tube.geometry.dispose();
            if (tube.material instanceof THREE.Material) tube.material.dispose();
        });
        this.tubes = [];
    }
}
