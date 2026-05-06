import { engine } from "./engine/core/engine";
import { scene } from "./engine/core/scene";
import { camera } from "./engine/core/camera";
import * as THREE from "three";
import { mesh } from "./engine/core/mesh";

function main() {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
        throw new Error("Canvas element not found");
    }

    const eng = new engine();
    eng.attach(canvas);

    const sc = new scene();

    const cam = new camera(
        new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        )
    );

    cam.position.z = 5;

    // Assign camera to scene
    sc.currentCamera = cam;

    // Register scene in engine
    eng.scenes.push(sc);
    eng.currentScene = sc;

    const cube = new mesh(new THREE.Mesh(new THREE.PlaneGeometry(), new THREE.MeshBasicMaterial({ color: 0x307f7f })));
    cube.rotation.x = -Math.PI / 2;
    cube.position.y = -3;
    cube.size.set(50, 50, 1);
    sc.addChild(cube);

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