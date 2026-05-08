import { tgob } from "./tgob";
import * as THREE from "three";

export class light extends tgob<THREE.Light> {
    constructor(light: THREE.Light) {
        super(light);
    }
}