import { engine } from "../engine/core/engine";
import { scene } from "../engine/core/scene";
import { camera } from "../engine/core/tgobs/camera";
import { mesh } from "../engine/core/tgobs/mesh";
import * as THREE from "three";

export class app {
    public engine: engine = new engine();

    public start() {
        const canvas = document.querySelector("canvas");
        if (!canvas) {
            throw new Error("Canvas element not found");
        }
    
        this.engine.attach(canvas);
    
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
        sc.currentCamera = cam;
    
        this.engine.setCurrentScene(sc);
    
        const cube = new mesh(new THREE.Mesh(new THREE.PlaneGeometry(), new THREE.MeshBasicMaterial({ color: 0x307f7f })));
        cube.rotation.x = -Math.PI / 2;
        cube.position.y = -3;
        cube.size.set(50, 50, 1);
        sc.addChild(cube);
    
        this.engine.start();
        console.log("Engine started");
    }
}

export const game = new app();