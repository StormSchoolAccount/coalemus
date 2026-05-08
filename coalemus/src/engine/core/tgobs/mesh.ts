import { tgob } from "./tgob";
import * as THREE from "three";

export class mesh extends tgob<THREE.Mesh> {
    constructor(mesh: THREE.Mesh) {
        super(mesh);
    }
}