import { tgob } from "./tgob";
import * as THREE from "three";

export class camera extends tgob<THREE.Camera> {
    constructor(camera: THREE.Camera) {
        super(camera);
    }
}