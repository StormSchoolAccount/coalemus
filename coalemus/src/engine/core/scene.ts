import { camera } from "./camera";
import { gob } from "./gob";
import { mesh } from "./mesh";
import * as THREE from "three";

export class scene extends gob {
    object: THREE.Scene = new THREE.Scene();
    currentCamera: camera | undefined;

    public update(dt: number) {
        dt
    }

    constructor() {
        super();

        this.descendantAdded.connect((child) => {
            if (child instanceof mesh) {
                this.object.add((child as mesh).object);
            }
        });

        this.descendantRemoved.connect((child) => {
            if (child instanceof mesh) {
                this.object.remove((child as mesh).object);
            }
        });
    }
}