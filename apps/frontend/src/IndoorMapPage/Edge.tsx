import * as THREE from 'three';
import { TubeGeometry } from 'three';

export class FlowingTubeAnimation {
    private tubes: THREE.Mesh[] = [];
    private time: number = 0;
    private options: {
        color1?: number;
        color2?: number;
        flowSpeed?: number;
        pulseFrequency?: number;
    };

    constructor(
        options: {
            color1?: number;
            color2?: number;
            flowSpeed?: number;
            pulseFrequency?: number;
        } = {}
    ) {
        // Default values
        this.options = {
            color1: options.color1 ?? 0x2a68f7, // base color
            color2: options.color2 ?? 0x4deefb, // secondary color that will "flow"
            flowSpeed: options.flowSpeed ?? 2, // speed of flow
            pulseFrequency: options.pulseFrequency ?? 0.01, // frequency of "pulses"
        };
    }

    // Creates a tube between two nodes
    createEdge(node1: { x: number; y: number }, node2: { x: number; y: number }) {
        const startPoint = new THREE.Vector3(node1.x, node1.y, 0);
        const endPoint = new THREE.Vector3(node2.x, node2.y, 0);

        // represent the tube as a vector
        const tubeVector = new THREE.Vector3().subVectors(startPoint, endPoint);
        const tubeLength = tubeVector.length();

        // normalized the vector for direction
        const normalizedTubeVector = tubeVector.clone().normalize();

        const path = new THREE.LineCurve3(startPoint, endPoint);

        const flowingShader = {
            uniforms: {
                time: { value: 0.0 },
                colorA: { value: new THREE.Color(this.options.color1) },
                colorB: { value: new THREE.Color(this.options.color2) },
                speed: { value: this.options.flowSpeed },
                amplitude: { value: 1 }, // amplitude effects the balance of colors. 1 means the secondary color will be just as prominent as the primary.
                tubeLength: { value: tubeLength },
                startPoint: { value: startPoint },
                tubeDirection: { value: normalizedTubeVector },
                wavesPerUnit: { value: this.options.pulseFrequency },
            },
            // Adapted from this simple implementation: https://observablehq.com/@troywatt/simple-vertex-shader-using-three-js
            // Basically the vertex shader
            vertexShader: `
                uniform vec3 startPoint;
                uniform vec3 tubeDirection;
                uniform float tubeLength;
                
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying float vDistance; // Distance along tube
                
                void main() {
                  vPosition = position;
                  vNormal = normalize(normalMatrix * normal);
                  vec3 toPosition = position - startPoint;
                  
                  // get distance along tube
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
                  float waveFrequency = wavesPerUnit * tubeLength; // correct for tube length
                  
                  float flowOffset = time * speed; // position along tube
                  
                  // Create waves with a sin function. Flow offset shifts the wave "moving" it. The amplitude effects the amount of the secondary color introduced.
                  float wave = sin((vDistance * waveFrequency) - flowOffset) * amplitude; 
                  
                  vec3 finalColor = mix(colorA, colorB, clamp(wave, 0.0, 1.0)); // smooth transitions between colors
                  
                  gl_FragColor = vec4(finalColor, 1.0);
                }
            `,
        };

        // Create shader material
        const flowingMaterial = new THREE.ShaderMaterial(flowingShader);

        // Create tube geometry
        const tubeSegments = Math.max(16, Math.ceil(tubeLength * 4)); // longer tubes need more segments to keep animation looking consistent
        const geometry = new TubeGeometry(path, tubeSegments, 0.5, 8, false);

        const tube = new THREE.Mesh(geometry, flowingMaterial);
        this.tubes.push(tube);

        return tube;
    }

    // Update animation time for all tubes
    update(deltaTime: number) {
        this.time += deltaTime;

        this.tubes.forEach((tube) => {
            if (tube.material instanceof THREE.ShaderMaterial) {
                tube.material.uniforms.time.value = this.time;
            }
        });
    }
}
