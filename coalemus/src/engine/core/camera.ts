import { gob } from "./gob";
import * as THREE from "three";

export class camera extends gob {
    object: THREE.Camera;

    constructor(camera: THREE.Camera) {
        super();
        this.object = camera;
    }
}