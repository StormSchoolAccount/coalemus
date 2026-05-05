import { gob } from "./gob";
import * as THREE from "three";

export class scene extends gob {
    object: THREE.Mesh;
    position: THREE.Vector3 = new THREE.Vector3();
    rotation: THREE.Euler = new THREE.Euler();
    size: THREE.Vector3 = new THREE.Vector3(1, 1, 1);

    constructor(mesh: THREE.Mesh) {
        super();
        this.object = mesh;
    }
}