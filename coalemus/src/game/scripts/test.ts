import { script } from "../../engine/core/script";
import { mesh } from "../../engine/core/tgobs/mesh";
import { tgob } from "../../engine/core/tgobs/tgob";
import * as THREE from "three";

export class testscript extends script {
    c: mesh = new mesh(new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x30ff7f })));

    override start(): void {
        this.engine?.input.onKeyPress.connect((event) => {
            console.log(`Key pressed: ${event.key}`);
            if (this.engine?.currentScene && this.engine.currentScene.currentCamera) {
                // this.engine.currentScene.currentCamera.position.y -= 0.5;

                const cube = new mesh(new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x30ff7f })));
                cube.position.y = this.engine.currentScene.currentCamera.position.y;
                this.parent?.addChild(cube);
            }
        });

        this.engine?.input.onMouseMove.connect((event) => {
            // console.log(`Mouse moved: ${event.position.x}, ${event.position.y}`);
            this.c.position.x = (event.position.x / window.innerWidth) * 10 - 5;
            this.c.position.z = (event.position.y / window.innerHeight) * 10 - 5;
            
            if (this.engine?.currentScene && this.engine.currentScene.currentCamera) this.c.position.y = this.engine.currentScene.currentCamera.position.y;
        });

        this.parent?.addChild(this.c);
    }

    override update(dt: number): void {
        for (const child of this.parent?.getChildren() || []) {
            if (child instanceof tgob) {
                child.rotation.x += dt;
                child.rotation.z += dt;
            }
        }
    }
}