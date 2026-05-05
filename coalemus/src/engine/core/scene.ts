import { camera } from "./camera";
import { gob } from "./gob";
import * as THREE from "three";

export class scene extends gob {
    object: THREE.Scene = new THREE.Scene();
    currentCamera: camera | undefined;

    constructor() {
        super();
    }
}