import { engine } from "./engine/core/engine";
import { scene } from "./engine/core/scene";
import { camera } from "./engine/core/camera";
import * as THREE from "three";

function main() {
    // Grab canvas from DOM
    const canvas = document.querySelector("canvas");

    if (!canvas) {
        throw new Error("Canvas element not found");
    }

    // Create engine
    const eng = new engine();
    eng.attach(canvas);

    // Create scene
    const sc = new scene();

    // Create Three.js camera
    const cam = new camera(
        new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        )
    );

    // Position camera
    cam.object.position.z = 5;

    // Assign camera to scene
    sc.currentCamera = cam;

    // Register scene in engine
    eng.scenes.push(sc);
    eng.currentScene = sc;

    // Start engine
    eng.start();

    // Handle resize
    window.addEventListener("resize", () => {
        eng.onViewResize();
    });

    // Initial resize sync
    eng.onViewResize();

    console.log("Engine started");
}

main();