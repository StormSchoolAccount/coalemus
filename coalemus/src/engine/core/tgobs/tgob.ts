import { gob } from "../gob";
import * as THREE from "three";

export class tgob<T extends THREE.Object3D = THREE.Object3D> extends gob {
    object: T;

    position: THREE.Vector3;
    rotation: THREE.Euler;
    size: THREE.Vector3;

    constructor(object: T) {
        super();
        this.object = object;

        this.position = object.position;
        this.rotation = object.rotation;
        this.size = object.scale;
    }
}